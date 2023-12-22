FROM node:20 as builder

WORKDIR /project

COPY packages/quotes-schema packages/quotes-schema
COPY packages/quotes-frontend packages/quotes-frontend
COPY package.json .
COPY package-lock.json .
COPY tsconfig.base.json .

RUN corepack enable

ARG VITE_API_URL
ENV API_URL=${VITE_API_URL}

EXPOSE 4000

RUN npm ci
RUN npm run build:frontend

CMD ["npm", "run", "serve:frontend"]