const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const User = mongoose.model('Users', new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        maxlength : 1048
    },
}))



const validate = (user) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(255),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required()
    })
    return schema.validate(user)
}

exports.validate = validate
exports.User = User