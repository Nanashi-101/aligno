import { Router } from "express";

import { createProject, getProjects } from "../controllers/projectController";

const router = Router();

// GET /api/projects
router.get('/', getProjects);

// POST /api/projects
router.post('/', createProject);

export default router;