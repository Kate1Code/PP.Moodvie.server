const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const movieRoutes = require('./routes/movieRoutes');
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const profileRouter = require("./routes/profileRouter");

app.use('/movies', movieRoutes);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});