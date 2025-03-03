const express = require('express');
const aiController = require("../controllers/ai.controller");

const router = express.Router();

// Define the route without "/api" here, because it's already handled in app.js
router.post("/review", aiController.getReview);

module.exports = router;
