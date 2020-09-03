<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <el-button @click="goBack">返回</el-button>
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
      showproductinfo:false
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods: {},
};
</script>