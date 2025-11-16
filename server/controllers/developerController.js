const { body, validationResult } = require("express-validator");

var validationDeveloper = [
  body("name").notEmpty().withMessage("Name should not be empty!").trim(),
  body("website")
    .notEmpty()
    .withMessage("Website should not be empty!")
    .isURL()
    .withMessage("enter a valid URL!"),
  body("foundedYear")
    .notEmpty()
    .withMessage("founded Year should not be empty!")
    .isNumeric()
    .withMessage("Enter a valid year!"),
  body("games").notEmpty().withMessage("Games should not be empty!").trim(),
];

module.exports = { validationResult, validationDeveloper };
