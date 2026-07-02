import express from 'express';
import studentRouter from './routes/students';
import campusRouter from './routes/campuses';
const cors = require('cors');

const app = express();
const PORT = 3666;
app.use(cors());
app.use(express.json());

// Student Router
app.use("/students", studentRouter);
// Campus Router
app.use("/campuses", campusRouter);



// GET home
app.get("/", (_req, res) => {
  res.send('Hello campuses app');
});




// Start server
app.listen(PORT, () => { // 'npm run dev' in terminal to start dev server
  console.log(`Express server running on http://localhost:${PORT}`);
});