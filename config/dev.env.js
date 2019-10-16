'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const config = require('./index')

module.exports = merge(prodEnv, {
  	NODE_ENV: '"development"',
  	HOST: '"http://localhost:'+config.dev.port+'"',
    testerUrl : '"http://localhost:8882/#/loading"',   //检测方加载页
  	API_HOST : '"https://tttest.fdcfabric.com"',
    UPLOAD_URL : '"https://tttest.fdcfabric.com/file/host/one"',   //上传图片请求链接   
})
