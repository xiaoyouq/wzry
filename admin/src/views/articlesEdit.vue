<template>
  <div>
    <h1>{{id?'编辑':'增加'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类">
        <el-select multiple v-model="value.parents" placeholder>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章名字">
        <el-input v-model="value.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="value.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{id?'编辑':'增加'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: { id: {} },
  data() {
    return {
      value: { title: "", parents: null, body: "" },
      parents: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("/uploads", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/Articles/${this.id}`, this.value);
      } else {
        res = await this.$http.post("/rest/Articles", this.value);
      }
      this.value.title = "";
      this.$router.push("/ArticlesList/List");
      this.$message.success("保存成功");
    },
    async feach() {
      const res = await this.$http.get(`/rest/Articles/${this.id}`);
      this.value = this.$set({}, this.value, res.data);
      // this.value.title = res.data.title;
      // this.value.parents = res.data.parents;
    },
    async feachArticles() {
      const res = await this.$http.get(`/rest/categories`);
      var list = [];
      res.data.find(el => {
        if (el.parents) {
          if (el.parents.name == "新闻资讯") {
            list.push(el);
          }
        }
      });
      this.parents = list;
    }
  },
  created() {
    console.log("ok");
    this.feachArticles();
    this.id && this.feach();
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/ArticlesEdit/Create") {
        this.value.title = "";
        this.value.parents = "";
      }
    }
  },
  components: {
    VueEditor
  }
};
</script>

<style>
</style>