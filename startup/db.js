const mongoose = require('mongoose')
const logger = require('../config/logger')
module.exports = function (params) {
    mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true,  useUnifiedTopology: true })
    .then(logger.info('Connected to db...'))
}