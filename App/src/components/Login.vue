<template>
  <div class="fix-middle">
    <div class="flex-1"></div>
    <div>
      <div class="text-center">
        <div>
          <div class="title">{{Inst.name}}</div>
        </div>
      </div>
      <div class="flex-row flex-center">
        <div class="flex-1"></div>
        <div>
          <div class="loginbox border bg-w">
            <div class="text-center">
              <img class="logo" :src="uploadpath+'inst/'+Inst.logo" />
            </div>
            <h4 class="logintext">登录</h4>
            <div>
              <el-input
                prefix-icon="el-icon-user"
                v-model="mobile"
                maxlength="11"
                autofocus
                size="large"
                type="tel"
                placeholder="请输入注册的手机号"
              ></el-input>
            </div>
            <div class="margin-top">
              <el-input
                prefix-icon="el-icon-user"
                v-model="password"
                maxlength="11"
                autofocus
                size="large"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </div>
            <div class="margin-top">
              <el-button class="w-100">默认按钮</el-button>
            </div>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>

<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      password: "",
      mobile: ""
    };
  },
  created() {
    PageHelper.Init(this);
  }
};
</script>
<style scoped>
.title {
  color: #231f20;
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 40px;
}
.loginbox {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 400px;
}
.loginbox .logo {
  width: 200px;
  height: 200px;
}
.logintext {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>