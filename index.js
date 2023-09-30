require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const {connection} = require('./src/db')

// Routes
const productsRoutes = require('./routers/products')
const categoriesRoutes = require('./routers/categories')
// const userRoutes = require('./routers/users')
const userRoutes = require('./routers/users')

const app = express()
// Middlewares
app.use(cors())
app.options('*' ,cors())
app.use(express.json())
app.use(morgan('tiny'))

// Routes
const api = process.env.API_URL
app.use(`${api}/products` , productsRoutes)
app.use(`${api}/categories` , categoriesRoutes)
app.use(`${api}/users` , userRoutes)

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
