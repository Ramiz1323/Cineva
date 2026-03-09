const userRouter = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { toggleFavorite, getFavorites, addToHistory, getHistory, toggleWatchlist, getWatchlist } = require("../controllers/user.controller");
const { getProfile, updateProfile } = require("../controllers/profile.controller");

// POST - /api/user/favorite
userRouter.post("/favorite", protect, toggleFavorite);

//GET - /api/user/favorite
userRouter.get("/favorites", protect, getFavorites);

// POST - /api/user/history
userRouter.post("/history", protect, addToHistory);

//GET - /api/user/history
userRouter.get("/history", protect, getHistory);

// POST - /api/user/watchlist
userRouter.post("/watchlist", protect, toggleWatchlist);

//GET - /api/user/watchlist
userRouter.get("/watchlist", protect, getWatchlist);

// GET - /api/user/profile
userRouter.get("/profile", protect, getProfile);

// PUT - /api/user/profile
userRouter.put("/profile", protect, updateProfile);

module.exports = userRouter;