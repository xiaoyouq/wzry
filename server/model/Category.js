const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  // 表示子级 关联字段 ref的意思是关联的哪个模型 而在这里关联的就是本身这个模型
  // 意思就是 如果有找到了上一级的id 就把这段 藏在上一级的下面 就是这样 分类 
  parents: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema)