<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <el-tabs :tab-position="'left'">
        <el-tab-pane label="接口测试">
          <div class="padding-left">
            <div class="h3">接口测试</div>
            <div class="margin-top-4x">
              <el-table :data="testlist" style="width: 100%">
                <el-table-column prop="api_name" label="接口名称" width="180"></el-table-column>
                <el-table-column prop="api" label="接口路径" width="180"></el-table-column>
                <el-table-column label="测试" width="180">
                  <template slot-scope="scope">
                    <div class="flex-row">
                      <div>{{scope.row.name}}</div>
                      <div class="margin-left-1x">
                        <i class="h4 pointer f-p el-icon-edit" @click="edittest(scope.row)"></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="inputstr" label="输入"></el-table-column>
                <el-table-column label="输出"></el-table-column>
                <el-table-column label="测试结果" width="150"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="测试进度">
          <div class="padding-left">
            <div class="h3">测试进度</div>
            <div class="margin-top-4x"></div>
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
      <div v-if="test!=null">
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
              <template slot-scope="scope">{{scope.row.required=="1"?"是":"否"}}</template>
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
        <div>
          <el-input
            v-model="test.output"
            readonly
            :autosize="{ minRows: 2, maxRows: 6 }"
            type="textarea"
          ></el-input>
        </div>
        <div class="flex-row margin-top-1x">
          <div class="width-1x">最后测试时间</div>
          <div class="flex-1">{{test.lasttest_formatting}}</div>
          <div class="width-1x">测试返回</div>
          <div
            class="flex-1"
          >{{test.result=='A'?"通过":""}}{{test.result=='B'?"半通过":""}}{{test.result=='A'?"不通过":""}}</div>
        </div>
        <div class="margin-top-4x text-center">
          <el-button @click="savetest" type="primary">保存并测试</el-button>
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
    savetest() {},
    edittest(test) {
      this.test = test;
      this.showedit = true;
    },
    loadApitestList() {
      HttpHelper.Post("app/apilist", { appalias: this.appinfo.alias }).then(
        (apilist) => {
          var testlist = [];
          var currentlist = [];
          for (var item of apilist) {
            var dataishave = item.data instanceof Object;
            if (item.active != "1") {
              continue;
            }
            var nothave = false;
            for (var ap of currentlist) {
              if (ap.api == item.model + "/" + item.func) {
                nothave = true;
                testlist.push(ap);
              }
            }
            if (nothave == false) {
              var inputstr = [];
              if (dataishave) {
                for (var ip of item.data.input) {
                  if (ip.testvalue != "") {
                    inputstr.push(ip.key + "=" + ip.testvalue);
                  }
                }
              }
              console.log("apitest", item,dataishave == false ? [] : item.data.input);
              testlist.push({
                dataishave: dataishave,
                app_id: this.appinfo.id,
                api_name: dataishave == false ? "暂无接口名称" : item.data.name,
                api: item.model + "/" + item.func,
                name:
                  (dataishave == false ? "" : item.data.name) + "默认接口测试",
                summary: "",
                inputstr: inputstr.join("&"),
                input: dataishave == false ? [] : item.data.input,
                output: "{}",
                type: "A",
                expression: "",
                result: "",
                status: "A",
              });
            }
          }
          this.testlist = testlist;
        }
      );
    },
  },
};
</script>