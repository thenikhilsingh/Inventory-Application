const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "releaseDate is required"],
    },
    genres: {
      type: String,
      required: [true, "genres is required"],
    },
    developers: {
      type: String,
      required: [true, "developers is required"],
    },
    coverImage: {
      type: String,
      required: [true, "coverImage is required"],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Game", gameSchema);
module.exports = model;
