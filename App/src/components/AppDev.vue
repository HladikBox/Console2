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
                :default-sort="{prop: 'modelname', order: 'ascending'}"
              >
                <el-table-column prop="modelname" label="模型" width="150" sortable></el-table-column>
                <el-table-column prop="name" label="名称" width="150" sortable></el-table-column>
                <el-table-column prop="tablename" label="表名" sortable></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="createdtime" label="创建时间" width="150" sortable></el-table-column>
                <el-table-column prop="modifiedtime" label="修改时间" width="150" sortable></el-table-column>
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
          <el-input v-model="name" placeholder="模型名称" maxlength="30"></el-input>
        </div>
        <div class="width-1x">模型标识</div>
        <div class="flex-1">
          <el-input v-model="modelname" maxlength="30" placeholder="只支持英文和下划线" @input="inputfilter"></el-input>
        </div>
      </div>
      <div class="flex-row flex-center margin-top">
        <div class="width-1x">数据表</div>
        <div class="flex-1 margin-right">
          <el-input v-model="tablename" placeholder="只支持英文和下划线，建议tb_打头" @input="inputfilter2"></el-input>
        </div>
        <div class="width-1x">创建方式</div>
        <div class="flex-1">
          <el-select v-model="modelbase" placeholder="请选择" class="w-100">
            <el-option-group
              v-for="group in modelgrouplist"
              :key="group.method"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.method"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-option-group>
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
      modelbase: "",
      sourcemodellist: [],
      nofileter: false,
      modelgrouplist: [],
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);

    HttpHelper.Post("content/get", { keycode: "inittips" }).then((content) => {
      this.inittips = Utils.HtmlDecode(content.content);
    });

    HttpHelper.Post("model/templatelist", { issys: "Y" }).then((modellist) => {
      if (modellist.length > 0) {
        var group = {
          label: "系统模版",
          options: modellist,
        };
        this.modelgrouplist.push(group);
      }

      HttpHelper.Post("app/modellist", { appalias: this.appinfo.alias }).then(
        (modellist) => {
          for (var item of modellist) {
            item.id = item.modelname;
          }
          var group = {
            label: "当前项目模型",
            options: modellist,
          };
          this.modellist = modellist;
          this.modelgrouplist.push(group);
        }
      );
    });
  },
  methods: {
    createmodel() {
      if (this.name.trim() == "") {
        this.$message({ message: "模型名称不能为空", type: "warning" });
        return;
      }
      if (this.modelname.trim() == "") {
        this.$message({ message: "模型标示不能为空", type: "warning" });
        return;
      }
      if (this.tablename.trim() == "") {
        this.$message({ message: "数据表不能为空", type: "warning" });
        return;
      }
      if (this.modelbase.trim() == "") {
        this.$message({ message: "请选择基于哪个模型开始创建", type: "warning" });
        return;
      }
      for (var model of this.modellist) {
        if (model.modelname == this.modelname) {
          this.$message({
            message: "模型标示已经使用，请选择别的",
            type: "warning",
          });
          return;
        }
      }
      HttpHelper.Post("model/create", {
        appalias: this.appinfo.alias,
        modelbase: this.modelbase,
        modelname: this.modelname,
        name: this.name,
        tablename: this.tablename,
      }).then((ret) => {
        this.routeto("model/"+this.modelname);
      });
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
    inputfilter: function (event) {
      console.log("inputfilter", event);
      this.modelname = this.modelname.replace(/[\W]/g, "");
      if (this.nofileter == false) {
        this.tablename = "tb_" + this.modelname;
      } else {
        this.tablename = this.tablename.replace(/[\W]/g, "");
      }
    },
    inputfilter2: function (event) {
      console.log("inputfilter", event);
      this.nofileter = true;
    },
  },
};
</script>