<template>
  <div class="padding">
    <div v-if="appinfo!=null&&modelinfo!=null">
      <el-page-header @back="goBack" :content="modelinfo.name"></el-page-header>
      <el-tabs v-model="activeName" :tab-position="'left'" class="margin-top">
        <el-tab-pane label="基础设计" name="基础设计">
          <div class="padding-left">
            <div class="containter">
              <div class="h3 bolder">基础设计</div>
              <div class="flex-row flex-center margin-top">
                <div class="width">模型名称</div>
                <div class="width">
                  <el-input v-model="modelinfo.name"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">数据库表</div>
                <div class="width-4x">
                  <el-input type="textarea" v-model="modelinfo.tablename" autosize></el-input>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">强制搜索条件</div>
                <div class="width-4x">
                  <el-input type="textarea" v-model="modelinfo.searchcondition" autosize></el-input>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">模型描述</div>
                <div class="width-4x">
                  <el-input type="textarea" v-model="modelinfo.description" autosize></el-input>
                </div>
              </div>
              <el-divider></el-divider>

              <div class="flex-row flex-center margin-top">
                <div class="width">单条数据模式</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.nolist=='1'"
                    @change="modelinfo.nolist=modelinfo.nolist=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">允许导入数据</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.import=='1'"
                    @change="modelinfo.import=modelinfo.import=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">允许导出数据</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.export=='1'"
                    @change="modelinfo.export=modelinfo.export=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">仅查看不保存</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.nosave=='1'"
                    @change="modelinfo.nosave=modelinfo.nosave=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">不需要新增</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.noaddnew=='1'"
                    @change="modelinfo.noaddnew=modelinfo.noaddnew=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">允许列表全选</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.canselectall=='1'"
                    @change="modelinfo.canselectall=modelinfo.canselectall=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">记录操作记录</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.recording=='1'"
                    @change="modelinfo.recording=modelinfo.recording=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="字段设计" name="字段设计">
          <div class="padding-left">
            <div class="containter">
              <div class="h3 bolder">字段设计</div>
              <div class="margin-top">
                <el-table :data="modelinfo.fields.field" style="width: 100%">
                  <el-table-column p label="字段名称">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="数据库字段">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.key"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="字段类型">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.type" placeholder="请选择">
                        <el-option
                          v-for="item in fieldtypelist"
                          :key="item.type"
                          :label="item.name"
                          :value="item.type"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务设计" name="服务设计"></el-tab-pane>
        <el-tab-pane label="图表设计" name="图表设计"></el-tab-pane>
        <el-tab-pane label="前端JS" name="前端JS"></el-tab-pane>
        <el-tab-pane label="后台PHP" name="后台PHP"></el-tab-pane>
        <el-tab-pane label="CSS" name="CSS"></el-tab-pane>
      </el-tabs>
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
      default: null,
    },
  },
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      showproductinfo: false,
      modelname: "",
      modelinfo: null,
      activeName: "字段设计",
      fieldtypelist: [
        { name: "文本", type: "text" },
        { name: "密码", type: "password" },
        { name: "选中", type: "check" },
        { name: "下拉", type: "select" },
        { name: "数值", type: "number" },
        { name: "文件上传", type: "upload" },
        { name: "日期", type: "datetime" },
        { name: "表关联下拉", type: "fkey" },
        { name: "表关联多选", type: "flist" },
        { name: "表关联多选", type: "flist" },
        { name: "网络链接", type: "url" },
        { name: "颜色", type: "color" },
        { name: "下级数据", type: "grid" },
        { name: "长文本", type: "longtext" },
        { name: "HTML编辑", type: "html" },
      ],
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    this.modelname = this.$route.params.modelname;
    HttpHelper.Post("model/info", {
      appalias: this.appinfo.alias,
      modelname: this.modelname,
    }).then((modelinfo) => {
      this.modelinfo = modelinfo;
    });
  },
  methods: {},
};
</script>