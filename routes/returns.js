const express = require('express')
const { Rental } = require('../models/rental')
const { Movies } = require('../models/movies')
const moment = require('moment')
const asyncMidlleWare = require('../middleware/async')
const auth= require('../middleware/auth')

const router = express.Router()


router.post('/',auth, async (requete, response)=>{
    if (!requete.body.customerId) return response.status(400).send('CustomerId missing')
    if (!requete.body.movieId) return response.status(400).send('CustomerId missing')

    const rental = await Rental.findOne({
        'customer._id' : requete.body.customerId,
        'movie._id' : requete.body.movieId,
    })
    if (!rental) return response.status(404).send('Rental not found')
    
    if(rental.dateReturned) return response.status(400).send('Rental already processed')
    
    //ajouti wakteh kreh
    rental.dateReturned = new Date()

    //calculate rental
    const rentalDays = moment().diff(rental.dateOut, 'days')
    rental.rentalFee = rentalDays * rental.movie.dailyRentalRate
    await rental.save()
    
    //increase movie Stock
    await Movies.updateOne({_id : rental.movie._id},{
        $inc: {numberInStcok: 1}})
        
    return response.status(200).send('alles gute')
})


module.exports = router