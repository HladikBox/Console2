<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div class="margin-top-4x">
      <div class="flex-row">
        <div class="flex-1"></div>
        <div class="container bd">
          <div class="boxbg bd-bottom padding-top padding-bottom">
            <div class="flex-row text-center">
              <div class="flex-1 flex-row flex-center">
                <div class="flex-1"></div>
                <div class="step" :class="{'active':step>0}">1</div>
                <div class="flex-1 line"></div>
              </div>
              <div class="flex-1 flex-row flex-center">
                <div class="flex-1 line"></div>
                <div class="step" :class="{'active':step>1}">2</div>
                <div class="flex-1 line"></div>
              </div>
              <div class="flex-1 flex-row flex-center">
                <div class="flex-1 line"></div>
                <div class="step" :class="{'active':step>2}">3</div>
                <div class="flex-1 line"></div>
              </div>
              <div class="flex-1 flex-row flex-center">
                <div class="flex-1 line"></div>
                <div class="step" :class="{'active':step>3}">4</div>
                <div class="flex-1"></div>
              </div>
            </div>
            <div class="flex-row text-center margin-top-1x">
              <div class="flex-1" :class="{'active':step>0}">注册须知</div>
              <div class="flex-1" :class="{'active':step>1}">手机验证</div>
              <div class="flex-1" :class="{'active':step>2}">设置账号密码</div>
              <div class="flex-1" :class="{'active':step>3}">完成注册</div>
            </div>
          </div>
          <div class="bg-w padding-4x">
            <div v-if="step==1">
              <div v-html="registerprivacy.content" class="step1content bd padding"></div>
              <div class="padding-4x">
                <el-checkbox v-model="checked">我已同意《云易创开发服务协议》</el-checkbox>
              </div>
              <div class="margin-top text-center">
                <el-button type="primary" round :disabled="checked==false" @click="step=2">下一步</el-button>
              </div>
            </div>
            <div class="flex-row" v-if="step==2">
              <div class="flex-1"></div>
              <div>
                <div class="flex-row flex-center">
                  <div class="margin-right rl">手机号</div>
                  <div>
                    <el-input
                      placeholder="请输入手机号码"
                      maxlength="11"
                      v-model="mobile"
                      class="norightborderradius"
                    ></el-input>
                  </div>
                  <div>
                    <el-button
                      type="success"
                      v-if="remindersendtime==0"
                      class="noleftborderradius"
                      :disabled="ismobile(mobile)==false"
                      @click="getverifycode"
                    >获取验证码</el-button>
                    <el-button
                      v-if="remindersendtime>0"
                      class="noleftborderradius"
                      disabled
                    >剩余{{remindersendtime}}s</el-button>
                  </div>
                </div>
                <div class="flex-row flex-center margin-top">
                  <div class="margin-right rl">验证码</div>
                  <div>
                    <el-input placeholder="请输入验证码" maxlength="6" v-model="verifycode"></el-input>
                  </div>
                </div>
                <div class="margin-top-4x text-center">
                  <el-button
                    type="primary"
                    round
                    :disabled="mobile.length!=11||verifycode.length!=6"
                    @click="nextverifycode"
                  >下一步</el-button>
                </div>
              </div>
              <div class="flex-1"></div>
            </div>
            <div class="flex-row" v-if="step==3">
              <div class="flex-1"></div>
              <div>
                <div class="flex-row flex-center margin-top">
                  <div class="margin-right rl">密码</div>
                  <div>
                    <el-input placeholder="请输入不少于6位数密码" maxlength="20" v-model="password"></el-input>
                  </div>
                </div>
                <div class="flex-row flex-center margin-top">
                  <div class="margin-right rl">确认密码</div>
                  <div>
                    <el-input placeholder="请输入不少于6位数密码" maxlength="20" v-model="password2"></el-input>
                  </div>
                </div>
                <div class="margin-top-4x text-center">
                  <el-button
                    type="primary"
                    round
                    :disabled="password.length<6||password!=password2"
                    @click="nextsuccess"
                  >下一步</el-button>
                </div>
              </div>
              <div class="flex-1"></div>
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
import { Utils } from "../Utils";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      step: 1,
      registerprivacy: {},
      checked: false,
      mobile: "",
      verifycode: "",
      remindersendtime: 0,
      password:"",
      password2:""
    };
  },
  methods: {
    getverifycode: function(event) {
      HttpHelper.Post("aliyun/sendverifycode", {
        type: "register",
        mobile: this.mobile
      }).then(res => {
        if (res.code != 0) {
          if (res.result != "SENT_IN_MINUTE") {
            this.$message({
              message: "验证码请求过于频繁，请于一分钟重试",
              type: "error"
            });
          } else {
            this.$message({
              message: "服务器繁忙，请联系客服",
              type: "error"
            });
          }
        } else {
          this.$message({
            message: "验证码已发送到您的手机，请注意查收",
            type: "success"
          });
          this.remindersendtime = 60;
          var k = setInterval(() => {
            this.remindersendtime--;
            if (this.remindersendtime <= 0) {
              clearInterval(k);
            }
          }, 1000);
        }
      });
    },
    ismobile: function(mobile) {
      return Number(mobile).toString().length == 11 && mobile[0] == "1";
    },
    nextverifycode: function(event) {
      this.step=3;
    },
    nextsuccess:function(event){
      HttpHelper.Post("member/register", {
        mobile: this.mobile,
        verifycode:this.verifycode,
        password:this.password
      }).then(res => {
        if(res.code!=0){

          this.$message({
            message: res.return,
            type: "error"
          });
        }else{
          this.step=4;
          window.localStorage.setItem("token",res.return);
          this.$alert('注册成功，建议先前往个人中心完成资质认证', '提示', {
          confirmButtonText: '去认证',
          callback: action => {
            this.routeto("/account")
          }
        });
        }
      });
    }
  },
  created() {
    PageHelper.Init(this);
    HttpHelper.Post("content/get", { keycode: "zcxz" }).then(content => {
      content.content = Utils.HtmlDecode(content.content);
      this.registerprivacy = content;
    });
  }
};
</script>
<style scoped>
.boxbg {
  background: #fafafa;
}

.step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 2px #cccccc;
  line-height: 30px;
  color: #cccccc;
}
.boxbg .step.active {
  border: solid 2px #5d80f5;
}
.boxbg .active {
  color: #5d80f5;
}
.line {
  background: #c0c4cc;
  height: 2px;
}
.step1content {
  height: 300px;
  overflow-y: scroll;
}
.norightborderradius .el-input__inner {
  border-radius: 0px;
  background: red;
}
.noleftborderradius {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.rl{
  width:80px;
}
</style>