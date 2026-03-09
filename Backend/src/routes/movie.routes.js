const express = require("express");
const {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovie,
  getMovieCast,
  getMovieImages,
  getMovieTrailers,
  searchMovies,
  getMovieGenres,
  discoverMovies,
} = require("../controllers/movie.controller");
const { cacheData } = require("../middlewares/redis.middleware");

const movieRouter = express.Router();

movieRouter.get("/trending", cacheData("movie:trending"), getTrending);
movieRouter.get("/popular", cacheData("movie:popular"), getPopular);
movieRouter.get("/top-rated", cacheData("movie:top-rated"), getTopRated);
movieRouter.get("/upcoming", cacheData("movie:upcoming"), getUpcoming);
movieRouter.get("/genres", cacheData("movie:genres"), getMovieGenres);
movieRouter.get("/discover", cacheData("movie:discover"), discoverMovies);
movieRouter.get("/search", cacheData("movie:search"), searchMovies);
movieRouter.get("/:id", getMovie);
movieRouter.get("/:id/cast", getMovieCast);
movieRouter.get("/:id/images", getMovieImages);
movieRouter.get("/:id/trailers", getMovieTrailers);

module.exports = movieRouter;