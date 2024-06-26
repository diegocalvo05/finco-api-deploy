const express = require("express");
const router = express.Router();

const groupController = require("../controllers/group.controller");
const validateFields = require("../validators/index.middleware");
const { createGroupValidator, idInParamsGroupValidator } = require("../validators/group.validators");
const { authentication, authorization } = require("../middlewares/auth.middlewares");
const ROLES = require("../data/roles.constants.json");

router.post(["/add", "/add/:identifier"],
  authentication,
  createGroupValidator,
  validateFields,
  groupController.save
);

router.post("/join/:identifier",
  authentication,
  idInParamsGroupValidator,
  validateFields,
  groupController.joinGroup
);

router.post("/exit/:identifier",
  authentication,
  idInParamsGroupValidator,
  validateFields,
  groupController.exitGroup
);

router.get("/myGroups",
  authentication,
  groupController.findMyGroups
);

router.get("/groupInfo/:identifier",
  authentication,
  idInParamsGroupValidator,
  validateFields,
  groupController.getOneGroup
);

module.exports = router;