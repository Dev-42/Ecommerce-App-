require('dotenv').config();
const express = require('express')
const morgan = require('morgan')

const {connection} = require('./src/db')


const app = express()

app.use(express.json())
app.use(morgan('tiny'))


const api = process.env.API_URL

app.get(`${api}/products` , (req,res) => {
    const products = {
        id : 1,
        name : 'hair dryer',
        image : 'some url'
    }
    res.send({products})
})

app.post(`${api}/products` , (req,res) => {
    const newProduct = req.body
    res.send({newProduct})
})

app.listen(3000 , async() => {
    try{
        await connection
        console.log("Connected to DB succesfully")
    }catch(e){
        console.log(e)
        console.log("Connection to database failed")
    }
    console.log('Server started successfully in port 3000')
})
