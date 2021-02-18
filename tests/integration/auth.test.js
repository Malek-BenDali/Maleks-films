const request = require('supertest')
const server = require('../../index')
const { genresModel } = require('../../models/genres')
const { User } =require('../../models/User')

describe('auth middleware', () => {
    let token
    
    beforeEach(()=>{
        token = new User().generateAuthToken()
    })
    afterEach(async ()=>{
        await server.disable()
        await genresModel.remove({})
    })


    const execute= () => request(server)
                .post('/api/genres/add')
                .set('x-auth-token', token)
                .send({name : 'genre1'})


    describe('Post /genres/add', () => {

        it('should return a 401 if client is not logged in', async () => {
            token = ''
            const res = await execute()
            expect(res.status).toBe(401)
        })

        it('should return a 400 if token is invalid', async () => {
            token = 'a'
            const res = await execute()
            expect(res.status).toBe(400)
        })

        it('should return a 200 if token is invalid', async () => {
            const res = await execute()
            expect(res.status).toBe(200)
        })
    })
    
})
