import { Router } from 'express';
import { prisma } from '../prisma-client'
import { asyncHandler } from '../middleware';

const router = Router();

// GET all campuses
router.get("/",
  asyncHandler(async (_req, res) => {
    const campuses = await prisma.campus.findMany();
    res.json(campuses);
  })
);

// GET campus by id
router.get("/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const campus = await prisma.campus.findUnique({ where: { id: id } });
    if (!campus) {
      res.status(404).json({ error: "Campus not found" });
      return;
    }
    res.json(campus);
  })
);

// POST - Add campus
router.post("/add",
  asyncHandler(async (req, res) => {
    const newCampus = {
      name: req.body.name,
      address: req.body.address,
      imageUrl: req.body.imageUrl ?? null,
      description: req.body.description,
    };
    const campus = await prisma.campus.create({ data: newCampus });
    res.status(201).json(campus);
  })
);

// PUT - Edit campus by id
router.put("/:id/edit",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const existingCampus = await prisma.campus.findUnique({ where: { id: id } });
    if (!existingCampus) {
      res.status(404).json({ error: "Campus not found" });
      return;
    }

    const updatedCampus = {
      name: req.body.name,
      address: req.body.address,
      imageUrl: req.body.imageUrl ?? null,
      description: req.body.description
    };
    
    const campus = await prisma.campus.update({ where: {id: id }, data: updatedCampus });
    res.json(campus);
  })
);

// DELETE campus by id
router.delete("/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const existingCampus = await prisma.campus.findUnique({ where: { id: id } });
    if (!existingCampus) {
      res.status(404).json({ error: "Campus not found" });
      return;
    }
    await prisma.campus.delete({ where: { id } });
    res.status(204).end(); // successful delete
  })
);

export default router;