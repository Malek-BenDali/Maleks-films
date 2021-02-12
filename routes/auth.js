const express = require('express')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const { User } = require('../models/User')
const Router = express.Router()

Router.post('/login', async (request, response) => {
    const {error} = validate(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    try {
        const user = await User.findOne({ email : request.body.email })
        if (!user) return response.status(400).send('Invalid E-mail or password')
        
        const validPassword = await bcrypt.compare(request.body.password, user.password)
        if (!validPassword) return response.status(400).send('Invalid E-mail or password')
        
        const token = user.generateAuthToken( )

        return response.send(token)//trajaa name wel email mel user
    }
    catch(err){
        return response.status(400).send(err.message)
    }
})


const validate = (user) => {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required()
    })
    return schema.validate(user)
}

module.exports = Router