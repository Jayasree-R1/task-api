const taskService = require("../services/tasks.service");

// allowed intents (like "press 1", "press 2" options in IVR)
const VALID_INTENTS = new Set([
  "CREATE_TASK",
  "LIST_TASKS",
  "GET_TASK",
  "UPDATE_TASK_STATUS",
  "DELETE_TASK",
]);

exports.handleIVR = async (req, res, next) => {
  try {
    const { intent, input } = req.body || {};

    if (!intent || typeof intent !== "string") {
      return res.status(400).json({
        ivrResponse: "Missing intent. Please select a valid option.",
      });
    }

    if (!VALID_INTENTS.has(intent)) {
      return res.status(400).json({
        ivrResponse: "Invalid option selected. Please try again.",
      });
    }

    // Map IVR "intents" to the existing task service
    switch (intent) {
      case "CREATE_TASK": {
        // input: { title, description?, status? }
        const task = await taskService.create({
          title: input?.title,
          description: input?.description,
          status: input?.status,
        });

        return res.status(200).json({
          ivrResponse: `Task created successfully. Title: ${task.title}. Status: ${task.status}.`,
          data: { id: task.id },
        });
      }

      case "LIST_TASKS": {
        const tasks = await taskService.findAll();
        return res.status(200).json({
          ivrResponse: `You have ${tasks.length} task(s).`,
          data: tasks.map((t) => ({
            id: t.id,
            title: t.title,
            status: t.status,
          })),
        });
      }

      case "GET_TASK": {
        // input: { id }
        const id = input?.id;
        if (!id) {
          return res.status(400).json({ ivrResponse: "Missing task id." });
        }

        const task = await taskService.findById(id);
        return res.status(200).json({
          ivrResponse: `Task found. Title: ${task.title}. Status: ${task.status}.`,
          data: task,
        });
      }

      case "UPDATE_TASK_STATUS": {
        // input: { id, status }
        const id = input?.id;
        const status = input?.status;

        if (!id || !status) {
          return res.status(400).json({
            ivrResponse: "Missing task id or status.",
          });
        }

        const updated = await taskService.update(id, { status });
        return res.status(200).json({
          ivrResponse: `Task updated. New status: ${updated.status}.`,
          data: { id: updated.id, status: updated.status },
        });
      }

      case "DELETE_TASK": {
        // input: { id }
        const id = input?.id;
        if (!id) {
          return res.status(400).json({ ivrResponse: "Missing task id." });
        }

        await taskService.remove(id);
        return res.status(200).json({
          ivrResponse: "Task deleted successfully.",
          data: { id },
        });
      }

      default:
        // never happens due to validation above
        return res.status(400).json({ ivrResponse: "Invalid option." });
    }
  } catch (err) {
    next(err); // the existing error handler will return JSON with status codes
  }
};
