export class Utils{
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
    static IsMobile(mobile){
        return Number(mobile).toString().length == 11 && mobile[0] == "1";;
    }
}