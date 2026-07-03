import "dotenv/config";
import express from 'express';
import cors from 'cors';
import studentRouter from './routes/students';
import campusRouter from './routes/campuses';
import { notFoundHandler, errorHandler } from './middleware';

const app = express();
const port = process.env.PORT || 3667;

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

// Start server
app.listen(port, () => { // 'npm run dev' in terminal to start dev server
  console.log(`Express server running on http://localhost:${port}`);
});