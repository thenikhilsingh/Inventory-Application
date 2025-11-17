const { body, validationResult } = require("express-validator");

var validationGame = [
  body("title").notEmpty().withMessage("Name is required!").trim(),
  body("description").notEmpty().withMessage("Description is required!").trim(),
  body("releaseDate")
    .notEmpty()
    .withMessage("Release Date is required!")
    .isDate()
    .withMessage("enter a Date"),
  body("price")
    .notEmpty()
    .withMessage("Price is required!")
    .isNumeric()
    .withMessage("enter a valid number!"),
  body("genres").notEmpty().withMessage("Genres are required!"),
  body("developers").notEmpty().withMessage("Developers are required!"),
  body("coverImage")
    .notEmpty()
    .withMessage("Cover Image URL is required!")
    .isURL()
    .withMessage("Enter a valid URL!"),
];

module.exports = { validationResult, validationGame };
