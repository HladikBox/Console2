<template>
  <div class="padding">
    <div class="flex-row">
      <div class="flex-1"></div>
      <div class="container bd">
        <el-steps :active="step" simple>
          <el-step title="填写项目资料" icon="el-icon-edit"></el-step>
          <el-step title="填写功能模块" icon="el-icon-s-grid"></el-step>
          <el-step title="设置项目周期" icon="el-icon-time"></el-step>
          <el-step title="完成创建" icon="el-icon-success"></el-step>
        </el-steps>
        <div class="padding">
          <div class v-if="step==1">
            <div class="flex-row">
              <div class="flex-1">
                <div class="flex-row flex-center padding-bottom">
                  <div class="width-1x">
                    <span class="f-d">*</span>项目名称
                  </div>
                  <div class="flex-1">
                    <el-input class="width-3x" v-model="name" placeholder="请输入项目名称"></el-input>
                  </div>
                </div>
                <div class="padding-bottom">
                  <div class="width-1x">详细需求</div>
                  <div class="margin-top">
                    <mavon-editor v-model="appspec" />
                  </div>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="text-center">
              <el-button @click="step=2" type="primary" :disabled="name==''">下一步</el-button>
            </div>
          </div>
          <div class v-if="step==2">
            

            <FuncGenerate :funlist="this.funlist"></FuncGenerate>
            <div class="text-center">
              <el-button @click="step=1" type="primary">上一步</el-button>
              <el-button @click="step=3" type="primary">下一步</el-button>
            </div>
          </div>
          <div class v-if="step==3">
            <PeroidGenerate :peroidlist="this.peroidlist"></PeroidGenerate>
            <div class="text-center">
              <el-button @click="step=2" type="primary">上一步</el-button>
              <el-button @click="submitproject" type="primary">创建项目</el-button>
            </div>
          </div>
          <div class v-if="step==4"></div>
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
      default: null
    }
  },
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      step: 1,
      name: "",
      appspec: "",
      funlist: [],
      peroidlist: []
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods: {
    submitproject(event) {

      this.$confirm("是否确定创建项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          HttpHelper.Post("app/scheduleupdate", {
            appalias: this.appinfo.alias,
            name: this.name,
            appspec: this.appspec
          }).then(ret => {
            if (ret.code == 0) {
              HttpHelper.Post("app/funcupdatebatch", {
                datajson: JSON.stringify(this.funlist),
                appalias: this.appinfo.alias,
                appschedule_id: ret.return
              });
              HttpHelper.Post("app/peroidupdatebatch", {
                datajson: JSON.stringify(this.peroidlist),
                appalias: this.appinfo.alias,
                appschedule_id: ret.return
              });
              this.$alert("创建成功，返回应用管理", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.goBack();
                }
              });
            } else {
              this.$message({
                showClose: true,
                message: ret.return,
                type: "warning"
              });
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>