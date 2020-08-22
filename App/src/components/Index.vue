<template>
  <div>
    <el-carousel height="540px" arrow="never">
      <el-carousel-item v-for="item in indexbanner" :key="item">
        <div
          class="w-100 h-100"
          :style="{backgroundImage: 'url('+ uploadpath+'indexbanner/' + item.img + ')', backgroundSize:'cover'}"
        >
          <div class="flex-row flex-center h-100">
            <div class="flex-1"></div>
            <div class="text-center">
              <div class="h1 bold f-w">{{item.name}}</div>
              <div class="f-w margin-top">{{item.summary}}</div>
              <div class="margin-top-4x">
                <el-button round size="medium" type="primary" plain class="joinbtn bold">立即加入</el-button>
              </div>
            </div>
            <div class="flex-1"></div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="header">
      <div class>
        <div class="flex-row flex-center">
          <div class="flex-1"></div>
          <div class="container flex-row flex-center margin-top">
            <div>
              <img class="logo" :src="uploadpath+'resource/'+Res.logow" />
            </div>
            <div class="dot bg-w margin-left-1x margin-right-1x"></div>
            <div class="f-w f16">{{Inst.name}}</div>
            <div class="flex-1"></div>
            <el-link :underline="false" class="padding-right f-w">主页</el-link>
            <el-link :underline="false" class="padding-right f-w">管理中心</el-link>
            <el-link :underline="false" class="padding-right f-w">文档中心</el-link>
            <el-link :underline="false" class="padding-right f-w">产品定价</el-link>
            <div>
              <el-input prefix-icon="el-icon-search" placeholder="搜索" v-model="search"></el-input>
            </div>
            <div class="split bg-w margin-left margin-right"></div>
            <el-link :underline="false" class="padding-right f-w">登录</el-link>
            <div>
              <el-button round size="medium" plain class="bg-trans f-w">注册</el-button>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    </div>
    <div class="section bg-w">
      <div class="w-100 h-100 flex-row flex-center">
        <div class="flex-1"></div>
        <div class="container text-center">
          <div class="h2 bold">资源优势和接入流程</div>
          <div class="flex-row flex-center margin-top-4x">
            <div class="flex-1"></div>
            <div class="flex-row flex-center bgzx">
              <div class="padding s2select pointer" :class="{ 'active': s2select==0 }" @click="s2select=0">
                <div class="flex-row flex-center">
                  <div class="h4 bolder margin-right-1x margin-left">软件服务商</div>
                  <div class="margin-right-1x">提供公有云开发服务</div>
                </div>
              </div>
              <div class="padding s2select pointer" :class="{ 'active': s2select==1 }" @click="s2select=1">
                <div class="flex-row flex-center">
                  <div class="h4 bolder margin-left-1x margin-right-1x">企业私有云</div>
                  <div class="margin-right">企业内部私有云部署</div>
                </div>
              </div>
            </div>
            <div class="flex-1"></div>
          </div>
          <div class="flex-row flex-center margin-top-4x">
            <div class="flex-1"></div>
            <div class="s3select f-g pointer" :class="{ 'active': s3select==0 }" @click="s3select=0">资源优势</div>
            <div class="dot margin-left margin-right"></div>
            <div class="s3select f-g pointer" :class="{ 'active': s3select==1 }" @click="s3select=1">接入流程</div>
            <div class="flex-1"></div>
          </div>
          <div class="flex-row margin-top-4x"  v-if="s2select==0&&s3select==0">
              <div class="text-center margin-right fblock">
                  <img class="icon" :src="uploadpath+'resource/'+Res.f1" />
                  <div class="h4 bolder margin-top">海量模板</div>
                  <div class="h6  f-g  margin-top">共享海量开发者的资源模板，项目不需要从0做起</div>
              </div>
              <div class="text-center margin-right margin-left fblock">
                  <img class="icon" :src="uploadpath+'resource/'+Res.f2" />
                  <div class="h4 bolder margin-top">互联网资源</div>
                  <div class="h6 f-g margin-top">直接提供各种项目资源，如设计、投融资、硬件设计和人力等</div>
              </div>
              <div class="text-center margin-left fblock">
                  <img class="icon" :src="uploadpath+'resource/'+Res.f3" />
                  <div class="h4 bolder margin-top">订单对接</div>
                  <div class="h6 f-g margin-top">平台提供接单服务，让定制公司可以直接接单</div>
              </div>
          </div>
          <div class="flex-row margin-top-4x"  v-if="s2select==1&&s3select==0">
              <div class="text-center margin-right fblock">
                  <img class="icon" :src="uploadpath+'resource/'+Res.f1" />
                  <div class="h4 bolder margin-top">丰富的 IT 工具</div>
                  <div class="h6  f-g  margin-top">提供测试工具、API 调试工具、服务监控、日志分析统计等丰富的解决方案</div>
              </div>
              <div class="text-center margin-right margin-left fblock">
                  <img class="icon" :src="uploadpath+'resource/'+Res.f2" />
                  <div class="h4 bolder margin-top">沙箱环境</div>
                  <div class="h6 f-g margin-top">数据独立，支撑开放业务功能测试需求</div>
              </div>
              <div class="text-center margin-left fblock">
                  <img class="icon" :src="uploadpath+'resource/'+Res.f3" />
                  <div class="h4 bolder margin-top">24*7服务</div>
                  <div class="h6 f-g margin-top">24*7服务，为你随时提供技术支持</div>
              </div>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      search: "",
      indexbanner: [],
      s2select:0,
      s3select:0
    };
  },
  created() {
    PageHelper.Init(this);
    HttpHelper.Post("inst/indexbanner", {}).then(indexbanner => {
      this.indexbanner = indexbanner;
    });
  }
};
</script>
<style scoped>
.logo {
  height: 18px;
}
.indexbanner {
  height: 540px;
}
.joinbtn {
  font-size: 18px;
}
.header {
  position: absolute;
  margin-top: -540px;
  z-index: 1000;
  width: 90vw;
  left: 5vw;
  min-height: 10px;
}
.menu {
  background: transparent;
}
.el-menu.el-menu--horizontal {
  border-bottom: transparent;
}
.section {
    padding-top: 80px;
    padding-bottom: 80px;
}
.bgzx {
  background: #ebf5fa;
  border-radius: 36px;
  padding:4px;
}
.s2select.active{
    background: white;
    border-radius: 36px;
}
.s3select.active{
    color:black;
}
.fblock{
    width:320px;
}
</style>