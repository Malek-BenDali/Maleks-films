const express = require('express')
const genres = require('./routes/genres')
const config = require('config')
const customer = require('./routes/customer')
const movies = require('./routes/movies')
const user = require('./routes/user')
const auth = require('./routes/auth')
const mongoose = require('mongoose')
const app = express()


console
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwt private key is not defined')
    process.exit(1);
}
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true,  useUnifiedTopology: true })
    .then(console.log('Connected to db...'))
    .catch(err=>console.log(err))


app.use(express.json())
app.use('/api/genres', genres )
app.use('/api/customer', customer )
app.use('/api/movies', movies)
app.use('/api/user', user)
app.use('/api/auth', auth)






const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))