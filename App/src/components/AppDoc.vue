<template>
  <div class="padding">
    <div v-if="appinfo != null">
      <el-tabs v-model="activeName" :tab-position="'left'">
        <el-tab-pane label="需求文档">
          <div class="padding-left">
            <div class="h3">项目需求</div>
            <div >
              <div id="pdfDom">
                <div >
                  <div class="flex-row">
                    <div class="flex-1 padding-right bd-right">
                      <div class="h3 margin-top" id="k_-1">{{ info.name }}</div>
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
                      <div
                        class="margin-top"
                        v-for="item of speclist"
                        :key="item"
                      >
                        <div class="flex-row">
                          <div class="h3 flex-1" :id="'k_' + item.id">
                            {{ item.name }}
                          </div>
                        </div>
                        <div class="h6 margin-top f-g">{{ item.summary }}</div>
                        <div class="flex-row flex-wrap">
                          <div
                            v-for="item2 of item.designlist"
                            :key="item2"
                            class="pointer"
                            @click="
                              handle2Preview(
                                uploadpath + 'appspec/' + item2.file
                              )
                            "
                          >
                            <el-image
                              fit="contain"
                              class="cover margin-top margin-right"
                              :src="uploadpath + 'appspec/' + item2.file"
                            >
                              <div slot="placeholder" class="image-slot">
                                加载中
                                <span class="dot">...</span>
                              </div>
                            </el-image>
                            <div class="text-center margin-top h7 f-g">
                              {{ item2.name }}
                            </div>
                          </div>
                          <div
                            v-for="item2 of item.uidesignlist"
                            :key="item2"
                            class="pointer"
                            @click="
                              handle2Preview(
                                uploadpath + 'appspec/' + item2.file
                              )
                            "
                          >
                            <el-image
                              fit="contain"
                              class="cover margin-top margin-right"
                              :src="uploadpath + 'appspec/' + item2.file"
                            >
                              <div slot="placeholder" class="image-slot">
                                加载中
                                <span class="dot">...</span>
                              </div>
                            </el-image>
                            <div class="text-center margin-top h7 f-g">
                              {{ item2.name }}
                            </div>
                          </div>
                        </div>
                        <el-divider></el-divider>
                      </div>
                    </div>
                    <div class="width">
                      <div class="rightmenu">
                        <div
                          class="padding-1x pointer f-g navitem"
                          @click="godesign(-1)"
                        >
                          项目
                        </div>
                        <div
                          v-for="item of speclist"
                          :key="item"
                          class="padding-1x pointer f-g navitem"
                          @click="godesign(item.id)"
                        >
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据字典">
          <div class="padding-left">
            <div class="h3">数据字典</div>
            <div >
              <div >
                <div class="flex-row">
                  <div class="flex-1 padding-right bd-right">
                    <div
                      class="margin-top"
                      v-for="item of modellist"
                      :key="item"
                    >
                      <div class="flex-row">
                        <div class="h3 flex-1" :id="'k_' + item.modelname">
                          {{ item.modelname }} - {{ item.name }}
                        </div>
                      </div>
                      <div class="h5 margin-top">{{ item.description }}</div>
                      <div class="h5 margin-top">
                        数据库表：{{ item.tablename }}
                      </div>
                      <div class="h5 margin-top">
                        强制搜索条件：{{ item.searchcondition }}
                      </div>
                      <div class="margin-top">
                        <el-table
                          :data="item.fields.field"
                          style="width: 100%"
                          class="fieldtable"
                        >
                          <el-table-column
                            label="字段名称"
                            class="width"
                            prop="name"
                            fixed
                          >
                          </el-table-column>
                          <el-table-column
                            label="数据库字段"
                            class="width"
                            prop="key"
                            fixed
                          >
                          </el-table-column>
                          <el-table-column label="字段类型" class="width" fixed>
                            <template slot-scope="scope">
                              {{ getfieldtypename(scope.row.type) }}
                            </template>
                          </el-table-column>
                          <el-table-column label="字段定义" class="width">
                            <template slot-scope="scope">
                              {{
                                scope.row.type != "flist"
                                  ? getfieldtypedb(scope.row.type)
                                  : "外表: " + scope.row.relatetable
                              }}
                            </template>
                          </el-table-column>

                          <el-table-column label="列表显示">
                            <template slot-scope="scope">
                              {{ scope.row.displayinlist == 1 ? "是" : "否" }}
                            </template>
                          </el-table-column>
                          <el-table-column label="搜索条件">
                            <template slot-scope="scope">
                              {{ scope.row.search == 1 ? "是" : "否" }}
                            </template>
                          </el-table-column>
                          <el-table-column label="必录字段">
                            <template slot-scope="scope">
                              {{ scope.row.notnull == 1 ? "是" : "否" }}
                            </template>
                          </el-table-column>
                          <el-table-column label="不保存">
                            <template slot-scope="scope">
                              {{ scope.row.nosave == 1 ? "是" : "否" }}
                            </template>
                          </el-table-column>
                          <el-table-column label="唯一">
                            <template slot-scope="scope">
                              {{ scope.row.unique == 1 ? "是" : "否" }}
                            </template>
                          </el-table-column>
                          <el-table-column label="组合唯一">
                            <template slot-scope="scope">
                              {{ scope.row.unionunique == 1 ? "是" : "否" }}
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                      <el-divider></el-divider>
                    </div>
                  </div>
                  <div class="width">
                    <div class="rightmenu">
                      <div
                        v-for="item of modellist"
                        :key="item"
                        class="padding-1x pointer f-g navitem"
                      >
                        <div @click="godesign(item.modelname)">
                          {{ item.modelname }} - {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="接口文档">
          <div class="padding-left">
            <div class="h3">接口文档</div>
            <div >
              <div >
                <div class="flex-row">
                  <div class="flex-1 padding-right bd-right">
                    <div class="margin-top" v-for="item of apilist" :key="item">
                      <div class="flex-row">
                        <div
                          class="h3 flex-1"
                          :id="'k_' + item.model + '-' + item.func"
                        >
                          {{ item.data == "" ? "未设置" : item.data.name }}
                        </div>
                      </div>
                      <div class="h5 margin-top">
                        {{ item.data.description }}
                      </div>
                      <div class="h5 margin-top f-p">
                        接口地址：api/{{ item.model }}/{{ item.func }}
                      </div>
                      <div class="h5 margin-top">
                        关联模型：{{ getmodelname(item.data.relmodel) }}
                      </div>
                      <div class="h5 margin-top">
                        关联方法：{{ getrelfunc(item.data.relfunc) }}
                      </div>
                      <div class="h5 margin-top">接口参数</div>
                      <div class="margin-top">
                        <el-table :data="item.data.input" style="width: 100%">
                          <el-table-column label="字段" prop="key">
                          </el-table-column>
                          <el-table-column label="含义" prop="name">
                          </el-table-column>
                          <el-table-column label="是否必录">
                            <template slot-scope="scope">
                              {{ scope.row.required == 1 ? "是" : "否" }}
                            </template>
                          </el-table-column>
                          <el-table-column label="值范围" prop="valuescope">
                          </el-table-column>
                          <el-table-column label="测试值" prop="testvalue">
                          </el-table-column>
                        </el-table>
                      </div>
                      <el-divider></el-divider>
                    </div>
                  </div>
                  <div class="width">
                    <div class="rightmenu">
                      <div
                        v-for="item of apilist"
                        :key="item"
                        class="padding-1x pointer f-g navitem"
                      >
                        <div @click="godesign(item.model + '-' + item.func)">
                          {{ item.model }}/{{ item.func }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="测试文档">
          <div class="padding-left">
            <div class="h3">测试文档</div>
            <div >
              <div class="margin-top" v-for="item of testlist" :key="item">
                  <div class="h3 flex-1">{{ item.name }} - {{ item.api }}</div>
                <div class="h5 margin-top">{{ item.summary }}</div>
                <div class="h5 margin-top ">
                  请求参数：<pre class="f-p" >{{ item.inputstr }}</pre>
                </div>
                <div class="h5 margin-top" >
                  接口返回：
                  <pre style="max-width:500px" class="f-p" v-html="item.output"></pre>
                </div>
                <el-divider></el-divider>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

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
      Member: null,
      activeName: 0,
      speclist: [],
      schedulelist: [],
      info: null,
      dialogVisible: false,
      dialogImageUrl: "",
      modellist: [],
      fieldtypelist: [
        { name: "文本", type: "text", db: "varchar(255)" },
        { name: "密码", type: "password", db: "varchar(255)" },
        { name: "选中", type: "check", db: "char(1)" },
        { name: "下拉", type: "select", db: "varchar(15)" },
        { name: "数值", type: "number", db: "int" },
        { name: "文件上传", type: "upload", db: "varchar(100)" },
        { name: "日期", type: "datetime", db: "datetime" },
        { name: "表关联下拉", type: "fkey", db: "int" },
        { name: "表关联多选", type: "flist", db: "" },
        { name: "网络链接", type: "url", db: "varchar(500)" },
        { name: "颜色", type: "color", db: "varchar(20)" },
        { name: "下级数据", type: "grid", db: "" },
        { name: "长文本", type: "longtext", db: "varchar(2000)" },
        { name: "HTML编辑", type: "html", db: "text" },
      ],
      apilist: [],
      funclist: [],
      testlist: [],
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
        this.loadspeclist();
      }
    });

    HttpHelper.Post("app/modellist", { appalias: this.appinfo.alias }).then(
      (modellist) => {
        this.modellist = modellist;
      }
    );
    HttpHelper.Post("app/apilist", { appalias: this.appinfo.alias }).then(
      (apilist) => {
        var apilist2 = [];
        for (var api of apilist) {
          if (api.active == "1") {
            apilist2.push(api);
          }
        }
        this.apilist = apilist2;
      }
    );

    HttpHelper.Post("inst/funccreatelist", {}).then((funclist) => {
      this.funclist = funclist;
    });

    HttpHelper.Post("app/apitestlist", {
      appalias: this.appinfo.alias,
    }).then((testlist) => {
      for (var ap of testlist) {
        ap.input = JSON.parse(ap.input);
        var inputstr = [];
        for (var ip of ap.input) {
          if (ip.testvalue != "") {
            inputstr.push(ip.key + "=" + encodeURIComponent(ip.testvalue));
          }
        }
        ap.inputstr = inputstr.join("&");
      }
      this.testlist = testlist;
    });
  },
  methods: {
    godesign(id) {
      document.querySelector("#k_" + id).scrollIntoView(true);
    },
    getrelfunc(func) {
      for (var item of this.funclist) {
        if (item.key == func) {
          return item.name;
        }
      }
      return "无";
    },
    getmodelname(modelname) {
      for (var item of this.modellist) {
        if (item.modelname == modelname) {
          return item.modelname + " - " + item.name;
        }
      }
      return "无";
    },
    getfieldtypename(type) {
      for (var item of this.fieldtypelist) {
        if (item.type == type) {
          return item.name;
        }
      }
      return "";
    },
    getfieldtypedb(type) {
      for (var item of this.fieldtypelist) {
        if (item.type == type) {
          return item.db;
        }
      }
      return "";
    },
    loadspeclist() {
      HttpHelper.Post("app/speclist", {
        appalias: this.appinfo.alias,
        appschedule_id: this.info.id,
      }).then((speclist) => {
        this.speclist = speclist;
      });
    },

    handle2Preview(url) {
      this.dialogVisible = true;
      this.dialogImageUrl = url;
    },
  },
};
</script>
<style scoped>
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
pre {
white-space: pre-wrap;
word-wrap: break-word;
}
</style>