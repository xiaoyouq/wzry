<template>
  <div>
    <h1>{{id?'编辑':'增加'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
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
      value: { name: "", avatar: "" },
      parents: []
    };
  },
  methods: {
    handleAvatarSuccess(res){
      this.value.avatar = res.url
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
      this.value.name = res.data.name;
      this.value.avatar = res.data.avatar
    },
    async feachParents() {
      const res = await this.$http.get(`/rest/heroes`);
      this.parents = res.data;
    }
  },
  created() {
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