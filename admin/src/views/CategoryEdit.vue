<template>
  <div>
    <h1>{{id?'编辑':'增加'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="value.parents" placeholder>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="value.name"></el-input>
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
        res = await this.$http.put(`/rest/categories/${this.id}`, this.value);
      } else {
        res = await this.$http.post("/rest/categories", this.value);
      }
      this.value.name = "";
      this.$router.push("/CategoryEdit/List");
      this.$message.success("保存成功");
    },
    async feach() {
      const res = await this.$http.get(`/rest/categories/${this.id}`);
      this.value.name = res.data.name;
      this.value.parents = res.data.parents;
    },
    async feachParents() {
      const res = await this.$http.get(`/rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
    console.log('ok')
    this.feachParents();
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