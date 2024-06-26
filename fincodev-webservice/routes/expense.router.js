const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");
const {authentication}= require("../middlewares/auth.middlewares");
const {createExpenseValidator,getExpenseByCardValidator,getExpenseByDateValidator,deleteExpenseValidator,updateAmountValidator,updateReasonValidator} = require("../validators/expense.validator")
const validateFields = require("../validators/index.middleware");


router.post("/add",authentication,createExpenseValidator,validateFields,expenseController.add);



router.get("/get",authentication,expenseController.findAll);
router.get("/getByDate/:month",authentication,getExpenseByDateValidator,validateFields,expenseController.findByDate);
router.get("/getByCard/:identifier",authentication,getExpenseByCardValidator,validateFields,expenseController.findByCard);

router.delete("/delete/:identifier",authentication,deleteExpenseValidator,validateFields,expenseController.delete);

router.put("/update/amount/:identifier",authentication,updateAmountValidator,validateFields,expenseController.updateAmount);
router.put("/update/reason/:identifier",authentication,updateReasonValidator,validateFields,expenseController.updateReason);
module.exports=router;