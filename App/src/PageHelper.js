import Config from "./Config";
import { HttpHelper } from "./HttpHelper";

export class PageHelper{
    static Res=null;
    static Inst=null;
    static Init(page){
        console.log(page);
        page.uploadpath=Config.UploadPath;
        if(PageHelper.Res==null){
            HttpHelper.Post("inst/resources",{}).then((res)=>{
                page.Res=res;
            });
        }else{
            page.Res=PageHelper.Res;
        }

        if(PageHelper.Inst==null){
            HttpHelper.Post("inst/info",{}).then((res)=>{
                page.Inst=res;
            });
        }else{
            page.Inst=PageHelper.Inst;
        }


    }
}