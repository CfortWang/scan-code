webpackJsonp([1],{"0qIB":function(t,e){t.exports={en:{title:"Bean Pop",mainText:{text1:"Download",text2:"喜豆APP",text3:"Check your entries!"},info:{click:"Comming soon."},subText:{text1:"You can check more information",text2:"through mobile App."},error:{expireCode:"The code usage is over.",invalidCode:"This code is can not be used."}},ko:{title:"Bean Pop",mainText:{text1:"喜豆APP",text2:"다운받고",text3:"응모현황을 확인하세요!"},info:{click:"곧 온다."},subText:{text1:"모바일 앱을 통해 응모현황과 당첨현황 등",text2:"다양한 정보를 확인할 수 있습니다."},error:{expireCode:"사용횟수가 초과된 코드입니다.",invalidCode:"사용할수 없는 코드입니다."}},zh:{title:"喜豆一下",mainText:{text1:"请下载",text2:"喜豆APP,",text3:"查看中奖信息！"},info:{click:"即将到来"},subText:{text1:"可通过手机APP确认",text2:"兑奖情况等详细信息"},error:{expireCode:"超过使用次数",invalidCode:"这个码被扫过啦，换一个扫更幸运"}},ja:{title:"Bean Pop",mainText:{text1:"喜豆APP",text2:"다운받고",text3:"응모현황을 확인하세요!"},subText:{text1:"모바일 앱을 통해 응모현황과 당첨현황 등",text2:"다양한 정보를 확인할 수 있습니다."},error:{expireCode:"사용횟수가 초과된 코드입니다.",invalidCode:"사용할수 없는 코드입니다."}}}},"T+nY":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("K/Lq"),s=a.n(i),n=a("0qIB"),o={name:"appDown",i18n:new VueI18n({locale:"zh",messages:n}),components:{},data:function(){return{items:[{title:"English",value:"en"},{title:"한국어",value:"ko"},{title:"中国",value:"zh"}],currentLanguage:"zh",pageMessageStatus:200,notWechat:"",phoneKind:"",isActive:null,noActive:null,reload:!1,refresh:!1}},created:function(){s.a.get("qr_language")?(this.$i18n.locale=s.a.get("qr_language"),this.currentLanguage=s.a.get("qr_language")):(this.$i18n.locale="zh",this.currentLanguage="zh",s.a.set("qr_language","zh",1)),/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?this.phoneKind="ios":/(Android)/i.test(navigator.userAgent)&&(this.phoneKind="android"),"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?this.notWechat=!1:this.notWechat=!0,console.log(this.phoneKind+" "+this.notWechat);var t=this.$route.params;this.reload=t.reload,console.log(this.reload);var e,a="";if(a=t.code?t.code:"default",console.log(a),400===a)this.pageMessageStatus=400,this.isActive=!0,this.noActive=!1,this.reload&&(clearTimeout(e),e=setTimeout(function(){window.location.reload()},100));else if(410===a)this.pageMessageStatus=410,this.isActive=!0,this.noActive=!1;else if(this.pageMessageStatus=200,this.notWechat)if(this.isActive=!0,this.noActive=!1,"android"==this.phoneKind)window.location.href="xidou://app";else if("ios"==this.phoneKind){var i;if(window.location.href="seedo://",this.reload)clearTimeout(i),i=setTimeout(function(){window.location.href=location},100)}else console.log("why?");else this.isActive=!1,this.noActive=!0},methods:{changeItem:function(t){s.a.set("qr_language",t.target.value,1),this.$i18n.locale=s.a.get("qr_language"),this.currentLanguage=s.a.get("qr_language")},downloadAndroid:function(){window.location.href="http://android.myapp.com/myapp/detail.htm?apkName=cn.beanpop.userapp"},downloadIos:function(){window.location.href="https://itunes.apple.com/cn/app/%E5%96%9C%E8%B1%86/id1399448154?mt=8"}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"father"},[a("div",{staticClass:"app-down-bc",class:{showInBroswer:t.isActive,notShowInBroswer:t.noActive}},[a("div",{staticClass:"app-down"},[a("header",[a("div",{staticClass:"header-title-wrapper fs-14"},[t._v("\n          "+t._s(t.$t("title"))+"\n        ")]),t._v(" "),a("div",{staticClass:"header-language-wrapper"},[a("img",{attrs:{src:"/static/img/icon/language_icon_black.png"}}),t._v(" "),a("div",{staticClass:"header-language-text float-wrapper"},[a("select",{staticClass:"float-l",on:{change:function(e){t.changeItem(e)}}},t._l(t.items,function(e){return a("option",{key:e.index,domProps:{value:e.value,selected:t.currentLanguage===e.value}},[t._v(t._s(e.title))])})),t._v(" "),t._m(0)])])]),t._v(" "),a("div",{staticClass:"contents-wrapper"},[a("div",{staticClass:"app-text-wrapper"},[200===t.pageMessageStatus?a("div",{staticClass:"main-text-wrapper fs-14"},["zh"===t.currentLanguage?a("span",[t._v("\n              "+t._s(t.$t("mainText.text1"))+" "),a("span",{staticClass:"text-bold"},[t._v(t._s(t.$t("mainText.text2")))]),a("br"),t._v(t._s(t.$t("mainText.text3"))+"\n            ")]):a("span",[a("span",{staticClass:"text-bold"},[t._v(t._s(t.$t("mainText.text1")))]),t._v(" "+t._s(t.$t("mainText.text2"))),a("br"),t._v(t._s(t.$t("mainText.text3"))+"\n            ")])]):400===t.pageMessageStatus?a("div",{staticClass:"main-text-wrapper fs-14"},[t._v("\n            "+t._s(t.$t("error.invalidCode"))+"\n          ")]):a("div",{staticClass:"main-text-wrapper fs-14"},[t._v("\n            "+t._s(t.$t("error.expireCode"))+"\n          ")]),t._v(" "),a("div",{staticClass:"sub-text-wrapper"},[t._v("\n            "+t._s(t.$t("subText.text1"))),a("br"),t._v(t._s(t.$t("subText.text2"))+"\n          ")])]),t._v(" "),a("div",{staticClass:"app-button-wrapper"},[a("button",{staticClass:"btn down-btn",attrs:{type:"button"},on:{click:t.downloadAndroid}},[t._m(1)]),t._v(" "),a("button",{staticClass:"btn down-btn",attrs:{type:"button"},on:{click:t.downloadIos}},[t._m(2)])])])])]),t._v(" "),a("div",{staticClass:"son",class:{showInWechat:t.noActive,notShowInWechat:t.isActive}},[t._m(3)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-arrow-wrapper fs-05 float-l dsp-table"},[e("div",{staticClass:"dsp-table-cell"},[this._v("▼")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"android"},[e("img",{attrs:{src:"/static/img/app_down/android_icon_white.png"}}),this._v(" "),e("div",{staticClass:"android-text fs-11"},[this._v("\n                Android\n              ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ios"},[e("img",{attrs:{src:"/static/img/app_down/ios_icon_white.png"}}),this._v(" "),e("div",{staticClass:"ios-text fs-11"},[this._v("\n                iOS\n              ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ready-box"},[a("div",{staticClass:"ready-top clear-fix"},[a("div",{staticClass:"ready-top-img"},[a("img",{attrs:{src:"/static/img/app_down/arrow.png",alt:""}})]),t._v(" "),a("div",{staticClass:"ready-top-text"},[a("p",[t._v("点击右上角")]),t._v(" "),a("p",[t._v("选择在浏览器中打开")])])]),t._v(" "),a("div",{staticClass:"ready-img"},[a("img",{attrs:{src:"/static/img/app_down/phone.png",alt:""}})]),t._v(" "),a("div",{staticClass:"ready-text"},[a("p",[t._v("下载「喜豆」客户端, 新人领取100喜豆点")]),t._v(" "),a("p",[t._v("参与抽奖获得更多优惠")])])])}]};var c=a("VU/8")(o,r,!1,function(t){a("ymB/")},"data-v-49168212",null);e.default=c.exports},"ymB/":function(t,e){}});