<template>
  <div class="padding">
    <div v-if="appinfo!=null">
      <el-tabs :tab-position="'left'">
        <el-tab-pane label="开发组管理">
          <div class="padding-left">
            <div class="h3">开发组成员</div>
            <div class="margin-top-4x">
              <div class="flex-row flex-wrap">
                <el-collapse v-model="peopleactivename" class="peopledata">
                  <el-collapse-item title="管理员" name="1">
                    <template>
                      <el-table :data="rightgroup.adminright" style="width: 100%">
                        <el-table-column prop="yycno" label="开发号" width="180"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                        <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
                      </el-table>
                    </template>
                  </el-collapse-item>
                  <el-collapse-item title="观察员" name="2">
                    <el-table :data="rightgroup.viewerright" style="width: 100%">
                      <el-table-column prop="yycno" label="开发号" width="180"></el-table-column>
                      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                      <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <el-collapse-item title="产品设计师" name="3">
                    <el-table :data="rightgroup.designerright" style="width: 100%">
                      <el-table-column prop="yycno" label="开发号" width="180"></el-table-column>
                      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                      <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <el-collapse-item title="开发工程师" name="4">
                    <el-table :data="rightgroup.developerright" style="width: 100%">
                      <el-table-column prop="yycno" label="开发号" width="180"></el-table-column>
                      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                      <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <el-collapse-item title="测试工程师" name="5">
                    <el-table :data="rightgroup.testright" style="width: 100%">
                      <el-table-column prop="yycno" label="开发号" width="180"></el-table-column>
                      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                      <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
                    </el-table>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </el-tab-pane>
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
      peopleactivename: ["1", "2", "3", "4", "5"],
      rightgroup: {
        adminright: [],
        viewerright: [],
        designerright: [],
        developerright: [],
        testright: [],
      },
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    this.loadRightGroup();
  },
  methods: {
    loadRightGroup() {
      HttpHelper.Post("app/peoplegroup", {
        appalias: this.appinfo.alias,
      }).then((rightgroup) => {
        this.rightgroup = rightgroup;
      });
    },
  },
};
</script>
<style scoped>
.peopledata{
    width:600px;
}
</style>