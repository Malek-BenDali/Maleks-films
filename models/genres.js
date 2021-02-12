const mongoose = require('mongoose')
const Joi = require('joi')

const genresModel = mongoose.model('Genres', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        lowercase : true,
    }
})
)

//validation
const validation = (genre) =>{
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema.validate(genre)
}

exports.genresModel = genresModel
exports.validation = validation