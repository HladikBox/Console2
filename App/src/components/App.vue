<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div v-if="appinfo!=null">
      <div class="bd-bottom">
        <div class="padding">
          <el-breadcrumb separator="/" class="h3">
            <el-breadcrumb-item :to="{ path: '/management' }">管理中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{appinfo.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-data-analysis"></i>
              <span>总揽</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>项目计划</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>需求中心</span>
            </template>
          </el-menu-item>
          <el-menu-item index="4">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>研发工作区</span>
            </template>
          </el-menu-item>
          <el-menu-item index="5">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>测试</span>
            </template>
          </el-menu-item>
          <el-menu-item index="6">
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span>部署</span>
            </template>
          </el-menu-item>
          <el-menu-item index="7">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="bg-w" style="min-height:100vh"></div>
    </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      appinfo: null,
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    HttpHelper.Post("app/info", { alias: this.$route.params.alias }).then(
      (appinfo) => {
        this.appinfo = appinfo;
      }
    );
  },
  methods: {},
};
</script>
<style scoped>
</style>