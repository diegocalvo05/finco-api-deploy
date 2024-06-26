//imports
const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validateFields = require("../validators/index.middleware");
const { registerValidator, grantRoleValidator } = require("../validators/auth.validators");
const { authentication, authorization } = require("../middlewares/auth.middlewares");
  const ROLES = require("../data/roles.constants.json");

router.get("/whoami", 
  authentication, 
  authController.whoami
);
 
router.post("/register",
  registerValidator,
  validateFields,
  authController.register
);

router.post("/login", 
  authController.login
);

router.patch("/grantRole",
  authentication,
  authorization(ROLES.ADMIN),
  grantRoleValidator,
  validateFields,
  authController.grantRole
);

router.patch("/revokeRole",
  authentication,
  authorization(ROLES.ADMIN),
  grantRoleValidator,
  validateFields,
  authController.revokeRole
);


module.exports = router;