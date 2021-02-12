const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const {validate, User} = require('../models/User')

const Router = express.Router()

Router.post('/signup', async (request, response) => {
    const {error} = validate(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    try {
        let user = await User.findOne({ email : request.body.email })
        if (user) return response.status(400).send('User Already registred')
        
        const newUser = new User(_.pick(request.body, ['_id', 'name', 'email', 'password']))
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        await newUser.save()

        const token = newUser.generateAuthToken()
        return response.header('x-auth-token', token).send(_.pick(newUser, ['_id','name', 'email']))//trajaa name wel email mel user
    }
    catch(err){
        return response.status(400).send(err.message)
    }
})

module.exports = Router