const Saving = require("../models/Saving.model");

const controller = {};

controller.savePlan = async (req, res, next) => {
  try {
    const { title, goal_amount, goal_date, purpose, current_amount, group } = req.body;
    const { identifier } = req.params;
    const { user } = req;

    let saving = await Saving.findById(identifier);

    if(!saving) {
      saving = new Saving();
      saving["user_owner"] = user._id;
    } else {
      if(!saving["user_owner"].equals(user._id)) {
        return res.status(403).json({ error: "Only plan owner can edit the savings plan" });
      }
    }

    saving["title"] = title || saving["title"];
    saving["goal_amount"] = goal_amount || saving["goal_amount"];
    saving["goal_date"] = goal_date || saving["goal_date"]; //format ISO8601 YYYY-MM-DD
    saving["purpose"] = purpose || saving["purpose"];
    saving["current_amount"] = current_amount || saving["current_amount"];
    saving["group"] = group;

    const savedSaving = await saving.save();

    if(!savedSaving) {
      return res.status(409).json({ error: "Error creating savings plan" });
    }

    return res.status(201).json(savedSaving);
  } catch (error) {
    next(error);
  }
};

controller.getSavingInfo = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const savingPlan = await Saving.findById(identifier).populate("user_owner", "username").populate("group", "group_name");

    if(!savingPlan) return res.status(404).json("Saving plan not found");

    return res.status(201).json(savingPlan);
  } catch (error) {
    next(error);
  }
}

controller.getUserPlans = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const userPlans = await Saving.find({ user_owner: userId}).populate("user_owner", "username");

    if(!userPlans) {
      return res.status(404).json({ error: "Saving plans not found" });
    } 
    
    return res.status(201).json({ userPlans });
  } catch (error) {
    next(error);
  }
}

controller.getGroupSavingPlans = async (req, res, next) => {
  try {
    const { group_identifier } = req.params;

    const savingPlans = await Saving.find({ group: group_identifier }).populate("user_owner", "username").populate("group", "group_name");

    if(!savingPlans) {
      return res.status(404).json({ error: "no saving plans found for this group" });
    }

    return res.status(200).json({ savingPlans });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;