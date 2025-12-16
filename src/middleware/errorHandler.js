module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;

  return res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      statusCode: status,
    },
  });
};
