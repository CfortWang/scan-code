webpackJsonp([11],{"0SxR":function(e,t){},"P+RC":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),i=n("TXmL"),s=n("4kSj"),r=n.n(s),a=n("mtWM"),c=n.n(a),u=n("+ikV"),h=n.n(u),d=n("8wSn");o.a.use(i.a);var p={name:"login",i18n:new i.a({locale:"login",messages:d}),components:{VueCountdown:h.a},data:function(){var e=new Date;return{countryCode:"",countrySeq:"",phoneNumber:"",password1:"",password2:"",recommendCode:"",verificationCode:"",countryItems:[],selectedCountry:1,countDown:new Date(e.getTime()+6e4)-e,phoneKind:"",type:""}},created:function(){var e=this;r()("body").css({"background-color":"#FFF"}),/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?this.phoneKind="ios":/(Android)/i.test(navigator.userAgent)&&(this.phoneKind="android"),c()({url:"http://dev-new-api.beanpop.cn/common/country"}).then(function(t){var n=t.data.data;e.countryItems=n,e.selectedCountry=parseInt(e.countryItems[0].seq)}).catch(function(e){console.log(e)})},methods:{countryChangeItem:function(e){this.selectedCountry=parseInt(e.target.value)},showMessage:function(){r()(".tip-container").fadeIn(),setTimeout(function(){r()(".tip-container").fadeOut()},1e3)},getVerification:function(){var e=this;if(this.phoneNumber=r()("#phoneNum").val(),this.type="login",""===this.phoneNumber)return r()(".tip-error").text(this.$i18n.t("message.insertPhoneNum")),this.$options.methods.showMessage(),!1;if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phoneNumber))return r()(".tip-error").text(this.$i18n.t("message.wrongPhoneNum")),this.$options.methods.showMessage(),!1;c()({method:"POST",url:"http://dev-new-api.beanpop.cn/login/sendCode",params:{phoneNumber:this.phoneNumber,country:this.selectedCountry,type:this.type}}).then(function(t){var n=t.data.data;console.log(n);var o=new Date,i=new Date(o.getTime()+6e4);e.countDown=i-o,e.$refs.countdown.init(),e.$refs.countdown.start(),r()(".get-verification").attr("disabled",!0).css("color","gray"),setInterval(function(){r()(".get-verification").attr("disabled",!1).css("color","#EE6807")},6e4)}).catch(function(t){console.log(t),r()(".tip-error").text(e.$i18n.t("message.sendFail")),e.$options.methods.showMessage(),e.isCountDown=!1})},doLogin:function(){var e=this;if(this.phoneNumber=r()("#phoneNum").val().replace(/ /gi,""),this.verificationCode=r()("#verification").val().replace(/ /gi,""),""===this.phoneNumber)return r()(".tip-error").text(this.$i18n.t("message.insertPhoneNum")),this.$options.methods.showMessage(),!1;return/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.phoneNumber)?""===this.verificationCode?(r()(".tip-error").text(this.$i18n.t("message.insertAuthCode")),this.$options.methods.showMessage(),!1):6!==this.verificationCode.length?(r()(".tip-error").text(this.$i18n.t("message.wrongAuthCodeSize")),this.$options.methods.showMessage(),!1):void c()({method:"POST",url:"http://dev-new-api.beanpop.cn/login/code",params:{phoneNumber:this.phoneNumber,country:this.selectedCountry,code:this.verificationCode,mobileOs:"web"},withCredentials:!0,headers:{lang:"zh",token:"",os:"web",version:"1.0.0",time:"","Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){var n=t.data.message;if(t.data.code>200)return r()(".tip-error").text(e.$i18n.t(n)),e.$options.methods.showMessage(),!1;e.$router.push({name:"SpellBean"})}).catch(function(e){}):(r()(".tip-error").text(this.$i18n.t("message.wrongPhoneNum")),this.$options.methods.showMessage(),!1)}}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("div",{staticClass:"login-box"},[n("div",{staticClass:"phone-num-box"},[n("select",{attrs:{name:""},on:{change:function(t){e.countryChangeItem(t)}}},e._l(e.countryItems,function(t){return n("option",{key:t.index,domProps:{value:t.seq}},[e._v("+"+e._s(t.calling_code))])})),e._v(" "),n("input",{attrs:{type:"number",name:"phoneNum",id:"phoneNum",value:"",placeholder:e.$t("placeholder.phoneNum")}})]),e._v(" "),n("div",{staticClass:"verification-code-box"},[n("input",{attrs:{type:"text",name:"verification",id:"verification",value:"",placeholder:e.$t("placeholder.verification")}}),e._v(" "),n("vue-countdown",{ref:"countdown",staticClass:"count-down",attrs:{time:e.countDown,interval:1e3,"auto-start":!1},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.minutes)+":"+e._s(t.seconds))]}}])}),e._v(" "),n("button",{staticClass:"get-verification",on:{click:e.getVerification}},[e._v("获取验证码")])],1),e._v(" "),n("div",{staticClass:"login-btn-box",on:{click:e.doLogin}},[e._v(e._s(e.$t("login")))]),e._v(" "),e._m(0)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tip-container"},[t("div",{staticClass:"tip-error"},[t("img",{attrs:{src:"/static/img/share/error.png"}}),this._v(" "),t("span",{staticClass:"tip-error-msg"})])])}]};var m=n("VU/8")(p,l,!1,function(e){n("0SxR")},"data-v-af2240d2",null);t.default=m.exports}});