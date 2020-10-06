<template>
  <div class="padding" :class="{ 'bg-p': havebg }">
    <div class="flex-row flex-center" >
      <div class="flex-1"></div>
      <div class="container flex-row flex-center">
        <div>
          <img class="logo pointer" :src="uploadpath+'resource/'+Res.logow" @click="home" />
        </div>
        <div class="dot bg-w margin-left-1x margin-right-1x"></div>
        <div class="f-w f16 pointer" @click="home">{{Inst.name}}</div>
        <div class="flex-1"></div>
        <el-link :underline="false" class="padding-right f-w" @click="home">主页</el-link>
        <el-link :underline="false" class="padding-right f-w" @click="routeto('/management')">管理中心</el-link>
        <el-link :underline="false" class="padding-right f-w" >文档中心</el-link>
        <el-link :underline="false" class="padding-right f-w" @click="routeto('/pricelist')">产品定价</el-link>
        <div>
          <el-input size="mini" prefix-icon="el-icon-search" placeholder="搜索" v-model="search"></el-input>
        </div>
        <div class="split bg-w margin-left margin-right"></div>
        <el-link :underline="false" class="padding-right f-w" v-if="Member==null" @click="showloginbox">登录</el-link>
        <div v-if="Member==null">
          <el-button round size="medium" plain class="bg-trans f-w" @click="routeto('/register')">注册</el-button>
        </div>
        <div v-if="Member!=null">
          <el-dropdown :hide-on-click="false" trigger="hover" class="pointer" @command="ddlHandle">
            <span class="el-dropdown-link f-w">
              {{Member.mobile}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";

export default {
  props: {
    havebg: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null
    };
  },
  methods: {
    ddlHandle: function(command) {
      if (command == "logout") {
        window.localStorage.removeItem("token");
        this.Member = null;
        PageHelper.Member = null;
        page.home();
      }
    }
  },
  created() {
    PageHelper.Init(this);
  }
};
</script>

<style scoped>

</style>