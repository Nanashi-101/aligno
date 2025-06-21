import { Router } from "express";

import { createTask, deleteTask, getTasks, updateTaskStatus } from "../controllers/taskController";

const router = Router();

// GET /api/tasks
router.get('/', getTasks);

// POST /api/tasks
router.post('/', createTask);

//  PATCH /api/tasks
router.patch('/:taskId/status', updateTaskStatus);

router.delete('/:taskId', deleteTask);

export default router;