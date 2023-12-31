const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street : {
        type : String,
        required : true
    },
    apartment : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        default : ''
    },
    city : {
        type : String,
        default : ''
    },
    country : {
        type : String,
        default : ''
    }
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
userSchema.set('toJSON' , {
    virtuals : true
})

const UserModel = mongoose.model('User' , userSchema)

module.exports = {UserModel}