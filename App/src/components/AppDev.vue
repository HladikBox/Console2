<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <el-tabs :tab-position="'left'" v-if="modellist.length>0">
        <el-tab-pane label="实体模型设计">
          <div class="padding-left">
            <div class="h3">实体模型设计</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="后台菜单设计">
          <div class="padding-left">
            <div class="h3">后台菜单设计</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据接口设计">
          <div class="padding-left">
            <div class="h3">数据接口设计</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="版本管理">
          <div class="padding-left">
            <div class="h3">版本管理</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" class="margin-top" @click="goinit">项目初始化</el-button>
    </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";

export default {
  props: {
    appinfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      inittips: "",
      modellist: []
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    HttpHelper.Post("content/get", { keycode: "inittips" }).then(content => {
      this.inittips = Utils.HtmlDecode(content.content);
    });
  },
  methods: {
    goinit() {
      if (this.modellist.length == 0) {
        this.routeto("dev-init");
      } else {
        this.$alert(this.inittips, "提示", {
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.routeto("dev-init");
        });
      }
    }
  }
};
</script>