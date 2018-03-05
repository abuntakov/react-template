const winston = require('winston')
const config = require('../config')

function makeLogger(path) {
  const label = path.split('/').slice(-2).join('/')

  let level = 'debug'
  if (config.get('DELOGLEVEL')) {
    level = config.get('DELOGLEVEL')
  }

  if (path.match(/somepath.js$/)) {
    return new winston.Logger({
      transports: [],
    })
  }

  const transports = [
    new winston.transports.Console({
      level,
      label,
      timestamp: true,
      colorize: true,
    }),
  ]
  return new winston.Logger({
    transports,
  })
}

module.exports = module => makeLogger(module.filename)

