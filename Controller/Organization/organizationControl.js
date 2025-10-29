const orgService = require('../../Service/organizationService/organizationService');
const { orgXmltojson } = require("../../Helper/OrgHelper")
exports.getOrganization = async (req, res) => {
  console.log('✅ Entered Organization Controller');
  try {
    const response = await orgService.getOrganization();
    console.log('✅ Organization data fetched successfully');
    const jsonData = orgXmltojson(response);
    // console.log('✅ Organization data converted to JSON successfully', jsonData);

    res.status(200).json(jsonData);
  } catch (error) {
    console.error('❌ Error fetching organization:-', error.message);
    res.status(500).json({ error: 'Error fetching organization data' });
  }
}