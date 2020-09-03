<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div v-if="appinfo!=null">
      <div class="bd-bottom">
        <div class="padding">
          <div class="flex-row">
            <div class="flex-1">
              <el-breadcrumb separator="/" class="h3">
                <el-breadcrumb-item :to="{ path: '/management' }">管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>{{appinfo.name}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div>
              <el-button type="success" @click="opendatabase" >访问数据库</el-button>
              <el-button type="primary" v-if="appinfo.devstatus=='A'" @click="startdesign">开始需求设计阶段</el-button>
              <el-button type="primary" v-if="appinfo.devstatus=='B'" @click="startdevelop">开始开发阶段</el-button>
              <el-button type="primary" v-if="appinfo.devstatus=='C'">开始测试阶段</el-button>
              <el-button type="primary" v-if="appinfo.devstatus=='D'">开始试运行阶段</el-button>
              <el-button type="primary" v-if="appinfo.devstatus=='E'">项目阶段完成</el-button>
            </div>
          </div>
        </div>
        <el-menu :default-active="'AppOverview'" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="AppOverview" @click="routeto('/app/'+appinfo.alias+'/overview')">
            <template slot="title">
              <i class="el-icon-data-analysis"></i>
              <span>总揽</span>
            </template>
          </el-menu-item>
          <el-menu-item index="AppSchedule" @click="routeto('/app/'+appinfo.alias+'/schedule')">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>项目计划</span>
            </template>
          </el-menu-item>
          <el-menu-item index="AppSpec" @click="routeto('/app/'+appinfo.alias+'/spec')">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>需求中心</span>
            </template>
          </el-menu-item>
          <el-menu-item index="AppDev" @click="routeto('/app/'+appinfo.alias+'/dev')">
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
          <el-menu-item index="7" @click="routeto('/app/'+appinfo.alias+'/setting')">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="bg-w" style="min-height:100vh">
        <router-view :appinfo="appinfo" />
      </div>
    </div>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
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
      startdesigncontent:{},
      startdevelopcontent:{}
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    console.log("route", this.$route);

    HttpHelper.Post("app/info", { alias: this.$route.params.alias }).then(
      (appinfo) => {
        this.appinfo = appinfo;
      }
    );

    HttpHelper.Post("content/get", { keycode: "startdesign" }).then(content => {
      content.content = Utils.HtmlDecode(content.content);
      this.startdesigncontent = content;
    });
    HttpHelper.Post("content/get", { keycode: "startdevelop" }).then(content => {
      content.content = Utils.HtmlDecode(content.content);
      this.startdevelopcontent = content;
    });
  },
  methods: {
    opendatabase(){
      window.open("http://mysql.app-link.org?autologin=Y&auth_user=yyc"+this.Member.yycno+"_"+this.appinfo.alias+"&auth_pwd="+this.appinfo.dbpassword);
    },
    startdesign(event) {
      this.$alert(this.startdesigncontent.content, '提示', {
          dangerouslyUseHTMLString: true
        }).then(()=>{
          HttpHelper.Post("app/startdesign", {appalias:this.appinfo.alias}).then(ret => {
            if(ret.code=="0"){
              window.location.reload();
            }else{
              this.$message("开始失败，请联系管理员查看原因");
            }
          });
        });
    },
    startdevelop(event) {
      this.$alert(this.startdevelopcontent.content, '提示', {
          dangerouslyUseHTMLString: true
        }).then(()=>{
          HttpHelper.Post("app/startdevelop", {appalias:this.appinfo.alias}).then(ret => {
            if(ret.code=="0"){
              window.location.reload();
            }else{
              this.$message("开始失败，请联系管理员查看原因");
            }
          });
        });
    },
  },
};
</script>
<style scoped>
</style>