const express = require('express')
const router = express.Router()

const {ProductModel} = require('../Models/Products.model')
const {CategoryModel} = require('../Models/Category.model')

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

    const categoryUser = await CategoryModel.findById(req.body.category)
    if(!categoryUser){
        return res.status(400).send({status : false , message : 'Invalid Category'})
    }

    const {name,description,richDescription,image,brand,price,category,countInStock,rating,numReveiws,isFeatured} = req.body
    try{
        const product = new ProductModel({
            name,
            description,
            richDescription,
            image,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReveiws,
            isFeatured
        })
        // Saving it in our MongoDB Atlas
        const item =  await product.save()
        if(item){
            res.status(201).send({item})
        }else{
            res.status(500).send({status : false , message : 'product cannot be created'})
        }
    }catch(e){
        console.log(e)
        console.log("Data POST failed")
        res.status(404).send({status : false , message : 'Internal server error Product cannot be created'})
    }
})

module.exports = router