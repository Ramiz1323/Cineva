const express = require("express");
const {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovie,
  getMovieCast,
  getMovieImages,
  searchMovies
} = require("../controllers/movie.controller");

const movieRouter = express.Router();

movieRouter.get("/trending", getTrending);
movieRouter.get("/popular", getPopular);
movieRouter.get("/top-rated", getTopRated);
movieRouter.get("/upcoming", getUpcoming);
movieRouter.get("/search", searchMovies);
movieRouter.get("/:id", getMovie);
movieRouter.get("/:id/cast", getMovieCast);
movieRouter.get("/:id/images", getMovieImages);

module.exports = movieRouter;