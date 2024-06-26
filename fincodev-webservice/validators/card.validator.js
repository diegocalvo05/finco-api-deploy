const { body, param } = require("express-validator");

const validators = {};

validators.createCardValidator = [
  body("alias")
    .notEmpty().withMessage("Alias is required")
    .isLength({ min: 4, max: 12 }).withMessage("Alias format incorrect")
  ,
  body("bank")
    .notEmpty().withMessage("Bank is required")
    .isLength({ min: 4, max: 20 }).withMessage("Alias format incorrect")
    .matches(/^[^\d]*$/).withMessage("bank must not contain numbers"),
  body("pay_day")
    .notEmpty().withMessage("Pay day is required")
  ,
  body("expiration")
    .notEmpty().withMessage("Expiration is required")
  ,
  body("amount")
    .notEmpty().withMessage("Amount is required")
    .isNumeric().withMessage("Amount must be a number"),
]


validators.identifierCardValidator = [
  param("identifier")
    .notEmpty().withMessage("You must include the card alias")

]

validators.updateAmountValidator = [
  body("amount")
    .notEmpty().withMessage("Amount is required")
    .isNumeric().withMessage("Amount must be a number")
]

validators.updateAliasValidator = [
  body("alias")
    .notEmpty().withMessage("Alias is required")
    .isLength({ min: 4, max: 12 }).withMessage("Alias format incorrect")


]


validators.updatePaydayValidator = [
  body("pay_day")
    .notEmpty().withMessage("Pay day is required")

]

validators.updateExpirationValidator = [
  body("expiration")
    .notEmpty().withMessage("Expiration is required")

]


module.exports = validators;

//isMongoId isOptional