const Mongoose = require("mongoose");
const Schema = Mongoose.Schema; 

const savingSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  goal_amount: {
    type: Number,
    required: true
  },
  goal_date: {
    type: Date,
    required: true
  },
  purpose: {
    type: String,
    trim: true,
    required: true
  },
  current_amount: {
    type: Number,
    default: 0
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: false
  },
  user_owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {timestamps: true});

module.exports = Mongoose.model("Saving", savingSchema);