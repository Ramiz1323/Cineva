const express = require("express");
const {
  getTrendingTv,
  getPopularTv,
  getTopRatedTv,
} = require("../controllers/tv.controller");

const tvRouter = express.Router();

tvRouter.get("/trending", getTrendingTv);
tvRouter.get("/popular", getPopularTv);
tvRouter.get("/top-rated", getTopRatedTv);

module.exports = tvRouter;
