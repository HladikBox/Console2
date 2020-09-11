<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <div class="margin-top-4x" v-if="schedulelist.length==0">
        当前还没创建项目，
        <span class="f-p pointer" @click="routeto('schedule-create')">立即创建</span>
      </div>
      <div v-if="schedulelist.length>0">
        <el-tabs :tab-position="'left'">
          <el-tab-pane label="项目详情">
            <div class="padding-left">
              <div class="h3">{{info.name}}</div>
              <div class="margin-top-4x">
                <mavon-editor
                  class="md"
                  :value="info.appspec"
                  :subfield="false"
                  :defaultOpen="'preview'"
                  :toolbarsFlag="false"
                  :editable="false"
                  :scrollStyle="true"
                ></mavon-editor>
              </div>
              <div class="margin-top-4x" v-if="appinfo.adminright=='Y'">
                <el-button @click="changeSchedule">修改</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目日程">
            <div class="padding-left">
              <div class="h3">项目日程</div>
              <div class="margin-top-4x">
                <full-calendar :events="calendarevents" lang="zh"></full-calendar>
              </div>
              <div class="margin-top-4x" v-if="appinfo.adminright=='Y'">
                <el-button @click="changePeroid">修改</el-button>
              </div>
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
    <el-dialog title="编辑项目详情" :visible.sync="scheduleinfoshow" center width="800">
      <div class="margin-top">
        <el-input v-model="cpname" placeholder="项目阶段名称"></el-input>
      </div>
      <div class="margin-top">
        <mavon-editor placeholder="项目基础介绍" v-model="cpappspec"></mavon-editor>
      </div>
      <div class="margin-top">
        <el-button type="success" @click="savescheinfo">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改项目日程" :visible.sync="scheduleperoidshow" center width="800">
      <PeroidGenerate :peroidlist="peroidlist"></PeroidGenerate>
      <div class="margin-top">
        <el-button type="success" @click="saveperoid">保存</el-button>
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
      info: null,
      peroidlist: [],
      calendarevents: [],
      scheduleinfoshow: false,
      cpname: "",
      cpappspec: "",
      scheduleperoidshow: false,
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
        this.setCalendarEvent();
        //this.loadRightGroup();
      }
    });
  },
  methods: {
    changePeroid() {
      this.scheduleperoidshow = true;
    },
    saveperoid() {
      console.log({ saveperoid: this.peroidlist });
      HttpHelper.Post("app/peroidupdatebatch", {
        datajson: JSON.stringify(this.peroidlist),
        appalias: this.appinfo.alias,
        appschedule_id: this.info.id,
      }).then((ret) => {
        if (ret.code == "0") {
          this.setCalendarEvent();
          this.scheduleperoidshow = false;
        } else {
          this.$message({ message: "保存失败，请重试", type: "error" });
        }
      });
    },
    changeSchedule() {
      this.cpname = this.info.name;
      this.cpappspec = this.info.appspec;
      this.scheduleinfoshow = true;
    },
    savescheinfo(event) {
      //alert(this.cpappspec);
      HttpHelper.Post("app/updatescheduleinfo", {
        appalias: this.appinfo.alias,
        appschedule_id: this.info.id,
        name: this.cpname,
        appspec: this.cpappspec,
      }).then((ret) => {
        if (ret.code == "0") {
          this.info.name = this.cpname;
          this.info.appspec = this.cpappspec;
          this.$message({ message: "保存成功", type: "success" });
          this.scheduleinfoshow = false;
        } else {
          this.$message({ message: "保存失败，请重试", type: "error" });
        }
      });
    },
    setCalendarEvent() {
      HttpHelper.Post("app/peroidlist", {
        appschedule_id: this.info.id,
      }).then((peroidlist) => {
        this.peroidlist = peroidlist;
        var i = 0;
        for (var item of this.peroidlist) {
          this.calendarevents.push({
            title: item.name,
            start: item.startdate,
            end: item.enddate,
            cssClass: "CalLabel-" + i,
          });
          i++;
          if (i > 9) {
            i = 0;
          }
        }
      });
    },
  },
};
</script>
<style>
.CalLabel-0 {
  background-color: #409eff !important;
}
.CalLabel-1 {
  background-color: #67c23a !important;
}
.CalLabel-2 {
  background-color: #e6a23c !important;
}
.CalLabel-3 {
  background-color: #f56c6c !important;
}
.CalLabel-4 {
  background-color: #d32f2f !important;
}
.CalLabel-5 {
  background-color: #ff4081 !important;
}
.CalLabel-6 {
  background-color: #7b1fa2 !important;
}
.CalLabel-7 {
  background-color: #5d4037 !important;
}
.CalLabel-8 {
  background-color: #f57c00 !important;
}
.CalLabel-9 {
  background-color: #ffa000 !important;
}
</style>