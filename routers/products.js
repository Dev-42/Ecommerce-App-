const express = require('express')
const router = express.Router()

const {ProductModel} = require('../Models/Products.model')

router.get(`/` , async(req,res) => {
    try{
        const productList = await ProductModel.find()
        res.status(201).send({productList})
    }catch(e){
        console.log(e)
        console.log("Data GET in problem")
        res.send({error : "err" , success : false})
    }
})

router.post(`/` , async(req,res) => {
    const {name,image,countInStock} = req.body
    try{
        const product = new ProductModel({
            name,
            image,
            countInStock
        })
        // Saving it in our MongoDB Atlas
        const item =  await product.save()
        res.status(201).send({item})
    }catch(e){
        console.log(e)
        console.log("Data POST failed")
        res.send({error : "err" , success : false})
    }
})

module.exports = {router}