const request = require('supertest')
let server 
const {genresModel} =require('../../models/genres')
const {User} =require('../../models/User')



describe('/api/genres', () => {
    let token
    let name

    beforeEach(()=>{
        server = require('../../index')
        token = new User().generateAuthToken()
    })

    afterEach(async ()=>{
        await server.close()
        await genresModel.remove({})
    })
    const execute= async () => await request(server)
                .post('/api/genres/add')
                .set('x-auth-token', token)
                .send({name})


    //get all genres
    describe('GET /', () => {
        it('should return all genres', async () => {
            await genresModel.collection.insertMany([
                { name : 'genre1'},
                { name : 'genre2'},
            ])
            const res = await request(server).get('/api/genres')
            
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(genre =>
                genre.name === 'genre1')).toBeTruthy()
            expect(res.body.some(genre =>
                genre.name === 'genre2')).toBeTruthy()
        })        
    })


    describe('GET /id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new genresModel({ name : 'genre1'})
            await genre.save()

            const res = await request(server).get(`/api/genres/${genre._id}`)
            
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name', genre.name)
        })

        it('should return 404 if false id is passed', async () => {
            const res = await request(server).get('/api/genres/1')
            
            expect(res.status).toBe(404)
        })        
    })

    describe('Post /add', () => {
        it('should return a 401 if client is not logged in', async () => {
            token = ''
            const res = await request(server)
                .post('/api/genres/add')
                .send({ name : 'genre1'})

            expect(res.status).toBe(401)
        })

        it('should return 400 if genre is invalid is less than 5 characters', async () => {
            name = 'a'
            const res = await execute()
            
            expect(res.status).toBe(400)
        })        

        it('should return 400 if genre is invalid is more than 50 characters', async () => {

            name = new Array(52).join('a')

            const res = await execute()
            
            expect(res.status).toBe(400)
        })   

        it('should save if genre is valid', async () => {
            name = 'genre1'
            await execute()
            
            const genre = await User.find({name : 'genre1'})
            
            expect(genre).not.toBeNull()
        }) 

        it('should return the genre if its is valid', async () => {
            name='genre1'
            const res = await execute()
            
            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')
        })        
    })
    
})
