const joi = require('joi')
const mongoose = require ('mongoose')

const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        lowercase : true,
    }
})

const moviesModel = mongoose.model('movies', new mongoose.Schema({
    title : {
        type : String,
        minlength : 3,
        maxlength : 50,
        required : true
    },
    genres : [genreSchema],
    numberInStcok : Number,
    DailyRenTalRate : Number
}))

const validate = movie => {
    const schema = joi.object({
        title : joi.string().min(3).max(50).required(),
        numberInStcok : joi.number().positive(),
        DailyRenTalRate : joi.number().positive()
    })
    return schema.validate(movie)
}

exports.Movies = moviesModel
exports.validate = validate