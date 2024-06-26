const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");
const validateFields = require("../validators/index.middleware");
const { makePaymentValidator, savingIdInParams, monthPaymentsValidator } = require("../validators/payment.validators");
const { authentication, authorization } = require("../middlewares/auth.middlewares");
const ROLES = require("../data/roles.constants.json");

router.get("/savingPayments/:saving_identifier",
  authentication,
  authorization(ROLES.USER),
  savingIdInParams,
  validateFields,
  paymentController.allSavingPlanPayments
);

router.get("/monthPayments/:saving_identifier",
  authentication,
  authorization(ROLES.USER),
  monthPaymentsValidator,
  validateFields,
  paymentController.findPaymentsByMonth
)

router.post(["/", "/:identifier"],
  authentication,
  authorization(ROLES.USER),
  makePaymentValidator,
  validateFields,
  paymentController.savePayment
);

module.exports = router;