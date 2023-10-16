const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const { userId, movie_title, action } = req.body;

    if (action !== 'yes' && action !== 'maybe') {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch movie data. Status: ${response.status}`);
    }

    const movieData = response.data;
    const movieTitle = movieData.title;

    const insertedRow = await knex('user_movie_relationships').insert({
      user_id: userId,
      action,
      movie_id: movieId, 
      movie_title: movieTitle,
    });

    res.json({ message: 'Movie action saved successfully' });
  } catch (error) {
    console.error('Error saving movie action: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
