FROM node:18-alpine

WORKDIR /app

COPY ./l0g1n-backend/package.json ./


RUN npm install --production

# 앱 소스 전체 복사
#COPY l0g1n-backend/ ./

#CMD ["node", "src/app.js"]
CMD ["npm", "run", "start"]
