<template>
  <div class="bg-g">
    <MyHeader></MyHeader>
    <div class="flex-row margin-top-4x margin-bottom">
      <div class="flex-1"></div>
      <div class="container bg-w bd" v-if="Member!=null">
        <div class="padding-4x">
          <el-page-header @back="goBack" v-if="Member.isrenzhen=='N'" content="提交资质审核"></el-page-header>
          <el-page-header @back="goBack" v-if="Member.isrenzhen=='T'" content="等待审核资质"></el-page-header>
          <el-page-header @back="goBack" v-if="Member.isrenzhen=='Y'" content="资质详情"></el-page-header>
          <el-divider></el-divider>
          <div >
            <div>资质认证状态：{{Member.isrenzhen_name}}</div>
            <el-divider></el-divider>
          </div>
          <div class="flex-row">
            <div class="width">申请人信息</div>
            <div class="flex-1">
              <div class="flex-row flex-center padding-bottom">
                <div class="width-1x">姓名</div>
                <div class="flex-1">
                  <el-input class="width-3x" v-model="Member.name" placeholder="请输入姓名"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-top padding-bottom">
                <div class="width-1x">公司</div>
                <div class="flex-1">
                  <el-input class="width-3x" v-model="Member.company" placeholder="请输入公司"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-top padding-bottom">
                <div class="width-1x">手机号码</div>
                <div class="flex-1">
                  <el-input class="width-3x" v-model="Member.dengjimobile" placeholder="请输入手机号码"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-top padding-bottom">
                <div class="width-1x">邮箱地址</div>
                <div class="flex-1">
                  <el-input class="width-3x" v-model="Member.email" placeholder="请输入邮箱地址"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-top padding-bottom">
                <div class="width-1x">身份证号码</div>
                <div class="flex-1">
                  <el-input class="width-3x" v-model="Member.identity" placeholder="请输入姓名"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center padding-top padding-bottom">
                <div class="width-1x">身份证正面</div>
                <div class="flex-1">
                  <div>
                    <el-upload
                      name="idcard"
                      limit="1"
                      :multiple="false"
                      :action="fileupload+'?rettype=json&module=member&field=idcard'"
                      list-type="picture-card"
                      :on-success="handleAvatarSuccess"
                      :show-file-list="false"
                    >
                      <el-image
                        v-if="Member.idcard!=''"
                        :src="uploadpath+'member/'+Member.idcard"
                        class="avatar"
                        fit="contain"
                      ></el-image>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div
                    class="h7 f-p pointer margin-top-1x"
                    v-if="Member.idcard!=''"
                    @click="showLPreview(uploadpath+'member/'+Member.idcard)"
                  >查看大图</div>
                </div>
              </div>
              <div class="flex-row flex-center padding-top padding-bottom">
                <div class="width-1x">个人名片</div>
                <div class="flex-1">
                  <div>
                    <el-upload
                      name="mingpian"
                      limit="1"
                      :multiple="false"
                      :action="fileupload+'?rettype=json&module=member&field=mingpian'"
                      list-type="picture-card"
                      :on-success="handleAvatarSuccess"
                      :show-file-list="false"
                    >
                      <el-image
                        v-if="Member.mingpian!=''"
                        :src="uploadpath+'member/'+Member.mingpian"
                        class="avatar"
                        fit="contain"
                      ></el-image>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div
                    class="h7 f-p pointer margin-top-1x"
                    v-if="Member.mingpian!=''"
                    @click="showLPreview(uploadpath+'member/'+Member.mingpian)"
                  >查看大图</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="Member.isrenzhen=='N'">
            <el-divider direction="vertical"></el-divider>
            <div class="flex-row">
              <div class="flex-1"></div>
              <div>
                <el-button type="primary" @click="submit">提交资料</el-button>
              </div>
            </div>
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
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
  },
  methods: {
    showLPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      if (res.return == "mingpian") {
        this.Member.mingpian = res.result;
      }
      if (res.return == "idcard") {
        this.Member.idcard = res.result;
      }
    },
    submit: function(event) {
      if (this.Member.name.trim() == "") {
        this.$message({ message: "请输入姓名", type: "error" });
        return;
      }
      if (this.Member.company.trim() == "") {
        this.$message({ message: "请输入公司", type: "error" });
        return;
      }
      if (this.Member.dengjimobile.trim() == "") {
        this.$message({ message: "请输入手机号码", type: "error" });
        return;
      }
      if (this.Member.email.trim() == "") {
        this.$message({ message: "请输入邮箱", type: "error" });
        return;
      }
      if (this.Member.identity.trim() == "") {
        this.$message({ message: "请输入身份证号码", type: "error" });
        return;
      }
      if (this.Member.idcard.trim() == "") {
        this.$message({ message: "请输入身份证正面", type: "error" });
        return;
      }
      if (this.Member.mingpian.trim() == "") {
        this.$message({ message: "请输入名片", type: "error" });
        return;
      }

      this.$alert("资质审核无法修改，是否确认提交？", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            HttpHelper.Post("member/submitcert", {
              name: this.Member.name,
              company: this.Member.company,
              dengjimobile: this.Member.dengjimobile,
              email: this.Member.email,
              identity: this.Member.identity,
              idcard: this.Member.idcard,
              mingpian: this.Member.mingpian
            }).then(ret => {
              this.Member.isrenzhen_name="审核中";
              this.Member.isrenzhen='T';
            });
          }
        });
    }
  }
};
</script>
<style scoped>
.avatar {
  width: 148px;
  height: 148px;
}
</style>