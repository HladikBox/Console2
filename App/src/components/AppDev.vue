<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <el-tabs :tab-position="'left'" v-if="modellist.length>0">
        <el-tab-pane label="实体模型设计">
          <div class="padding-left">
            <div class="flex-row flex-center">
              <div class="h3 margin-right">实体模型设计</div>
              <div>
                <i class="el-icon-circle-plus-outline f-p h2 pointer" @click="addmodel"></i>
              </div>
            </div>
            <div class="margin-top-4x">
              <el-table
                :data="modellist"
                style="width: 100%"
                :default-sort="{prop: 'name', order: 'ascending'}"
              >
                <el-table-column prop="modelname" label="模型" sortable></el-table-column>
                <el-table-column prop="name" label="名称" sortable></el-table-column>
                <el-table-column prop="tablename" label="表名" sortable></el-table-column>
                <el-table-column prop="description" label="描述" width="400"></el-table-column>
                <el-table-column prop="createdtime" label="创建时间" sortable></el-table-column>
                <el-table-column prop="modifiedtime" label="修改时间" sortable></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="routeto('model/'+scope.row.modelname)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="后台菜单设计">
          <div class="padding-left">
            <div class="h3">后台菜单设计</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据接口设计">
          <div class="padding-left">
            <div class="h3">数据接口设计</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="版本管理">
          <div class="padding-left">
            <div class="h3">版本管理</div>
            <div class="margin-top-4x"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" class="margin-top" @click="goinit">项目初始化</el-button>
    </div>

    <el-dialog title="新增模型" :visible.sync="showaddmodel" center>
      <div class="flex-row flex-center">
        <div class="width-1x">模型名称</div>
        <div class="flex-1 margin-right">
          <el-input v-model="modelname" placeholder="模型名称" maxlength="30"></el-input>
        </div>
        <div class="width-1x">模型标识</div>
        <div class="flex-1">
          <el-input v-model="name" maxlength="30" placeholder="只支持英文和下划线" @input="inputfilter"></el-input>
        </div>
      </div>
      <div class="flex-row flex-center margin-top">
        <div class="width-1x">数据表</div>
        <div class="flex-1 margin-right">
          <el-input v-model="tablename" placeholder="只支持英文和下划线，建议tb_打头" @input="inputfilter"></el-input>
        </div>
        <div class="width-1x">创建方式</div>
        <div class="flex-1">
          <el-select v-model="modelbase" placeholder="请选择" class="w-100">
            <el-option
              v-for="item in sourcemodellist"
              :key="item.modelname"
              :label="item.name"
              :value="item.modelname"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="margin-top-4x text-center">
        <el-button type="primary" @click="createmodel">创建</el-button>
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
      inittips: "",
      modellist: [],
      showaddmodel: false,
      modelname: "",
      name: "",
      tablename: "tb_",
      modelbase: "__sysbase__",
      sourcemodellist: [],
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    HttpHelper.Post("content/get", { keycode: "inittips" }).then((content) => {
      this.inittips = Utils.HtmlDecode(content.content);
    });
    HttpHelper.Post("app/modellist", { appalias: this.appinfo.alias }).then(
      (modellist) => {
        this.modellist = modellist;
        var options = [];
        options.push({ modelname: "__sysblank__", name: "空白模型" });
        options.push({ modelname: "__sysbase__", name: "基础数据模型" });
        options.push({ modelname: "__sysconfig__", name: "基础单页模型" });
        for (var item of modellist) {
          options.push({
            modelname: item.modelname,
            name: "复制于" + item.name,
          });
        }
        this.sourcemodellist = options;
      }
    );
  },
  methods: {
    createmodel() {
        
    },
    addmodel() {
      this.showaddmodel = true;
    },
    goinit() {
      if (this.modellist.length == 0) {
        this.routeto("dev-init");
      } else {
        this.$alert(this.inittips, "提示", {
          dangerouslyUseHTMLString: true,
        }).then(() => {
          this.routeto("dev-init");
        });
      }
    },
  },
};
</script>