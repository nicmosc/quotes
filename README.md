This repository is meant as an exercise to have a monorepo containing the following packages:
- `@quotes/backend`: contains all of the backend API logic (uses the [Quotable](https://github.com/lukePeavey/quotable) API internally), also includes authentication
- `@quotes/frontend`: contains the UI to display the data provided by the API, in this case a random quote
- `@quotes/schema`: is the "contract" between the frontend and backend to ensure consistency with communication between BE and FE at the data layer. This package is shared between the two others

The app is available in production at https://quotes.nicmosc.com and the backend lives at https://api.quotes.nicmosc.com.

The users are mocked at the service layer, so if you want to log in to use the app, you may use one of the following email/password combinations:
```
email: 'Aaliyah23@hotmail.com'
password: 'F2EAFyTqHbR4Kt6

email: 'Tatyana.Koch@yahoo.com'
password: 'z3jmembRtsuoo1t'

email: 'Helene.Williamson@yahoo.com'
password: 'bbkpHh_hKk6KMwv'
```

<img width="230" alt="image" src="https://github.com/nicmosc/quotes/assets/16778318/6ff2e677-dbdd-4576-af5a-92d041f8cc14">
<img width="230" alt="image" src="https://github.com/nicmosc/quotes/assets/16778318/f797c9a5-b995-49e0-b0f7-55f0ae721001">
<img width="230" alt="image" src="https://github.com/nicmosc/quotes/assets/16778318/55482305-fc9e-437a-9d1a-1b413f5706b7">

Credits to Manoj for their design, which this app directly integrates https://dribbble.com/shots/4584452-Quote-Generator-App-Screens.

## Development
First install dependencies via `npm install`.

Then set the necessary env vars via `.env` files in each package.
```
# Frontend
VITE_API_URL=http://localhost:3000

# Backend
PORT=3000
QUOTES_SERVICE_URL=https://api.quotable.io
```

To start the monorepo, simply run `npm start`, this will launch both backend and frontend packages, using a NestJS server and Vite bundler respectively.

You can then view the frontend on `http://localhost:4000` and the backend on `http://localhost:3000`.

The backend also includes E2E tests for its API which can be run using `npm run test:backend`.

You may also start the whole stack for __production__ using
```
docker compose up
```
which will install dependencies and start the monorepo, however Docker is also used to deploy this app to AWS, with the Docker image being run via EC2.

### Building the images for production
Backend
```
docker build . -t quotes/backend -f ./packages/quotes-backend/Dockerfile
```

Frontend
```
docker build . -t quotes/frontend -f ./packages/quotes-frontend/Dockerfile --build-arg VITE_API_URL=production_url
```

## Todo
- [ ] CI/CD pipelines (run linting/ts-check, tests, build & deploy to AWS via Terraform)
- [ ] Frontend E2E tests (using Cypress for e.g.)
