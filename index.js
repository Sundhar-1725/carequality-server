const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("🔍 Environment check:");
const connectionString = process.env.DATABASE_URL;

console.log("🧩 Using connection string:", connectionString ? "found" : "❌ Missing");

const con = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
con.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Connection to PostgreSQL database failed:", err));

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const router = require("./Router/router");
app.use("/api/fhir", router);

app.get("/", (req, res) => res.send("CareQuality Server is running successfully!"));

app.listen(port, () => console.log(`✅ Server is running on port ${port}`));
