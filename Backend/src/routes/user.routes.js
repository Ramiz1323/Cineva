const userRouter = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { toggleFavorite, getFavorites, addToHistory, getHistory } = require("../controllers/user.controller");

// POST - /api/user/favorite
userRouter.post("/favorite", protect, toggleFavorite);

//GET - /api/user/favorite
userRouter.get("/favorites", protect, getFavorites);

// POST - /api/user/history
userRouter.post("/history", protect, addToHistory);

//GET - /api/user/history
userRouter.get("/history", protect, getHistory);

module.exports = userRouter;