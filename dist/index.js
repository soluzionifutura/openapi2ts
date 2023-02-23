
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./openapi2ts.cjs.production.min.js')
} else {
  module.exports = require('./openapi2ts.cjs.development.js')
}
