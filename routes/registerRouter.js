const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const knex = require("knex");
const jwt = require("jsonwebtoken");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

db.raw('SELECT 1')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db('users').insert({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ name, email }, process.env.JWT_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    next(error); 
  }
});

module.exports = router;