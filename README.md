# Live Presence Tracker

A Node.js and Redis based backend application that tracks users who are currently online using heartbeat requests. Redis automatically removes inactive users after a configurable time using TTL (Time To Live).

## Features

- Track active users in real time
- Heartbeat API to mark users as online
- Automatic user expiry using Redis TTL
- Get list of currently online users
- Health check endpoint
- Docker support
- Environment variable configuration

## Technologies Used

- Node.js
- Express.js
- Redis
- Docker
- dotenv

## Project Structure

```
Live Presence Tracker/
│── config/
│   └── redis.js
│── routes/
│   └── presenceroutes.js
│── .env
│── .gitignore
│── Dockerfile
│── docker-compose.yml
│── package.json
│── server.js
│── README.md
```

## Installation

1. Clone the repository

```bash
git clone <your-github-repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Start Redis using Docker

```bash
docker compose up --build
```

4. Start the server

```bash
node server.js
```

The server will run at:

```
http://localhost:3000
```

## Environment Variables

Create a `.env` file with the following:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
TTL=30
```

## API Endpoints

### Home

```
GET /
```

Returns a welcome message.

---

### Health Check

```
GET /health
```

Returns server and Redis status.

---

### Heartbeat

```
POST /heartbeat
```

Body

```json
{
  "userId": "101"
}
```

Marks the user as online for the configured TTL.

---

### Online Users

```
GET /online-users
```

Returns all users currently online.

## How It Works

1. Client sends a heartbeat request.
2. The server stores the user in Redis.
3. Redis assigns a TTL to the user.
4. If another heartbeat is received, the TTL is refreshed.
5. If no heartbeat is received before the TTL expires, Redis automatically removes the user.

## Author

Mann Mahant