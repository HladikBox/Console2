<template>
  <div class="padding">
    <div class="flex-row">
      <div class="flex-1"></div>
      <div class="container bd">
        <el-steps :active="step" simple>
          <el-step title="须知" icon="el-icon-edit"></el-step>
          <el-step title="起始项目" icon="el-icon-edit"></el-step>
          <el-step title="选择组件" icon="el-icon-edit"></el-step>
          <el-step title="完成初始化" icon="el-icon-success"></el-step>
        </el-steps>
        <div class="padding">
          <div v-if="step==1">
            <div v-html="initprivacy" class="step1content bd padding"></div>
            <div class="margin-top">
              <el-checkbox v-model="checked">知道了</el-checkbox>
            </div>
            <div class="margin-top text-center">
              <el-button type="primary" round :disabled="checked==false" @click="step=2">下一步</el-button>
            </div>
          </div>
          <div v-if="step==2">
            <div class="h3">系统模板列表</div>
            <div class="margin-top">
              <el-table :data="sysproductlist" style="width: 100%">
                <el-table-column prop="name" label="名称" width="180"></el-table-column>
                <el-table-column prop="summary" label="描述"></el-table-column>
                <el-table-column width="180" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="viewdetail(scope.row.id)">查看</el-button>
                    <el-button size="mini" type="primary" @click="select(scope.row.id)">选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="margin-top text-center">
              <el-button round @click="step=1">上一步</el-button>
            </div>
          </div>
          <div v-if="step==3">
            <div class="h3">系统插件列表</div>
            <div class="padding">
              <div class="padding bg-g h7 f-g2">
                <div v-html="plugintips"></div>
              </div>
            </div>
            <div class="margin-top">
              <el-table
                :data="pluginlist"
                style="width: 100%"
                ref="selectpluginlist"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="名称" width="180"></el-table-column>
                <el-table-column prop="summary" label="描述"></el-table-column>
              </el-table>
            </div>
            <div class="margin-top text-center">
              <el-button round @click="step=2">上一步</el-button>
              <el-button round @click="submit" type="primary">提交</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
    <el-dialog
      v-if="productinfo!=null"
      title="项目详情"
      :visible.sync="showproductinfo"
      center
      width="800"
    >
      <div class="flex-row">
        <div class="flex-1 margin-right">
          <div class="h3">{{productinfo.name}}</div>
        </div>
        <div>
          <el-button type="primary" @click="select(productinfo.id)">选择使用</el-button>
        </div>
      </div>
      <div class="f-g margin-top">{{productinfo.summary}}</div>
      <div class="margin-top">
        <el-tabs v-model="activeName">
          <el-tab-pane label="项目介绍" name="first">
            <div class="introductcard" v-html="productinfo.content"></div>
          </el-tab-pane>
          <el-tab-pane label="体验方式" name="second">
            <div class="introductcard" v-html="productinfo.expcontent"></div>
          </el-tab-pane>
          <el-tab-pane label="迭代日志" name="second">
            <div class="upgradecontent" v-html="productinfo.upgradecontent"></div>
          </el-tab-pane>
        </el-tabs>
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
      default: null
    }
  },
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      step: 1,
      initprivacy: "",
      checked: false,
      sysproductlist: [],
      productinfo: null,
      showproductinfo: false,
      activeName: "first",
      selectproduct_id: 0,
      pluginlist: [],
      selectpluginlist: [],
      plugintips: ""
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    HttpHelper.Post("content/get", { keycode: "initprivacy" }).then(content => {
      this.initprivacy = Utils.HtmlDecode(content.content);
    });
    HttpHelper.Post("content/get", { keycode: "plugintips" }).then(content => {
      this.plugintips = Utils.HtmlDecode(content.content);
    });

    HttpHelper.Post("store/productlist", { type: "S" }).then(sysproductlist => {
      this.sysproductlist = sysproductlist;
    });
    HttpHelper.Post("store/pluginlist", {}).then(pluginlist => {
      this.pluginlist = pluginlist;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.selectpluginlist = val;
    },
    submit() {
      var plugins = [];
      for (var item of this.selectpluginlist) {
        plugins.push(item.id);
      }

      this.$confirm("是否确定初始化" + this.appinfo.name + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        HttpHelper.Post("app/init", {
          appalias: this.appinfo.alias,
          product_id: this.selectproduct_id,
          plugin: plugins.join(",")
        }).then(ret => {
          if (ret.code == 0) {
            this.$alert("初始化成功", "提示", {
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
      });
    },
    select(id) {
      this.selectproduct_id = id;
      this.showproductinfo = false;
      this.step = 3;
    },
    viewdetail(id) {
      this.productinfo = null;
      this.activeName = "first";
      HttpHelper.Post("store/productinfo", { id: id }).then(productinfo => {
        productinfo.content = Utils.HtmlDecode(productinfo.content);
        productinfo.expcontent = Utils.HtmlDecode(productinfo.expcontent);
        productinfo.upgradecontent = Utils.HtmlDecode(
          productinfo.upgradecontent
        );
        this.productinfo = productinfo;
        this.showproductinfo = true;
      });
    }
  }
};
</script>
<style scoped>
.step1content {
  height: 300px;
  overflow-y: scroll;
}
.introductcard {
  height: 300px;
  overflow-y: auto;
}
</style>
