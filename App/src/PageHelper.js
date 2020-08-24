import Config from "./Config";
import { HttpHelper } from "./HttpHelper";

export class PageHelper{
    static AppInstance = null;
    static Res=null;
    static Inst=null;
    static Member=null;
    static Init(page){
        console.log(page);
        page.uploadpath=Config.UploadPath;
        if(PageHelper.Res==null){
            HttpHelper.Post("inst/resources",{}).then((res)=>{
                page.Res=res;
                PageHelper.Res=res;
            });
        }else{
            page.Res=PageHelper.Res;
        }

        if(PageHelper.Inst==null){
            HttpHelper.Post("inst/info",{}).then((res)=>{
                page.Inst=res;
                PageHelper.Inst=res;
            });
        }else{
            page.Inst=PageHelper.Inst;
        }
        console.log("pageinfo",page);

        page.home=function(event) {
          page.$router.push({ path: "/" });
        };
        page.routeto=function (path, param = {}) {
            page.$router.push({ path, param });
        }
        page.showloginbox=function (event) {
            PageHelper.AppInstance.ShowLoginBox();
        }
        var token=window.localStorage.getItem("token");
        if(token!=null){
            if(PageHelper.Member==null){
                HttpHelper.Post("member/info",{}).then((Member)=>{
                    page.Member=Member;
                    PageHelper.Member=Member;
                });
            }else{
                page.Member=PageHelper.Member;
            }
        }else{
            page.Member=null;
            PageHelper.Member=null;
        }
        
    }
}