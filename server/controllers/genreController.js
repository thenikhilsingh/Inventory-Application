const { body, validationResult } = require("express-validator");

var validationGenre = [
  body("name").notEmpty().withMessage("Name is requred!").trim(),
  body("description").notEmpty().withMessage("Description is requires!").trim(),
];

module.exports = { validationResult, validationGenre };
