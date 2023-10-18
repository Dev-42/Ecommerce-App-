const mongoose = require('mongoose')

const orderItemQuantity = mongoose.Schema({
    quantity : {
        type : Number,
        required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    }
})

const OrderItemQuantity = mongoose.model('OrderItem' , orderItemQuantity)
module.exports = {OrderItemQuantity}