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
        </div>
        <div class="margin-top-4x">
          <el-button size="mini" @click="addapi">新增接口</el-button>
          <el-button size="mini" type="info" @click="loadapi">刷新</el-button>
        </div>
      </div>
      <div class="flex-2">
        <div class="padding" v-loading="loading">
          <div v-if="api!=null">
            <div class="flex-row flex-center">
              <div class="width-1x f-g h6">接口地址</div>
              <div class="flex-1 f-p">api/{{api.model}}/{{api.func}}</div>
            </div>
            <div class="flex-row flex-center margin-top-1x">
              <div class="width-1x f-g h6">接口名称</div>
              <div class="flex-1">
                <el-input size="mini" placeholder="填写接口名称" v-model="api.name" />
              </div>
            </div>
            <div class="flex-row flex-center margin-top-1x">
              <div class="width-1x f-g h6">关联模型</div>
              <div class="flex-1 margin-right">
                <el-select size="mini" v-model="api.relmodel" placeholder="请选择">
                  <el-option
                    v-for="item in modellist"
                    :key="item.modelname"
                    :label="item.modelname+' - '+item.name"
                    :value="item.modelname"
                  ></el-option>
                </el-select>
              </div>
              <div class="width-1x f-g h6">关联动作</div>
              <div class="flex-1">
                <el-select size="mini" v-model="api.relfunc" placeholder="请选择">
                  <el-option
                    v-for="item in funclist"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="f-g h6 margin-top-1x">接口代码</div>
            <div class="margin-top-1x">
              <el-input type="textarea" v-model="api.apicontent" autosize></el-input>
            </div>
          </div>
        </div>
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
      default: null,
    },
  },
  data() {
    return {
      api: null,
      apilist: [],
      loading: false,
      modellist: [],
      funclist:[]
    };
  },
  created() {
    this.loadapi();
  },
  methods: {
    addapi() {},
    loadapi() {
      HttpHelper.Post("app/modellist", { appalias: this.appinfo.alias }).then(
        (modellist) => {
          this.modellist = modellist;
        }
      );
      HttpHelper.Post("app/apilist", { appalias: this.appinfo.alias }).then(
        (apilist) => {
          this.apilist = apilist;
        }
      );
    },
    handleCurrentChange(val) {
      this.loading = true;
      HttpHelper.Post("app/getapicontent", {
        appalias: this.appinfo.alias,
        model: val.model,
        func: val.func,
      }).then((api) => {
        this.api = api;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
  },
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