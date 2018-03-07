const nconf = require('nconf')
const path = require('path')

nconf.argv()
  .env('__')
  .file({ file: path.join(__dirname, process.env.NODE_ENV === 'production' ? 'config.json' : 'test.json') })

module.exports = nconf
