## Cookbook

This is a personal cookbook project for my own use.

## Tech Stack

- Client: React + TypeScript, Vite, React Router
- Server: Express + TypeScript REST API
- Database: PostgreSQL (via Docker Compose)

## Local Development

### 1) Start the database

From the `/server` folder:

- Run Docker Compose to start PostgreSQL.
  ```docker-compose up --build```

### 2) Start the server

From the `/server` folder:

- Install dependencies
  ```npm install```
- Start the dev server
  ```npm run dev```

### 3) Start the client

From the client folder:

- Install dependencies
  ```npm install```
- Start the Vite dev server
  ```npm run dev```

The client runs on http://localhost:5173 and the API runs on http://localhost:3001.
