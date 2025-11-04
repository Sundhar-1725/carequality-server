const express = require('express');
const router = express.Router();
const organizationController = require('../../Controller/Organization/organizationControl');

// GET http://localhost:3000/api/fhir/Organization/getOrganization
router.get('/getOrganization', organizationController.getOrganization);
// GET http://localhost:3000/api/fhir/Organization/getOrganizationFromDB/:id
router.get('/getOrganizationFromDB/:id', organizationController.getOrganizationFromDB);
// GET http://localhost:3000/api/fhir/Organization/getAllOrganizationsFromDB
router.get('/getAllOrganizationsFromDB', organizationController.getAllOrganizationsFromDB);

module.exports = router;
