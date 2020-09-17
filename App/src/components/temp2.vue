<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <el-tabs v-model="activeName" :tab-position="'left'">
        <el-tab-pane label="开发组管理">
          <div class="padding-left">
            <div class="h3">开发组成员</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      activeName: "开发组成员",
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods: {},
};
</script>