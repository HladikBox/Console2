<template>
  <div class="bg-w">
    <MyHeader></MyHeader>
    <div class="flex-row margin-top-4x margin-bottom">
      <div class="flex-1"></div>
      <div class="container flex-row">
        <div class="flex-1 margin-right-4x">
          <div class="flex-row flex-center">
            <div class="flex-1 h2 bolder">我的应用</div>
            <div>
              <el-button type="primary" @click="createapplication">创建应用</el-button>
            </div>
          </div>
          <div class="padding bd-bottom" v-for="app of applist" :key="app">
            <div class="flex-row pointer" @click="routeto('/app/'+app.alias)">
              <div class="margin-right">
                <img class="icon" :src="uploadpath+'app/'+app.logo" />
              </div>
              <div class="flex-1">
                <div class="flex-row flex-center">
                  <div class="flex-1 margin-right">{{app.name}}</div>
                  <div class="">{{app.devstatus_name}}</div>
                </div>
                <div class="flex-row flex-center margin-top-1x">
                  <div class="flex-1 h7 margin-right">应用代号：{{app.alias}}</div>
                  <div class="h7 margin-right">需求进度 0%</div>
                  <div class="h7 margin-right">开发进度 0%</div>
                  <div class="h7">测试进度 0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="margin-left-4x">
          <div class="flex-row">
            <div class="card pointer margin-right bg-g2 f-p"  @click="routeto('/access-group')">
              <div class="flex-row flex-center margin">
                <div class="margin-right-1x">
                  <i class="el-icon-user h3"></i>
                </div>
                <div class="flex-1 h6">开发组</div>
              </div>
            </div>
            <div class="card pointer bg-g2 f-p">
              <div class="flex-row flex-center margin">
                <div class="margin-right-1x">
                  <i class="el-icon-s-order h3"></i>
                </div>
                <div class="flex-1 h6">业务订单</div>
              </div>
            </div>
          </div>
          <div class="flex-row margin-top">
            <div class="card pointer margin-right bg-g2 f-p">
              <div class="flex-row flex-center margin">
                <div class="margin-right-1x">
                  <i class="el-icon-coffee h3"></i>
                </div>
                <div class="flex-1 h6">业务资源</div>
              </div>
            </div>
            <div class="card pointer bg-g2 f-p">
              <div class="flex-row flex-center margin">
                <div class="margin-right-1x">
                  <i class="el-icon-s-shop h3"></i>
                </div>
                <div class="flex-1 h6">产品商城</div>
              </div>
            </div>
          </div>
          <div class="margin-top-4x">
            <div class="h4">小工具</div>
            <div class="flex-row margin-top">
              <div class="card2 pointer margin-right f-p bd border">
                <div class="flex-row flex-center">
                  <div class="margin-right-1x bg-p"></div>
                  <div class="flex-1 h6">API调试台</div>
                </div>
              </div>
              <div class="card2 pointer f-p bd border">
                <div class="flex-row flex-center">
                  <div class="margin-right-1x bg-p"></div>
                  <div class="flex-1 h6">测试小工具</div>
                </div>
              </div>
            </div>
          </div>
          <div class="margin-top-4x">
            <div class="flex-row">
              <div class="h4 flex-1">系统公告</div>
              <div>
                <el-link type="primary">
                  查看更多
                  <i class="el-icon-arrow-right"></i>
                </el-link>
              </div>
            </div>
          </div>
          <div class="margin-top-4x">
            <div class="flex-row">
              <div class="h4 flex-1">消息通知</div>
              <div>
                <el-link type="primary">
                  查看更多
                  <i class="el-icon-arrow-right"></i>
                </el-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      applist:[]
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    
    HttpHelper.Post("app/list", { testright: "Y" }).then(list => {
      this.applist = list;
    });
  },
  methods: {
    createapplication: function() {
      if (this.Member.isrenzhen != "Y") {
        this.$alert("资质审核通过后方可继续，千万认证？", "提示", {
          confirmButtonText: "去认证",
          callback: action => {
            this.routeto("/account");
          }
        });
        return;
      }else{
        this.routeto("/app-create");
      }
    }
  }
};
</script>
<style scoped>
.card {
  width: 140px;
}
.card2 {
  width: 120px;
  height: 40px;
}
.card2 .bg-p {
  height: 40px;
  width: 4px;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>