const i18n = require('i18n')
const path = require('path')

i18n.configure({
  directory: path.resolve(__dirname, '../../locale'),
  defaultLocale: 'ru',
  cookie: 'lang',
})

module.exports = i18n

