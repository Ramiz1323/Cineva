const userRouter = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");
const { toggleFavorite, addToHistory } = require("../controllers/user.controller");

// POST /api/user/favorite
userRouter.post("/favorite", protect, toggleFavorite);

// POST /api/user/history
userRouter.post("/history", protect, addToHistory);

module.exports = userRouter;