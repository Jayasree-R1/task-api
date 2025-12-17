const express = require("express");
const tasksRoutes = require("./routes/tasks.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.status(200).json({ ok: true }));

app.use("/api", tasksRoutes);
app.use("/api", require("./routes/ivr.routes"));

// error handler last
app.use(errorHandler);

module.exports = app;
