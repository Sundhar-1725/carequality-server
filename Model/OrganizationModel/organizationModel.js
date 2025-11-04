// Model/OrganizationModel.js
const { Client, Pool } = require('pg');
const xml2js = require('xml2js');
class OrganizationModel {
    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'carequality',
            password: 'admin',
            port: 5432,
        });
        this.client.connect();
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'carequality',
            password: 'admin',
            port: 5432,
        });
        this.pool = pool;
    }

    async getAll() {
        const res = await this.client.query('SELECT * FROM "Organization_Data"');
        return res.rows;
    }

    async getById(id) {
        const res = await this.client.query('SELECT * FROM "Organization_Data" WHERE id = $1', [id]);
        return res.rows[0];
    }
    async create(data) {
        console.log("create in")

        try {
            // Store XML data directly without escaping for PostgreSQL
            const res = await this.client.query(
                'INSERT INTO "Organization_Data" (name, data) VALUES ($1, $2) RETURNING *',
                ["Organization Names" || 'Default Name', data]
            );
            return res;
        } catch (error) {
            console.error("Error inserting organization data:", error);
            throw error;
        }
    }
    
        
    async storeEntries(xmlData) {
        console.log("enter Entries")
        const parser = new xml2js.Parser({ explicitArray: true });
        const builder = new xml2js.Builder({ headless: true });

        const result = await parser.parseStringPromise(xmlData);

        // Access all <entry> elements
        const entries = result.Bundle.entry || [];
        console.log(`Found ${entries.length} entries`);

        for (const entry of entries) {
            // Convert each <entry> JS object → XML string
            const entryXml = builder.buildObject({ entry });

            // Save to PostgreSQL
            await this.pool.query('INSERT INTO "Organization_Data" (data) VALUES ($1) RETURNING *', [
                entryXml,
            ]);            
            console.log("Stored entry XML:\n", entryXml);
        }

        await this.pool.end();
    }

    async getXmlData(id) {
        try {
            const res = await this.client.query(
                'SELECT xml_data FROM "Organization_Data" WHERE id = $1',
                [id]
            );
            return res.rows[0]?.xml_data;
        } catch (error) {
            console.error("Error fetching XML data:", error);
            throw error;
        }
    }

    async getAllXmlData() {
        try {
            console.log("getAll in - ")
            const res = await this.client.query('SELECT * FROM "Organization_Data"');
            return res.rows;
        } catch (error) {
            console.error("Error model fetching all XML data:", error);
            throw error;
        }
    }
    // Add more methods as needed (create, update, delete)
}


module.exports = OrganizationModel;