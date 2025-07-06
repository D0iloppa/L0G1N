# L0G1N

> **From Zero to One, Simply Secure.**  
> 빠르고 강력하며 심플한 인증 프레임워크

---

## 아키텍처

L0G1N은 확장성과 보안성을 고려하여 설계된 인증 프레임워크입니다.

- **DB**: PostgreSQL  
- **WAS**: Spring Boot  

---

## 주요 특징

- 인증 데이터와 계정 데이터를 명확히 분리한 구조  
- 다중 인증 방식 지원 (패스워드, OAuth, OTP 등)  
- 확장 가능한 멀티테넌시 설계  
- Docker 및 Docker-Compose 기반 손쉬운 배포 환경  

---

## 시작하기

### 요구 사항

- Java 8 이상  
- Docker & Docker Compose  
- PostgreSQL 15 이상  

---

## 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/D0iloppa/L0G1N.git
cd L0G1N

# Docker Compose로 실행
docker-compose up -d
