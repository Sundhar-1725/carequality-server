const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

const { Client } = require('pg')

// const con = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'carequality',
//   password: 'admin',
//   port: 5432,
// });

const con = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Render requires SSL
  },
  connectionString: process.env.DATABASE_URL,
});

con.connect().then(() => {
  console.log("✅ Connected to PostgreSQL database");
}).catch(err => {
  console.error("❌ Connection to PostgreSQL database failed:", err);
});

const router = require('./Router/router');

app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Base path
app.use('/api/fhir', router);

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
