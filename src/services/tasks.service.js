const { createTask } = require("../models/task.model");

const tasks = []; // in-memory

const VALID_STATUSES = new Set(["pending", "in-progress", "completed"]);

function validateCreatePayload(body) {
  if (!body || typeof body.title !== "string" || body.title.trim() === "") {
    return "title is required and cannot be empty";
  }
  if (body.status && !VALID_STATUSES.has(body.status)) {
    return "status must be one of: pending, in-progress, completed";
  }
  return null;
}

function validateUpdatePayload(body) {
  if (!body || typeof body !== "object") return "request body is required";

  if ("title" in body) {
    if (typeof body.title !== "string" || body.title.trim() === "") {
      return "title cannot be empty";
    }
  }
  if ("status" in body) {
    if (!VALID_STATUSES.has(body.status)) {
      return "status must be one of: pending, in-progress, completed";
    }
  }
  return null;
}

async function create(body) {
  const err = validateCreatePayload(body);
  if (err) {
    const e = new Error(err);
    e.statusCode = 400;
    throw e;
  }

  const task = createTask(body);
  tasks.push(task);
  return task;
}

async function findAll() {
  return tasks;
}

async function findById(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    const e = new Error("Task not found");
    e.statusCode = 404;
    throw e;
  }
  return task;
}

async function update(id, body) {
  const err = validateUpdatePayload(body);
  if (err) {
    const e = new Error(err);
    e.statusCode = 400;
    throw e;
  }

  const task = await findById(id);

  if ("title" in body) task.title = body.title.trim();
  if ("description" in body) task.description = (body.description || "").trim();
  if ("status" in body) task.status = body.status;

  return task;
}

async function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const e = new Error("Task not found");
    e.statusCode = 404;
    throw e;
  }
  tasks.splice(index, 1);
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  VALID_STATUSES,
};
