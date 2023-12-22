FROM node:20 as builder

WORKDIR /project

COPY packages/quotes-schema packages/quotes-schema
COPY packages/quotes-backend packages/quotes-backend
COPY package.json .
COPY package-lock.json .
COPY tsconfig.base.json .

RUN corepack enable

ARG PORT=
ENV PORT=${PORT}

ARG QUOTES_SERVICE_URL=
ENV QUOTES_SERVICE_URL=${QUOTES_SERVICE_URL}

EXPOSE 3000

RUN npm ci
RUN npm run build:backend

CMD ["npm", "run", "serve:backend"]