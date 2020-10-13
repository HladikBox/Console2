<template>
  <div id="app">
      <router-view style="min-height:100vh"  />
      <el-dialog
        title="开发者账号登录"
        :visible.sync="loginBoxShow"
        width="300px"
        >
        <div>
          <el-input
                v-model="mobile"
                maxlength="11"
                autofocus
                size="large"
                type="tel"
                placeholder="请输入手机号"
              ></el-input>
        </div>
        <div class="margin-top">
          <el-input
                v-model="password"
                maxlength="20"
                autofocus
                size="large"
                type="password"
                placeholder="请输入密码"
              ></el-input>
        </div>
        <div class="margin-top f-d">
          &nbsp;{{loginboxerror}}
        </div>
        <div class="flex-row margin-top">
            <el-button class="flex-1 margin-right-1x" type="primary" @click="signin">登 录</el-button>
            <el-button class="flex-1 margin-left-1x"  @click="gosignup">注 册</el-button>
        </div>
        <div class="margin-top text-right">
          <el-link type="primary" @click="goreset">忘记密码</el-link>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { PageHelper } from "./PageHelper";
import { HttpHelper } from "./HttpHelper";

export default {
  name: 'App',
  data() {
    return {
      mobile:"",
      password:"",
      loginBoxShow:false,
      loginboxerror:""
    };
  },
  created:function(){
    PageHelper.AppInstance=this;
  },
  methods:{
    ShowLoginBox:function(){
      this.loginBoxShow=true;
    },
    gosignup:function(event){
      this.loginBoxShow=false;
      this.$router.push("/register")
    },
    goreset:function(event){
      this.loginBoxShow=false;
      this.$router.push("/passwordreset")
    },
    signin:function(event){
      HttpHelper.Post("member/login", {
        mobile:this.mobile,
        password:this.password
      }).then((ret) => {
        if(ret.code==0){
          window.localStorage.setItem("token",ret.return);
          window.location.reload();
        }else{
          this.loginboxerror=ret.return;
        }
        
      });
    }
  }
}
</script>
<style  scoped>
.lightbar {
  background-image: linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff);
  height: 10px;
}
</style>
<style>
.logo {
  height: 18px;
}
div{
}
.container{
  min-width:940px;
  max-width:940px;
}

