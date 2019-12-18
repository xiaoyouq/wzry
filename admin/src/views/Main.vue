<template>
  <div>
    <el-container style="height:100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :router="true" :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>内容管理
            </template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/CategoryEdit/Create">新建分类</el-menu-item>
              <el-menu-item index="/CategoryEdit/List">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/ItemEdit/Create">新建物品</el-menu-item>
              <el-menu-item index="/ItemEdit/List">分类物品</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/HeroEdit/Create">新建英雄</el-menu-item>
              <el-menu-item index="/HeroEdit/List">英雄列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px"></el-header>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>