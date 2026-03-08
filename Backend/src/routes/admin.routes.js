const adminRouter = require('express').Router();
const { addMovie, getAllMovies, updateMovie, deleteMovie, getAllUsers, banUser, deleteUser } = require('../controllers/admin.controller.js');
const { protect } = require('../middlewares/auth.middleware.js');
const { adminOnly } = require('../middlewares/admin.middleware.js');

// Movie routes
adminRouter.get('/movies', protect, adminOnly, getAllMovies);
adminRouter.post('/movies', protect, adminOnly, addMovie);
adminRouter.put('/movies/:id', protect, adminOnly, updateMovie);
adminRouter.delete('/movies/:id', protect, adminOnly, deleteMovie);

// User routes
adminRouter.get('/users', protect, adminOnly, getAllUsers);
adminRouter.put('/users/:id/ban', protect, adminOnly, banUser);
adminRouter.delete('/users/:id', protect, adminOnly, deleteUser);

module.exports = adminRouter;