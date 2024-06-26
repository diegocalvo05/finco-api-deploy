const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const GroupSchema = new Schema({
  group_name:{
    type:String,
    trim:true,
    required:true
  },
  description:{
    type:String,
    trim:true
  },
  /* mount_saved:{
    type:Number,
    trim:true,
    required:true
  }, */
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: []
  }
},{timestamps:true})

module.exports = Mongoose.model("Group", GroupSchema);