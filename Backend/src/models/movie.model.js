const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    posterUrl: { type: String, required: true },
    backdropUrl: { type: String },
    description: { type: String, default: "Description not available" },
    movieId: { type: String, unique: true, required: true },
    releaseDate: { type: String },
    trailerUrl: { type: String },
    genre: { type: String },
    category: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;