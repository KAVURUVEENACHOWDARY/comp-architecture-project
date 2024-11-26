const express = require('express');
const router = express.Router();
const { simulateCache,compareCacheConfigurations,prepareSteps,analyzeCacheEfficiency,simulateCacheHierarchy } = require('../controllers/cacheControllers');

// Route to handle cache simulation
router.post('/simulate', simulateCache);
router.post('/compare', compareCacheConfigurations);
router.post('/prepare-steps', prepareSteps);

router.post("/analyze-efficiency",analyzeCacheEfficiency);

router.post("/multi-level",simulateCacheHierarchy)
module.exports = router;
