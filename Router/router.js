const express = require('express');
const router = express.Router();

const organizationRoute = require('./Organization/organizationRoutes');

// This means: /api/fhir/Organization/*
router.use('/Organization', organizationRoute);

module.exports = router;
