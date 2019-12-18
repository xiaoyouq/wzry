module.exports = app => {
  const express = require('express')
  const router = express.Router({
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

  app.use('/admin/api/rest/:resourse', async (req, rep, next) => {
    // 这一步的作用是把负数转为大小写的模式  用模块 inflection 
    req.nodeModel = require('inflection').classify(req.params.resourse)
    // 这一步是让所有访问以/rest开头的都能携带一个参数 req.model 这样就可以访问对应的数据库model 
    req.model = require(`../../model/${req.nodeModel}`)
    next()
  }, router)

  // 引入一个包 可以把上传的图片存到文件夹里面 
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/uploads',upload.single('file'), async (req, rep, next) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    rep.send(file)
  })

}