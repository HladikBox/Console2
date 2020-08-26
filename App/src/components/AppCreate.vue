<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div class="flex-row margin-top-4x margin-bottom">
      <div class="flex-1"></div>
      <div class="container bg-w bd">
        <div class="padding-4x">
          <div class="flex-row">
            <el-page-header class="margin-right-1x" @back="goBack" content="创建应用"></el-page-header>
            <div>
              <el-tooltip content="创建应用，开始构建的后端数据服务" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="flex-row">
            <div class="width">基本信息</div>
            <div class="flex-1">
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">
                  <span class="f-d">*</span>应用名称
                </div>
                <div class="flex-1">
                  <el-input class="width-3x" maxlength="20" v-model="name" placeholder="请输入应用名称"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">
                  <span class="f-d">*</span>应用代号
                </div>
                <div class="flex-1">
                  <el-input
                    class="width-3x"
                    v-model="alias"
                    @input="filerAlias"
                    maxlength="20"
                    placeholder="请输入应用编号，只支持英文加数字"
                  ></el-input>
                </div>
              </div>
              <div class="flex-row padding-top padding-bottom">
                <div class="width-1x">
                  <span class="f-d">*</span>应用图标</div>
                <div class="flex-1">
                  <div>
                    <el-upload
                      name="logo"
                      limit="1"
                      :multiple="false"
                      :action="fileupload+'?rettype=json&module=app&field=logo'"
                      list-type="picture-card"
                      :on-success="handleAvatarSuccess"
                      :show-file-list="false"
                    >
                      <el-image
                        v-if="logo!=''"
                        :src="uploadpath+'app/'+logo"
                        class="avatar"
                        fit="contain"
                      ></el-image>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div
                    class="h7 f-p pointer margin-top-1x"
                    v-if="logo!=''"
                    @click="showLPreview(uploadpath+'app/'+logo)"
                  >查看大图</div>
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="flex-row">
            <div class="width">开发人员权限</div>
            <div class="flex-1">
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">管理员</div>
                <div v-if="adminrightgroup.length==0" class="f-g">暂无开发组</div>
                <div class="flex-1 flex-row flex-wrap" v-if="adminrightgroup.length>0">
                  <div
                    class="margin-right-1x margin-top-1x"
                    v-for="adminrightitem of adminrightgroup"
                    :key="adminrightitem"
                  >
                    <el-checkbox v-model="adminrightitem.checked">{{adminrightitem.name}}</el-checkbox>
                  </div>
                </div>
              </div>
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">观察员</div>
                <div v-if="viewerrightgroup.length==0" class="f-g">暂无开发组</div>
                <div class="flex-1 flex-row flex-wrap" v-if="viewerrightgroup.length>0">
                  <div
                    class="margin-right-1x margin-top-1x"
                    v-for="adminrightitem of viewerrightgroup"
                    :key="adminrightitem"
                  >
                    <el-checkbox v-model="adminrightitem.checked">{{adminrightitem.name}}</el-checkbox>
                  </div>
                </div>
              </div>
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">需求产品设计</div>
                <div v-if="designerrightgroup.length==0" class="f-g">暂无开发组</div>
                <div class="flex-1 flex-row flex-wrap" v-if="designerrightgroup.length>0">
                  <div
                    class="margin-right-1x margin-top-1x"
                    v-for="adminrightitem of designerrightgroup"
                    :key="adminrightitem"
                  >
                    <el-checkbox v-model="adminrightitem.checked">{{adminrightitem.name}}</el-checkbox>
                  </div>
                </div>
              </div>
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">工程师</div>
                <div v-if="developerrightgroup.length==0" class="f-g">暂无开发组</div>
                <div class="flex-1 flex-row flex-wrap" v-if="developerrightgroup.length>0">
                  <div
                    class="margin-right-1x margin-top-1x"
                    v-for="adminrightitem of developerrightgroup"
                    :key="adminrightitem"
                  >
                    <el-checkbox v-model="adminrightitem.checked">{{adminrightitem.name}}</el-checkbox>
                  </div>
                </div>
              </div>
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">测试运维</div>
                <div v-if="testrightgroup.length==0" class="f-g">暂无开发组</div>
                <div class="flex-1 flex-row flex-wrap" v-if="testrightgroup.length>0">
                  <div
                    class="margin-right-1x margin-top-1x"
                    v-for="adminrightitem of testrightgroup"
                    :key="adminrightitem"
                  >
                    <el-checkbox v-model="adminrightitem.checked">{{adminrightitem.name}}</el-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="f-p pointer" @click="routeto('/access-group')">管理开发组</div>
          </div>
          <el-divider></el-divider>
          <div class="flex-row">
            <div class="width">数据库</div>
            <div class="flex-1">
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">数据库名称</div>
                <div class="flex-1">
                  <el-input
                    class="width-3x"
                    readonly
                    :value="'yyc'+Member.yycno+'_'+alias"
                    placeholder="请输入应用名称"
                  ></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">数据库账号</div>
                <div class="flex-1">
                  <el-input readonly class="width-3x" :value="'yyc'+Member.yycno+'_'+alias"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">
                  <span class="f-d">*</span>数据库密码
                </div>
                <div class>
                  <el-input
                    class="width-3x"
                    v-model="dbpassword"
                    maxlength="32"
                    placeholder="请输入数据库的账号和密码"
                  ></el-input>
                </div>
                <div class="margin-left">
                  <el-button size="mini" @click="resetpassword">生成随机密码</el-button>
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="flex-row">
            <div class="flex-1"></div>
            <el-button
              type="primary"
              :disabled="name==''||alias==''||dbpassword==''||logo==''"
              plain
              icon="el-icon-plus"
              @click="createApp"
            >立即创建</el-button>
          </div>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";

