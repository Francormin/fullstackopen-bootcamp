# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment
variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# Redis

Pass connection url with env `REDIS_URL`

# Docker Commands

Start all the services defined in docker-compose.dev.yml:

```
docker compose -f docker-compose.dev.yml up -d
```

Stop running and remove containers and any networks that were created:

```
docker compose -f docker-compose.dev.yml down
```

View logs:

```
docker compose -f docker-compose.dev.yml logs -f
```
