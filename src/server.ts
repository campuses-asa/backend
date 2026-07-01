import express from "express";
const cors = require('cors');

const app = express();
const PORT = 3666;
app.use(cors());
app.use(express.json());

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
    campusId: 1,
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

const test_campuses = [
  {
    id: 1,
    name: "Brooklyn College",
    address: "2900 Bedford Ave, Brooklyn, NY 11210",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
    description: "A beautiful historic campus located in the heart of Brooklyn, renowned for its liberal arts education and vibrant community."
  },
  {
    id: 2,
    name: "Queens College",
    address: "65-30 Kissena Blvd, Queens, NY 11367",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    description: "Located in a park-like setting in Flushing, Queens, offering a stellar research environment and diverse student body."
  },
  {
    id: 3,
    name: "Hunter College",
    address: "695 Park Ave, New York, NY 10065",
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?w=600&h=400&fit=crop",
    description: "A premier public institution located in Manhattan, focused on academic excellence, accessibility, and high-impact research."
  },
  {
    id: 4,
    name: "City College of New York",
    address: "160 Convent Ave, New York, NY 10031",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
    description: "Located in historic Hamilton Heights, CCNY is known for its stunning neo-Gothic architecture and outstanding engineering and science programs."
  },
  {
    id: 5,
    name: "Baruch College",
    address: "55 Lexington Ave, New York, NY 10010",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&h=400&fit=crop",
    description: "An urban campus situated in Midtown Manhattan, widely recognized for its elite business programs and high social mobility."
  },
  {
    id: 6,
    name: "Lehman College",
    address: "250 Bedford Park Blvd W, Bronx, NY 10468",
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop",
    description: "The only senior CUNY college in the Bronx, featuring a 37-acre tree-lined campus and strong healthcare and liberal arts programs."
  },
  {
    id: 7,
    name: "College of Staten Island",
    address: "2800 Victory Blvd, Staten Island, NY 10314",
    imageUrl: "https://images.unsplash.com/photo-1525921429555-e4e2c9b450ed?w=600&h=400&fit=crop",
    description: "Set on a massive 204-acre park-like campus, offering comprehensive undergraduate and graduate programs in a serene setting."
  }
];

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
  const student_idx = test_students.findIndex((student) => student.id === id);
  if (student_idx === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const updatedStudent = {
    id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    imageUrl: req.body.imageUrl,
    gpa: req.body.gpa,
    campusId: req.body.campusId // set to undefined if not provided
  };
  test_students[student_idx] = updatedStudent;
  res.json(updatedStudent);
});

// GET all campuses
app.get("/campuses", (_req, res) => {
  res.json(test_campuses);
});

// GET campus by id
app.get("/campuses/:id", (req, res) => {
  const id = Number(req.params.id);
  const campus = test_campuses.find((campus) => campus.id === id);
  if (!campus) {
    res.status(404).json({ error: "Campus not found" });
    return;
  }
  res.json(campus);
});

app.listen(PORT, () => { // 'npm run dev' in terminal to start dev server
  console.log(`Express server running on http://localhost:${PORT}`);
});