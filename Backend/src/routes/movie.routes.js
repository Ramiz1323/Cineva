const express = require("express");
const {getTrending,getPopular,getMovie, searchMovies} = require ("../controllers/movie.controller");

const movieRouter = express.Router();

//GET - /api/movie/trending
movieRouter.get("/trending", getTrending);

//GET - /api/movie/popular
movieRouter.get("/popular", getPopular);

//GET - /api/movie/search
movieRouter.get("/search", searchMovies);

//GET - /api/movie/:id
movieRouter.get("/:id", getMovie);

module.exports = movieRouter;