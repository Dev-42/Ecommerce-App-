const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')

const {UserModel} = require('../Models/User.model')

router.get('/' , async(req,res) => {
    try{
        const user = await UserModel.find().select('-password')
        if(!user){
            res.status(500).send({status : false , message : 'User is not present in the list'})
        }else{
            res.send({user})
        }
    }catch(e){
        console.log(e)
        console.log('Error in get request from the server')
        res.status(404).send({status : false , message : 'Error in get request from the server'})
    }
})

router.get('/:id' , async(req,res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(404).send("Invalid product ID")
    }
    try{
        const userFind = await UserModel.findById(req.params.id)
        if(!userFind){
            res.status(500).send({status : false , message : 'User with the given id is not present in the list'})
        }else{
            res.status(201).send({userFind})
        }
    }catch(e){
        console.log(e)
        console.log("Get request failed while getting the id")
        res.status(404).send({status : false , message : 'Get request failed while getting the id'})
    }
})

router.post('/register' , async(req,res) => {
    const {name,email,password,phone,isAdmin,street , apartment , zip , country} = req.body

    try{
        const user = new UserModel({
            name,
            email,
            password : bcrypt.hashSync(req.body.password , 10),
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            country
        })
        const userSave = await user.save()
        if(userSave){
            return res.status(200).send({userSave})
        }else{
            return res.status(500).send({status : false , message : 'User cannot be created'})
        }
    }catch(e){
        console.log(e)
        console.log("Data POST failed")
        res.status(404).send({status : false , message : 'Internal server error User cannot be created'})
    }
})

router.post('/login' , async(req,res) => {
    const {email,password} = req.body
    try{
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).send({status : false , message : 'User not found.Please do register frist'})
        }
        if(user && bcrypt.compareSync(req.body.password,user.password)){
            // User is succesfully logged in now let give him some token
            const token = jwt.sign(
                {
                    userId : user.id,
                    name : user.name
                },
                process.env.SECRET_KEY,
                {expiresIn : '1d'}
            )

            return res.status(200).send({user : user.email , token : token})
        }else{
            return res.status(404).send({status : false , message : 'Please provide a correct password'})
        }

    }catch(e){
        console.log(e)
    }
})

module.exports = router
