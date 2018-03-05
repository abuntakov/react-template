const Promise = require('bluebird')
const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(
  config.get('mongoose:uri'),
  config.get('mongoose:options'))

mongoose.Promise = Promise

module.exports = mongoose
