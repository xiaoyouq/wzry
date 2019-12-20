module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const ser = app.get('ser')
  const assert = require('http-assert')
  const admin = require('../../model/AdminUser')
  const router = express.Router({
    // 这句话的意思是把父级的参数合并到子级里面 让子级也能访问的到
    mergeParams: true
  })

  // 添加数据往数据库里 post
  router.post('/', async (req, rep) => {
    const model = await req.model.create(req.body)
    rep.send(model)
  })

  // 请求数据 get
  router.get('/', async (req, rep) => {
    // 关联字段  populate("管理字段的值") model中带有关联字段的都能查询到 
    let querOpctions = {}
    if (req.nodeModel === "Category") {
      querOpctions.populate = 'parents'
    }
    const items = await req.model.find().setOptions(querOpctions) //限制 只能请求到十条数据.limit(10)
    rep.send(items)
  })

  // 请求编辑的数据 delete
  router.delete('/:id', async (req, rep) => {
    const items = await req.model.findByIdAndRemove(req.params.id)
    rep.json({ success: true })
  })

  // 修改数据 delete
  router.get('/:id', async (req, rep) => {
    const items = await req.model.findById(req.params.id)
    rep.send(items)
  })

  // 请求需要修改的数据 get
  router.put('/:id', async (req, rep) => {
    const items = await req.model.findByIdAndUpdate(req.params.id, req.body)
    rep.send(items)
  })

  const aut = require('../../middleware/auth')

  const aut1 = require('../../middleware/resource')

  app.use('/admin/api/rest/:resourse', aut(), aut1(), router)

  // 引入一个包 可以把上传的图片存到文件夹里面 
  const multer = require('multer')

  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/uploads', upload.single('file'), async (req, rep, next) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    rep.send(file)
  })


  app.post('/admin/api/login', async (req, rep) => {
    const { username, password } = req.body
    // 先在客户端找出来这个  
    const res = await admin.findOne({ username }).select('+password')

    assert(res, 401, '用户不存在')


    // 解析密码 会得出来一个布尔值 true就是正确的 false 就是不对
    const log = require('bcryptjs').compareSync(password, res.password)


    assert(log, 422, '密码错误')

    // 验证成功后 把token 传过去  前端再保存token 然后请求的时候 每次都带着token请求
    const userID = jwt.sign({ _id: res._id, id: res._id, username: res.username }, ser)

    rep.send({ userID })
  })

  // 错误处理
  // 错误处理 所有请求出错的都会走这边 
  app.use(async (err, req, rep, next) => {
    if (err) {
      await rep.status(err.statusCode || 500).send({ message: err.message })
      next()
    } else {
      next()
    }
  })
}
