<template>
  <div>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" align="center" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称" align="center" width="220"></el-table-column>
      <el-table-column prop="avatar" label="头像" align="center" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3.5rem" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/Heroies/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button type="danger" @click="remove(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    // 异步请求接口 请求数据
    async getFull() {
      const res = await this.$http.get("/rest/heroes");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除该分类, ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const item = await this.$http.delete(`/rest/heroes/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getFull();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getFull();
  }
};
</script>