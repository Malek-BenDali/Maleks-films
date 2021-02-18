const mongoose = require('mongoose')
module.exports = (request, response, next) =>{
    if( !mongoose.Types.ObjectId.isValid(request.params.id))
        return response.status(404).send('Invalid Id')
    next()
}