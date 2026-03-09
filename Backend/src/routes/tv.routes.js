const express = require("express");
const {
  getTrendingTv,
  getPopularTv,
  getTopRatedTv,
  getTvTrailers,
  getTvGenres,
  discoverTvShows,
} = require("../controllers/tv.controller");

const tvRouter = express.Router();

tvRouter.get("/trending", getTrendingTv);
tvRouter.get("/popular", getPopularTv);
tvRouter.get("/top-rated", getTopRatedTv);
tvRouter.get("/genres", getTvGenres);
tvRouter.get("/discover", discoverTvShows);
tvRouter.get("/:id/trailers", getTvTrailers);

module.exports = tvRouter;
