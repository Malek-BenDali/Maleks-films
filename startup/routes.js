const customer = require('../routes/customer')
const movies = require('../routes/movies')
const user = require('../routes/user')
const auth = require('../routes/auth')
const genres = require('../routes/genres')
const express = require('express')

module.exports = (app)=> {
    app.use(express.json())
    app.use('/api/genres', genres )
    app.use('/api/customer', customer )
    app.use('/api/movies', movies)
    app.use('/api/user', user)
    app.use('/api/auth', auth)
}