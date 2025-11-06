const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    website: {
      type: String,
      required: [true, "website is required"],
    },
    foundedYear: {
      type: Number,
      required: [true, "website is required"],
    },
    games: {
      type: String,
      required: [true, "games is required"],
    },
  },
  {
    timestamps: true,
  }
);
const model = mongoose.model("Developer", developerSchema);
module.exports = model;
