const {OrderModel} = require('../Models/Order.model')
const {OrderItemQuantity} = require('../Models/OrderItem.model')

const express = require('express')
const router = express.Router()

router.get(`/`, async(req,res) => {
    try{
        const orderList = await OrderModel.find()

        if(!orderList){
            res.status(500).send({status : false , message : 'User has not placed any orders'})
        }
        res.send(orderList)
    }catch(e){
        console.log(e)
        res.status(500).send({status : false , message : "Cannot make the get request of all the orders"})
    }
})
router.post('/' , async(req,res) => {
    const orderItemIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItemQuantity({
            quantity : orderItem.quantity,
            product : orderItem.product
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    }))
    const orderItemsIdsResolved = await orderItemIds
    console.log(orderItemIds)

    try{
        const {orderItems,shippingAddress1,shippingAddress2,city,zip,country,phone,status,totalPrice,user} = req.body
        const order = new OrderModel({
            orderItems: orderItemIds,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            totalPrice,
            user
        })
        // const orderSave = await order.save()
        if(!orderSave){
            res.status(500).send({status : false , message : "Product cannot be created"})
        }
        res.status(201).send(orderSave)
    }catch(e){
        console.log(e)
        res.status(500).send({status : false , message : "Server failed to give the post request"})
    }
})

module.exports = router
