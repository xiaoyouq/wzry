<template>
  <div>
    <h1>{{id?'编辑':'增加'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skilles" type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名字">
            <el-input v-model="value.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="value.avatar" :src="value.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="value.title"></el-input>
          </el-form-item>
          <el-form-item label="定位">
            <el-select v-model="value.categories" multiple placeholder="请选择定位">
              <el-option
                v-for="item in categoriese"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作难度">
            <el-rate style="margin-top:0.8rem" :max="9" v-model="value.scores.deffcult"></el-rate>
          </el-form-item>
          <el-form-item label="技能难度">
            <el-rate style="margin-top:0.8rem" :max="9" v-model="value.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击伤害">
            <el-rate style="margin-top:0.8rem" :max="9" v-model="value.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存能力">
            <el-rate style="margin-top:0.8rem" :max="9" v-model="value.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="value.items1" multiple placeholder="请选择顺风出装">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="value.usageTips" placeholder="使用技巧"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="value.battleTips" placeholder="对抗技巧"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="value.teamTips" placeholder="团战思路"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" native-type="submit">{{id?'编辑':'增加'}}</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane style="margin-top:1rem" name="skilles" label="技能">
          <el-button size="small" style="margin-left:7.4rem;margin-bottom:1rem;" @click="value.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in value.skills" :key="index">
              <el-form-item label="技能名字">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/uploads'"
                  :show-file-list="false"
                  :on-success="res=> $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description" placeholder></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.types" placeholder></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click=" value.skills.splice(index,1)" type="danger">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <br />
          <el-button style="margin-top:10px;"  native-type="submit" type="primary">保存</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  data() {
    return {
      value: {
        name: "",
        avatar: "",
        title: "",
        categories: [],
        scores: {
          deffcult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        items1: [],
        usageTips: "",
        battleTips: "",
        teamTips: "",
        skills: [{ name: "" }, { icon: "" }, { description: "" }, { types: "" }]
      },
      parents: [],
      categoriese: [],
      items: []
    };
  },
  methods: {
    saves(a){
      console.log(this.value)
    },
    handleAvatarSuccess(res) {
      this.value.avatar = res.url;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.value);
      } else {
        res = await this.$http.post("/rest/heroes", this.value);
      }
      this.value.name = "";
      this.$router.push("/HeroEdit/List");
      this.$message.success("保存成功");
    },
    async feach() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      // 这个方法可以把之前的数据 和现在的数据不重合的添加在一块
      this.value = Object.assign({}, this.value, res.data);
    },
    async feachitMES() {
      const res = await this.$http.get(`/rest/items`);
      console.log(res);
      this.items = res.data;
    },
    async feachParents() {
      const res = await this.$http.get(`/rest/categories`);
      var list = [];
      res.data.find(el => {
        if (el.parents) {
          if (el.parents.name == "英雄") {
            list.push(el);
          }
        }
      });
      this.categoriese = list;
    }
  },
  created() {
    this.feachitMES();
    this.feachParents();
    this.id && this.feach();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/HeroEdit/Create") {
        this.value.name = "";
        this.value.avatar = "";
      }
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5.8rem;
  height: 5.8rem;
  line-height: 5.8rem;
  text-align: center;
}
.avatar {
  width: 5.8rem;
  height: 5.8rem;
  display: block;
}
</style>