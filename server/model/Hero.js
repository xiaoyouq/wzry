const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },//英雄的称号
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },],//英雄的定位 展示/法师等等 
  scores: { //英雄的难度评分/ 上手难度等等 
    deffcult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  // 技能介绍 
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    types: { type: String }
  }],
  //顺风出装 
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'items' }],
  // 逆风出装 
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'items' }],
  // 使用技巧
  usageTips: { type: String },
  // 团战技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 推荐队友
  parents: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('hero', schema)