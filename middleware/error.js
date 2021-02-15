const logger = require('../config/logger')


module.exports = function (error, request, response, next) {
    logger.error(error.message)
    //error
    //warn
    //info
    //verbose
    //silly

    response.status(500).send('Something failed')
}