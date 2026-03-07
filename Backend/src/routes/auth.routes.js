const { signup, login, logout } = require("../controllers/auth.controller");
const authRouter = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");

//POST - /api/auth/signup
authRouter.post("/signup", signup);

//POST - /api/auth/login
authRouter.post("/login", login);

//POST - /api/auth/logout
authRouter.post("/logout", protect, logout);

module.exports = authRouter;