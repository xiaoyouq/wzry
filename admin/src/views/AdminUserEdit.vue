<template>
  <div>
    <h1>{{id?'编辑':'增加'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="账号">
          <el-input v-model="value.username" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="value.password"></el-input>
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
      value: { name: "", parents: null },
      parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.value);
      } else {
        res = await this.$http.post("/rest/admin_users", this.value);
      }
      this.value.name = "";
      this.$router.push("/admin_users/List");
      this.$message.success("保存成功");
    },
    async feach() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.value = Object.assign({},this.value,res.data)
    },
  },
  created() {
    this.id && this.feach();
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/CategoryEdit/Create") {
        this.value.name = "";
        this.value.parents = ""
      }
    }
  }
};
</script>

<style>
</style>