const express = require('express')
const {Movies, validate} = require('../models/movies')

const Router = express.Router()

//get all movies
Router.get('/', async (request, response)=> {
    try{
        const movies = await Movies
            .find()
            .sort('title')
        return response.send(movies)
    }
    catch(err){
        return response.send(err.message)
    }
})

//add Movie
Router.post('/add', async (request, response)=> {
    const {error} = validate(request.body)
    if (error) return response.status(400).send(error.details[0].message)

    try {
        const movie = new Movies({
            title : request.body.title,
            genres : request.body.genres,
            numberInStcok : request.body.numberInStcok,
            DailyRenTalRate : request.body.DailyRenTalRate,
        })
    
        await movie.save()
        return response.send(movie)
    }
    catch(err){
        return response.send(err.message)
    }
})

module.exports = Router

