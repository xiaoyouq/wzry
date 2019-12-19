<template>
  <div>
    <h1>{{id?'编辑':'增加'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="value.title"></el-input>
      </el-form-item>
      <el-button size="small" style="margin-left:7.4rem;margin-bottom:1rem;" @click="value.items.push({})">
        <i class="el-icon-plus"></i> 添加广告位
      </el-button>
      <el-row type="flex" style="flex-wrap:wrap">
        <el-col :md="12" v-for="(item,index) in value.items" :key="index">
          <el-form-item label="图片的URL">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/uploads'"
              :show-file-list="false"
              :on-success="res=> $set(item,'img',res.url)"
            >
              <img v-if="item.img"  :src="item.img" class="avatar1" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click=" value.items.splice(index,1)" type="danger">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{id?'编辑':'增加'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  data() {
    return {
      value: { name: "", title: "", parents: null, items: [] },
      parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.value);
      } else {
        res = await this.$http.post("/rest/ads", this.value);
      }
      this.value.name = "";
      this.$router.push("/AdsList/List");
      this.$message.success("保存成功");
    },
    async feach() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.value = Object.assign({}, this.value, res.data);
    }
  },
  created() {
    this.id && this.feach();
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/CategoryEdit/Create") {
        this.value.name = "";
        this.value.parents = "";
      }
    }
  }
};
</script>

<style>
.avatar1{
  widows: 12rem;
  height: 5rem;
}
</style>