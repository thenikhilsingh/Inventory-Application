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
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Developer" }],
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
