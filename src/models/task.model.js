const { v4: uuidv4 } = require("uuid");

function createTask({ title, description, status }) {
  return {
    id: uuidv4(),
    title: title.trim(),
    description: description?.trim() || "",
    status: status || "pending",
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createTask };
