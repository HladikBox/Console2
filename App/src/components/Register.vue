<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div class="margin-top">
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
              <div v-html="registerprivacy.content" class="step1content bd padding"></div>
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
      step:1,
      registerprivacy:{}
    };
  },
  created() {
    PageHelper.Init(this);
    HttpHelper.Post("content/get", {keycode:"zcxz"}).then((content) => {
        content.content=Utils.HtmlDecode(content.content);
      this.registerprivacy = content;
    });
  },
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
.boxbg .step.active{
  border: solid 2px #5d80f5;
}
.boxbg .active{
  color: #5d80f5;
}
.line {
  background: #c0c4cc;
  height: 2px;
}
.step1content{
    height: 300px;
    overflow-y: scroll;
}
</style>