const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "Description not available",
    },
    tmdbId: {
      type: String,
      unique: true,
      required: true,
    }, 
    releaseDate: {
      type: String,
    },
    trailerUrl: {
      type: String,
    }, // tailor from yt maybeee
    genre: {
      type: String,
    },
    category: {
      type: String,
    }, // Trending, Popular....
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;