const express = require('express');
const router = express.Router();
const organizationController = require('../../Controller/Organization/organizationControl');

// GET http://localhost:3000/api/fhir/Organization/getOrganization
router.get('/getOrganization', organizationController.getOrganization);

module.exports = router;
