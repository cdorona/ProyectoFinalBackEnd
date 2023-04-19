const mongoose= require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const collectionName = "product"

const collectionSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    price:{
        type:Number,
        require: true
    },
    thumbnail:{
        type:Array,
        require: true
    },
    code:{
        type:String,
        require: true,
        unique: true
    },
    stock:{
        type:Number,
        require: true
    },
    category:{
        type:String,
        require: true
    }
    
})

collectionSchema.plugin(mongoosePaginate)
const Products = mongoose.model(collectionName,collectionSchema)

module.exports = Products