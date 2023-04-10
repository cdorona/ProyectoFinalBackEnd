const mongoose= require("mongoose")

const collectionName = "message"

const collectionSchema = new mongoose.Schema({
    usuario:{
        type:String,
        require: true
    },
    message:{
        type:String,
        require: true
    } 
},{timestamps:true})

const Messages = mongoose.model(collectionName,collectionSchema)

module.exports = Messages