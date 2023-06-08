# 기본 이미지 설정
FROM node:14-alpine as build

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 프로젝트 파일 복사
COPY . .

# React 앱 빌드
RUN npm run build

# Stage 2: 경량 HTTP 서버로 빌드된 앱 제공
CMD ["node", "server.js"]