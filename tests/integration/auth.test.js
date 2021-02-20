const request = require('supertest')
let server 
const { genresModel } = require('../../models/genres')
const { User } =require('../../models/User')

describe('auth middleware', () => {
    let token
    
    beforeEach(()=>{
        server = require('../../index')
        token = new User().generateAuthToken()
    })
    afterEach(async ()=>{
        await genresModel.remove({})
        await server.close()
    })


    const execute= () => request(server)
                .post('/api/genres/add')
                .set('x-auth-token', token)
                .send({name : 'genre1'})

    describe('Post /genres/add', () => {

        it('should return a 401 if client is not logged in', async () => {
            name='genre1'
            token = ''
            const res = await execute()
            expect(res.status).toBe(401)
        })

        it('should return a 400 if token is invalid', async () => {
            name='genre1'
            token = 'a'
            const res = await execute()
            expect(res.status).toBe(400)
        })

        it('should return a 200 if token is invalid', async () => {
            name="genre1"
            const res = await execute()
            expect(res.status).toBe(200)
        })
    })
    
    
})
