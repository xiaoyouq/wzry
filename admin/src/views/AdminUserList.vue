<template>
  <div>
    <el-table :data="items" border>
      <el-table-column prop="_id" label="ID" align="center" width="230"></el-table-column>
      <el-table-column prop="username" label="账号" align="center" width="220"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("/rest/admin_users");
      console.log(res)
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除账号, ${row.username}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const item = await this.$http.delete(`/rest/admin_users/${row._id}`);
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