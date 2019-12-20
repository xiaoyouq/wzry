<template>
  <div class="login-cations">
    <el-card class="login-nav" header="请先登录">
      <el-form @submit.native.prevent="save"  label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: { username: "", password: "" }
    };
  },
  methods: {
    async save(){
      const res = await this.$http.post('/login',this.model)
      if(res.data.userID){
        localStorage.token = res.data.userID
        this.$router.push('/')
        this.$message({
          type:'success',
          message:'登录成功！'
        })
      }
    }
  },
};
</script>
<style scoped>
.login-nav {
  width: 30rem;
  margin: 15rem auto;
}
</style>