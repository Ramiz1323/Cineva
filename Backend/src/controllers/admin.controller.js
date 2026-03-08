const Movie = require('../models/movie.model');
const User = require('../models/user.model');

// --- MOVIE MANAGEMENT ---

const addMovie = async (req, res) => {
  try {
    const { title, description, movieId, posterUrl, trailerUrl, releaseDate, genre, category } = req.body;

    const existing = await Movie.findOne({ movieId });
    if (existing) return res.status(400).json({ message: 'Movie ID already exists' });

    const movie = await Movie.create({
      title, description, movieId, posterUrl, trailerUrl, releaseDate, genre, category,
      addedBy: req.user.id,
    });

    res.status(201).json({ message: 'Movie added', movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie', error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie updated', movie });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie', error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete movie', error: error.message });
  }
};

// --- USER MANAGEMENT ---

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBanned = !user.isBanned;
    await user.save();

    res.status(200).json({ message: user.isBanned ? 'User banned' : 'User unbanned', isBanned: user.isBanned });
  } catch (error) {
    res.status(500).json({ message: 'Failed to ban user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

module.exports = { addMovie, getAllMovies, updateMovie, deleteMovie, getAllUsers, banUser, deleteUser };
