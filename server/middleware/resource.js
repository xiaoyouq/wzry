module.exports = opctions => {
  return async (req, rep, next) => {
    // 这一步的作用是把负数转为大小写的模式  用模块 inflection 
    req.nodeModel = require('inflection').classify(req.params.resourse)
    // 这一步是让所有访问以/rest开头的都能携带一个参数 req.model 这样就可以访问对应的数据库model 
    req.model = require(`../model/${req.nodeModel}`)
    next()
  }

}