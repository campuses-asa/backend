import { Router } from 'express';
import { prisma } from '../prisma-client'
import { asyncHandler } from '../middleware';

const router = Router();

// GET all students
router.get("/",
  asyncHandler(async (_req, res) => {
    const students = await prisma.student.findMany();
    res.json(students);
  })
);

// GET student by id
router.get("/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const student = await prisma.student.findUnique({ where: { id: id } });
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.json(student);
  })
);

// POST - Add student
router.post("/add",
  asyncHandler(async (req, res) => {
    const newStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imageUrl: req.body.imageUrl ?? null,
      gpa: req.body.gpa,
      campusId: req.body.campusId ?? null
    };
    const student = await prisma.student.create({ data: newStudent });
    res.status(201).json(student);
  })
);

// PUT - Edit student profile by id
router.put("/:id/edit",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const existingStudent = await prisma.student.findUnique({ where: { id: id } });
    if (!existingStudent) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    const updatedStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imageUrl: req.body.imageUrl  ?? null,
      gpa: req.body.gpa,
      campusId: req.body.campusId ?? null
    };
    
    const student = await prisma.student.update({ where: {id: id }, data: updatedStudent });
    res.json(student);
  })
);

// DELETE student by id
router.delete("/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const existingStudent = await prisma.student.findUnique({ where: { id: id } });
    if (!existingStudent) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    await prisma.student.delete({ where: { id } });
    res.status(204).end(); // successful delete
  })
);

export default router;