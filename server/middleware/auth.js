module.exports = opctions => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const admin = require('../model/AdminUser')
  return async (req, rep, next) => {
    // .split(' ') 方法 能够把字符串中那哪个带有空格的算一个对象  然后再用pop方法取出最后一个对象 这样截取出来的就是token
    const headers1 = req.headers.authorization
    assert(headers1, 401, "请先登录")
    const resa = String(headers1).split(' ').pop()
    assert(resa, 401, "请先登录")
    // 然后用jwt的verify方法解析出来 最后返回的就是你一开始覆盖的
    // 这个时候通过id  就可以看到这个用户的信息了
    const { id } = jwt.verify(resa, req.app.get('ser'))
    assert(id, 401, "请先登录")
    //这里需要注意 如果加了+ 就是在原有的基础上加上password如果没有就相反
    req.users = await admin.findById(id)   //.select('+password') 可以查出来设为false的值 
    assert(req.users, 401, "请先登录")
    await next()
  }
}  