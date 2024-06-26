const {body,param} = require("express-validator");

const validators = {};

validators.createExpenseValidator =[
    body("date")
        .notEmpty().withMessage("Date is required")
        .toDate(),
    body("amount")
        .notEmpty().withMessage("Amount is required")
        .isNumeric().withMessage("Amount must be a number")
        .isFloat({gt:0}).withMessage("Amount must be greater than 0"),
    body("reason")
        .notEmpty().withMessage("Reason is required")
        .isLength({ min: 4, max: 20 }).withMessage("Reason format incorrect"),
    body("card")
        .optional()

]

validators.getExpenseByDateValidator = [
    param("month").notEmpty().withMessage("Month is required")
]

validators.getExpenseByCardValidator = [
    param("identifier")
        .notEmpty().withMessage("Card is required")
]

validators.deleteExpenseValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier is required")
        
]

validators.updateAmountValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier is required")
        ,
    body("amount")
        .notEmpty().withMessage("Amount is required")
        .isNumeric().withMessage("Amount must be a number")
        .isFloat({gt:0}).withMessage("Amount must be greater than 0")
]

validators.updateReasonValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier is required")
        ,
    body("reason")
        .notEmpty().withMessage("Reason is required")
        .isLength({ min: 4, max: 20 }).withMessage("Reason format incorrect"),
]

module.exports = validators;

// date amount reason id