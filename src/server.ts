import "dotenv/config";
import express from 'express';
import cors from 'cors';
import studentRouter from './routes/students';
import campusRouter from './routes/campuses';
import { notFoundHandler, errorHandler } from './middleware';

const app = express();
const HOST = '0.0.0.0'; // for render, need to explicity declare on app.listen() below
const PORT = Number(process.env.PORT || 3667);

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
  })
);
app.use(express.json());

// Routers
app.use("/students", studentRouter);
app.use("/campuses", campusRouter);



// GET home
app.get("/", (_req, res) => {
  res.send('Hello campuses app');
});

// Middleware
app.use(notFoundHandler);
app.use(errorHandler);

// debugging
import { prisma } from './prisma-client';

// Add this right before your app.listen() block
prisma.$connect()
  .then(() => console.log("Successfully connected to the database!"))
  .catch((err) => console.error("DATABASE CONNECTION FAILED:", err));

// Start server
app.listen(PORT, HOST, () => { // 'npm run dev' in terminal to start dev server
  console.log(`Express server running on port ${PORT}`);
});