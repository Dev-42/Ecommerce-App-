const mongoose  = require('mongoose')

const connection = mongoose.connect(process.env.MONGODB_SERVER)

module.exports = {connection}