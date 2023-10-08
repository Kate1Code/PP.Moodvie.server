const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const knexConfig = require("../knexfile"); // Import your knex configuration
const bodyParser = require("body-parser"); // Import body-parser
const knex = require("knex");

// Use body-parser middleware to parse JSON requests
router.use(bodyParser.json());

// Create a Knex instance using the "development" configuration
const db = knex(knexConfig.development);

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the user's password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    // Insert the user into the database using the 'db' instance
    await db("users").insert({ name, email, passwordHash });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;