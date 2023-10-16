const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token.replace("Bearer ", ""), process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const user = await db('users').where({ id: req.user.id }).first();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name, 
    };

    res.json(userData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
