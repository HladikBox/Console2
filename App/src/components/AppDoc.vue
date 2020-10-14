<template>
  <div class="padding">
    <div v-if="appinfo != null">
      <el-tabs v-model="activeName" :tab-position="'left'">
        <el-tab-pane label="需求文档">
          <div class="padding-left">
            <div class="h3">需求文档</div>
            <div class="margin-top-4x">
              <div id="pdfDom">
                <div class="padding-4x">
                    <h1>Hello world!</h1>
                    <el-divider></el-divider>
                    <h1>Hello world!2</h1>
                </div>
              </div>
              <el-button
                @click="getPdf('#pdfDom')"
                size="mini"
                class="margin-3 width-80"
                plain
                >导出</el-button
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="接口文档">
          <div class="padding-left">
            <div class="h3">接口文档</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="测试文档">
          <div class="padding-left">
            <div class="h3">接口文档</div>
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
      activeName: 0,
      pageData: "<h3>h3</h3><div>aa</div>", //接收html格式代码
      htmlTitle: "导出PDF的标题",
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods: {},
};
</script>