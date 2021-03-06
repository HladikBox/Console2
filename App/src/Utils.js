export class Utils {
  static HtmlDecode(str) {
    if (str == null) {
      return "";
    }

    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");

    //s = s.replace(new RegExp("</p>", "gm"), "</p><br />");

    var reg = new RegExp("\"/alucard263096/talentmanagemen/upload/", "g"); //创建正则RegExp对象   
    s = s.replace(reg, "\"http://cmsdev.app-link.org/alucard263096/talentmanagemen/upload/");

    return s;
  }
  static IsMobile(mobile) {
    return Number(mobile).toString().length == 11 && mobile[0] == "1";;
  }
  static UUID() {
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid;
  }
  static GetIDString(arr) {
    var arrstr = [];
    for (var i = 0; i < arr.length; i++) {
      arrstr.push(arr[i].id);
    }
    return arrstr.join(",");
  }

  /**
   * 获取 blob
   * @param  {String} url 目标文件地址
   * @return {Promise} 
   */
  static GetBlob(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
      };

      xhr.send();
    });
  }

  /**
   * 保存
   * @param  {Blob} blob     
   * @param  {String} filename 想要保存的文件名称
   */
  static SaveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      const body = document.querySelector('body');

      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // fix Firefox
      link.style.display = 'none';
      body.appendChild(link);

      link.click();
      body.removeChild(link);

      window.URL.revokeObjectURL(link.href);
    }
  }
  static FileDownload(url, filename){
    Utils.GetBlob(url).then(blob => {
        Utils.SaveAs(blob, filename);
    });
  }
}
