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
              <div class="h3">产品设计</div>
              <div class="margin-top-4x">
                <div v-if="appinfo.devstatus=='A'">请先进入需求设计阶段，再开始需求分析</div>
                <div v-else>
                  <div class="flex-row flex-wrap" >
                    <el-card
                    v-for="item of speclist" :key="item"
                      class="design-card margin-bottom margin-right"
                      :body-style="{ padding: '0px' }"
                    >
                      <img class="cover" :src="uploadpath+'resource/'+Res.add"
                      
                      @click="loadproductdesign(item.id)"
                       />
                      <div class="padding-1x">
                        <div class="h4 bolder">{{item.name}}</div>
                        <div class="h7 f-g">{{item.summary}}</div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div>
              <div>
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
              name="productdesign"
              class="upload-demo"
              :action="fileupload+'?rettype=json&module=productdesign&field=productdesign'"
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
              name="uidesignlist"
              class="upload-demo"
              :action="fileupload+'?rettype=json&module=uidesignlist&field=uidesignlist'"
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
      default: null
    }
  },
  data() {
    return {
      Res: {},
      Inst: {},
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
        uidesignlist: []
      },
      speclist: []
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    HttpHelper.Post("app/schedulelist", {
      appalias: this.appinfo.alias
    }).then(schedulelist => {
      this.schedulelist = schedulelist;
      if (this.schedulelist.length > 0) {
        this.info = this.schedulelist[0];
        this.loadfunclist();
        this.loadspeclist();
      }
    });
  },
  methods: {
    minus(num) {
      num=parseInt(num);
      if (num <= 0) {
        return 0;
      }
      return num - 10;
    },
    plus(num) {
      num=parseInt(num);
      if (num >= 100) {
        return 100;
      }
      return num + 10;
    },
    handle2Remove(file, fileList) {
      this.productdesign.uidesignlist = fileList;
    },
    handleChange(file, fileList) {
      this.productdesign.uidesignlist = this.redo(fileList);
    },
    handle2Remove(file, fileList) {
      this.productdesign.designlist = fileList;
    },
    handleChange(file, fileList) {
      this.productdesign.designlist = this.redo(fileList);
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
        uidesignlist: []
      };
      this.showproductupload = true;
    },
    loadspeclist() {
      HttpHelper.Post("app/speclist", {
        appalias: this.appinfo.alias,
        appschedule_id: this.info.id
      }).then(speclist => {
        this.speclist = speclist;
      });
    },
    loadproductdesign(vpid) {
      HttpHelper.Post("app/specinfo", {id:vpid}).then(ret => {
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
        appschedule_id: this.info.id
      }).then(ret => {
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
        appschedule_id: this.info.id
      }).then(funclist => {
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
    saveSpec() {
      var json = this.productdesign;
      json.appalias = this.appinfo.alias;
      json.appschedule_id = this.info.id;
      HttpHelper.Post("app/updatespec", json).then(ret => {
        if (ret.code == 0) {
          this.$message("新增成功");
          this.showproductupload = false;
          this.loadspeclist();
        } else {
          this.$message({
            showClose: true,
            message: ret.return,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.design-card {
  width: 270px;
  height: 350px;
}

.design-card .cover {
  width: 270px;
  height: 270px;
}
</style>