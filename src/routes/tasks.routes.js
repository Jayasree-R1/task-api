const express = require("express");
const controller = require("../controllers/tasks.controller");

const router = express.Router();

router.post("/tasks", controller.createTask);
router.get("/tasks", controller.getAllTasks);
router.get("/tasks/:id", controller.getTaskById);
router.put("/tasks/:id", controller.updateTask);
router.delete("/tasks/:id", controller.deleteTask);

module.exports = router;
