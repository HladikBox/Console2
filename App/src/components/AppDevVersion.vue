<template>
  <div>
    <div class="margin-bottom">
      <el-button type="primary" @click="createversion">新建版本</el-button>
    </div>
    <el-table :data="versionlist" style="width: 100%" empty-text="暂无版本">
      <el-table-column prop="versiondate_formatting" label="创建日期" width="180"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="rollback(scope.row)">回滚</el-button>
          <el-button type="text" @click="download(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      menu: [],
      versionlist: [],
    };
  },
  created() {
    PageHelper.Init(this);
    this.loadVersionList();
  },
  methods: {
    loadVersionList() {
      HttpHelper.Post("app/versionlist", { appalias: this.appinfo.alias }).then(
        (versionlist) => {
          this.versionlist = versionlist;
        }
      );
    },
    download(row){
      window.open(this.uploadpath+'version/'+row.version);
    },
    createversion() {
      this.$prompt("请输入版本备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          HttpHelper.Post("app/createversion", {
            appalias: this.appinfo.alias,
            remarks: value,
          }).then(() => {
            this.loadVersionList();
          });
          this.$message({
            type: "info",
            message: "备份成功",
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style >
</style>