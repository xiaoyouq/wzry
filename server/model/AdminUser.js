const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    // 被查询的时候 不会被查出来 
    type: String, 
    // 这是不会被显示 
    select:false,
    // 这是登录前  进行加密 包括一系列的处理 加密等等 
    set(res) {
      return require('bcryptjs').hashSync(res, 10)
    }
  }
  // 表示子级 关联字段 ref的意思是关联的哪个模型 而在这里关联的就是本身这个模型
  // 意思就是 如果有找到了上一级的id 就把这段 藏在上一级的下面 就是这样 分类 
})

module.exports = mongoose.model('AdminUser', schema)