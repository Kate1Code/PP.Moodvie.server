const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const knex = require("../knexfile");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Retrieve the user from the database by email
  const user = await knex("users").where({ email }).first();

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, JWT_KEY, {
    expiresIn: "1h", // Token expiration time
  });

  res.status(200).json({ token });
});

module.exports = router;