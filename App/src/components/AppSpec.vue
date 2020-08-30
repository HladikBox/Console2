<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <div class="margin-top-4x" v-if="schedulelist.length==0">
        当前还没创建项目，
        <span class="f-p pointer" @click="routeto('schedule-create')">立即创建</span>
      </div>
      <div v-if="schedulelist.length>0">
        <el-tabs :tab-position="'left'">
          <el-tab-pane label="功能列表">
            <div class="padding-left">
              <div class="h3">功能列表</div>
              <div class="margin-top-4x">
                <template>
                  <el-table :data="funclist" style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="summary" label="描述" width="540"></el-table-column>
                    <el-table-column prop="priority_name" label="优先级"></el-table-column>
                    <el-table-column prop="workday" label="工作人天"></el-table-column>
                  </el-table>
                </template>
              </div>
              <div class="margin-top-4x" v-if="appinfo.adminright=='Y'">
                <el-button @click="changeFunc">修改</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="产品设计">
            <div class="padding-left">
              <div class="h3">产品设计</div>
              <div class="margin-top-4x">
                <div v-if="appinfo.devstatus=='A'">请先进入需求设计阶段，再开始需求分析</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="UI设计">
            <div class="padding-left">
              <div class="h3">UI设计</div>
              <div class="margin-top-4x"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog title="修改项目功能需求" :visible.sync="funcchangeshow" center width="900px">
      <FuncGenerate :funlist="funclist"></FuncGenerate>
      <div class="margin-top">
        <el-button type="success" @click="saveFunc">保存</el-button>
      </div>
    </el-dialog>
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
      schedulelist: [],
      funclist: [],
      funcchangeshow: false,
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    HttpHelper.Post("app/schedulelist", {
      appalias: this.appinfo.alias,
    }).then((schedulelist) => {
      this.schedulelist = schedulelist;
      if (this.schedulelist.length > 0) {
        this.info = this.schedulelist[0];
        this.loadfunclist();
      }
    });
  },
  methods: {
    changeFunc() {
      this.funcchangeshow = true;
    },
    saveFunc() {
      HttpHelper.Post("app/funcupdatebatch", {
        datajson: JSON.stringify(this.funclist),
        appalias: this.appinfo.alias,
        appschedule_id: this.info.id,
      }).then((ret) => {
        if (ret.code == "0") {
          this.loadfunclist();
          this.funcchangeshow = false;
        } else {
          this.$message({ message: "保存失败，请重试", type: "error" });
        }
      });
    },
    loadfunclist() {
      HttpHelper.Post("app/funclist", {
        appschedule_id: this.info.id,
      }).then((funclist) => {
        this.funclist = funclist;
      });
    },
  },
};
</script>