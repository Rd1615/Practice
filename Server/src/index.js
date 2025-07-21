const express = require("express");
const cors = require('cors');
require("dotenv").config();
const userRoutes = require("./routes/usersRoutes.js");
const dbPromise = require("./lib/db");
const userModule = require("./models/userModule.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Wait for DB, then create table, then start server
dbPromise.then(async (db) => {
  await userModule.createTable(); // Create table if not exists
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Database initialization failed:", err.message);
});
