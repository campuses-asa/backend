import "dotenv/config";
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import studentRouter from './routes/students';
import campusRouter from './routes/campuses';
const cors = require('cors');

// Prisma setup
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

// App
const app = express();
const PORT = 3666;
app.use(cors());
app.use(express.json());

// Routers
app.use("/students", studentRouter);
app.use("/campuses", campusRouter);



// GET home
app.get("/", (_req, res) => {
  res.send('Hello campuses app');
});



// Start server
app.listen(PORT, () => { // 'npm run dev' in terminal to start dev server
  console.log(`Express server running on http://localhost:${PORT}`);
});