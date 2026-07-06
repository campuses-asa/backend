# Campuses Backend

**Deployed URL:** https://campuses-backend.onrender.com/

Welcome to the Campuses backend API! This project was built to demonstrate relational database schema design, asynchronous CRUD API development, object-relational mapping, and secure cloud hosting workflows.

The application is a clean RESTful backend featuring:
- **Express REST API:** Coordinates modular routing for registry endpoints, featuring JSON middleware, custom CORS controls, and centralized asynchronous error handlers.
- **Prisma ORM Integration:** Manages database schemas and records programmatically with Prisma Client, defining student-to-campus relationships and automatic client generation.
- **Relational CRUD Endpoints:** Exposes comprehensive endpoints for campuses and students, handling relational bindings, profile updates, and safe database cascading rules.
- **Automated Data Seeding:** Executes a dedicated seed script to clear existing records, reset table identity counters, and populate rich, mock student profiles and campus details.
- **Neon & Render Deployments:** Pairs a serverless PostgreSQL database hosted on Neon with an Express web service deployed on Render, configuring environment variables for secure operations.

It is built using Node.js, Express, Prisma, and PostgreSQL (powered by Neon serverless database hosting and deployed on Render).

## Running Locally

Follow these simple steps to run this project in your local development environment:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory and define the following variables (see `.env.example` as a template):
   ```env
   DATABASE_URL="your_postgresql_database_connection_string"
   FRONTEND_ORIGIN="http://localhost:5173"
   ```

3. **Run Migrations & Seed**:
   Run the Prisma migrations to set up your database schema and run the seed script to populate mock data:
   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```