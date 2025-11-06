const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not set. Please define it in .env or the environment.");
  process.exit(1);
}

// Create the PostgreSQL client with the connection string
const client = new Client({
  connectionString,
  ssl: false  // Use SSL if your database requires it
});

client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => {
    console.error("❌ Connection to PostgreSQL database failed:", err);
    process.exit(1);
  });

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const router = require("./Router/router");
app.use("/api/fhir", router);

app.get("/", (req, res) => res.send("CareQuality Server is running successfully!"));

app.listen(port, () => console.log(`✅ Server is running on port ${port}`));
