'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // NODE_ENV: '"production"',
  // api_url: '"https://bpapi.beanpop.cn"',
  api_url: '"http://dev-bpapi.beanpop.cn"',
  // api_url: '"http://dev-new-api.beanpop.cn"',
  appdown_url: '"http://android.myapp.com/myapp/detail.htm?apkName=cn.beanpop.userapp"'
})
