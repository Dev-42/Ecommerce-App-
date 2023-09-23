require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const {connection} = require('./src/db')
const {router} = require('./routers/products')

const app = express()
// Middlewares
app.use(cors())
app.options('*' ,cors())
app.use(express.json())
app.use(morgan('tiny'))

// Routes
const api = process.env.API_URL
app.use(`${api}/products` , router)

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
