<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div class="flex-row margin-top-4x margin-bottom">
      <div class="flex-1"></div>
      <div class="container bg-w bd" v-if="appinfo!=null" >
          <div class="padding-4x">
              
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
      appinfo:null
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    
    HttpHelper.Post("app/info", { alias: this.$route.params.alias }).then(appinfo => {
      this.appinfo = appinfo;
    });
  },
  methods:{

  }
}
</script>
<style scoped>

</style>