export default {
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      name: "",
      alias: "",
      dialogImageUrl: "",
      dialogVisible: false,
      logo: "",
      adminrightgroup: [],
      viewerrightgroup: [],
      designerrightgroup: [],
      developerrightgroup: [],
      testrightgroup: [],
      dbpassword: ""
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    HttpHelper.Post("member/grouplist", { adminright: "Y" }).then(group => {
      console.log("group", group);
      for (var item of group) {
        item.checked = item.isdefault_value == "Y";
      }
      this.adminrightgroup = group;
    });
    HttpHelper.Post("member/grouplist", { viewerright: "Y" }).then(group => {
      console.log("group", group);
      for (var item of group) {
        item.checked = item.isdefault_value == "Y";
      }
      this.viewerrightgroup = group;
    });
    HttpHelper.Post("member/grouplist", { designerright: "Y" }).then(group => {
      console.log("group", group);
      for (var item of group) {
        item.checked = item.isdefault_value == "Y";
      }
      this.designerrightgroup = group;
    });
    HttpHelper.Post("member/grouplist", { developerright: "Y" }).then(group => {
      console.log("group", group);
      for (var item of group) {
        item.checked = item.isdefault_value == "Y";
      }
      this.developerrightgroup = group;
    });
    HttpHelper.Post("member/grouplist", { testright: "Y" }).then(group => {
      console.log("group", group);
      for (var item of group) {
        item.checked = item.isdefault_value == "Y";
      }
      this.testrightgroup = group;
    });
  },
  methods: {
    createApp(event) {
      var json = {
        name: this.name,
        seq: 0,
        adminrightgrouplist: Utils.GetIDString(this.adminrightgroup),
        viewerrightgrouplist: Utils.GetIDString(this.viewerrightgroup),
        designerrightgrouplist: Utils.GetIDString(this.designerrightgroup),
        developerrightgrouplist: Utils.GetIDString(this.developerrightgroup),
        testrightgrouplist: Utils.GetIDString(this.testrightgroup),
        alias: this.alias,
        logo: this.logo,
        dbpassword: this.dbpassword
      };

      HttpHelper.Post("app/create", json).then(ret => {
        if (ret.code != 0) {
          this.$message({
            message: ret.return,
            type: "error"
          });
        } else {
          this.$confirm("创建成功，直接进入开发环境?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "返回应用列表",
            type: "warning"
          })
            .then(() => {
              this.routeto("/app/" + this.alias);
            })
            .catch(() => {
              this.routeto("/management");
            });
        }
      });
    },
    resetpassword(event) {
      this.dbpassword = Utils.UUID();
    },
    showLPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      if (res.return == "logo") {
        this.logo = res.result;
      }
    },
    filerAlias: function() {
      this.alias = this.alias.replace(/[\W]/g, "");
    }
  }
};
</script>
<style scoped>
</style>