const tvService = require("../services/tmdb.service");

const getTrendingTv = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await tvService.fetchTrendingTv(page);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trending TV shows" });
  }
};

const getPopularTv = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await tvService.fetchPopularTv(page);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular TV shows" });
  }
};

const getTopRatedTv = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await tvService.fetchTopRatedTv(page);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top rated TV shows" });
  }
};

module.exports = {
  getTrendingTv,
  getPopularTv,
  getTopRatedTv,
};
