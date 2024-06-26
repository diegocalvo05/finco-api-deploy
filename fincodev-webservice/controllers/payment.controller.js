const Payment = require("../models/Payment.model");
const Saving = require("../models/Saving.model");
const debug = require("debug")("app:payment-controller");

const controller = {}

controller.savePayment = async (req, res, next) => {
  try {
    const { amount, saving_plan } = req.body;
    const { user } = req;
    const { identifier } = req.params;

    let payment = await Payment.findById(identifier);

    if(!payment) {
      payment = new Payment();
      payment["user"] = user._id;
    } else {
      if(!payment["user"].equals(user._id)) 
        return res.status(403).json({ error: "Only payment owner can edit it" }); 
    }

    payment["amount"] = amount;
    payment["saving_plan"] = saving_plan;

    // updating info in savingplan
    const savingPlan = await Saving.findById(saving_plan);

    if(!savingPlan) return res.status(409).json({ error: "saving plan not found" });

    let _currentAmount = Number(savingPlan["current_amount"]) + Number(amount);

    savingPlan["current_amount"] = _currentAmount;

    const savedPlan = await savingPlan.save();

    if(!savedPlan) return res.status(409).json({ error: "error saving info in saving plan" });

    //saving payment info
    const savedPayment = await payment.save();

    if(!savedPayment) return res.status(409).json({ error: "error creating payment" });

  
    return res.status(200).json({ payment: savedPayment, saving_plan: savedPlan });
  } catch (error) {
    next(error);
  }
}

controller.allSavingPlanPayments = async (req, res, next) => {
  try {
    const { saving_identifier } = req.params;

    //debug("passed here");

    const payments = await Payment.find({ saving_plan: saving_identifier }).populate("user", "username").populate("saving_plan", "title");

    if(!payments) return res.status(404).json({ error: "no payments found" })

    return res.status(200).json({ payments });
  } catch (error) {
    next(error);
  }
}

controller.findPaymentsByMonth = async (req, res, next) => {
  try {
    const { month } = req.body;
    const { saving_identifier } = req.params;

    const payments = await Payment.find({ saving_plan: saving_identifier }).populate("user", "username").populate("saving_plan", "title");

    const monthPayments = (payments.map(_p => {
      const p_month = (new Date(_p["createdAt"].toString())).getMonth();
      const isInMonth = p_month === (month - 1);

      if(isInMonth) return _p;

      return null;
    })).filter(_i => _i !== null);

    if(monthPayments.length === 0) return res.status(404).json({ error: "no payments to show" });

    return res.status(200).json({ monthPayments });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;