"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
// GET /api/tasks
router.get('/', taskController_1.getTasks);
// POST /api/tasks
router.post('/', taskController_1.createTask);
//  PATCH /api/tasks
router.patch('/:taskId/status', taskController_1.updateTaskStatus);
exports.default = router;
