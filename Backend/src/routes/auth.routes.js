const { signup, login, logout, authCheck } = require("../controllers/auth.controller");
const authRouter = require("express").Router();
const { protect } = require("../middlewares/auth.middleware");

//POST - /api/auth/signup
authRouter.post("/signup", signup);

//POST - /api/auth/login
authRouter.post("/login", login);

//POST - /api/auth/logout
authRouter.post("/logout", logout);

//GET - /api/auth/authCheck
authRouter.get("/authCheck", protect, authCheck);

module.exports = authRouter;