'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //api_url: '"http://beta-was.beanpop.cn"',
  api_url: '"http://june2-local.qr3355dev.com"',
  appdown_url: '"http://android.myapp.com/myapp/detail.htm?apkName=cn.beanpop.userapp"'
})
