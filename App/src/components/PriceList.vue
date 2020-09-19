<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div class="w-100 h-100 bg-p" style="height:400px;">
      <div class="flex-row flex-center h-100">
        <div class="flex-1"></div>
        <div class="container flex-row flex-center">
          <div class="flex-1 margin-right-4x">
            <div class="h1 f-w">全面灵活的计划方案</div>
            <div class="margin-top h4 f-w">云易创为不同的软件级别的定制了专属的价格套餐，你可以根据你项目的级别升级你的项目。</div>
            <div class="margin-top-4x">
              <el-button round>选择套餐</el-button>
              <el-button type="success" round>大型企业私有定制</el-button>
            </div>
          </div>
          <div class="flex-1 text-right">
            <img :src="uploadpath+'resource/'+Res.pricelist" style="height:300px" />
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <div class="flex-row margin-bottom bg-w">
      <div class="flex-1"></div>
      <div class="container padding-top-4x padding-bottom-4x">
        <div class="flex-row flex-center">
          <div class="flex-1"></div>
          <div v-for="item of pricelist" :key="item" class="flex-1 text-center">
            <div class="h4">{{item.name}}</div>
            <div class="margin-top-1x">{{item.price}}</div>
          </div>
        </div>
        <div v-for="fitem of featurelist" :key="fitem" class="padding-top padding-bottom">
          <div class="flex-row flex-center">
            <div class="flex-1">{{fitem.name}}</div>
            <div v-for="item of pricelist" :key="item" class="flex-1 text-center">
              <div v-if="fitem.type=='text'" class="h6 f-g2">{{item[fitem.key]}}</div>
              <div v-if="fitem.type=='check'" class="h6 f-g2">
                <i v-if="item[fitem.key+'_value']=='Y'" class="el-icon-check f-s h6"></i>
                <i v-if="item[fitem.key+'_value']=='N'" class="el-icon-close f-d h6"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row flex-center margin-top-1x">
          <div class="flex-1"></div>
          <div v-for="item of pricelist" :key="item" class="flex-1 text-center">
            <el-button round type="primary" @click="routeto('/app-create')">创建项目</el-button>
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
      pricelist: [],
      featurelist: [
        { name: "模型数量", key: "modelnum", type: "text" },
        { name: "接口数量", key: "apinum", type: "text" },
        { name: "存储空间", key: "storespace", type: "text" },
        { name: "接口调用次数", key: "apicallnum", type: "text" },
        { name: "支持文件上传", key: "fileupload", type: "check" },
        { name: "支持项目管理", key: "specsupport", type: "check" },
        { name: "实时数据库", key: "realdatabase", type: "check" },
        { name: "支持在线开发", key: "onlinedevsupport", type: "check" },
        { name: "测试环境", key: "testenv", type: "check" },
        { name: "自动化测试", key: "autotest", type: "check" },
        { name: "技术支持", key: "techsupport", type: "text" },
        { name: "独立技术支持", key: "independenttechsupport", type: "text" },
        { name: "技术支持响应时间", key: "techsupporttime", type: "text" },
        { name: "数据自动备份", key: "databackup", type: "check" },
        { name: "https支持", key: "https", type: "check" },
        {
          name: "支持项目分离部署",
          key: "supportindependentdeploy",
          type: "check"
        },
        { name: "平均节约成本", key: "savemoney", type: "text" },
        { name: "平均节约时间", key: "savetime", type: "text" }
      ]
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    HttpHelper.Post("inst/pricelist", {}).then(pricelist => {
      this.pricelist = pricelist;
    });
  },
  methods: {}
};
</script>
<style scoped>
</style>