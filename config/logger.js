const winston = require('winston');
require('winston-mongodb')
 
// module.exports =  winston.add(
//     winston.transports.File, {
//         filename : 'logfile.log'
//     }
// );
module.exports =  winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ 
          filename: 'error.log', 
          level: 'error',
          defaultMeta: { service: 'user-service' },
          format : winston.format.combine(
              winston.format.timestamp(), 
              winston.format.json()
          ),
      }),
  
      new winston.transports.MongoDB({ 
          level: 'error',
          options : {
            useUnifiedTopology: true 
          },
          db: 'mongodb://localhost/playground'
      })
      
    ],
  });