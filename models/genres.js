const mongoose = require('mongoose')
const Joi = require('joi')

const genresModel = mongoose.model('Genres', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50,
    }
})
)

//validation
const validation = (genre) =>{
    const schema = Joi.object({
        name : Joi.string().min(5).max(50).required()
    })
    return schema.validate(genre)
}

exports.genresModel = genresModel
exports.validation = validation