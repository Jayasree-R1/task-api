const express = require("express");
const controller = require("../controllers/ivr.controller");

const router = express.Router();

/**
 * POST /api/ivr
 * Simulates IVR calling your backend with an intent and input.
 */
router.post("/ivr", controller.handleIVR);

module.exports = router;
