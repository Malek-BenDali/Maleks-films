const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (request, response, next) => {
    const token = request.header('x-auth-token')
    if(!token) return response.status(401).send('Access denien. No Token provided')

    try {
        const decoded = jwt.verify(token,  config.get('jwtPrivateKey'))//param loul token w theni private key
        request.user = decoded
        next()
    }    
    catch(ex){
        response.status(400).send('Invalid Token')
    }
}
