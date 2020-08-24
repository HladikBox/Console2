<template>
  <div>
    <el-carousel height="540px" arrow="never">
      <el-carousel-item v-for="item in indexbanner" :key="item">
        <div
          class="w-100 h-100"
          :style="{backgroundImage: 'url('+ uploadpath+'indexbanner/' + item.img + ')', backgroundSize:'cover'}"
        >
          <div class="flex-row flex-center h-100">
            <div class="flex-1"></div>
            <div class="text-center">
              <div class="h1 bold f-w">{{item.name}}</div>
              <div class="f-w margin-top">{{item.summary}}</div>
              <div class="margin-top-4x">
                <el-button round size="medium" type="primary" plain class="joinbtn bold">立即加入</el-button>
              </div>
            </div>
            <div class="flex-1"></div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="header">
      <MyHeader :havebg="false"></MyHeader>
    </div>
    <div class="section bg-w">
      <div class="w-100 h-100 flex-row flex-center">
        <div class="flex-1"></div>
        <div class="container text-center">
          <div class="h2 bold">资源优势和接入流程</div>
          <div class="flex-row flex-center margin-top-4x">
            <div class="flex-1"></div>
            <div class="flex-row flex-center bgzx">
              <div
                class="padding s2select pointer"
                :class="{ 'active': s2select==0 }"
                @click="s2select=0"
              >
                <div class="flex-row flex-center">
                  <div class="h4 bolder margin-right-1x margin-left">软件服务商</div>
                  <div class="margin-right-1x">提供公有云开发服务</div>
                </div>
              </div>
              <div
                class="padding s2select pointer"
                :class="{ 'active': s2select==1 }"
                @click="s2select=1"
              >
                <div class="flex-row flex-center">
                  <div class="h4 bolder margin-left-1x margin-right-1x">企业私有云</div>
                  <div class="margin-right">企业内部私有云部署</div>
                </div>
              </div>
            </div>
            <div class="flex-1"></div>
          </div>
          <div class="flex-row flex-center margin-top-4x">
            <div class="flex-1"></div>
            <div
              class="s3select f-g pointer"
              :class="{ 'active': s3select==0 }"
              @click="s3select=0"
            >资源优势</div>
            <div class="dot margin-left margin-right"></div>
            <div
              class="s3select f-g pointer"
              :class="{ 'active': s3select==1 }"
              @click="s3select=1"
            >接入流程</div>
            <div class="flex-1"></div>
          </div>
          <div class="flex-row margin-top-4x" v-if="s2select==0&&s3select==0">
            <div class="text-center margin-right fblock">
              <img class="icon" :src="uploadpath+'resource/'+Res.f1" />
              <div class="h4 bolder margin-top">海量模板</div>
              <div class="h6 f-g margin-top">共享海量开发者的资源模板，项目不需要从0做起</div>
            </div>
            <div class="text-center margin-right margin-left fblock">
              <img class="icon" :src="uploadpath+'resource/'+Res.f2" />
              <div class="h4 bolder margin-top">互联网资源</div>
              <div class="h6 f-g margin-top">直接提供各种项目资源，如设计、投融资、硬件设计和人力等</div>
            </div>
            <div class="text-center margin-left fblock">
              <img class="icon" :src="uploadpath+'resource/'+Res.f3" />
              <div class="h4 bolder margin-top">订单对接</div>
              <div class="h6 f-g margin-top">平台提供接单服务，让定制公司可以直接接单</div>
            </div>
          </div>
          <div class="flex-row margin-top-4x" v-if="s2select==1&&s3select==0">
            <div class="text-center margin-right fblock">
              <img class="icon" :src="uploadpath+'resource/'+Res.f1" />
              <div class="h4 bolder margin-top">丰富的 IT 工具</div>
              <div class="h6 f-g margin-top">提供测试工具、API 调试工具、服务监控、日志分析统计等丰富的解决方案</div>
            </div>
            <div class="text-center margin-right margin-left fblock">
              <img class="icon" :src="uploadpath+'resource/'+Res.f2" />
              <div class="h4 bolder margin-top">沙箱环境</div>
              <div class="h6 f-g margin-top">数据独立，支撑开放业务功能测试需求</div>
            </div>
            <div class="text-center margin-left fblock">
              <img class="icon" :src="uploadpath+'resource/'+Res.f3" />
              <div class="h4 bolder margin-top">24*7服务</div>
              <div class="h6 f-g margin-top">24*7服务，为你随时提供技术支持</div>
            </div>
          </div>
          <div class="flex-row flex-center margin-top-4x" v-if="s2select==0&&s3select==1">
            <div class="flex-1"></div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">1</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">注册企业</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">2</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">资质审核</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">3</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">付费创建项目</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">4</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">开发调试</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">5</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">发布迁移</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">6</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">应用上线</div>
            </div>
            <div class="flex-1"></div>
          </div>
          <div class="flex-row flex-center margin-top-4x" v-if="s2select==1&&s3select==1">
            <div class="flex-1"></div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">1</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">商务接洽</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">2</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">合同确认</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">3</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">私有部署</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">4</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">平台初始化</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center margin-right">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">5</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">开发测试</div>
            </div>
            <div>
              <img class="icon" :src="uploadpath+'resource/'+Res.arrowright" />
            </div>
            <div class="text-center">
              <div class="flex-row">
                <div class="flex-1"></div>
                <div class="step">6</div>
                <div class="flex-1"></div>
              </div>
              <div class="margin-top">应用发布</div>
            </div>
            <div class="flex-1"></div>
          </div>
          <div class="text-center margin-top-4x" v-if="s2select==0">
            <el-button type="primary" class="margin-top-4x bolder long-btn" round>立即注册</el-button>
          </div>
          <div class="text-center margin-top-4x" v-if="s2select==1">
            <el-button type="primary" class="margin-top-4x bolder long-btn" round>联系商务</el-button>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <div class="section bg-g">
      <div class="w-100 h-100 flex-row flex-center">
        <div class="flex-1"></div>
        <div class="container">
          <div class="h2 bold text-center">平台优势</div>
          <div class="flex-row margin-top-4x padding-bottom-4x">
            <div class="flex-row flex-center s4section">
              <div class="margin-right-4x">
                <img class="icon-3x" :src="uploadpath+'resource/'+Res.f4" />
              </div>
              <div>
                <div class="h3 f-g2">快速软件开发模式</div>
                <div class="h7 margin-top f-g2">基于云易创模型驱动软件开发流程，您的项目可以体验最快速最节省的软件开发方式</div>
              </div>
            </div>
            <div class="flex-1"></div>
            <div class="flex-row flex-center s4section">
              <div class="margin-right-4x">
                <img class="icon-3x" :src="uploadpath+'resource/'+Res.f5" />
              </div>
              <div>
                <div class="h3 f-g2">覆盖全开发系统流程</div>
                <div class="h7 margin-top f-g2">提供从产品设计、软件设计、接口开发到软件测试和部署全软件开发工作流的服务</div>
              </div>
            </div>
          </div>
          <div class="flex-row margin-top-4x">
            <div class="flex-row flex-center s4section">
              <div class="margin-right-4x">
                <img class="icon-3x" :src="uploadpath+'resource/'+Res.f6" />
              </div>
              <div>
                <div class="h3 f-g2">全软件生态资源整合</div>
                <div class="h7 margin-top f-g2">云易创生态平台有高效强大的软件业务生态系统，服务于众多商户及创业者</div>
              </div>
            </div>
            <div class="flex-1"></div>
            <div class="flex-row flex-center s4section">
              <div class="margin-right-4x">
                <img class="icon-3x" :src="uploadpath+'resource/'+Res.f7" />
              </div>
              <div>
                <div class="h3 f-g2">绝不需要从0开始</div>
                <div class="h7 margin-top f-g2">提供模版商城和继承性项目创建，让你的系统从成品开始开发</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <div class="section bg-w">
      <div class="w-100 h-100 flex-row flex-center">
        <div class="flex-1"></div>
        <div class="container">
          <div class="h2 bold text-center">客户案例</div>
          <div class="flex-row flex-wrap margin-top">
            <div class="text-center margin-top clientcase" v-for="item in clientcase" :key="item">
              <div class="clientshow">
                <img class="icon-3x" :src="uploadpath+'indexbanner/'+item.logo" />
              </div>
              <div class="margin-top clientshow">{{item.name}}</div>
              <div class="clientqrcode">
                <img class="icon-5x" :src="uploadpath+'client/'+item.qrcode" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <div
      class="section"
      :style="{backgroundImage: 'url('+ uploadpath+'resource/' + Res.bgfooter + ')', backgroundSize:'cover'}"
    >
      <div class="w-100 h-100 flex-row flex-center">
        <div class="flex-1"></div>
        <div class="container text-center">
          <div class="h3 f-w">成就行业先锋典范，从加入云易创开发者行列开始</div>
          <div>
            <el-button class="margin-top-4x long-btn" round>立即免费加入</el-button>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <div class="section footersec">
      <div class="w-100 h-100 flex-row flex-center">
        <div class="flex-1"></div>
        <div class="container flex-row">
          <div class="flex-1">
            <div class="bolder" >联系我们</div>
            <div class="f-g margin-top-4x">商务接洽</div>
            <div class="f-g margin-top-1x">{{Inst.businesscontact}}</div>
            <div class="f-g margin-top-1x">{{Inst.customerservicemobile}}</div>
          </div>
          <div class="flex-1"></div>
          <div class="flex-1"></div>
          <div class="flex-1"></div>
        </div>
        <div class="flex-1"></div>
      </div>
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
      search: "",
      indexbanner: [],
      s2select: 0,
      s3select: 0,
      clientcase: []
    };
  },
  methods: {
  },
  created() {
    PageHelper.Init(this);
    HttpHelper.Post("inst/indexbanner", {}).then((indexbanner) => {
      this.indexbanner = indexbanner;
    });
    HttpHelper.Post("inst/clientcase", {}).then((clientcase) => {
      this.clientcase = clientcase;
    });
  },
};
</script>
<style scoped>
.logo {
  height: 18px;
}
.indexbanner {
  height: 540px;
}
.joinbtn {
  font-size: 18px;
}
.header {
  position: absolute;
  margin-top: -540px;
  z-index: 1000;
  width: 90vw;
  left: 5vw;
  min-height: 10px;
}
.menu {
  background: transparent;
}
.el-menu.el-menu--horizontal {
  border-bottom: transparent;
}
.section {
  padding-top: 80px;
  padding-bottom: 80px;
}
.bgzx {
  background: #ebf5fa;
  border-radius: 36px;
  padding: 4px;
}
.s2select.active {
  background: white;
  border-radius: 36px;
}
.s3select.active {
  color: black;
}
.fblock {
  width: 320px;
}
.step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 2px #5d80f5;
  line-height: 40px;
  color: #5d80f5;
}
.s4section {
  width: 400px;
}
.clientcase {
  width: 156px;
  height: 156px;
}
.clientcase:hover .clientshow {
  display: none;
}
.clientqrcode {
  display: none;
}
.clientqrcode img {
  margin-top: 18px;
}
.clientcase:hover .clientqrcode {
  display: unset;
}
.h262 {
  height: 262px;
}
.footersec {
  background: #f5f7fa;
}
</style>