.flex-row {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-center {
  align-content: center;
  align-items: center;
}

.flex-column {
  align-content: center;
  align-items: center;
  flex-direction: column;
}

.flex-bottom {
  align-content: baseline;
  align-items: baseline;
}

.flex-1 {
  flex: 1;
}

.flex-2 {
  flex: 2;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.margin-1x{
  margin: 10px;
}
.margin{
  margin: 20px;
}
.margin-3x{
  margin: 30px;
}
.margin-4x{
  margin: 40px;
}

.margin-top-1x{
  margin-top: 10px;
}
.margin-top{
  margin-top: 20px;
}
.margin-top-3x{
  margin-top: 30px;
}
.margin-top-4x{
  margin-top: 40px;
}

.margin-left-1x{
  margin-left: 10px;
}
.margin-left{
  margin-left: 20px;
}
.margin-left-3x{
  margin-left: 30px;
}
.margin-left-4x{
  margin-left: 40px;
}

.margin-right-1x{
  margin-right: 10px;
}
.margin-right{
  margin-right: 20px;
}
.margin-right-3x{
  margin-right: 30px;
}
.margin-right-4x{
  margin-right: 40px;
}

.margin-bottom-1x{
  margin-bottom: 10px;
}
.margin-bottom{
  margin-bottom: 20px;
}
.margin-bottom-3x{
  margin-bottom: 30px;
}
.margin-bottom-4x{
  margin-bottom: 40px;
}



.padding-1x{
  padding: 10px;
}
.padding{
  padding: 20px;
}
.padding-3x{
  padding: 30px;
}
.padding-4x{
  padding: 40px;
}

.padding-top-1x{
  padding-top: 10px;
}
.padding-top{
  padding-top: 20px;
}
.padding-top-3x{
  padding-top: 30px;
}
.padding-top-4x{
  padding-top: 40px;
}

.padding-left-1x{
  padding-left: 10px;
}
.padding-left{
  padding-left: 20px;
}
.padding-left-3x{
  padding-left: 30px;
}
.padding-left-4x{
  padding-left: 40px;
}

.padding-right-1x{
  padding-right: 10px;
}
.padding-right{
  padding-right: 20px;
}
.padding-right-3x{
  padding-right: 30px;
}
.padding-right-4x{
  padding-right: 40px;
}

.padding-bottom-1x{
  padding-bottom: 10px;
}
.padding-bottom{
  padding-bottom: 20px;
}
.padding-bottom-3x{
  padding-bottom: 30px;
}
.padding-bottom-4x{
  padding-bottom: 40px;
}

.border-1x{
  border-radius: 4px;
}
.border{
  border-radius: 8px;
}
.border-3x{
  border-radius: 12px;
}
.border-4x{
  border-radius: 16px;
}
.border-50{
  border-radius: 50%;
}
.fix-top{
  position: fixed;
  top: 0px;
  left: 0px;
  width:100vw;
}
.fix-middle{
  position: fixed;
  top:0px;
  left: 0px;
  width:100vw;
  height:100vh;
  display: flex;
  align-content: center;
  align-items: center;
}
.fix-bottom{
  position: fixed;
  bottom:0px;
  left: 0px;
  width:100vw;
}
.w-100{
  width:100%;
}
.h-100{
  height:100%;
}
.bold{
  font-weight: bold;
}
.bolder{
  font-weight: bolder;
}
.h1{
  font-size: 44px;
}
.h2{
  font-size: 28px;
}
.h3{
  font-size: 22px;
}
.h4{
  font-size: 18px;
}
.f16{
  font-size: 16px;
  line-height: 16px;
}
.h6{
  font-size: 14px;
}
.h7{
  font-size: 12px;
}
.dot{
  width: 6px;
  height:6px;
  border-radius: 50%;
  background: #090909;
}
.split{
  height: 12px;
  width: 1px;
  background: #090909;
}
.pointer{
  cursor: pointer;
}


.icon-1x{
  width: 24px;
  height: 24px;
}
.icon{
  width: 48px;
  height: 48px;
}
.icon-3x{
  width: 72px;
  height: 72px;
}
.icon-4x{
  width: 96px;
  height: 96px;
}
.icon-5x{
  width: 120px;
  height: 120px;
}


.bg-w{
  background: #ffffff;;
}
.bg-g{
  background: #ecf5fa;;
}
.bg-g2{
  background: #f5f7fa;
}
.f-w{
  color:white ;
}
.f-p{
  color:#409EFF ;
}
.f-s{
  color:#67C23A ;
}
.f-warn{
  color:#E6A23C ;
}
.f-d{
  color:#F56C6C ;
}
.f-g{
  color:#c3c3c3 ;
}
.f-g2{
  color:#819199 ;
}
.f-w.el-link{
  color:white !important;
}
.bg-trans{
  background: transparent;
}
.width-1x{
  width:100px;
}
.width{
  width:200px;
}
.width-3x{
  width:300px;
}
.width-4x{
  width:400px;
}
.height-1x{
  height:100px;
}
.height{
  height:200px;
}
.height-3x{
  height:300px;
}
.height-4x{
  height:400px;
}

.bg-p{
  background: #409EFF;
}
.bd{
  border:1px solid #d7dae2;
}
.bd-bottom{
  border-bottom:1px solid #d7dae2;
}
.bd-right {
  border-right: 1px solid #f0f2f5;
}

.scroll-x{
  overflow-x: scroll;
}
.scroll-y{
  overflow-y: auto;
}
.scroll{
  overflow: scroll;
}
</style>
