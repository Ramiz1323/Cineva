const movieService = require("../services/tmdb.service");

const getTrending = async (req, res) => {
  try {
    const data = await movieService.fetchTrending();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch trending movies",
    });
  }
};

const getPopular = async (req, res) => {
  try {
    const data = await movieService.fetchPopular();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch popular movies",
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await movieService.fetchMovieDetails(req.params.id);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movie details",
    });
  }
};

const searchMovies = async (req, res) => {
  const query = req.query.q;

  const data = await movieService.searchMovies(query);

  res.json(data);
};

module.exports = {
  getTrending,
  getPopular,
  getMovie,
  searchMovies,
};
