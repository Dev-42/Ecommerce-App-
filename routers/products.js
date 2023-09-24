const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const {ProductModel} = require('../Models/Products.model')
const {CategoryModel} = require('../Models/Category.model')

router.get(`/` , async(req,res) => {
    try{
        const productList = await ProductModel.find().select('name description -_id')
        res.status(201).send({productList})
    }catch(e){
        console.log(e)
        console.log("Data GET in problem")
        res.send({error : "err" , success : false})
    }
})

router.get('/:id', async(req,res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(404).send("Invalid product ID")
    }

    try{
        const productByID = await ProductModel.findById(req.params.id).populate('category')
        if(productByID){
            res.status(200).send({productByID})
        }else{
            console.log('Data is not present in the DB')
            res.status(404).send({status : false , message : 'Data is not present in the DB'})
        }
    }catch(e){
        console.log(e)
        console.log("server down while getting ID")
        res.status(500).send({status : false , message : 'server down while getting ID'})
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

router.put('/:id' , async(req,res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(404).send("Invalid product ID")
    }

    const categoryUser = await CategoryModel.findById(req.body.category)
    if(!categoryUser){
        return res.status(400).send({status : false , message : 'Invalid Category'})
    }
    const {name,description,richDescription,image,brand,price,category,countInStock,rating,numReveiws,isFeatured} = req.body
    try{
        const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id,
            {
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
            },
            {new : true}
        )
        if(updateProduct){
            res.send({updateProduct})
        }else{
            res.send({status : false , message : 'Update cannot be done as ID cannot be found'})
        }
    }
    catch(e){
        console.log(e)
        console.log('Put request not succesfully hence server failed')
        res.send({status : false , message : 'Internal server error while doing the put request'})
    }
})

router.delete('/:id' , async(req,res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(404).send("Invalid product ID")
    }

    try{
        const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id)
        if(deleteProduct){
            res.status(200).send({success : 'true' , message : 'The category is deleted'})
        }
        else{
            res.status(404).send({success : 'false' , message : 'category not found'})
        }
    }catch(e){
        console.log(e)
        console.log("Delete request failed")
        res.status(400).send({status : false , error : err})
    }
})

// Let's generate statistics
// 1)Counting the number of documents in my products data

router.get('/get/count' , async(req,res) => {
    try{
        const productCount = await ProductModel.countDocuments()
        if(productCount){
            res.status(200).send({status : true , message : productCount})
        }else{
            res.status(500).send({status : true , message : 'There are no documents in the DB'})
        }
    }catch(e){
        console.log(e)
        console.log('Internal server error in counting documents')
        res.status(500).send({status : false , message : 'Internal server error in counting documents'})
    }
})

// 2) Featured API - Now let's gonna display the featured items on our homepage
router.get('/get/featured' , async(req,res) => {
    try{
        const featureProducts = await ProductModel.find({isFeatured : true})
        if(!featureProducts){
            res.status(500).send({status : true , message : 'There are no featured products in the DB'})
        }
        else{
            res.status(200).send({featureProducts})
        }
    }catch(e){
        console.log(e)
        console.log('Internal server error in featuring documents')
        res.status(500).send({status : false , message : 'Internal server error in featuring documents'})
    }
})

// 3 Featuring the products depending upon the user count

router.get('/get/featured/:count' , async(req,res) => {
    const count = req.params.count
    try{
        const countFeatured = await ProductModel.find({isFeatured: true}).limit(+count)
        if(countFeatured){
            res.status(200).send({countFeatured})
        }else{
            res.send({status : false , message : 'User did not provide featured product count'})
        }
    }catch(e){
        console.log(e)
        console.log("Error in calculating user count of featureing documents")
        res.status(500).send({status : false , message : 'Internal server error in featuring the count of documents'})
    }
})

module.exports = router