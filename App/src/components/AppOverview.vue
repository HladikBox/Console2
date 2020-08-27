<template>
    <div>Overview</div>
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
      Member: null
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods:{

  }
}
</script>