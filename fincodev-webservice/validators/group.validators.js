const { body, param } = require("express-validator");

const validators = {};

validators.createGroupValidator = [
  body("group_name")
    .notEmpty().withMessage("group_name is required")
    .isLength({ min: 4, max: 32 }).withMessage("group_name format not accepted"),

  body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10, max: 128 }).withMessage("Description is 10 chars min and 128 max"),

  /* body("mount_saved")
    .notEmpty().withMessage("mount_saved is required")
    .isNumeric().withMessage("mount_saved must be a number"), */
]

validators.idInParamsGroupValidator = [
  param("identifier")
    .notEmpty().withMessage("group id is required in params")
    .isMongoId().withMessage("group id must be a Mongo Id")
]


module.exports = validators;