# Product Catalog App (Monorepo)

A full-stack product catalog application developed for the Codevector internship assignment by **Sarthak Kesarwani**. 

It features an Express + Prisma + PostgreSQL backend with cursor-based pagination and a React + Vite + Tailwind CSS frontend for smooth product browsing.

## Repository Structure

* `/backend` - Express API, Prisma ORM schema, migrations, and database seed script.
* `/frontend` - React + TypeScript application using Tailwind CSS.

## Quick Start (Local Setup)

### 1. Backend Setup
Navigate to the backend directory, install dependencies, run migrations, seed data, and start the server:
```bash
cd backend
npm install

# 1. Set up your DATABASE_URL in backend/.env
# 2. Run schema migrations
npx prisma migrate dev

# 3. Seed 200,000 mock products
npm run build:seed
npx prisma db seed

# 4. Start the server
npm run build
npm start
```
The backend server runs at `http://localhost:3001`.

### 2. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd ../frontend
npm install

# 1. Configure VITE_BACKEND_URL in frontend/.env
# 2. Start dev server
npm run dev
```
The frontend application will be available at `http://localhost:5173`.
