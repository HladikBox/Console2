import Config from "./Config";
import Axios from "axios";

export class HttpHelper {
  static Sign = "";
  static Token = "";
  static TokenKey = "";
  static Unicode = "yyc";
  static Post(url, data) {
    var fullurl = Config.ApiUrl + url;
    return Axios.post(fullurl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sign': HttpHelper.Sign,
        'Token': HttpHelper.Token,
        'TokenKey': HttpHelper.TokenKey,
        'UNICODE': HttpHelper.Unicode
      }
    }).then((res) => {
      console.log(url, data, res.data);
      return res.data;
    });
  }
}
