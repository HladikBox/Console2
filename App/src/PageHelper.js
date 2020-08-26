import Config from "./Config";
import {
  HttpHelper
} from "./HttpHelper";

export class PageHelper {
  static AppInstance = null;
  static Res = null;
  static Inst = null;
  static Member = null;
  static Init(page) {
    console.log(page);
    page.uploadpath = Config.UploadPath;
    page.fileupload = Config.FileUploadAPI;
    if (PageHelper.Res == null) {
      HttpHelper.Post("inst/resources", {}).then((res) => {
        page.Res = res;
        PageHelper.Res = res;
      });
    } else {
      page.Res = PageHelper.Res;
    }

    if (PageHelper.Inst == null) {
      HttpHelper.Post("inst/info", {}).then((res) => {
        page.Inst = res;
        PageHelper.Inst = res;
      });
    } else {
      page.Inst = PageHelper.Inst;
    }
    console.log("pageinfo", page);

    page.home = function (event) {
      page.$router.push({
        path: "/"
      });
    };
    page.routeto = function (path, param = {}) {
      page.$router.push({
        path,
        param
      });
    }
    page.goBack = function () {
      page.$router.back(-1);
    }
    page.showloginbox = function (event) {
      PageHelper.AppInstance.ShowLoginBox();
    }

    page.copy = function (str) {
      var _input = document.createElement("input"); // 直接构建input
      _input.value = str; // 设置内容
      document.body.appendChild(_input); // 添加临时实例
      _input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(_input); // 删除临时实例
      this.$message({
        message: '复制成功',
        type: "success"
      });
    }

    var token = window.localStorage.getItem("token");
    if (token != null) {
      if (PageHelper.Member == null) {
        HttpHelper.Post("member/info", {}).then((Member) => {
          page.Member = Member;
          PageHelper.Member = Member;
        });
      } else {
        page.Member = PageHelper.Member;
        HttpHelper.Post("member/info", {}).then((Member) => {
          page.Member = Member;
          PageHelper.Member = Member;
        });
      }
    } else {
      page.Member = null;
      PageHelper.Member = null;
    }

  }

  static ReloadMember(page, callback) {
    var token = window.localStorage.getItem("token");
    if (token != null) {
      HttpHelper.Post("member/info", {}).then((Member) => {
        page.Member = Member;
        PageHelper.Member = Member;
        callback(Member);
      });
    } else {
      page.Member = null;
      PageHelper.Member = null;
      callback(null);
    }
  }
  static LoginAuth(page) {

    var token = window.localStorage.getItem("token");
    if (token != null) {
      HttpHelper.Post("member/info", {}).then((Member) => {
        if (Member == null) {
          page.home();
        }
      });
    } else {
      page.home();
    }
  }
}
