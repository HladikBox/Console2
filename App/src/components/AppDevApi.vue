<template>
  <div>
    <div class="flex-row">
      <div class="flex-1">
        <div>
          <el-table
            :data="apilist.filter(data => !search || JSON.stringify(data).toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            highlight-current-row	
            @current-change="handleCurrentChange"
          >
            <el-table-column label="接口名称">
              <template slot-scope="scope">
                <div>{{scope.row.data==""?'未设置':scope.row.data.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="接口地址">
              <template slot-scope="scope">
                <div class="f-p">api/{{scope.row.model}}/{{scope.row.func}}</div>
              </template>
            </el-table-column>
          </el-table>

          <el-button size="mini" @click="addapi">新增接口</el-button>
        </div>
        <div class="margin-top-4x">
          <el-button type="info" @click="loadapi">刷新</el-button>
        </div>
      </div>
      <div class="flex-1" >
        <div class="padding">{{api}}</div>
      </div>
    </div>
  </div>
</template>
<script>
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
      api: null,
      apilist: []
    };
  },
  created() {
    this.loadapi();
  },
  methods: {
    addapi() {},
    loadapi() {
      HttpHelper.Post("app/apilist", { appalias: this.appinfo.alias }).then(
        apilist => {
          this.apilist = apilist;
        }
      );
    },
    handleCurrentChange(val) {
        this.api = val;
      }
  }
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
</style>