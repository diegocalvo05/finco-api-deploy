const Expense = require("../models/Expense.model");
const Card = require("../models/Card.model");

const controller = {};

controller.add = async (req, res, next) => {
  try {
    const { date, amount, reason, card } = req.body;
    const { user } = req;

    let expenseData = {
      date: date,
      amount: amount,
      reason: reason,
      user: user._id
    };

    if (card != null) {
      const _card = await Card.findOne({ alias: card });

      if (!_card) {
        return res.status(404).json({ Error: "Card not found" });
      }

      expenseData.card = _card._id;
    }

    const expense = new Expense(expenseData);
    const expenseSaved = await expense.save();

    if (!expenseSaved) {
      return res.status(409).json({ error: "Error adding expense" });
    }

    return res.status(201).json({ expenseSaved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



controller.findByDate = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { month} = req.params;
    const year =2024

    const expenses = await Expense.find({
      user: userId,
      $expr: {
        $and: [
          { $eq: [{ $month: '$date' }, parseInt(month)] },
          { $eq: [{ $year: '$date' }, parseInt(year)] }
        ]
      }
    }).populate("user", "username")
    .populate("card", "alias");;

    return res.status(200).json({ expenses })


  } catch (error) {
    next(error)
  }
}

controller.findByCard = async (req, res, next) => {
  try {

    const { identifier } = req.params;
    const { _id: userId } = req.user;


    const _card = await Card.findOne({ user: userId, alias: identifier });

    if (!_card) {
      return res.status(404).json({ Error: "Card not found" });
    }


    const expenses = await Expense.find({ user: userId, card: _card._id })
      .populate("user", "username")
      .populate("card", "alias");

    if (!expenses) {
      return res.status(404).json({ Error: "Error getting expenses" });
    }

    return res.status(200).json({ expenses })



  } catch (error) {
    next(error)
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const expenses = await Expense.find({ user: userId })
      .populate("user", "username _id")
      .populate("card", "alias _id ");
    return res.status(200).json({ expenses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" })
  }
}


controller.delete = async (req, res, netx) => {
  try {
    const { _id: userId } = req.user;
    const { identifier } = req.params;

    const deleteExpense = await Expense.findOneAndDelete({
      user: userId, _id: identifier

    })

    if (!deleteExpense) {
      return res.status(404).json({ Error: "Expense not found" })
    }

    return res.status(200).json({ Message: "Expense deleted" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}


controller.updateAmount = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { amount } = req.body;
    const { identifier } = req.params;

    const updateExpense = await Expense.findOne({
      user: userId, _id: identifier

    })

    if (!updateExpense) {
      return res.status(404).json({ Errror: updateExpense })
    }

    updateExpense["amount"] = amount;

    const _updateExpense = await updateExpense.save();

    if (!_updateExpense) {
      return res.status(404).json({ Error: "Error updating expense" })
    }

    return res.status(200).json({ Message: "Expense updated" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}

controller.updateReason = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { identifier } = req.params;
    const { reason } = req.body;

    const updateExpense = await Expense.findOne({
      user: userId,
      _id: identifier
    });

    updateExpense.reason = reason;

    await updateExpense.save()

    return res.status(200).json({ updateExpense })


  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};




module.exports = controller;