const movieService = require("../services/tmdb.service");
const Movie = require("../models/movie.model");

const getTrending = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await movieService.fetchTrending(page);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trending movies" });
  }
};

const getPopular = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await movieService.fetchPopular(page);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular movies" });
  }
};

const getTopRated = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await movieService.fetchTopRatedMovies(page);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top rated movies" });
  }
};

const getUpcoming = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await movieService.fetchUpcomingMovies(page);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch upcoming movies" });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await movieService.fetchMovieDetails(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    // TMDB didn't find it — try admin-added movies
    try {
      const adminMovie = await Movie.findOne({ movieId: req.params.id });
      if (!adminMovie) return res.status(404).json({ message: "Movie not found" });
      // shape it like a TMDB response so the frontend works with the same fields
      return res.status(200).json({
        id: adminMovie.movieId,
        title: adminMovie.title,
        overview: adminMovie.description,
        poster_path: null,
        backdrop_path: null,
        release_date: adminMovie.releaseDate,
        vote_average: null,
        original_language: null,
        genres: [{ name: adminMovie.genre }],
        posterUrl: adminMovie.posterUrl,
        backdropUrl: adminMovie.backdropUrl || null,
        trailerUrl: adminMovie.trailerUrl,
        isAdminMovie: true,
      });
    } catch (innerErr) {
      res.status(500).json({ message: "Failed to fetch movie details" });
    }
  }
};

const searchMovies = async (req, res) => {
  try {
    const query = req.query.q;
    const page = req.query.page || 1;

    // fetch from TMDB and admin DB at the same time
    const [tmdbData, adminMovies] = await Promise.all([
      movieService.searchMovies(query, page),
      Movie.find({ title: { $regex: query, $options: "i" } }).limit(10),
    ]);

    // transform admin movies into TMDB-compatible shape
    const adminResults = adminMovies.map((m) => ({
      id: m.movieId,
      title: m.title,
      overview: m.description,
      poster_path: null,
      posterUrl: m.posterUrl,
      backdropUrl: m.backdropUrl || null,
      trailerUrl: m.trailerUrl,
      release_date: m.releaseDate,
      isAdminMovie: true,
    }));

    // merge admin results in front of TMDB results
    const merged = [...adminResults, ...(tmdbData.results || [])];

    res.json({ ...tmdbData, results: merged });
  } catch (error) {
    res.status(500).json({ message: "Failed to search movies" });
  }
};

const getMovieCast = async (req, res) => {
  // fetch actors for the movie
  try {
    const cast = await movieService.fetchMovieCast(req.params.id);
    res.status(200).json(cast);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cast" });
  }
};

const getMovieImages = async (req, res) => {
  // fetch images for the movie
  try {
    const images = await movieService.fetchMovieImages(req.params.id);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovie,
  getMovieCast,
  getMovieImages,
  searchMovies,
};
