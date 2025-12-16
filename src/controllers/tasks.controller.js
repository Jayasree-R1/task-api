const taskService = require("../services/tasks.service");

exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.create(req.body);
    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.findAll();
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.findById(req.params.id);
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updated = await taskService.update(req.params.id, req.body);
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await taskService.remove(req.params.id);
    return res.status(204).send(); // no content
  } catch (err) {
    next(err);
  }
};
