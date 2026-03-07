const movieModel = require("../models/movie.model.js");
const userModel = require("../models/user.model.js");

const addMovie = async (req, res) => {
  try {
    const newMovie = await movieModel.create({
      ...req.body,
      addedBy: req.user.id,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding movie", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await movieModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting movie", error: error.message });
  }
};

module.exports = {
  addMovie,
  getAllUsers,
  deleteMovie,
};
