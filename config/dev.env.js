'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  OPEN_PROXY: false,
  URL:'"http://weixin.e-cbest.com/dq"'
})
