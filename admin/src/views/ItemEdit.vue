<template>
  <div>
    <h1>{{id?'编辑':'增加'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名字">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/uploads'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="value.icon" :src="value.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
      value: { name: "", icon: "" },
      parents: []
    };
  },
  methods: {
    handleAvatarSuccess(res){
      console.log(res)
      this.value.icon = res.url
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.value);
      } else {
        res = await this.$http.post("/rest/items", this.value);
      }
      this.value.name = "";
      this.$router.push("/ItemEdit/List");
      this.$message.success("保存成功");
    },
    async feach() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      console.log(res)
      this.value.name = res.data.name;
      this.value.parents = res.data.parents;
      this.value.icon = res.data.icon
    },
    async feachParents() {
      const res = await this.$http.get(`/rest/items`);
      this.parents = res.data;
    }
  },
  created() {
    this.feachParents();
    this.id && this.feach();
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/ItemEdit/Create") {
        this.value.name = "";
        this.value.icon = "";
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>