const express = require("express");
const router=express.Router();

const cardController = require("../controllers/card.controller");

const{authentication}= require("../middlewares/auth.middlewares");

const {createCardValidator,identifierCardValidator,updateAmountValidator,updateAliasValidator,updatePaydayValidator} = require("../validators/card.validator");

const validateFields = require("../validators/index.middleware");



router.post("/add",authentication,createCardValidator,validateFields,cardController.add);

router.get("/get",authentication,cardController.findAll);
router.get("/getByBank",authentication,cardController.findByBank)



router.delete("/delete/:identifier",authentication,identifierCardValidator,validateFields,cardController.deleteByAlias)

router.put("/update/payday/:identifier",authentication,identifierCardValidator,updatePaydayValidator,validateFields,cardController.updatePayday)

//router.put("/update/payday/:identifier",authentication,cardController.updatePayday)

router.put("/update/amount/:identifier",authentication,
    identifierCardValidator,updateAmountValidator,validateFields,cardController.updateAmount
)



router.put("/update/alias/:identifier",authentication,identifierCardValidator,updateAliasValidator,validateFields,cardController.updateAlias)

module.exports = router;