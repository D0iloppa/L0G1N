#!/bin/bash

# L0G1N 데이터베이스 백업 스크립트

# 환경 변수 로드
source .env

# 백업 디렉토리 생성
BACKUP_DIR="backups"
mkdir -p $BACKUP_DIR

# 백업 파일명 생성 (날짜_시간)
BACKUP_FILE="$BACKUP_DIR/l0g1n_db_backup_$(date +%Y%m%d_%H%M%S).sql"

echo "🚀 L0G1N 데이터베이스 백업 시작..."
echo "📁 백업 파일: $BACKUP_FILE"

# Docker 컨테이너에서 데이터베이스 백업 실행
docker exec -t l0g1n-db pg_dump \
  -U $DB_USER \
  -d $DB_NAME \
  --verbose \
  --clean \
  --if-exists \
  --create \
  > $BACKUP_FILE

# 백업 결과 확인
if [ $? -eq 0 ]; then
    echo "✅ 백업 완료!"
    echo "📊 백업 파일 크기: $(du -h $BACKUP_FILE | cut -f1)"
    echo "📅 백업 시간: $(date)"
    
    # 최근 백업 파일들 표시
    echo ""
    echo "📋 최근 백업 파일들:"
    ls -la $BACKUP_DIR/*.sql | tail -5
else
    echo "❌ 백업 실패!"
    exit 1
fi 