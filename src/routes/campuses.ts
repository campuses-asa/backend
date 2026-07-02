import { Router } from 'express';

const router = Router();

let test_campuses = [
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

// GET all campuses
router.get("/", (_req, res) => {
  res.json(test_campuses);
});

// GET campus by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const campus = test_campuses.find((campus) => campus.id === id);
  if (!campus) {
    res.status(404).json({ error: "Campus not found" });
    return;
  }
  res.json(campus);
});

// PUT - Edit campus by id
router.put("/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const campus_idx = test_campuses.findIndex((campus) => campus.id === id);
  if (campus_idx === -1) {
    return res.status(404).json({ error: "Campus not found" });
  }
  const updatedCampus = {
    id,
    name: req.body.name,
    address: req.body.address,
    imageUrl: req.body.imageUrl, // set to undefined if not provided
    description: req.body.description
  };
  test_campuses[campus_idx] = updatedCampus;
  res.json(updatedCampus);
});

// DELETE student by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const original_campus_count = test_campuses.length;
  test_campuses = test_campuses.filter((campus) => campus.id !== id);
  if (test_campuses.length === original_campus_count) {
    return res.status(404).json({ error: "Campus not found" });
  }
  res.status(204).end(); // successful delete
});

export default router;