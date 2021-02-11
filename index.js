const express = require('express')
const genres = require('./routes/genres')
const customer = require('./routes/customer')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})
    .then(console.log('Connected to db...'))
    .catch(err=>console.log(err))


app.use(express.json())
app.use('/api/genres', genres )
app.use('/api/customer', customer )






const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))