FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prisma:generate && npm run build
RUN npm prune --production
CMD npm run prisma:migrate:deploy && npm start