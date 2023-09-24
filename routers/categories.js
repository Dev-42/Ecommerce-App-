const {CategoryModel} = require('../Models/Category.model')

const express = require('express')
const router = express.Router()

router.get('/' , async(req,res) => {
    try{
        const userFind = await CategoryModel.find()
        if(userFind){
            res.send({userFind})
        }else{
            res.status(500).send({success : false , message : 'User not found'})
        }
    }catch(e){
        console.log(e)
        console.log('Get request failed')
        res.send({status : false , message : 'Server failed to give Users in the get request'})
    }
})

// Getting user with a particular ID

router.get('/:id' , async(req,res) => {
    try{
        const userIdFind = await CategoryModel.findById(req.params.id)
        if(userIdFind){
            res.send({userIdFind})
        }else{
            res.status(500).send({status : false , message : 'The category with the given ID was not found'})
        }
    }catch(e){
        console.log(e)
        console.log("Get request with a particular id failed")
        res.send({status : false , message : 'Server failed to give the get request with a particular ID'})
    }
})


router.post('/' , async(req,res) => {
    const {name,icon,color} = req.body
    try{
        const category = new CategoryModel({
            name,
            icon,
            color
        })
        // Saving it in my database
        const itemCategory = await category.save()
        res.send({itemCategory})
    }catch(e){
        console.log(e)
        console.log("Categories data not POST")
        res.status(500).send({status : 'error' , message : 'POST request cannot be done'})
    }

})
router.delete('/:id' , async(req,res) => {
    try{
        const catDelete = await CategoryModel.findByIdAndDelete(req.params.id)
        if(catDelete){
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

module.exports = router