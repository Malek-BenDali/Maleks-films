module.exports = ()=> {
    process.on('unhandledRejection', exception => {
        console.log('WE are in deep shit')
        logger.error(exception.message)
    })
    process.on('uncaughtException', exception => {
        console.log('WE are in deep shit')
        logger.error(exception.message)
    })
}