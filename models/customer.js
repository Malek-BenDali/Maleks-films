const mongoose = require('mongoose')
const Joi = require('joi')

const customerModel = mongoose.model('Customer', new mongoose.Schema({
    isGold : {
        type : Boolean,
        default : false
    },
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    phone : {
        type : String,
        required : true,
        minlength : 6,
        maxlength : 50
    },
}))

//validation
const validation = value =>{
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone : Joi.string().min(3).required()
    })
    return schema.validate(value)
}

exports.customerModel = customerModel
exports.validation = validation