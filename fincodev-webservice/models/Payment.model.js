const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const paymentSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  saving_plan: {
    type: Schema.Types.ObjectId,
    ref: "Saving",
    required: true
  }
}, { timestamps: true });

module.exports = Mongoose.model("Payment", paymentSchema);