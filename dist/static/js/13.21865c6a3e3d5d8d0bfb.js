webpackJsonp([13],{"8YIz":function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=a("lRwf"),e=a.n(s),n=a("TXmL"),o=a("OMN4"),c=a.n(o),p=a("4kSj"),r=a.n(p),l=a("8wSn");e.a.use(n.a);var v={name:"spellBean",i18n:new n.a({locale:"spellBean",phone:"",messages:l}),components:{},data:function(){return{rulesOpen:!1,phoneKind:"",groupStatus:"",groupCreateAt:"",groupExpriedAt:"",groupSuccessAt:"",groupStatusDesc:"",groupName:"",shopImage:"",groupSize:"",groupLeftTime:"",pinzhu:"",ownerAvatar:"",pinSuccess:!0,pinFailed:!0,pinIng:!0,shopName:"",groupOnPrice:"",oldPrice:"",discountPrice:"",newPrice:"",startUseTime:"",endUseTime:"",minDistance:"",shopCount:"",shopID:"",groupID:"",payAmount:"",payID:"",payPackageName:"",payShopName:"",payRule:""}},created:function(){var t=this;/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?this.phoneKind="ios":/(Android)/i.test(navigator.userAgent)&&(this.phoneKind="android"),r()("body").css({"background-color":"#F4F4F4","font-family":"PingFangSC-Regular","font-size":"16px"}),c()({method:"GET",url:"http://dev-new-api.beanpop.cn/myGroupOn/1",withCredentials:!0,headers:{lang:"zh",token:"",os:"web",version:"1.0.0",time:"","Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){var a=i.data.data;t.groupName=a.groupName,t.groupCreateAt=a.createdAt,t.groupSuccessAt=a.paidAt,t.groupExpriedAt=a.expriedAt,t.shopName=a.shopName,t.shopImage=a.image,t.groupOnPrice=a.grouponPrice,t.oldPrice=a.price,t.discountPrice=a.discountedPrice,t.newPrice=parseFloat(t.discountPrice-t.groupOnPrice),t.startUseTime=a.startUseTime,t.endUseTime=a.endUseTime,t.groupStatus=a.groupStatus,t.shopID=a.buyerID,t.groupID=a.groupOnId,1==t.groupStatus?(t.groupStatusDesc="拼团成功",t.pinSuccess=!0):2==t.groupStatus?(t.groupStatusDesc="拼豆中...",t.pinSuccess=!1,t.pinIng=!0):(t.groupStatusDesc="拼团失败",t.pinSuccess=!1,t.pinIng=!1),t.groupLeftTime=a.timeLeft,t.groupSize=a.groupSize;for(var s=a.tips,e=0;e<s.length;e++){var n=s[e].title,o=s[e].value;r()(".must-know-contain").append('<div class="must-know-title"></div><div class="must-know-text"></div>'),r()(".must-know-contain .must-know-title:eq("+e+")").text(n),r()(".must-know-contain .must-know-text:eq("+e+")").text(o)}for(var c=a.user,p=0;p<c.length;p++){1==c[p].isOwner&&(t.ownerAvatar=c[p].image,t.pinzhu=c[p].nickname,null!=t.ownerAvatar&&""!=t.ownerAvatar||(t.ownerAvatar="/static/img/share/pindou-wait.png"))}var l=a.nowSize,v='<div class="pindou-partner"><div class="avatar"><img/></div></div>';setTimeout(function(){for(var i=1;i<l;i++){r()(".user-joined").append(v);var a=c[i].image;null==a&&(a="/static/img/share/pindou-wait.png"),r()(".user-joined .avatar:eq("+i+") img").attr("src",a)}for(var s=l;s<t.groupSize;s++){r()(".user-joined").append(v);r()(".user-joined .avatar:eq("+s+") img").attr("src","/static/img/share/pindou-wait.png")}},100);var d=a.shop;t.minDistance=9999999,t.shopCount=d.length,0==t.shopCount&&r()(".min-distance span").text("附近无门店");for(var u=0;u<d.length;u++){r()(".applicative-contain").append('<div class="applicative-shop justified"><div class="applicative-shop-desc"><div class="applicative-shop-name-box justified"><div class="applicative-shop-name"></div><div class="applicative-shop-distance"></div></div><div class="applicative-shop-location"></div></div><div class="applicative-shop-icon"><img src="/static/img/share/position.png"/></div></div>');var m=d[u].name,g=d[u].location,h=d[u].distance;t.minDistance=h<t.minDistance?h:t.minDistance,h>=1e3?h=parseFloat(h/1e3)+"km":h+="m",r()(".applicative-contain .applicative-shop-name:eq("+u+")").text(m),r()(".applicative-contain .applicative-shop-distance:eq("+u+")").text(h),r()(".applicative-contain .applicative-shop-location:eq("+u+")").text(g)}console.log(a)}).catch(function(t){console.log(t)})},methods:{showMustKnow:function(){"none"==r()(".must-know-contain").css("display")?(r()(".must-know-contain").show(),r()(".must-know-icon img").attr("src","/static/img/share/open_hollow.png")):(r()(".must-know-contain").hide(),r()(".must-know-icon img").attr("src","/static/img/share/close_hollow.png"))},showApplicative:function(){this.shopCount>0&&("none"==r()(".applicative-contain").css("display")?(r()(".applicative-contain").show(),r()(".shop-count").show(),r()(".min-distance").hide(),r()(".applicative-icon img").attr("src","/static/img/share/open_hollow.png")):(r()(".applicative-contain").hide(),r()(".shop-count").hide(),r()(".min-distance").show(),r()(".applicative-icon img").attr("src","/static/img/share/close_hollow.png")))},rulesClick:function(){this.rulesOpen=!0},backKey:function(){this.rulesOpen=!1},goShopDetail:function(){this.$router.push({name:"ShopDetails",params:{shopID:this.shopID}})},goPindouDetail:function(){this.$router.push({name:"PindouDetails",params:{groupID:this.groupID}})},goPindou:function(){var t=this;c()({method:"POST",url:"http://dev-new-api.beanpop.cn/event/groupOn",params:{groupon_id:133},withCredentials:!0,headers:{lang:"zh",token:"",os:"web",version:"1.0.0",time:"","Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){var a=i.data.data,s=i.data.code;t.payID=a.id,t.payAmount=a.amount,t.payPackageName=a.priductName,t.payShopName=a.shopName,t.payRule=a.rule,console.log(a),410==s?t.$router.push({name:"Login"}):200==s&&t.$router.push({name:"PayDeposit",params:{payID:t.payID,payAmount:t.payAmount,payPackageName:t.payPackageName,payShopName:t.payShopName,payRule:t.payRule}})}).catch(function(t){console.log(t)})}}},d={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"content"},[t.rulesOpen?a("div",{staticClass:"terms-div-wrapper"},[a("div",{staticClass:"terms-div-header"},[a("div",{staticClass:"header-title-wrapper"},[t._v("\n\t\t\t"+t._s(t.$t("pddrule"))+"\n\t\t")]),t._v(" "),a("div",{staticClass:"header-back-wrapper",on:{click:t.backKey}},[t._m(0)])]),t._v(" "),t._m(1)]):t._e(),t._v(" "),a("div",{staticClass:"fixed-right-btn",on:{click:function(i){t.openApp(t.phoneKind)}}},[t._v("打开App")]),t._v(" "),a("div",{staticClass:"main-top"},[a("div",{staticClass:"main-top-title"},[a("img",{attrs:{src:"/static/img/share/rule.png",alt:""},on:{click:t.rulesClick}}),t._v(" "),a("span",[t._v(t._s(t.groupStatusDesc))])]),t._v(" "),t.pinIng?a("div",{staticClass:"finish-time"},[a("span",[t._v("22:33:44.0")]),t._v(" "),a("span",{staticClass:"orange"},[t._v("后结束")])]):t._e(),t._v(" "),a("div",{staticClass:"pin-success-box"},[a("div",{staticClass:"user-joined justified"},[a("div",{staticClass:"pindou-partner"},[a("div",{staticClass:"avatar"},[a("img",{attrs:{src:t.ownerAvatar}})]),t._v(" "),t._m(2)])]),t._v(" "),a("div",{staticClass:"join-pindou-desc"},[a("div",{staticClass:"times"},[a("span",[t._v("发起时间：")]),t._v(" "),a("span",[t._v(t._s(t.groupCreateAt))])]),t._v(" "),t.pinSuccess?a("div",{staticClass:"times"},[a("span",[t._v("成功时间：")]),t._v(" "),a("span",[t._v(t._s(t.groupSuccessAt))])]):t._e(),t._v(" "),t.pinSuccess||t.pinIng?t._e():a("div",{staticClass:"times"},[a("span",[t._v("失败时间：")]),t._v(" "),a("span",[t._v(t._s(t.groupExpriedAt))])]),t._v(" "),t.pinIng?a("div",{staticClass:"group-info"},[a("span",{staticClass:"orange"},[t._v(t._s(t.pinzhu))]),t._v(" "),a("span",{staticClass:"grey"},[t._v("发起的拼豆豆还差")]),t._v(" "),a("span",{staticClass:"orange"},[t._v("3人")]),t._v(" "),a("span",{staticClass:"grey"},[t._v("，即可获得优惠 ")])]):t._e()])])]),t._v(" "),a("div",{staticClass:"pindou-details"},[a("div",{staticClass:"pindou-details-top",on:{click:t.goShopDetail}},[t._v(t._s(t.shopName))]),t._v(" "),a("div",{staticClass:"pindou-details-middle",on:{click:t.goPindouDetail}},[a("div",{staticClass:"middle-left"},[a("img",{attrs:{src:t.shopImage,alt:""}})]),t._v(" "),a("div",{staticClass:"middle-right"},[a("div",{staticClass:"package-name"},[t._v(t._s(t.groupName))]),t._v(" "),a("div",{staticClass:"right-second-div clear-fix"},[a("div",{staticClass:"owner-box"},[t._v("拼主")]),t._v(" "),a("div",{staticClass:"new-package-price"},[t._v("￥"+t._s(t.discountPrice))])]),t._v(" "),a("div",{staticClass:"right-third-div clear-fix"},[a("div",{staticClass:"really-price-box"},[a("span",[t._v("到店使用仍需支付：")]),t._v(" "),a("span",[t._v("￥"+t._s(t.newPrice))])]),t._v(" "),a("div",{staticClass:"old-package-price"},[a("del",[t._v("￥"+t._s(t.oldPrice))])])])])]),t._v(" "),a("div",{staticClass:"pindou-details-bottom"},[t.pinSuccess?a("div",[a("span",[t._v("使用期限：")]),t._v(" "),a("span",[t._v(t._s(t.startUseTime))]),t._v(" "),a("span",[t._v("至")]),t._v(" "),a("span",[t._v(t._s(t.endUseTime))])]):t._e()])]),t._v(" "),a("div",{staticClass:"must-know justified",on:{click:t.showMustKnow}},[a("span",{staticClass:"must-know-text"},[t._v("使用须知")]),t._v(" "),t._m(3)]),t._v(" "),a("div",{staticClass:"must-know-contain"}),t._v(" "),a("div",{staticClass:"applicative justified",on:{click:t.showApplicative}},[a("div",{staticClass:"applicative-text"},[t._v("适用门店")]),t._v(" "),a("div",{staticClass:"applicative-icon justified"},[a("div",{staticClass:"min-distance"},[a("span",[t._v("最近门店"+t._s(t.minDistance)+"米")])]),t._v(" "),a("div",{staticClass:"shop-count"},[a("span",[t._v("共"+t._s(t.shopCount)+"家门店")])]),t._v(" "),a("img",{attrs:{src:"/static/img/share/close_hollow.png"}})])]),t._v(" "),a("div",{staticClass:"applicative-contain"}),t._v(" "),a("div",{staticClass:"goto-pindou",on:{click:t.goPindou}},[a("span",[t._v("去拼豆")])])])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"header-back-arrow"},[i("img",{attrs:{src:"/static/img/icon/goback.png"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"terms-div-contents"},[i("iframe",{attrs:{src:"https://www.beanpop.cn/pddrule",width:"100%",height:"100%",frameborder:"0",name:"_blank",id:"_blank"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"owner"},[i("img",{attrs:{src:"/static/img/share/pindou-owner.png"}}),this._v(" "),i("div",{staticClass:"owner-text"},[this._v("拼主")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"must-know-icon"},[i("img",{attrs:{src:"/static/img/share/close_hollow.png"}})])}]};var u=a("VU/8")(v,d,!1,function(t){a("AYJ7")},"data-v-62a0f566",null);i.default=u.exports},AYJ7:function(t,i){}});