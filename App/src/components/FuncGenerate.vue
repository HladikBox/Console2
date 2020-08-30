<template>
  <div class="padding-bottom">
    <div class="width-1x">项目功能模块</div>
    <div class="marign-top">
      <el-table :data="funlist" style="width: 100%">
        <el-table-column label="模块" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="scope.row.summary"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.priority" placeholder="请选择">
              <el-option label="低" value="1"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="高" value="3"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="工作人天" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.workday" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-remove-outline f-d h4" @click="removeForFunc(scope)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="margin-top">
        <el-input type="textarea" :rows="10" placeholder="请输入需求功能模块，一行一个模块" v-model="appfuncstr"></el-input>
        <div class="margin-top">
          <el-button type="success" @click="transferFuncStr" :disabled="appfuncstr==''">添加</el-button>
          <el-button @click="resetFunList">重新填写</el-button>
        </div>
      </div>
      <div class="f-g h7">
        <p>
          创建需求功能模块管理有助于后续需求人员、开发人员和测试人员等的人员进行项目整理，可以根据项目功能模块进行规划。
          <br />一行一个功能点，按照以下格式填写，然后点击下方生成按钮，自动填充到表格，查看
          <span class="f-p pointer">操作视频</span>
        </p>
        <div class="padding bg-g">
          城市选择-->获取用户当前定位，用户可自行选择切换
          <br />搜索页-->跳转页面，关键字搜索
          <br />轮播图功能-->可点击跳转相关页面
          <br />联盟卡列表-->我购买过的联盟列表
          <br />足迹列表-->记录浏览过的商家
          <br />商家列表-->商家筛选功能
          <br />商家详情-->详情页面，导航功能，商家信息
          <br />联盟列表-->联盟筛选功能
          <br />联盟详情-->详情页面，电话拨打，海报生成
          <br />购买流程-->相关购买流程，有可能涉及虚拟支付，类似加盟费
          <br />暂无联盟-->暂无联盟页面时点击跳转至首页
          <br />我加入的联盟-->联盟列表功能同上
          <br />会员账号-->微信授权相关信息
          <br />个人信息-->信息详情页面，录入编辑功能
          <br />意见反馈-->反馈填写页面
          <br />联系客服-->电话拨打
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    funlist: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      appfuncstr: "",
    };
  },
  methods: {
    transferFuncStr(event) {
      var arr1 = this.appfuncstr.split("\n");
      for (var item of arr1) {
        var rtem = item.split("-->");
        this.funlist.push({
          name: rtem[0],
          summary: rtem[1],
          priority: "1",
          workday: 0,
        });
      }
      this.appfuncstr = "";
    },
    removeForFunc(row) {
      console.log("removeForFunc", row, this.funlist);
      var funlist = [];
      for (var i = 0; i < this.funlist.length; i++) {
        if (row.$index != i) {
          funlist.push(this.funlist[i]);
        }
      }
      this.funlist = funlist;
    },
    resetFunList(event) {
      this.funlist = [];
      this.appfuncstr = "";
    },
  },
};
</script>