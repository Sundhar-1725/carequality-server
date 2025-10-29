const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

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
