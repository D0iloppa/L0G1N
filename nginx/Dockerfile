# ./nginx/Dockerfile

FROM nginx:latest

# 쉘에서 사용할 수 있게 gettext 패키지 설치 (envsubst 제공)
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

# 템플릿 파일 복사 (ex: default.conf.template)
COPY ./conf.d/default.conf.template /etc/nginx/templates/default.conf.template


# Entrypoint에서 환경변수를 치환한 후 Nginx 실행
CMD ["/bin/sh", "-c", "envsubst '${API_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]