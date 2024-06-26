const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const CardSchema = new Schema({
    alias:{
        type:String,
        trim: true,
        required:true,
    },
    bank:{
        type:String,
        trim: true,
        required:true,
    },
    pay_day:{
        type:String,
        trim:true,
        
    },
    expiration:{
        type:String,
        trim:true,
        required:true
    },
    amount:{
        type:Number,
        required:true,
        precision:2
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
    

},{timestamps:true})


module.exports= Mongoose.model("Card",CardSchema)
