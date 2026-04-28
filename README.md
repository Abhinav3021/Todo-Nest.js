# Todo API - NestJS Backend

A RESTful Todo API built with NestJS, PostgreSQL, Prisma, and Drizzle ORM.

This project started as a basic Todo API and then upgraded to use a persistent PostgreSQL database. It also includes both Drizzle ORM and Prisma ORM accessing the same database.

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Drizzle ORM
- Docker / Docker Compose
- pnpm

---

## Installation

Clone the repository:
```bash
git clone <your-repo-url>
cd todo-nestjs
```

Install dependencies:
```bash
pnpm install
```

Environment Variables

Create a .env file:
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/todos_db?schema=public
PORT=5000
```

Running with Docker

Start PostgreSQL and backend:
```bash
docker compose up --build
```

Running Locally
Start development server:
```bash
pnpm run start:dev
```

Server runs on:

http://localhost:5000

Database
Prisma Migration
```bash
pnpm prisma migrate dev --name init_todo
```
Generate Prisma Client
```bash
pnpm prisma generate
```
API Routes
Prisma Routes
```bash
Get all todos
GET /todos
Get todo by id
GET /todos/:id
Create todo
POST /todos
Content-Type: application/json
{
  "title": "Learn NestJS"
}
Update todo
PATCH /todos/:id
Content-Type: application/json
{
  "completed": true
}
Delete todo
DELETE /todos/:id
```

Drizzle Routes
```bash
Get all todos
GET /todos/drizzle/all
Get todo by id
GET /todos/drizzle/:id
Create todo
POST /todos/drizzle
{
  "title": "Learn Drizzle"
}
Update todo
PATCH /todos/drizzle/:id
{
  "completed": true
}
Delete todo
DELETE /todos/drizzle/:id
```