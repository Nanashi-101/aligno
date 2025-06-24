import { Router } from "express";

import { getUsers } from "../controllers/userController";

const router = Router();

// GET /api/tasks
router.get('/', getUsers);


export default router;