const nconf = require('nconf')
const path = require('path')

nconf.argv()
  .env('__')
  .file({ file: path.join(__dirname, 'config.json') })

module.exports = nconf
