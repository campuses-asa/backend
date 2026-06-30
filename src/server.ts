import express from "express";
const cors = require('cors');

const app = express();
const PORT = 3666;
app.use(cors());

let test_students = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "sarah.jenkins@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    gpa: 3.85,
    campusId: 1,
  },
  {
    id: 2,
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.edu",
    // imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    gpa: 3.62,
    campusId: 2,
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Chen",
    email: "emily.chen@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    gpa: 3.95,
    campusId: 1,
  },
  {
    id: 4,
    firstName: "Marcus",
    lastName: "Johnson",
    email: "marcus.johnson@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    gpa: 3.15,
    campusId: 3,
  },
  {
    id: 5,
    firstName: "Chloe",
    lastName: "Patel",
    email: "chloe.patel@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    gpa: 3.78,
    campusId: 2,
  },
  {
    id: 6,
    firstName: "Daniel",
    lastName: "Smith",
    email: "daniel.smith@example.edu",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
    gpa: 3.45,
  }
];

app.use(express.json());

app.get("/", (_req, res) => {
  res.send('Hello express');
});

// GET all students
app.get("/students", (_req, res) => {
  res.json(test_students);
});

// GET student by id
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = test_students.find((student) => student.id === id);
  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }
  res.json(student);
});

// DELETE student by id
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const original_student_count = test_students.length;
  test_students = test_students.filter((student) => student.id !== id);
  if (test_students.length === original_student_count) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(204).end(); // successful delete
});

// PUT - Edit student profile by id
app.put("/students/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const student = test_students.find((student) => student.id === id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  //"merge" the new body fields directly into the found student object
  Object.assign(student, req.body);
  res.json(student);
});

app.listen(PORT, () => { // 'npm run dev' in terminal to start dev server
  console.log(`Express server running on http://localhost:${PORT}`);
});