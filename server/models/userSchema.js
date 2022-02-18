const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId:{
        type:Number,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }   
},{timestamps:true})

module.exports = mongoose.model("userData",UserSchema)