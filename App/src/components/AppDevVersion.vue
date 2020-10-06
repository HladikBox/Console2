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
    rollback(row) {
      this.$confirm("此操作将回滚代码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        HttpHelper.Post("app/createversion", {
          appalias: this.appinfo.alias,
          remarks: "自动备份",
        }).then(() => {
          this.loadVersionList();
          HttpHelper.Post("app/rollbackversion", {
            appalias: this.appinfo.alias,
            version_id: row.id,
          }).then(() => {
            this.$alert("回滚成功，点击确定重新加载", "提示", {
              confirmButtonText: "确定",
              callback: (action) => {
                window.location.reload();
              },
            });
          });
        });
      });
    },
    download(row) {
      var s = row.versiondate_formatting;
      s = s.replace(/ /g, "");
      s = s.replace(/:/g, "");
      s = s.replace(/-/g, "");
      Utils.FileDownload(
        this.uploadpath + "version/" + row.version,
        this.appinfo.alias + "_" + s
      );
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