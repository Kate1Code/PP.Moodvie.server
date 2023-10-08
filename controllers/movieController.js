const knex = require('knex')(require('../knexfile').development);
const fetch = require('node-fetch');

const saveUserMovieAction = async (req, res) => {
  try {
    const { userId, movieId, action } = req.body;

    // Check if the action is 'yes' or 'maybe'
    if (action !== 'yes' && action !== 'maybe') {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Fetch the movie title based on the provided movieId
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
    );
    const movieData = await response.json();
    const movieTitle = movieData.title;

    // Save the user's action along with the movie title in your database
    const insertedRow = await knex('user_movie_relationships').insert({
      user_id: userId,
      action,
      movie_title: movieTitle,
    });

    // Respond with a success message
    res.json({ message: 'Movie action saved successfully' });
  } catch (error) {
    console.error('Error saving movie action: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  saveUserMovieAction,
};