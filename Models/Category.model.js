const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    icon : {
        type : String
    },
    color : {
        type : String
    }
})

// Setting the virtuals to set _id to id
categorySchema.virtual('id').get(function(){
    return this._id.toHexString()
})
categorySchema.set('toJSON' , {
    virtuals : true
})

const CategoryModel = mongoose.model('Category' , categorySchema)

module.exports = {CategoryModel}