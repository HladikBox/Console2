<template>
  <div class="padding">
    <div class="flex-row">
      <div class="flex-1"></div>
      <div class="container bd">
        <el-steps :active="step" simple>
          <el-step title="初始化须知" icon="el-icon-edit"></el-step>
          <el-step title="选择继承项目" icon="el-icon-edit"></el-step>
          <el-step title="初始化" icon="el-icon-s-grid"></el-step>
          <el-step title="完成初始化" icon="el-icon-success"></el-step>
        </el-steps>
        <div class="padding ">
          <div  v-if="step==1">
            <div v-html="initprivacy" class="step1content bd padding"></div>
            <div class="margin-top">
                <el-checkbox v-model="checked">知道了</el-checkbox>
            </div>
              <div class="margin-top text-center">
                <el-button type="primary" round :disabled="checked==false" @click="step=2">下一步</el-button>
              </div>
          </div>
          <div v-if="step==2">
              <div class="h3">系统模版项目</div>
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
  props: {
    appinfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      step: 2,
      initprivacy: "",
      checked:false
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    HttpHelper.Post("content/get", { keycode: "initprivacy" }).then((content) => {
      this.initprivacy = Utils.HtmlDecode(content.content);
    });
  },
  methods: {},
};
</script>
<style scoped>

.step1content {
  height: 300px;
  overflow-y: scroll;
}
</style>