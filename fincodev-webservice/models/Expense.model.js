const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ExpenseSchema = new Schema({
    date:{
        type:Date,
        trim:true,
        required:true
    },
    amount:{
        type:Number,
        trim:true,
        required:true,
        precision:2
        
    },
    reason:{
        type:String,
        trim:true,
        required:true
    },
    card:{
        type: Schema.Types.ObjectId,
        ref :"Card",
        
    },
    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }

},{timestamps:true})

module.exports = Mongoose.model("Expense",ExpenseSchema)