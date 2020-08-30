<template>
  <div class="padding-bottom">
    <div class="width-1x">项目周期设定</div>
    <div class="marign-top">
      <el-table :data="peroidlist" style="width: 100%">
        <el-table-column label="名称" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="开始到结束" width="150">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.startdate" type="date" placeholder="开始日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="结束日期" width="150">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.enddate" type="date" placeholder="结束日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4}"
              v-model="scope.row.remark"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-remove-outline f-d h4" @click="removeForPeroid(scope)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="margin-top">
        <el-input type="textarea" :rows="10" placeholder="请输入周期安排，一行一个模块" v-model="appperoidstr"></el-input>
        <div class="margin-top">
          <el-button type="success" @click="transferPeroidStr" :disabled="appperoidstr==''">添加</el-button>
          <el-button @click="resetPeroidList">重新填写</el-button>
        </div>
      </div>
      <div class="f-g h7">
        <p>
          创建周期管理有助于后续需求人员、开发人员和测试人员等的人员进行项目整理，可以根据项目功能模块进行规划。
          <br />一行一个功能点，按照以下格式填写，然后点击下方生成按钮，自动填充到表格，查看
          <span class="f-p pointer">操作视频</span>
        </p>
        <div class="padding bg-g">
          产品设计,2020-08-13,2020-08-20
          <br />UI设计,2020-08-13,2020-08-20
          <br />功能开发,2020-08-13,2020-08-20
          <br />测试,2020-08-13,2020-08-20
          <br />试运行,2020-08-13,2020-08-20
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    peroidlist: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      appperoidstr: "",
    };
  },
  methods: {
    resetPeroidList(event) {
      this.peroidlist = [];
      this.appperoidstr = "";
    },
    removeForPeroid(row) {
      var peroidlist = [];
      for (var i = 0; i < this.peroidlist.length; i++) {
        if (row.$index != i) {
          peroidlist.push(this.peroidlist[i]);
        }
      }
      this.peroidlist = peroidlist;
    },
    transferPeroidStr(event) {
      var arr1 = this.appperoidstr.split("\n");
      for (var item of arr1) {
        var rtem = item.split(",");
        this.peroidlist.push({
          name: rtem[0],
          startdate: rtem[1],
          enddate: rtem[2],
          remark: "",
        });
      }
      this.appperoidstr = "";
    },
  },
};
</script>