import Config from "./Config";
import Axios from "axios";

export class HttpHelper {
  static Sign = "";
  static Token = "";
  static TokenKey = "";
  static Unicode = "yyc";
  static Post(url, data) {
    var fullurl = Config.ApiUrl + url;
    var token=window.localStorage.getItem("token");
    return Axios.post(fullurl,HttpHelper.ParamUrlencoded(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sign': HttpHelper.Sign,
        'Token': token,
        'TokenKey': HttpHelper.TokenKey,
        'UNICODE': HttpHelper.Unicode
      }
    }).then((res) => {
      console.log(url, data, res.data);
      return res.data;
    });
  }

  static ParamUrlencoded(json) {
    var arr = new Array();
    for (let i in json) {
        arr.push(  i + "=" + encodeURIComponent(json[i]));
    }
    return arr.join("&");
  }
}
