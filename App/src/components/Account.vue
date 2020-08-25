<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div class="flex-row margin-top-4x margin-bottom">
      <div class="flex-1"></div>
      <div class="container bg-w bd">
        <div class="padding-4x">
          <div class="h4">个人中心</div>
          <el-divider></el-divider>
          <div class="flex-row">
            <div class="width">账号信息</div>
            <div class="flex-1">
              <div class="flex-row padding-bottom bd-bottom">
                <div class="width-1x">开发号</div>
                <div class="flex-1">{{Member.yycno}}</div>
                <div class="f-p pointer" @click="copy(Member.yycno)">复制开发号</div>
              </div>
              <div class="flex-row padding-bottom padding-top bd-bottom">
                <div class="width-1x">密码</div>
                <div class="flex-1">******</div>
                <div class="f-p pointer" @click="routeto('/passwordreset')">更改密码</div>
              </div>
              <div class="flex-row padding-bottom padding-top">
                <div class="width-1x">手机号</div>
                <div class="flex-1">{{Member.mobile}}</div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="flex-row">
            <div class="width">账号认证</div>
            <div class="flex-1">
              <div class="flex-row padding-bottom">
                <div class="width-1x">认证状态</div>
                <div class="flex-1">{{Member.isrenzhen_name}}</div>
                <div class="f-p pointer" v-if="Member!=null&&Member.isrenzhen=='N'" @click="routeto('/certification')">立即认证</div>
              </div>
              <div class="margin-top" v-html="content.content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
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
      content: {}
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    HttpHelper.Post("content/get", { keycode: "rzgz" }).then(content => {
      content.content = Utils.HtmlDecode(content.content);
      this.content = content;
    });
  },
  methods: {}
};
</script>
<style scoped>
</style>