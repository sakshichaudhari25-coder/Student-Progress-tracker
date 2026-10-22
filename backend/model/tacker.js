import mongoose from "mongoose";

const trackerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    completionPercentage:{
        type:Number,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    }
})

const Tracker=mongoose.model("Tracker",trackerSchema)
export default Tracker