# Quotes

This repository is meant as an exercise to have a monorepo containing the following packages:
- `@quotes/backend`: contains all of the backend API logic (uses the [Quotable](https://github.com/lukePeavey/quotable) API internally), also includes authentication
- `@quotes/frontend`: contains the UI to display the data provided by the API, in this case a random quote
- `@quotes/schema`: is the "contract" between the frontend and backend to ensure consistency with communication between BE and FE at the data layer. This package is shared between the two others

## Development
First install dependencies via `npm install`.

To start the monorepo, simply run `npm start`, this will launch both backend and frontend packages, using a NestJS server and Vite bundler respectively.

The backend also includes E2E tests for its API which can be run using `npm run test:backend`.

You may also start the whole stack using `docker compose up`, which will install dependencies and start the monorepo, however Docker is also used to deploy this app to AWS, with the Docker image being run via EC2.

## Todo
- [ ] CI/CD pipelines (run linting/ts-check, tests, build & deploy to AWS)
- [ ] Frontend E2E tests (using Cypress for e.g.)