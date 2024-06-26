const { body, param } = require("express-validator");

const validators = {};

validators.saveSavingValidator = [
  param("identifier")
    .optional()
    .isMongoId().withMessage("identifier must be a Mongo Id"),

  body("title")
    .notEmpty().withMessage("title is required")
    .isLength({ min: 4, max: 32 }).withMessage("title format incorrect"),

  body("goal_amount")
    .notEmpty().withMessage("goal_amount is required")
    .isNumeric().withMessage("goal_amount must be a number"),

  body("goal_date")
    .notEmpty().withMessage("goal_date is required")
    .isISO8601().withMessage("goal_date must be a valid date format") //format YYYY-MM-DD
    .toDate(),

  body("purpose")
    .notEmpty().withMessage("purpose is required")
    .isLength({ min: 5, max: 100 }).withMessage("purpose length is 5 chars min and 100 max"),

  body("current_amount")
    .optional()
    .isNumeric().withMessage("current_amount must be a number")
];

validators.idInParamsValidator = [
  param("identifier")
    .notEmpty().withMessage("id is required")
    .isMongoId().withMessage("id must be a Mongo Id")
];

validators.groupIdInParamsValidator = [
  param("group_identifier")
    .notEmpty().withMessage("group_identifier is required in params")
    .isMongoId().withMessage("group_identifier must be a Mongo Id")
];
module.exports = validators;