const express = require('express')
const { Rental } = require('../models/rental')
const { Movies } = require('../models/movies')
const validateRequest = require('../middleware/validateRequest')
const auth= require('../middleware/auth')
const Joi = require('joi')
const router = express.Router()

const validateRental = request => {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
    return schema.validate(request)
}


router.post('/',[auth, validateRequest(validateRental)], async (request, response)=>{
    
    //findOne see the model for more infos
    const rental = await Rental.lookup(request.body.customerId, request.body.movieId)

    if (!rental) return response.status(404).send('Rental not found')
    
    if(rental.dateReturned) return response.status(400).send('Rental already processed')
    
    rental.return()

    await rental.save()
    
    //increase movie Stock
    await Movies.updateOne({_id : rental.movie._id},{
        $inc: {numberInStcok: 1}})
        
    return response.json(rental)
})




module.exports = router