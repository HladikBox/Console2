<template>
  <div>
    <div class="lightbar"></div>
    <div class="row flex-center">
      <div>
        <div class="title">{{Inst.name}}</div>
      </div>
    </div>
    <div class="row flex-center">
      <div>
        <div class="loginbox">
          <div>
            <img class="logo" :src="uploadpath+'inst/'+Inst.logo" />
          </div>
          <h2 class="logintext">登录</h2>
          <h4>账户:</h4>
          <div>
              <at-input v-model="mobile" maxlength='11' autofocus size='large' type="tel" placeholder="请输入注册的手机号"></at-input>
          </div>
        </div>
      </div>
    </div>
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
        mobile: 'Hello Vue!'
    };
  },
  created() {
    PageHelper.Init(this);
  },
};
</script>
<style scoped>
.title {
  color: #231f20;
  font-size: 50px;
  font-weight: bolder;
  margin-top: 80px;
  margin-bottom: 40px;
}
.lightbar {
  background-image: linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 10px;
}
.loginbox {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
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