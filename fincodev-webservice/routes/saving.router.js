const express = require("express");
const router = express.Router();

const savingController = require("../controllers/saving.controller");
const validateFields = require("../validators/index.middleware");
const { idInParamsValidator, saveSavingValidator, groupIdInParamsValidator } = require("../validators/saving.validators");
const { authentication, authorization } = require("../middlewares/auth.middlewares");
const ROLES = require("../data/roles.constants.json");

router.post(["/", "/:identifier"],
  authentication,
  authorization(ROLES.USER),
  saveSavingValidator,
  validateFields,
  savingController.savePlan
);

router.get("/mySavingPlans", 
  authentication,
  authorization(ROLES.USER),
  savingController.getUserPlans
);

router.get("/:identifier", 
  authentication,
  authorization(ROLES.USER),
  idInParamsValidator,
  validateFields,
  savingController.getSavingInfo
);

router.get("/groupSavings/:group_identifier",
  authentication,
  authorization(ROLES.USER),
  groupIdInParamsValidator,
  validateFields,
  savingController.getGroupSavingPlans
);

module.exports = router;