# L0G1N

<div align="center" style="display:flex; margin-bottom:10px">
  <img src="logo.png" alt="L0G1N Logo" width="300">
  <img src="logo_transparent.png" alt="L0G1N Logo" width="300">
</div>

> **From Zero to One, Simply Secure.**  
> 빠르고 강력하며 심플한 인증 BaaS

A fast, powerful, and simple authentication component for modern web applications.


---

# TODO

## Core Features
- [x] Engine
- [ ] Redis token management
- [ ] SDK components

## Advanced Features
- [ ] 고도화 (Advanced Features)
  - [ ] 로그 시스템 구현 (Logging System)
  - [ ] 메트릭 수집 (Metrics Collection)
  - [ ] 헬스체크 엔드포인트 (Health Check Endpoints)


## 아키텍처

L0G1N은 확장성과 보안성을 고려하여 설계된 로그인 인증 통합 BaaS(Backend as a Service)입니다.

L0G1N is a login authentication integrated BaaS designed with scalability and security in mind.

- **GW**: nginx
- **DB**: PostgreSQL  
- **API**: node + Express
- **Cache**: Redis (Session Management)

> Authentication sessions are managed through Redis to ensure scalability and reduce backend load, enabling distributed session handling across multiple instances.

---

## 주요 특징


> - Clear separation of authentication data and account data structure
> - Support for multiple authentication methods (password, OAuth, OTP, etc.)
> - Easy deployment environment based on Docker and Docker-Compose

- 인증 데이터와 계정 데이터를 분리한 구조  
- 다중 인증 방식 지원 (패스워드, OAuth, OTP 등)  
- Docker 및 Docker-Compose 기반 손쉬운 배포 환경  

---

## 시작하기

### 요구 사항

- Docker & Docker Compose (버전 3.8 + recommended)
- PostgreSQL 15 +
- Node.js 18.x LTS

---

## 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/D0iloppa/L0G1N.git
cd L0G1N

# Docker Compose로 실행
docker-compose up -d

# (개발용)
docker-compose -f docker-compose-dev.yml up -d
docker-compose -f docker-compose-dev.yml down

docker-compose -f docker-compose-dev.yml down --rmi all

```



### note
```bash
docker exec -t l0g1n-db pg_dump -U l0g1n_admin -d l0g1n_db > backup_$(date +%Y%m%d_%H%M%S).sql
```
