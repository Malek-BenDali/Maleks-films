const mongoose = require('mongoose')
const { Rental } = require('../../models/rental')
const { User } = require('../../models/User')
const {Movies} = require('../../models/movies')
const moment = require('moment')
const request = require('supertest')


describe('/api/returns', () => {
    let server
    let customerId
    let movieId
    let rental
    let token
    let movie
    

    const execute = () =>(
        request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({
                customerId, 
                movieId
            })
    )

    beforeEach(async()=>{
        server = require('../../index')
        customerId =  mongoose.Types.ObjectId()
        movieId =  mongoose.Types.ObjectId()
        token = new User().generateAuthToken()

        movie= new Movies({
            _id : movieId,
            title : '12345',
            dailyRentalRate : 2,
            genre : { name : '12345' },
            numberInStcok : 10
        })

        await movie.save()

        rental = new Rental({
            customer : {
                _id : customerId,
                name : '12345',
                phone : '12345'
            },
            movie : {
                _id : movieId,
                title : '12345',
                dailyRentalRate : 2
            }
        })
        await rental.save()
    })
    afterEach( async ()=>{
        await server.close()
        await Rental.remove({})
    })

    it('should return 401 if client is not logged in !', async() => {
        token = ''
        
        const res = await execute()

        expect(res.status).toBe(401)
    })

    it('should return 400 if customerId is not provided', async() => {
        customerId = ''

        const res = await execute()
        expect(res.status).toBe(400)
    })

    it('should 400 if movieId is not provided', async() => {
        movieId=''
        const res = await execute()
        expect(res.status).toBe(400)
    })

    it('should return 404 if no rental found for movie/customer', async() => {
        await Rental.remove({})
        const res = await execute()
        expect(res.status).toBe(404)
    })

    it('should return 400 if rental already processed', async() => {
        rental.dateReturned = new Date();
        await rental.save()

        const res = await execute()
        expect(res.status).toBe(400)
    })

    it('should return 200 if the request is valid', async() => {

        const res = await execute()
        expect(res.status).toBe(200)
    })

    it('should set the returnDate if input is valid', async() => {

        const res = await execute()

        const rentalDb = await Rental.findById(rental._id)
        diff = new Date() - rentalDb.dateReturned
        expect(diff).toBeLessThan(10 * 1000) //10sec
    })

    it('should set the rental fee if input is valid', async() => {
        rental.dateOut = moment().add(-7, 'days').toDate()
        await rental.save()

        const res = await execute()
        
        const rentalDb = await Rental.findById(rental._id)

        expect(rentalDb.rentalFee).toBe(14) //10sec
    })

    it('should increase the movie stock if input is valid', async() => {
        rental.dateOut = moment().add(-7, 'days').toDate()
        await rental.save()

        const res = await execute()
        
        const MoviesDb = await Movies.findById(movieId)
        expect(MoviesDb.numberInStcok).toBe(movie.numberInStcok + 1) //10sec
    })

    it('should return the rental if input is valid', async() => {
        
        const res = await execute()
        expect(Object.keys(res.body))
            .toEqual(expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee',
            'customer', 'movie']))
    })
    
})
