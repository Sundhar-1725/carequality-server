const axios = require('axios');
const { BASE_URL } = require('../../config');
const xml2js = require('xml2js');

exports.getOrganization = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/fhir/Organization/?_format=xml&_apiKey=7XSRVkjqYAZSTzBVSHv9RjuCI1Sq40pP7Njc1fnN2zl2Scg7f4`);
        const result = await xml2js.parseStringPromise(response.data);
        return result;
    } catch (error) {
        console.error('❌ Error fetching organization:', error.message);
        throw new Error('Error fetching organization data');
    }   
}