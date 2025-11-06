const mongoose = require("mongoose");

const connectDB = (MONGODB_URI) => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
