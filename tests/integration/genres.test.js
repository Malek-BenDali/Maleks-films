const request = require('supertest')
const server = require('../../index')
const {genresModel} =require('../../models/genres')


describe('/api/genres', () => {

    //ki naamlou appel l serveur besh yekhou prot 3000 ki naawdou port deja meebi donc nhelou w nsakrouh kbal kol test


    //get all genres
    describe('GET /', () => {
        it('should return all genres', async (done) => {
            await genresModel.collection.insertMany([
                { name : 'genre1'},
                { name : 'genre2'},
            ])
            request(server)
                .get('/api/genres')
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200, done)
                .expect(res=>{
                    res.body.length = 2,
                    res.body.some(genre =>genre.name === 'genre1')
                    res.body.some(genre =>genre.name === 'genre2')
                })
        })
        
    })
    
})
