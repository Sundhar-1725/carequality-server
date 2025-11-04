const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

const { Client } = require('pg')

const con = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'carequality',
  password: 'admin',
  port: 5432,
});

con.connect().then(() => {
  console.log("✅ Connected to PostgreSQL database");
}).catch(err => {
  console.error("❌ Connection to PostgreSQL database failed:", err);
});

// con.query("select * from Organization_Data", (err, res) => {
//   if (!err) {
//     console.log("✅ Query Result:", res.rows);
//   } else {
//     console.error("❌ Query Error:", err);
//   }
// })

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
