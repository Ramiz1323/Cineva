const express = require("express");
const {
  getTrendingTv,
  getPopularTv,
  getTopRatedTv,
  getTvTrailers,
  getTvGenres,
  discoverTvShows,
} = require("../controllers/tv.controller");
const { cacheData } = require("../middlewares/redis.middleware");

const tvRouter = express.Router();

tvRouter.get("/trending", cacheData("tv:trending"), getTrendingTv);
tvRouter.get("/popular", cacheData("tv:popular"), getPopularTv);
tvRouter.get("/top-rated", cacheData("tv:top-rated"), getTopRatedTv);
tvRouter.get("/genres", cacheData("tv:genres"), getTvGenres);
tvRouter.get("/discover", cacheData("tv:discover"), discoverTvShows);
tvRouter.get("/:id/trailers", getTvTrailers);

module.exports = tvRouter;
