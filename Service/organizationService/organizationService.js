const axios = require('axios');
const { BASE_URL } = require('../../config');
const xml2js = require('xml2js');
const OrganizationModel = require('../../Model/OrganizationModel/organizationModel');
const orgModel = new OrganizationModel();

const parser = new xml2js.Parser();
exports.getOrganization = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/fhir/Organization/?_format=xml&_apiKey=7XSRVkjqYAZSTzBVSHv9RjuCI1Sq40pP7Njc1fnN2zl2Scg7f4`);
        const result = await xml2js.parseStringPromise(response.data);
        // await orgModel.storeEntries(response.data);
        return result;
    } catch (error) {
        console.error('Error service fetching organization:', error.message);
        throw new Error('Error service fetching organization data');
    }
};

exports.getOrganizationFromDB = async (id) => {
    try {
        const xmlData = await orgModel.getXmlData(id);
        return xmlData;
    } catch (error) {
        console.error('Error fetching organization from DB:', error.message);
        throw new Error('Error fetching organization from DB');
    }
};
exports.getAllOrganizationsFromDB = async () => {
    try {
        const allXmlData = await orgModel.getAllXmlData();
        return allXmlData;
    } catch (error) {
        console.error('Error service fetching all organizations from DB:', error.message);
        throw new Error('Error service fetching all organizations from DB');
    }
};

exports.getOrganizationDataExternal = async (data) => {
    try {
        const response = await axios.get(`${BASE_URL}/fhir/Organization/?_format=xml&_apiKey=7XSRVkjqYAZSTzBVSHv9RjuCI1Sq40pP7Njc1fnN2zl2Scg7f4`);
        const parsedData = await xml2js.parseStringPromise(response.data);
        const res = orgHelper.updateExternalOrgData(data, parsedData);
        return { result: res };
    } catch (error) {
        console.error('Error fetching organization data from external API:', error.message);
        throw new Error('Error fetching organization data from external API');
    }
};