<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <div class="margin-top-4x" v-if="schedulelist.length==0">
        当前还没创建项目，
        <span class="f-p pointer" @click="routeto('schedule-create')">立即创建</span>
      </div>
      <div v-if="schedulelist.length>0">
        <el-tabs :tab-position="'left'" value="产品设计">
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
          <el-tab-pane label="产品设计" name="产品设计">
            <div class="padding-left">
              <div class="flex-row">
                <div class="flex-1 h3">产品设计</div>
                <div>
                  <el-radio-group v-model="viewmode" size="small" @change="changeviemode">
                    <el-radio-button label="卡片模式"></el-radio-button>
                    <el-radio-button label="浏览模式"></el-radio-button>
                    <el-radio-button label="进度模式"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="margin-top-4x">
                <div v-if="appinfo.devstatus=='A'">请先进入需求设计阶段，再开始需求分析</div>
                <div v-else>
                  <div class="flex-row flex-wrap" v-if="viewmode=='进度模式'">
                    <div ref="chart" style="width:100%;min-height:375px" :style="{height:(speclist.length*60)+ 'px'}"></div>
                  </div>
                  <div class="flex-row flex-wrap" v-if="viewmode=='卡片模式'">
                    <el-card
                      v-for="item of speclist"
                      :key="item"
                      class="design-card margin-bottom margin-right"
                      :body-style="{ padding: '0px' }"
                    >
                      <el-image class="cover" :src="uploadpath+'appspec/'+item.cover">
                        <div slot="placeholder" class="image-slot">
                          加载中
                          <span class="dot">...</span>
                        </div>
                      </el-image>
                      <div class="padding-1x">
                        <div class="h4">{{item.name}}</div>
                        <div class="flex-row">
                          <div class="h7 flex-1 f-g margin-top-1x">{{item.summary}}</div>
                          <div>
                            <el-dropdown @command="carddropmenu">
                              <span class="el-dropdown-link">
                                <i class="el-icon-more" type="primary"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="modify" :id="item.id">修改</el-dropdown-item>
                                <el-dropdown-item command="b">编辑</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                  <div v-if="viewmode=='浏览模式'">
                    <div class="flex-row">
                      <div class="flex-1 padding-right bd-right">
                        <div class="margin-top" v-for="item of speclist" :key="item">
                          <div class="flex-row">
                            <div class="h3 flex-1" :id="'k_'+item.id">{{item.name}}</div>
                            <div>
                              <el-button type="primary" @click="loadproductdesign(item.id)">修改</el-button>
                            </div>
                          </div>
                          <div class="h6 margin-top f-g">{{item.summary}}</div>
                          <div class="flex-row flex-wrap">
                            <div
                              v-for="item2 of item.designlist"
                              :key="item2"
                              class="pointer"
                              @click="handle2Preview(uploadpath+'appspec/'+item2.file)"
                            >
                              <el-image
                                fit="contain"
                                class="cover margin-top margin-right"
                                :src="uploadpath+'appspec/'+item2.file"
                              >
                                <div slot="placeholder" class="image-slot">
                                  加载中
                                  <span class="dot">...</span>
                                </div>
                              </el-image>
                              <div class="text-center margin-top h7 f-g">{{item2.name}}</div>
                            </div>
                            <div
                              v-for="item2 of item.uidesignlist"
                              :key="item2"
                              class="pointer"
                              @click="handle2Preview(uploadpath+'appspec/'+item2.file)"
                            >
                              <el-image
                                fit="contain"
                                class="cover margin-top margin-right"
                                :src="uploadpath+'appspec/'+item2.file"
                              >
                                <div slot="placeholder" class="image-slot">
                                  加载中
                                  <span class="dot">...</span>
                                </div>
                              </el-image>
                              <div class="text-center margin-top h7 f-g">{{item2.name}}</div>
                            </div>
                          </div>
                          <el-divider></el-divider>
                        </div>
                      </div>
                      <div class="width">
                        <div class="rightmenu">
                          <div
                            v-for="item of speclist"
                            :key="item"
                            class="padding-1x pointer f-g navitem"
                            @click="godesign(item.id)"
                          >{{item.name}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="margin-top-4x">
                <el-button type="primary" @click="addproductdesign">
                  新增产品设计
                  <i class="el-icon-upload"></i>
                </el-button>
                <el-button type="primary">
                  批量上传
                  <i class="el-icon-document-copy"></i>
                </el-button>
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

    <el-dialog
      :title="productdesign.id!=undefined?'产品设计编辑':'产品设计新增'"
      :visible.sync="showproductupload"
      center
      width="900px"
    >
      <div>
        <div class="flex-row flex-center margin-top">
          <div class="margin-right width-1x">工作权重</div>
          <div>
            <el-input-number
              v-model="productdesign.weight"
              :min="10"
              :step="10"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </div>
        </div>
        <div class="flex-row flex-center margin-top">
          <div class="margin-right width-1x">名称</div>
          <div>
            <el-input placeholder="请输入名称" maxlength="20" v-model="productdesign.name"></el-input>
          </div>
        </div>
        <div class="flex-row flex-center margin-top">
          <div class="margin-right width-1x">描述</div>
          <div>
            <el-input
              class="width-3x"
              placeholder="请输入描述"
              type="textarea"
              maxlength="500"
              v-model="productdesign.summary"
            ></el-input>
          </div>
        </div>
        <div class="flex-row flex-center margin-top">
          <div class="margin-right width-1x">产品设计图</div>
          <div>
            <el-upload
              name="appspec"
              class="upload-demo"
              :action="fileupload+'?rettype=json&module=appspec&field=appspec'"
              :file-list="productdesign.designlist"
              list-type="picture"
              multiple
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-preview="handlePreview"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <div class="flex-row flex-center margin-top">
          <div class="margin-right width-1x">UI设计图</div>
          <div>
            <el-upload
              name="appspec"
              class="upload-demo"
              :action="fileupload+'?rettype=json&module=appspec&field=appspec'"
              :file-list="productdesign.uidesignlist"
              list-type="picture"
              multiple
              :on-remove="handle2Remove"
              :on-change="handle2Change"
              :on-preview="handlePreview"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="flex-row margin-top">
          <div class="margin-right width-1x">项目进度</div>
          <div class="width-4x">
            <div class="flex-row flex-center margin-top-1x">
              <div class="margin-right h7">设计进度</div>
              <div class="margin-right-1x">
                <i
                  class="el-icon-remove"
                  id="uidesign"
                  @click="productdesign.uidesignprogress=minus(productdesign.uidesignprogress)"
                />
              </div>
              <div class="flex-1">
                <el-progress
                  class
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="productdesign.uidesignprogress"
                >UI设计进度</el-progress>
              </div>
              <div class="margin-left-1x">
                <i
                  class="el-icon-circle-plus"
                  id="uidesign"
                  @click="productdesign.uidesignprogress=plus(productdesign.uidesignprogress)"
                />
              </div>
            </div>
            <div class="flex-row flex-center margin-top-1x">
              <div class="margin-right h7">接口进度</div>
              <div class="margin-right-1x">
                <i
                  class="el-icon-remove"
                  id="uidesign"
                  @click="productdesign.apiprogress=minus(productdesign.apiprogress)"
                />
              </div>
              <div class="flex-1">
                <el-progress
                  class
                  :text-inside="true"
                  :stroke-width="24"
                  :percentage="productdesign.apiprogress"
                  status="success"
                ></el-progress>
              </div>
              <div class="margin-left-1x">
                <i
                  class="el-icon-circle-plus"
                  id="uidesign"
                  @click="productdesign.apiprogress=plus(productdesign.apiprogress)"
                />
              </div>
            </div>
            <div class="flex-row flex-center margin-top-1x">
              <div class="margin-right h7">开发进度</div>
              <div class="margin-right-1x">
                <i
                  class="el-icon-remove"
                  id="uidesign"
                  @click="productdesign.developprogress=minus(productdesign.developprogress)"
                />
              </div>
              <div class="flex-1">
                <el-progress
                  class
                  :text-inside="true"
                  :stroke-width="22"
                  :percentage="productdesign.developprogress"
                  status="warning"
                ></el-progress>
              </div>
              <div class="margin-left-1x">
                <i
                  class="el-icon-circle-plus"
                  id="uidesign"
                  @click="productdesign.developprogress=plus(productdesign.developprogress)"
                />
              </div>
            </div>
            <div class="flex-row flex-center margin-top-1x">
              <div class="margin-right h7">测试进度</div>
              <div class="margin-right-1x">
                <i
                  class="el-icon-remove"
                  id="uidesign"
                  @click="productdesign.testprogress=minus(productdesign.testprogress)"
                />
              </div>
              <div class="flex-1">
                <el-progress
                  class
                  :text-inside="true"
                  :stroke-width="20"
                  :percentage="productdesign.testprogress"
                  status="exception"
                ></el-progress>
              </div>
              <div class="margin-left-1x">
                <i
                  class="el-icon-circle-plus"
                  id="uidesign"
                  @click="productdesign.testprogress=plus(productdesign.testprogress)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin-top">
        <el-button type="success" :disabled="productdesign.name==''" @click="saveSpec">保存</el-button>
        <el-button type="danger" v-if="productdesign.id!=undefined" @click="deleteSpec">删除</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改项目功能需求" :visible.sync="funcchangeshow" center width="900px">
      <FuncGenerate :funlist="funclist"></FuncGenerate>
      <div class="margin-top">
        <el-button type="success" @click="saveFunc">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
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
      viewmode: "浏览模式",
      Member: null,
      schedulelist: [],
      funclist: [],
      funcchangeshow: false,
      showproductupload: false,
      dialogVisible: false,
      dialogImageUrl: "",
      productdesign: {
        weight: 10,
        name: "",
        summary: "",
        uidesignprogress: 0,
        apiprogress: 0,
        developprogress: 0,
        testprogress: 0,
        designlist: [],
        uidesignlist: [],
      },
      speclist: [],
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
        this.loadspeclist();
      }
    });
  },
  methods: {
    loadChartData() {
      const chart = this.$refs.chart;
      if (chart) {
        var datayAxis=[];
        var a1=[];
        var a2=[];
        var a3=[];
        var a4=[];
        for(var item of this.speclist){
            datayAxis.push(item.name);
            a1.push(item.uidesignprogress);
            a2.push(item.apiprogress);
            a3.push(item.developprogress);
            a4.push(item.testprogress);
        }
        const myChart = this.$echarts.init(chart);
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            data: ["UI设计", "接口设计", "功能开发", "测试"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            data: datayAxis,
          },
          series: [
            {
              name: "UI设计",
              type: "bar",
              stack: "总量",
              label: {
                show: true,
                position: "insideRight",
              },
              data: a1,
            },
            {
              name: "接口设计",
              type: "bar",
              stack: "总量",
              label: {
                show: true,
                position: "insideRight",
              },
              data: a2,
            },
            {
              name: "功能开发",
              type: "bar",
              stack: "总量",
              label: {
                show: true,
                position: "insideRight",
              },
              data: a3,
            },
            {
              name: "测试",
              type: "bar",
              stack: "总量",
              label: {
                show: true,
                position: "insideRight",
              },
              data: a4,
            }
          ],
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
    changeviemode(label) {
      if (label == "进度模式") {
        this.loadChartData();
      }
    },
    godesign(id) {
      document.querySelector("#k_" + id).scrollIntoView(true);
    },
    carddropmenu(comm, event) {
      console.log("carddropmenu", comm, event);
      this.loadproductdesign(event.$el.id);
    },
    minus(num) {
      num = parseInt(num);
      if (num <= 0) {
        return 0;
      }
      return num - 10;
    },
    plus(num) {
      num = parseInt(num);
      if (num >= 100) {
        return 100;
      }
      return num + 10;
    },
    handle2Remove(file, fileList) {
      this.productdesign.uidesignlist = fileList;
    },
    handle2Change(file, fileList) {
      this.productdesign.uidesignlist = this.redo(fileList);
    },
    handleRemove(file, fileList) {
      this.productdesign.designlist = fileList;
    },
    handleChange(file, fileList) {
      this.productdesign.designlist = this.redo(fileList);
    },
    handle2Preview(url) {
      this.dialogVisible = true;
      this.dialogImageUrl = url;
    },
    handlePreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    addproductdesign() {
      this.productdesign = {
        weight: 10,
        name: "",
        summary: "",
        uidesignprogress: 0,
        apiprogress: 0,
        developprogress: 0,
        testprogress: 0,
        designlist: [],
        uidesignlist: [],
      };
      this.showproductupload = true;
    },
    loadspeclist() {
      HttpHelper.Post("app/speclist", {
        appalias: this.appinfo.alias,
        appschedule_id: this.info.id,
      }).then((speclist) => {
        this.speclist = speclist;
        this.loadChartData();
      });
    },
    loadproductdesign(vpid) {
      HttpHelper.Post("app/specinfo", {
        appalias: this.appinfo.alias,
        id: vpid,
      }).then((ret) => {
        for (var i = 0; i < ret.designlist.length; i++) {
          ret.designlist[i].url =
            this.uploadpath + "appspec/" + ret.designlist[i].file;
        }
        for (var i = 0; i < ret.uidesignlist.length; i++) {
          ret.uidesignlist[i].url =
            this.uploadpath + "appspec/" + ret.uidesignlist[i].file;
        }
        this.productdesign = ret;
        this.showproductupload = true;
      });
    },
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
    redo(fileList) {
      console.log("handleChange", fileList);
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].response != undefined) {
          var response = fileList[i].response;
          fileList[i].file = response.result;
          fileList[i].url =
            this.uploadpath + response.return + "/" + response.result;
        }
      }
      return fileList;
    },
    deleteSpec() {
      this.$confirm(
        "是否确定删除" + this.productdesign.name + "的设计图?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "danger",
        }
      ).then(() => {
        HttpHelper.Post("app/deletespec", {
          appalias: this.appinfo.alias,
          appschedule_id: this.info.id,
          id: this.productdesign.id,
        }).then((ret) => {
          this.$message("删除成功");
          this.showproductupload = false;
          this.loadspeclist();
        });
      });
    },
    saveSpec() {
      var json = this.productdesign;
      json.appalias = this.appinfo.alias;
      json.appschedule_id = this.info.id;
      console.log("productdesign", this.productdesign);
      if (this.productdesign.designlist.length > 0) {
        json.cover = this.productdesign.designlist[0].file;
      }
      if (this.productdesign.uidesignlist.length > 0) {
        json.cover = this.productdesign.uidesignlist[0].file;
      }

      HttpHelper.Post("app/updatespec", json).then((ret) => {
        if (ret.code == 0) {
          this.$message("新增成功");

          HttpHelper.Post("app/specdesignbatch", {
            appalias: this.appinfo.alias,
            appspec_id: ret.return,
            datajson: JSON.stringify(this.productdesign.designlist),
          });
          HttpHelper.Post("app/specuidesignbatch", {
            appalias: this.appinfo.alias,
            appspec_id: ret.return,
            datajson: JSON.stringify(this.productdesign.uidesignlist),
          });

          this.showproductupload = false;
          this.loadspeclist();
        } else {
          this.$message({
            showClose: true,
            message: ret.return,
            type: "warning",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.design-card {
  width: 270px;
  height: 350px;
}

.cover {
  width: 270px;
  height: 270px;
}
.rightmenu {
  position: fixed;
  right: 30px;
  top: 300px;
  height: 100vh;
}
.navitem:hover {
  color: #090909;
}
</style>
