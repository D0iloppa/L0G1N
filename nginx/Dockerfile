# ./nginx/Dockerfile

FROM nginx:latest

# 쉘에서 사용할 수 있게 gettext 패키지 설치 (envsubst 제공)
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

# 템플릿 파일 복사 (ex: default.conf.template)
COPY ./conf.d/default.conf.template /etc/nginx/templates/default.conf.template

# 스크립트 파일 복사 및 실행 권한 부여
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 스크립트 실행
CMD ["/start.sh"]