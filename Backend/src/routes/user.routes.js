const userRouter = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { toggleFavorite, getFavorites, addToHistory } = require("../controllers/user.controller");

// POST - /api/user/favorite
userRouter.post("/favorite", protect, toggleFavorite);

//GET - /api/user/favorite
userRouter.get("/favorites", protect, getFavorites);

// POST /api/user/history
userRouter.post("/history", protect, addToHistory);

module.exports = userRouter;