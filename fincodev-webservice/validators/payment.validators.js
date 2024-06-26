const { body, param } = require("express-validator");

const validators = {};

validators.makePaymentValidator = [
  param("identifier")
    .optional()
    .isMongoId().withMessage("identifier must be a MongoId"),

  body("amount")
    .notEmpty().withMessage("amount is required")
    .isNumeric().withMessage("amount must be a number"),

  body("saving_plan")
    .notEmpty().withMessage("saving_plan is required")
    .isMongoId().withMessage("saving_plan must be a MongoId")
]

validators.savingIdInParams = [
  param("saving_identifier")
    .notEmpty().withMessage("saving_identifier is required in params")
    .isMongoId().withMessage("saving_identifier must be a MongoId")
]

validators.monthPaymentsValidator = [
  param("saving_identifier")
    .notEmpty().withMessage("saving_identifier is required in params")
    .isMongoId().withMessage("saving_identifier must be a MongoId"),

  body("month")
    .notEmpty().withMessage("month is required")
    .isInt().withMessage("month must be an int between 1 and 12")
]

module.exports = validators;