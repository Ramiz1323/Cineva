const adminRouter = require('express').Router();
const { addMovie, getAllUsers, deleteMovie } = require('../controllers/admin.controller.js');
const { protect } = require('../middlewares/auth.middleware.js');
const { adminOnly } = require('../middlewares/admin.middleware.js');

//POST - /api/admin/add-movie
adminRouter.post('/add-movie', protect, adminOnly, addMovie);

//GET - /api/admin/users
adminRouter.get('/users', protect, adminOnly, getAllUsers);

//DELETE - /api/admin/movie/:id
adminRouter.delete('/movie/:id', protect, adminOnly, deleteMovie);

module.exports = adminRouter;