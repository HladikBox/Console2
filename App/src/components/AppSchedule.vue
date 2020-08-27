<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <div class="margin-top-4x" v-if="schedulelist.length==0">
        当前还没创建项目，
        <span class="f-p pointer" @click="routeto('schedule-create')">立即创建</span>
      </div>
      <div v-if="schedulelist.length>0">
        <el-tabs :tab-position="'left'" >
          <el-tab-pane label="项目详情">
            <div class="padding-left">
              <div class="h3">{{info.name}}</div>
              <div class="margin-top-4x">
                  <mavon-editor
                class="md"
                :value="info.appspec"
                :subfield = "false"
                :defaultOpen = "'preview'"
                :toolbarsFlag = "false"
                :editable="false"
                :scrollStyle="true"
            ></mavon-editor>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目日程">
            <div class="padding-left">
              <div class="h3">项目日程</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="开发组管理">
            <div class="padding-left">
              <div class="h3">开发组成员</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史项目">
            <div class="padding-left">
              <div class="h3">开发组管理</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
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
      schedulelist: [],
      info:null
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    HttpHelper.Post("app/schedulelist", {
      appalias: this.appinfo.alias
    }).then(schedulelist => {
      this.schedulelist = schedulelist;
      if(this.schedulelist.length>0){
          this.info=this.schedulelist[0];
      }
    });
  },
  methods: {}
};
</script>