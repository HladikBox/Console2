<template>
  <div class="padding " :class="{ 'bg-p': havebg }">
    <div class="flex-row flex-center">
      <div class="flex-1"></div>
      <div class="container flex-row flex-center">
        <div>
          <img class="logo" :src="uploadpath+'resource/'+Res.logow" />
        </div>
        <div class="dot bg-w margin-left-1x margin-right-1x"></div>
        <div class="f-w f16">{{Inst.name}}</div>
        <div class="flex-1"></div>
        <el-link :underline="false" class="padding-right f-w" @click="home">主页</el-link>
        <el-link :underline="false" class="padding-right f-w">管理中心</el-link>
        <el-link :underline="false" class="padding-right f-w">文档中心</el-link>
        <el-link :underline="false" class="padding-right f-w">产品定价</el-link>
        <div>
          <el-input prefix-icon="el-icon-search" placeholder="搜索" v-model="search"></el-input>
        </div>
        <div class="split bg-w margin-left margin-right"></div>
        <el-link :underline="false" class="padding-right f-w">登录</el-link>
        <div>
          <el-button round size="medium" plain class="bg-trans f-w" @click="routeto('/register')">注册</el-button>
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
  props:{
      havebg: {
        type: Boolean,
        default: true
    }
  },
  data() {
    return {
      Res: {},
      Inst: {},
    };
  },
  created() {
    PageHelper.Init(this);
  },
};
</script>

<style scoped>
.logo {
  height: 18px;
}
</style>