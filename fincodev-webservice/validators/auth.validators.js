const { body } = require("express-validator");
const ROLES = require("../data/roles.constants.json");

const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/;
const possibleRoles = [ROLES.SYSADMIN, ROLES.USER];

const validators = {};

validators.registerValidator = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 4, max: 24 }).withMessage("Name format not accepted"),

  body("lastname")
    .notEmpty().withMessage("lastname is required")
    .isLength({ min: 4, max: 32 }).withMessage("lastname format not accepted"),

  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 4, max: 32 }).withMessage("Username format incorrect"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email format incorrect"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .matches(passwordRegexp).withMessage("Password format incorrect")
];


validators.grantRoleValidator = [
  body("username")
    .notEmpty().withMessage("Username is required"),

  body("role")
    .notEmpty().withMessage("Role is required")
    .toLowerCase()
    .isIn(possibleRoles).withMessage("Role not valid")
];

module.exports = validators;