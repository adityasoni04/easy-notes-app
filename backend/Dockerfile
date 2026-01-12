FROM node:20-alpine3.17

WORKDIR /src

RUN apk add --no-cache openssl1.1-compat

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["node", "src/index.js"]