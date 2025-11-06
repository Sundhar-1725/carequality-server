const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();

// ✅ Use Render’s port if available, otherwise 8000 for local
const port = process.env.PORT || 8000;

// ✅ Load .env file only in local environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// ✅ PostgreSQL connection
const con = new Client({
  connectionString: process.env.DATABASE_URL, // Render provides this automatically
  ssl: {
    rejectUnauthorized: false, // Required for Render Postgres
  },
});

con.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('❌ Connection to PostgreSQL database failed:', err);
  });

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// ✅ Routes
const router = require('./Router/router');
app.use('/api/fhir', router);

// ✅ Root route (optional)
app.get('/', (req, res) => {
  res.send('🚀 CareQuality Server is running successfully!');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
