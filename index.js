const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); // Add body-parser for JSON parsing
require('dotenv').config();

// Use CORS middleware to handle cross-origin requests
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's actual URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Add body-parser middleware for JSON parsing
app.use(bodyParser.json());

// Define a sample route (You can remove this if not needed)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Mount your movie routes
const movieRoutes = require('./routes/movieRoutes');
app.use('/movies', movieRoutes);

const registerRouter = require("./routes/userRegistrationRoutes");
app.use('/register', registerRouter);

// Start the Express server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});