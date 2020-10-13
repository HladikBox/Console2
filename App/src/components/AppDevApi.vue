<template>
  <div>
    <div class="flex-row">
      <div class="flex-1">
        <div>
          <el-table
            :data="apilist"
            style="width: 100%"
            highlight-current-row
            :row-class-name="tableRowClassName"
          >
            <el-table-column label="接口名称" width="120">
              <template slot-scope="scope">
                <div>{{scope.row.data==""?'未设置':scope.row.data.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="接口地址">
              <template slot-scope="scope">
                <div
                  class="f-p pointer"
                  @click="handleCurrentChange(scope.row)"
                >api/{{scope.row.model}}/{{scope.row.func}}</div>
              </template>
            </el-table-column>
            <el-table-column label="启用" width="60">
              <template slot-scope="scope">
                <el-switch :value="scope.row.active=='1'" @change="setactive(scope.row)"></el-switch>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="margin-top-4x">
          <el-button size="mini" @click="addapi">新增接口</el-button>
          <el-button size="mini" type="info" @click="loadapi">刷新</el-button>
        </div>
      </div>
      <div class="flex-2">
        <div class="padding" v-loading="loading">
          <div v-if="api!=null">
            <div class="savebtn">
              <el-button type="primary" @click="saveApi">保存</el-button>
            </div>
            <div class="flex-row flex-center">
              <div class="flex-1">
                <div class="flex-row flex-center">
                  <div class="width-1x f-g h6">接口地址</div>
                  <div class="flex-1 f-p">api/{{api.model}}/{{api.func}}</div>
                </div>
              </div>
              <div class="margin-right-1x">
                <el-switch :value="api.active=='1'" @change="setactive(api,true)"></el-switch>
              </div>
              <div>启用</div>
            </div>
            <div class="flex-row flex-center margin-top-1x">
              <div class="width-1x f-g h6">接口名称</div>
              <div class="flex-1">
                <el-input size="mini" placeholder="填写接口名称" v-model="api.name" />
              </div>
            </div>
            <div class="flex-row margin-top-1x">
              <div class="width-1x f-g h6">详细描述</div>
              <div class="flex-1">
                <el-input
                  type="textarea"
                  size="mini"
                  placeholder="接口的详细描述"
                  v-model="api.description"
                  :rows="2"
                />
              </div>
            </div>
            <div class="flex-row flex-center margin-top-1x">
              <div class="width-1x f-g h6">关联模型</div>
              <div class="flex-1 margin-right">
                <el-select size="mini" v-model="api.relmodel" clearable placeholder="请选择">
                  <el-option
                    v-for="item in modellist"
                    :key="item.modelname"
                    :label="item.modelname+' - '+item.name"
                    :value="item.modelname"
                  ></el-option>
                </el-select>
              </div>
              <div class="width-1x f-g h6">关联方法</div>
              <div class="flex-1">
                <el-select size="mini" v-model="api.relfunc" clearable placeholder="请选择">
                  <el-option
                    v-for="item in funclist"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </div>
              <div class="margin-right-1x">
                <el-checkbox v-model="api.isrelative">接口和模型关联</el-checkbox>
              </div>
              <div>
                <el-button @click="generateApi" type="primary">生成</el-button>
              </div>
            </div>
            <div class="f-g h6 margin-top-1x">接口代码</div>
            <div class="margin-top-1x">
              <el-input type="textarea" v-model="api.apicontent" autosize></el-input>
            </div>
            <div class="flex-row flex-center">
              <div class="flex-1 margin-right">
                <el-divider content-position="left">接口参数</el-divider>
              </div>
              <div>
                <el-button size="mini" v-if="api.isrelative==true" @click="generateInput">生成</el-button>
                <el-button size="mini" @click="addcustom">添加</el-button>
              </div>
            </div>
            <div class="f-g h6 margin-top-1x">输入</div>
            <div class="margin-top-1x">
              <el-table :data="api.input" style="width: 100%">
                <el-table-column label="字段">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.key"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="含义">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.name"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="是否必录">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.required"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="值范围">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.valuescope"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="测试值">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.testvalue"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="添加接口" :visible.sync="showadd" center>
      <div class="padding">
        <div>接口路径</div>

        <div class="flex-row flex-center margin-top-1x">
          <div>api</div>
          <div class="margin-right-1x margin-left-1x">/</div>
          <div>
            <el-input size="mini" placeholder="一级路径" v-model="addmodel" />
          </div>
          <div class="margin-right-1x margin-left-1x">/</div>
          <div>
            <el-input size="mini" placeholder="二级路径" v-model="addfunc" />
          </div>
        </div>
        <el-button type="primary" class="margin-top-1x" @click="add">确定添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
      api: null,
      apilist: [],
      loading: false,
      modellist: [],
      funclist: [],
      showadd: false,
      addmodel: "",
      addfunc: "",
    };
  },
  created() {
    this.loadapi();
  },
  methods: {
    add() {
      HttpHelper.Post("app/addapi", {
        appalias: this.appinfo.alias,
        model: this.addmodel,
        func: this.addfunc,
      }).then(() => {
        this.loadapi();
        this.handleCurrentChange({ model: this.addmodel, func: this.addfunc });
        this.showadd = false;
      });
    },
    addapi() {
      this.addmodel = "";
      this.addfunc = "";
      this.showadd = true;
    },
    loadapi() {
      HttpHelper.Post("inst/funccreatelist", {}).then((funclist) => {
        this.funclist = funclist;
      });
      HttpHelper.Post("app/modellist", { appalias: this.appinfo.alias }).then(
        (modellist) => {
          this.modellist = modellist;
        }
      );
      HttpHelper.Post("app/apilist", { appalias: this.appinfo.alias }).then(
        (apilist) => {
          this.apilist = apilist;
        }
      );
    },
    setactive(val, refreshlist = false) {
      val.active = val.active == "1" ? "0" : "1";
      if (refreshlist == true) {
        console.log("apilist", this.apilist);
        for (var apiitem of this.apilist) {
          if (apiitem.model == val.model && apiitem.func == val.func) {
            apiitem.active = val.active;
          }
        }
      }
      if (
        this.api != null &&
        this.api.model == val.model &&
        this.api.func == val.func
      ) {
        this.api.active = val.active;
      }
      HttpHelper.Post("app/setapiactive", {
        appalias: this.appinfo.alias,
        model: val.model,
        func: val.func,
        active: val.active,
      });
    },
    handleCurrentChange(val) {
      if (
        this.api != null &&
        this.api.model == val.model &&
        this.api.func == val.func
      ) {
        return;
      }
      this.loading = true;
      HttpHelper.Post("app/getapicontent", {
        appalias: this.appinfo.alias,
        model: val.model,
        func: val.func,
      }).then((api) => {
        api.isrelative = api.isrelative == "true";
        for(var item of api.input){
          item.required=item.required=="1";
          item.custom=item.custom=="1";
        }
        if(api.apicontent==""){
          api.apicontent="<?php \r\n\r\n\r\n\r\n   ?>";
        }
        this.api = api;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
    generateApi() {
      if (this.api.relmodel == "") {
        this.$alert("请选择关联模型", "提示");
        return;
      }
      if (this.api.relfunc == "") {
        this.$alert("请选择关联方法", "提示");
        return;
      }
      for (var model of this.modellist) {
        if (model.modelname == this.api.relmodel) {
          for (var func of this.funclist) {
            if (this.api.relfunc == func.key) {
              this.api.isrelative = true;
              var codestr = func.content;
              codestr = codestr.replace(/&quot;/g, '"');
              codestr = codestr.replace(/&gt;/g, ">");
              codestr = codestr.replace(/&lt;/g, "<");
              codestr = codestr.replace(/{MODEL}/g, model.modelname);
              this.api.apicontent ="<?php \r\n\r\n\r\n"+ codestr +" \r\n\r\n\r\n?>";
              this.generateInput();
              return;
            }
          }
        }
      }
    },
    getFieldValueScope(field) {
      //  { name: "文本", type: "text" },
      //         { name: "密码", type: "password" },
      //         { name: "选中", type: "check" },
      //         { name: "下拉", type: "select" },
      //         { name: "数值", type: "number" },
      //         { name: "文件上传", type: "upload" },
      //         { name: "日期", type: "datetime" },
      //         { name: "表关联下拉", type: "fkey" },
      //         { name: "表关联多选", type: "flist" },
      //         { name: "网络链接", type: "url" },
      //         { name: "颜色", type: "color" },
      //         { name: "下级数据", type: "grid" },
      //         { name: "长文本", type: "longtext" },
      //         { name: "HTML编辑", type: "html" }
      if (field.type == "check") {
        return "Y:" + field.yvalue + ",N:" + field.nvalue;
      }
      if (field.type == "select") {
        var opt = [];
        for (var option of field.options.option) {
          opt.push(option.value + ":" + option.name);
        }
        return opt.join(",");
      }
      if (field.type == "number") {
        return (
          (field.isdecimal == "1" ? "浮点数" : "整数") +
          (field.maxvalue == "" ? "" : ", 小于:" + field.maxvalue) +
          (field.minvalue == "" ? "" : ", 大于:" + field.minvalue) +
          (field.unit == "" ? "" : ", 单位:" + field.unit)
        );
      }
      if (field.type == "upload") {
        return "文件名";
      }
      if (field.type == "datetime") {
        return field.onlydate == "1"
          ? "日期（2020-03-05）"
          : "日期时间(2020-03-05 17:12:58)";
      }
      if (field.type == "flist") {
        return "模型关联表的id字段";
      }
      if (field.type == "fkey") {
        return '模型关联表的id字段联合,例如"1,2,3,4"';
      }
      if (field.type == "url") {
        return "网络路径";
      }
      if (field.type == "color") {
        return "颜色标记，如#cccaaa";
      }
      if (field.type == "html") {
        return "html文本";
      }
      return "文本";
    },
    addcustom() {
      this.api.input.push({
        key: "",
        name: "",
        required: false,
        custom: true,
        valuescope: "",
        testvalue: "",
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.api != null) {
        if (row.model == this.api.model && row.func == this.api.func) {
          return "heightline";
        }
      }
      return "";
    },
    saveApi() {
      HttpHelper.Post("app/saveapi", {
        appalias: this.appinfo.alias,
        model: this.api.model,
        func: this.api.func,
        name: this.api.name,
        description: this.api.description,
        relmodel: this.api.relmodel,
        relfunc: this.api.relfunc,
        apicontent: this.api.apicontent,
        isrelative: this.api.isrelative,
        input: JSON.stringify(this.api.input),
      }).then((ret) => {});
    },
    generateInput() {
      if (this.api.relmodel == "") {
        this.$alert("请选择关联模型", "提示");
        return;
      }
      if (this.api.relfunc == "") {
        this.$alert("请选择关联方法", "提示");
        return;
      }
      for (var model of this.modellist) {
        if (model.modelname == this.api.relmodel) {
          for (var func of this.funclist) {
            if (this.api.relfunc == func.key) {
              var input = [];
              if (func.type == "update") {
                input.push({
                  key: "primary_id",
                  name: "数据更新主键值，为空则新增数据",
                  required: false,
                  custom: false,
                  valuescope: "整数",
                  testvalue: "",
                });
              }
              if (func.type == "get") {
                if (model.nolist != "1") {
                  input.push({
                    key: "id",
                    name: "数据主键值",
                    required: false,
                    custom: false,
                    valuescope: "整数",
                    testvalue: "",
                  });
                }
              }
              if (func.type == "delete") {
                input.push({
                  key: "idlist",
                  name: '数据主键值联合，例如"1,2,3,4"',
                  required: true,
                  custom: false,
                  valuescope: "字符串",
                  testvalue: "",
                });
              }
              if (func.type == "batchupdate") {
                input.push({
                  key: "datajson",
                  name: "单条数据的json数组，转成字符串",
                  required: true,
                  custom: false,
                  valuescope: "json字符串",
                  testvalue: "",
                });
              }
              if (func.type == "list" || func.type == "update") {
                for (var field of model.fields.field) {
                  if (func.type == "list" && field.search == "1") {
                    var valuescope = this.getFieldValueScope(field);
                    input.push({
                      key: field.key,
                      name: field.name,
                      required: true,
                      custom: false,
                      valuescope: valuescope,
                      testvalue: "",
                    });
                  }
                  if (func.type == "update" && field.type != "grid") {
                    var valuescope = this.getFieldValueScope(field);
                    input.push({
                      key: field.key,
                      name: field.name,
                      custom: false,
                      required: field.notnull == "1",
                      valuescope: valuescope,
                      testvalue: "",
                    });
                  }
                }
              }
              var oldinput = this.api.input;
              this.api.input = input;
              for (var ip of oldinput) {
                if (ip.custom == true) {
                  this.api.push(ip);
                }
              }
              return;
            }
          }
        }
      }
    },
  },
};
</script>
<style >
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.savebtn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}
.el-table .heightline {
  background: #f0f9eb;
}
</style>