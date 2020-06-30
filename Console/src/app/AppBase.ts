import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit, AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { Buffer } from 'buffer';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';

declare let Chart: any;

export class AppBase implements OnInit {

    static UNICODE="yyc";
    public options = null;
    public params: Params = null;

    static StaticInstInfo=null;
    InstInfo=null;

    static Resources=null;
    res=null;

    public memberinfo = null;

    public constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public instApi:InstApi,
        public memberApi:MemberApi
    ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
        });
    }


    setStatusBar() {
        //  this.statusBar.styleLightContent();
        console.log('123123')
    }
    ngOnInit() {
        console.log('456456')
        ApiConfig.SetUnicode(AppBase.UNICODE);
        this.onMyLoad();

    }
    
    onMyLoad() {


    }

    getInstInfo() {

        if (AppBase.StaticInstInfo == null) {
            this.instApi.info({}, false).then((instinfo: any) => {
                AppBase.StaticInstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo, 'inst');
            });
        } else {

            this.InstInfo = AppBase.StaticInstInfo;
        }
        
    }

    
    getResources() {
        if (AppBase.Resources == null) {
            this.instApi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }

    ngAfterViewInit() {


        this.onMyShow();
    }

    onMyShow() {

    }

    
}
