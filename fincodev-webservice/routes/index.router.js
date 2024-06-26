const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const cardRouter = require("./card.router");
const expenseRouter = require("./expense.router");
const groupRouter = require("./group.router");
const savingRouter = require("./saving.router");
const paymentRouter = require("./payment.router");

// comes from /api/...
router.use("/auth", authRouter);
router.use("/card",cardRouter);
router.use("/expense",expenseRouter);
router.use("/group",groupRouter);
router.use("/saving", savingRouter);
router.use("/payment", paymentRouter);

module.exports = router;