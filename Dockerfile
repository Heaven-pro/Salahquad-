FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate && npm run build
EXPOSE 3000
# Au démarrage : applique le schéma, seed (idempotent), puis lance Next
CMD sh -c "npx prisma db push --skip-generate && npx tsx prisma/seed.ts && npm start"
