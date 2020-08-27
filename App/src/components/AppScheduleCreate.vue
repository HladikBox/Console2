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
            <div class="padding-bottom">
              <div class="width-1x">项目功能模块</div>
              <div class="marign-top">
                <el-table :data="funlist" style="width: 100%">
                  <el-table-column label="模块" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="详情">
                    <template slot-scope="scope">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 4}"
                        v-model="scope.row.summary"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="优先级" width="100">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.priority" placeholder="请选择">
                        <el-option label="低" value="1"></el-option>
                        <el-option label="中" value="2"></el-option>
                        <el-option label="高" value="3"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="工作人天" width="100">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.workday" type="number"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                      <i class="el-icon-remove-outline f-d h4" @click="removeForFunc(scope)" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <div class="margin-top">
                  <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入需求功能模块，一行一个模块"
                    v-model="appfuncstr"
                  ></el-input>
                  <el-button
                    class="margin-top"
                    type="success"
                    @click="transferFuncStr"
                    :disabled="appfuncstr==''"
                  >添加</el-button>
                </div>
                <div class="f-g h7">
                  <p>
                    创建需求功能模块管理有助于后续需求人员、开发人员和测试人员等的人员进行项目整理，可以根据项目功能模块进行规划。
                    <br />一行一个功能点，按照以下格式填写，然后点击下方生成按钮，自动填充到表格，查看
                    <span class="f-p pointer">操作视频</span>
                  </p>
                  <div class="padding bg-g">
                    城市选择-->获取用户当前定位，用户可自行选择切换
                    <br />搜索页-->跳转页面，关键字搜索
                    <br />轮播图功能-->可点击跳转相关页面
                    <br />联盟卡列表-->我购买过的联盟列表
                    <br />足迹列表-->记录浏览过的商家
                    <br />商家列表-->商家筛选功能
                    <br />商家详情-->详情页面，导航功能，商家信息
                    <br />联盟列表-->联盟筛选功能
                    <br />联盟详情-->详情页面，电话拨打，海报生成
                    <br />购买流程-->相关购买流程，有可能涉及虚拟支付，类似加盟费
                    <br />暂无联盟-->暂无联盟页面时点击跳转至首页
                    <br />我加入的联盟-->联盟列表功能同上
                    <br />会员账号-->微信授权相关信息
                    <br />个人信息-->信息详情页面，录入编辑功能
                    <br />意见反馈-->反馈填写页面
                    <br />联系客服-->电话拨打
                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <el-button @click="resetFunList">重新填写</el-button>
              <el-button @click="step=1" type="primary">上一步</el-button>
              <el-button @click="step=3" type="primary">下一步</el-button>
            </div>
          </div>
          <div class v-if="step==3">
            <div class="padding-bottom">
              <div class="width-1x">项目周期设定</div>
              <div class="marign-top">
                <el-table :data="peroidlist" style="width: 100%">
                  <el-table-column label="名称" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="开始到结束" width="150">
                    <template slot-scope="scope">
                      <el-date-picker v-model="scope.row.startdate" type="date" placeholder="开始日期"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column label="结束日期" width="150">
                    <template slot-scope="scope">
                      <el-date-picker v-model="scope.row.enddate" type="date" placeholder="结束日期"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注">
                    <template slot-scope="scope">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 1, maxRows: 4}"
                        v-model="scope.row.remark"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                      <i class="el-icon-remove-outline f-d h4" @click="removeForPeroid(scope)" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <div class="margin-top">
                  <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入周期安排，一行一个模块"
                    v-model="appperoidstr"
                  ></el-input>
                  <el-button
                    class="margin-top"
                    type="success"
                    @click="transferPeroidStr"
                    :disabled="appperoidstr==''"
                  >添加</el-button>
                </div>
                <div class="f-g h7">
                  <p>
                    创建周期管理有助于后续需求人员、开发人员和测试人员等的人员进行项目整理，可以根据项目功能模块进行规划。
                    <br />一行一个功能点，按照以下格式填写，然后点击下方生成按钮，自动填充到表格，查看
                    <span class="f-p pointer">操作视频</span>
                  </p>
                  <div class="padding bg-g">
                    产品设计,2020-08-13,2020-08-20
                    <br />UI设计,2020-08-13,2020-08-20
                    <br />功能开发,2020-08-13,2020-08-20
                    <br />测试,2020-08-13,2020-08-20
                    <br />试运行,2020-08-13,2020-08-20
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <el-button @click="resetPeroidList">重新填写</el-button>
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
      appfuncstr: "",
      peroidlist: [],
      appperoidstr: ""
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods: {
    transferFuncStr(event) {
      var arr1 = this.appfuncstr.split("\n");
      for (var item of arr1) {
        var rtem = item.split("-->");
        this.funlist.push({
          name: rtem[0],
          summary: rtem[1],
          priority: "1",
          workday: 0
        });
      }
      this.appfuncstr = "";
    },
    removeForFunc(row) {
      console.log("removeForFunc", row, this.funlist);
      var funlist = [];
      for (var i = 0; i < this.funlist.length; i++) {
        if (row.$index != i) {
          funlist.push(this.funlist[i]);
        }
      }
      this.funlist = funlist;
    },
    resetFunList(event) {
      this.funlist = [];
      this.appfuncstr = "";
    },
    transferPeroidStr(event) {
      var arr1 = this.appperoidstr.split("\n");
      for (var item of arr1) {
        var rtem = item.split(",");
        this.peroidlist.push({
          name: rtem[0],
          startdate: rtem[1],
          enddate: rtem[2],
          remark: ""
        });
      }
      this.appperoidstr = "";
    },
    removeForPeroid(row) {
      var peroidlist = [];
      for (var i = 0; i < this.peroidlist.length; i++) {
        if (row.$index != i) {
          peroidlist.push(this.peroidlist[i]);
        }
      }
      this.peroidlist = peroidlist;
    },
    resetPeroidList(event) {
      this.peroidlist = [];
      this.appperoidstr = "";
    },
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