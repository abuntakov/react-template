const config = require('../config')

function getAbsoluteUrl(path) {
  const proto = config.get('protocol')
  const domain = config.get('domain')

  return `${proto}://${domain}${path}`
}

module.exports = {
  getAbsoluteUrl
}
