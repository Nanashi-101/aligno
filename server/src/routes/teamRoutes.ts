import { Router } from "express";

import { getTeams } from "../controllers/teamsController";

const router = Router();

// GET /api/tasks
router.get('/', getTeams);


export default router;