#!/bin/sh
# nginx/start.sh

# 기본값 설정
SSL_CERT_FILE=${SSL_CERT_FILE:-fullchain.pem}
SSL_KEY_FILE=${SSL_KEY_FILE:-privkey.pem}

# 템플릿 치환
envsubst '$API_PORT $SSL_CERT_FILE $SSL_KEY_FILE' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# nginx 실행
exec nginx -g 'daemon off;'