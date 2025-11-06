const orgService = require('../../Service/organizationService/organizationService');
const { orgXmltojson } = require("../../Helper/OrgHelper")
exports.getOrganization = async (req, res) => {
  console.log('Entered Organization Controller');
  try {
    const response = await orgService.getOrganization();
    console.log('Organization data fetched successfully');
    const jsonData = orgXmltojson(response);
    // console.log('Organization data converted to JSON successfully', jsonData);

    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error controller fetching organization:-', error.message);
    res.status(500).json({ error: 'Error controller fetching organization data' });
  }
};

exports.getOrganizationFromDB = async (req, res) => {
  const id = req.params.id;
  console.log('Entered getOrganizationFromDB Controller with ID:', id);

  try {
    const xmlData = await orgService.getOrganizationFromDB(id);
    const jsonData = orgXmltojson(xmlData);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error fetching organization from DB:', error.message);
    res.status(500).json({ error: 'Error fetching organization from DB' });
  }
};

exports.getAllOrganizationsFromDB = async (req, res) => {
  console.log('Entered getAllOrganizationsFromDB Controller');

  try {
    const allXmlData = await orgService.getAllOrganizationsFromDB();
    const jsonData = allXmlData.map((data) => orgXmltojson(data.data));
    console.log("jsonData: ",jsonData, allXmlData);
    res.status(200).json(allXmlData);
  } catch (error) {
    console.error('Error Controller fetching all organizations from DB:', error.message);
    res.status(500).json({ error: 'Error fetching all organizations from DB' });
  }
};

exports.getOrganizationDataExternal = async (_req, res) => {
  console.log('Entered getOrganizationDataExternal Controller');
  try {
    // Fetch organizations from DB
    const response = await orgService.getAllOrganizationsFromDB();
    if (!response || response.length === 0) {
      return res.status(404).json({ error: 'No organizations found in database' });
    }

    // Fetch external data
    const result = await orgService.getOrganizationDataExternalService(response);

    return res.status(200).json({ result });

  } catch (error) {
    console.error('Controller Error fetching organization data from external API:', error);
    return res.status(500).json({ error: 'Error fetching organization data from external API' });
  }
};