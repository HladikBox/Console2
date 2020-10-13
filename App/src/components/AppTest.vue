<template>
  <div class="padding">
    <div v-if="appinfo != null">
      <el-tabs :tab-position="'left'">
        <el-tab-pane label="接口测试">
          <div class="padding-left">
            <div class="h3">接口测试</div>
            <div class="margin-top-4x">
              <div class="flex-row flex-center">
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="totalapi"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">测试进度</div>
                </div>
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="successapi"
                      color="#5cb87a"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">成功</div>
                </div>
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="wanringapi"
                      color="#e6a23c"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">半成功</div>
                </div>
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="failureapi"
                      color="#f56c6c"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">失败</div>
                </div>
              </div>
              <el-divider content-position="left">测试Header</el-divider>
              <div class="flex-row flex-center">
                <div class="width-1x">UNICODE</div>
                <div class="width margin-right">
                  <el-input
                    v-model="appinfo.testunicode"
                    @change="saveheader"
                  ></el-input>
                </div>
                <div class="width-1x">TOKEN</div>
                <div class="width margin-right">
                  <el-input
                    v-model="appinfo.testtoken"
                    @change="saveheader"
                  ></el-input>
                </div>
                <div class="width-1x">TOKENKEY</div>
                <div class="width margin-right">
                  <el-input
                    v-model="appinfo.testtokenkey"
                    @change="saveheader"
                  ></el-input>
                </div>
                <div class="flex-1"></div>
                <div>
                  <el-button @click="loadApitestList">刷新</el-button>
                  <el-button type="primary" @click="batchtest"
                    >启动批量测试</el-button
                  >
                </div>
              </div>
              <el-divider></el-divider>
              <el-table
                :data="testlist"
                style="width: 100%"
                v-loading="batchloading"
              >
                <el-table-column
                  prop="api_name"
                  label="接口名称"
                  width="180"
                ></el-table-column>
                <el-table-column label="接口路径" width="180"
                  ><template slot-scope="scope">
                    <div class="flex-row">
                      <div>{{ scope.row.api }}</div>
                      <div class="margin-left-1x">
                        <i
                          class="h4 pointer f-p el-icon-circle-plus-outline"
                          @click="gennewdate(scope.row.apidata)"
                        ></i>
                      </div>
                    </div> </template
                ></el-table-column>
                <el-table-column label="测试" width="180">
                  <template slot-scope="scope">
                    <div class="flex-row">
                      <div>{{ scope.row.name }}</div>
                      <div class="margin-left-1x">
                        <i
                          class="h4 pointer f-p el-icon-edit"
                          @click="edittest(scope.row)"
                        ></i>
                        <i
                          class="h4 pointer f-p el-icon-close"
                          v-if="scope.row.id"
                          @click="deletetest(scope.row)"
                        ></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="inputstr"
                  label="输入"
                  width="250"
                ></el-table-column>
                <el-table-column label="输出">
                  <template slot-scope="scope">
                    <div v-html="scope.row.output"></div>
                  </template>
                </el-table-column>
                <el-table-column label="测试结果" width="150">
                  <template slot-scope="scope">
                    <i class="el-icon-success f-g" v-if="scope.row.result == ''"
                      >等待测试</i
                    >
                    <i
                      class="el-icon-success f-s"
                      v-if="scope.row.result == 'A'"
                    ></i>
                    <i
                      class="el-icon-warning f-warn"
                      v-if="scope.row.result == 'B'"
                    ></i>
                    <i
                      class="el-icon-error f-d"
                      v-if="scope.row.result == 'C'"
                    ></i>
                    {{ scope.row.resultstr }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="测试进度">
          <div class="padding-left">
            <div class="h3">测试进度</div>
            <div class="margin-top-4x">

              <el-divider content-position="left">接口测试</el-divider>
              <div class="flex-row flex-center">
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="totalapi"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">测试进度</div>
                </div>
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="successapi"
                      color="#5cb87a"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">成功</div>
                </div>
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="wanringapi"
                      color="#e6a23c"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">半成功</div>
                </div>
                <div class="margin-right">
                  <div>
                    <el-progress
                      type="circle"
                      :percentage="failureapi"
                      color="#f56c6c"
                    ></el-progress>
                  </div>
                  <div class="margin-top text-center">失败</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="后台测试">
          <div class="padding-left">
            <div class="h3">后台测试</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="UI测试">
          <div class="padding-left">
            <div class="h3">UI测试</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="编辑测试" :visible.sync="showedit" width="80%">
      <div v-if="test != null">
        <div class="flex-row flex-center">
          <div class="width-1x">名称</div>
          <div class="width-3x">
            <el-input v-model="test.name" maxlength="20"></el-input>
          </div>
        </div>
        <div class="flex-row margin-top-1x">
          <div class="width-1x">详情</div>
          <div class="flex-1">
            <el-input v-model="test.description" type="textarea"></el-input>
          </div>
        </div>
        <el-divider content-position="left">输入参数</el-divider>
        <div>
          <el-table :data="test.input" style="width: 100%">
            <el-table-column label="字段" prop="key"></el-table-column>
            <el-table-column label="含义" prop="name"></el-table-column>
            <el-table-column prop="required" label="是否必录">
              <template slot-scope="scope">{{
                scope.row.required == "1" ? "是" : "否"
              }}</template>
            </el-table-column>
            <el-table-column label="值范围" prop="valuescope"></el-table-column>
            <el-table-column label="测试值">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.testvalue"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-divider content-position="left">测试结果</el-divider>
        <div v-html="test.output"></div>
        <div class="flex-row margin-top-1x">
          <div class="width-1x">结果匹配</div>
          <div class="flex-1">
            <el-input v-model="test.expression" type="textarea"></el-input>
          </div>
        </div>
        <div class="flex-row flex-center margin-top-1x">
          <div class="width-1x">结果类型</div>
          <div class="flex-1">
            <el-select v-model="test.type" placeholder="请选择">
              <el-option label="JSON对象" value="obj"></el-option>
              <el-option label="数组" value="array"></el-option>
              <el-option label="结果" value="result"></el-option>
              <el-option label="文本" value="text"></el-option>
            </el-select>
          </div>
          <div class="width-1x">测试时间</div>
          <div class="flex-1">{{ test.lasttest_formatting }}</div>
          <div class="width-1x">结果</div>
          <div class="flex-1">
            <i class="el-icon-success f-s" v-if="test.result == 'A'">通过</i>
            <i class="el-icon-warning f-warn" v-if="test.result == 'B'"
              >半通过</i
            >
            <i class="el-icon-error f-d" v-if="test.result == 'C'">不通过</i>
          </div>
          <div class="width-1x">结果分析</div>
          <div class="flex-1">
            {{ test.resultstr }}
          </div>
        </div>
        <div class="margin-top-4x text-center">
          <el-button @click="savetest" type="primary">保存并测试</el-button>
          <el-button @click="testapi" v-if="test != null && test.id"
            >临时测试</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";
import AppDevMenu from "./AppDevMenu";
import AppDevApi from "./AppDevApi";
import AppDevVersion from "./AppDevVersion";

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
      testlist: [],
      test: null,
      showedit: false,
      batchloading: false,
      waitloading: 0,
      matchrow: [],
      totalapi: 0,
      successapi: 0,
      wanringapi: 0,
      failureapi: 0,
    };
  },
  components: {
    AppDevMenu: AppDevMenu,
    AppDevApi: AppDevApi,
    AppDevVersion: AppDevVersion,
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    this.loadApitestList();
  },
  methods: {
    saveheader() {
      HttpHelper.Post("app/saveapitestheader", {
        appalias: this.appinfo.alias,
        testtoken: this.appinfo.testtoken,
        testunicode: this.appinfo.testtoken,
        testtokenkey: this.appinfo.testtokenkey,
      });
    },
    savetest() {
      if (this.test.type == "") {
        this.$alert("请选择数据返回类型", "提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      var json = { appalias: this.appinfo.alias };
      json.api = this.test.api;
      json.name = this.test.name;
      json.summary = this.test.summary;
      if (this.test.id != undefined) {
        json.primary_id = this.test.id;
      }
      json.input = JSON.stringify(this.test.input);
      json.type = this.test.type;
      json.expression = this.test.expression;
      HttpHelper.Post("app/saveapitest", json).then((ret) => {
        this.test.id = ret.return;
        this.testapi(this.test);
        //this.loadApitestList();
      });
    },
    testapi(test, autoloadlist = true, callabck = null) {
      var inputstr = [];
      for (var ip of test.input) {
        if (ip.testvalue != "") {
          inputstr.push(ip.key + "=" + encodeURIComponent(ip.testvalue));
        }
      }

      HttpHelper.ApiTest(
        Config.CMSDEVApi +
          "yyc" +
          this.appinfo.member_yycno +
          "/" +
          this.appinfo.alias +
          "/api/" +
          test.api,
        inputstr.join("&"),
        this.appinfo.testtoken,
        this.appinfo.testtokenkey,
        this.appinfo.testunicode
      ).then((response) => {
        var json = {
          appalias: this.appinfo.alias,
          apitest_id: test.id,
          output: JSON.stringify(response.data),
          result: "",
          resultstr: "",
        };
        if (response.status == 200) {
          var objtype = Object.prototype.toString.call(response.data);
          if (test.type == "obj") {
            if (objtype == "[object Object]") {
              if (response.data == null) {
                json.result = "B";
                json.resultstr = "返回null";
              } else {
                json.result = "A";
                json.resultstr = "通过";
              }
            } else {
              json.result = "C";
              json.resultstr = "类型不匹配, 返回类型为" + objtype;
            }
          } else if (test.type == "array") {
            if (objtype == "[object Array]") {
              if (response.data.length == 0) {
                json.result = "B";
                json.resultstr = "返回空数组";
              } else {
                json.result = "A";
                json.resultstr = "通过";
              }
            } else {
              json.result = "C";
              json.resultstr = "类型不匹配, 返回类型为" + objtype;
            }
          } else if (test.type == "result") {
            if (objtype == "[object Object]") {
              if (response.data == null) {
                json.result = "B";
                json.resultstr = "返回空数组";
              } else {
                if (response.data.code == 0) {
                  json.result = "A";
                  json.resultstr = "通过";
                } else {
                  json.result = "B";
                  json.resultstr = "返回结果code不等于0";
                }
              }
            } else {
              json.result = "C";
              json.resultstr = "类型不匹配, 返回类型为" + objtype;
            }
          } else if (test.type == "text") {
            if (objtype == "[object String]") {
              if (response.data == "") {
                json.result = "B";
                json.resultstr = "返回空字符串";
              } else {
                if (response.data != test.expression) {
                  json.result = "B";
                  json.resultstr = "返回结果不匹配, 应该为:" + test.expression;
                } else {
                  json.result = "A";
                  json.resultstr = "通过";
                }
              }
            } else {
              json.result = "C";
              json.resultstr = "类型不匹配, 返回类型为" + objtype;
            }
          }
        } else {
          json.result = "C";
          json.resultstr = "接口" + response.status;
        }
        test.output = json.output;
        test.result = json.result;
        test.resultstr = json.resultstr;

        //alert(JSON.stringify(json));
        HttpHelper.Post("app/updateapitestresult", json).then((ret) => {
          test.lasttest_formatting = ret.return;
          if (autoloadlist == true) {
            this.loadApitestList();
          }
          if (callabck != undefined) {
            callabck(test);
          }
        });
      });
    },
    edittest(test) {
      this.test = test;
      this.showedit = true;
    },
    batchtest() {
      this.$confirm("确定进行批量测试吗，将会覆盖到之前的测试结果?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var testlist = this.testlist;
        this.batchloading = true;
        var needtest = 0;
        for (var item of testlist) {
          if (item.id != undefined) {
            item.result = "";
            item.resultstr = "等待测试";
          }
        }
        this.realstartbatch(testlist, 0);
      });
    },
    realstartbatch(testlist, i) {
      if (i >= testlist.length) {
        this.batchloading = false;
        return;
      }
      if (testlist[i].id != undefined) {
        this.timeoutgotest(testlist, i);
      }
      i++;
      this.realstartbatch(testlist, i);
    },
    timeoutgotest(testlist, i) {
      setTimeout(() => {
        this.testapi(testlist[i], false, (test) => {
          this.testlist[i] = test;
        });
      }, i * 100);
    },
    deletetest(test) {
      this.$confirm(
        "此操作将永久删除该文件,而且测试应该是越多越好, 真的要删除吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        HttpHelper.Post("app/deletetest", {
          appalias: this.appinfo.alias,
          id: test.id,
        }).then((ret) => {
          this.loadApitestList();
        });
      });
    },
    gennewdate(item) {
      var vnew = this.gennewapitest(item);
      this.test = vnew;
      this.showedit = true;
    },
    gennewapitest(item) {
      var dataishave = item.data instanceof Object;
      var inputstr = [];
      if (dataishave) {
        for (var ip of item.data.input) {
          if (ip.testvalue != "") {
            inputstr.push(ip.key + "=" + encodeURIComponent(ip.testvalue));
          }
        }
      }
      console.log("apitest", item, dataishave == false ? [] : item.data.input);
      //  testlist.push();
      return {
        apidata: item,
        dataishave: dataishave,
        app_id: this.appinfo.id,
        api_name: dataishave == false ? "暂无接口名称" : item.data.name,
        api: item.model + "/" + item.func,
        name: (dataishave == false ? "" : item.data.name) + "默认接口测试",
        summary: "",
        inputstr: inputstr.join("&"),
        input: dataishave == false ? [] : item.data.input,
        output: "{}",
        type: "",
        expression: "",
        result: "",
        status: "A",
      };
    },
    loadApitestList() {
      this.batchloading = true;
      HttpHelper.Post("app/apitestlist", {
        appalias: this.appinfo.alias,
      }).then((currentlist) => {
        HttpHelper.Post("app/apilist", { appalias: this.appinfo.alias }).then(
          (apilist) => {
            var testlist = [];
            var matchrow = [];
            var havetestapicount = 0;
            var totaltestapicount = 0;

            var totaltestcase = 0;
            var succeesstestapicount = 0;
            var warningapicount = 0;
            var failuretestapicount = 0;

            for (var item of apilist) {
              var dataishave = item.data instanceof Object;
              if (item.active != "1") {
                continue;
              }
              totaltestapicount++;
              var nothave = false;

              for (var ap of currentlist) {
                console.log(ap.api + "==" + item.model + "/" + item.func);
                if (ap.api == item.model + "/" + item.func) {
                  if (matchrow[ap.api] == undefined) {
                    matchrow[ap.api] = 1;
                  } else {
                    matchrow[ap.api] = matchrow[ap.api] + 1;
                  }

                  totaltestcase++;

                  nothave = true;
                  ap.api_name =
                    dataishave == false ? "暂无接口名称" : item.data.name;
                  ap.input = JSON.parse(ap.input);
                  var inputstr = [];
                  for (var ip of ap.input) {
                    if (ip.testvalue != "") {
                      inputstr.push(
                        ip.key + "=" + encodeURIComponent(ip.testvalue)
                      );
                    }
                  }
                  ap.apidata = item;
                  ap.inputstr = inputstr.join("&");
                  switch (ap.result) {
                    case "A":
                      succeesstestapicount++;
                      break;
                    case "B":
                      warningapicount++;
                      break;
                    case "C":
                      failuretestapicount++;
                      break;
                  }
                  testlist.push(ap);
                }
              }
              if (nothave == false) {
                var vnew = this.gennewapitest(item);
                matchrow[item.model + "/" + item.func] = 1;
                console.log("apitest2", vnew);
                testlist.push(vnew);
              } else {
                havetestapicount++;
              }
            }
            this.matchrow = matchrow;
            this.testlist = testlist;
            this.batchloading = false;

            var totalapi = 0;
            if (totaltestapicount > 0) {
              totalapi = parseInt(
                (havetestapicount * 100) / totaltestapicount
              );
            }
            this.totalapi = totalapi;

            var successapi = 0;
            var wanringapi = 0;
            var failureapi = 0;
            if (totaltestcase > 0) {
              successapi = parseInt(
                (succeesstestapicount * 100) / totaltestcase
              );
              wanringapi = parseInt(
                (warningapicount * 100) / totaltestcase
              );
              failureapi = parseInt(
                (failuretestapicount * 100) / totaltestcase
              );
            }
            this.successapi=successapi;
            this.wanringapi=wanringapi;
            this.failureapi=failureapi;
          }
        );
      });
    },
  },
};
</script>