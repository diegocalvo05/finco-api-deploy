const Card = require("../models/Card.model");

const controller = {};

controller.add = async (req, res, next) => {

  try {
    const { alias, bank, pay_day, expiration, amount, color } = req.body;
    const { _id: userId } = req.user;

    var card = Card.findOne({ alias: alias });

    if (!card) {
      return res.status(404).json({ Error: "Card already exists" })
    }

    card = new Card({
      alias: alias,
      bank: bank,
      pay_day: pay_day,
      expiration: expiration,
      amount: amount,
      user: userId
    });




    const cardSaved = await card.save();
    if (!cardSaved) {
      return res.status(409).json({ error: "Error adding card" });
    }
    return res.status(201).json({ cardSaved })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.findByBank = async (req, res, next) => {
  try {
    const { bank } = req.body;
    const { _id: userId } = req.user;

    const cards = await Card.find({ user: userId, bank: bank }).populate("user", "username email _id");

    if (!cards) {
      return res.status(404).json({ Error: "Cards not found" })
    }

    return res.status(200).json({ cards })

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const cards = await Card.find({ user: userId })
      .populate("user", "username email _id");
    return res.status(200).json({ cards })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.deleteByAlias = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { _id: userId } = req.user;
    const card = await Card.findOneAndDelete({ alias: identifier, user: userId });
    if (!card) {
      return res.status(404).json({ error: "Card not found" });

    }

    return res.status(200).json({ message: "Card deleted" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


controller.updatePayday = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { _id: userId } = req.user;
    const { pay_day } = req.body;

    const card = await Card.findOne({ alias: identifier, user: userId })

    if (!card) {
      return res.status(404).json({ Error: "Card not found" })
    }

    card["pay_day"] = pay_day;

    const updateCard = await card.save();

    if (!updateCard) {
      return res.status(409).json({ Error: "Error updating card" })
    }

    return res.status(200).json({ Message: "Card updated" })



  } catch (error) {
    next(error)
  }
}


controller.updateAlias = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { _id: userId } = req.user;
    const { alias } = req.body;

    const card = await Card.findOne({ alias: identifier, user: userId })

    if (!card) {
      return res.status(404).json({ Error: "Card not found" })
    }

    card["alias"] = alias;

    const updateCard = await card.save();

    if (!updateCard) {
      return res.status(409).json({ Error: "Error updating card" })
    }

    return res.status(200).json({ Message: "Card updated" })

  } catch (error) {

  }
}

controller.updateAmount = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { _id: userId } = req.user;
    const { amount } = req.body;

    const card = await Card.findOne({ alias: identifier, user: userId })

    if (!card) {
      return res.status(404).json({ Error: "Card not found" })
    }

    card["amount"] = amount;

    const updateCard = await card.save();

    if (!updateCard) {
      return res.status(409).json({ Error: "Error updating card" })
    }

    return res.status(200).json({ Message: "Card updated" })

  } catch (error) {

  }
}


controller.updateExpiration = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { _id: userId } = req.user;
    const { expiration } = req.body;

    const card = await Card.findOne({ alias: identifier, user: userId })

    if (!card) {
      return res.status(404).json({ Error: "Card not found" })
    }

    card["expiration"] = expiration;

    const updateCard = await card.save();

    if (!updateCard) {
      return res.status(409).json({ Error: "Error updating card" })
    }

    return res.status(200).json({ Message: "Card updated" })



  } catch (error) {
    next(error)
  }
}

module.exports = controller;
