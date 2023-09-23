const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name : {type : String , required : true},
    image : {type : String , required : true},
    countInStock : {type : Number , required : true}
})

const ProductModel = mongoose.model('Product' , ProductSchema)

module.exports = {ProductModel}