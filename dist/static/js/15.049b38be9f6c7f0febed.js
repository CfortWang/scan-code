webpackJsonp([15],{"4exE":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"help",components:{},data:function(){return{questionList:[],phoneNum:"",content:"",device:"",lang:"",token:"",os:"",time:"",version:""}},created:function(){var t=this;axios({method:"GET",url:"http://dev-new-api.beanpop.cn/faqList",withCredentials:!0,headers:{lang:"zh",token:"",os:"web",version:"1.0.0",time:""}}).then(function(e){t.questionList=e.data.data}).catch(function(t){console.log(t)});var e=this.getArgs();if(this.phoneNum=e.phone_num,this.device=e.device,"android"==this.device){var s=xidou.getHttpHeader();this.lang=JSON.parse(s).lang,this.token=JSON.parse(s).token,this.os=JSON.parse(s).os,this.time=JSON.parse(s).time,this.version=JSON.parse(s).version}else this.lang="zh",this.os="web",this.token="",this.time="",this.version="1.0.0"},methods:{getArgs:function(){var t=location.search,e={};if(-1!=t.indexOf("?"))for(var s=t.substr(1).split("&"),n=0;n<s.length;n++)e[s[n].split("=")[0]]=unescape(s[n].split("=")[1]);return e},submit:function(){var t=this;axios({method:"POST",url:"http://dev-new-api.beanpop.cn/feedback",params:{content:this.content,phone_number:this.phoneNum},withCredentials:!0,headers:{lang:this.lang,token:this.token,os:this.os,version:this.version,time:this.time}}).then(function(e){var s=e.data.message;console.log(e),t.content="",xidou.toast(s)}).catch(function(t){console.log(t.response),xidou.toast(t.response)})}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"help"},[s("form",{staticClass:"help-top"},[s("div",{staticClass:"help-title"},[t._v("意见反馈")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"suggestion",attrs:{id:"suggestion",name:"",rows:"",cols:""},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}}),t._v(" "),s("div",{staticClass:"submit-btn",on:{click:t.submit}},[t._v("提交")])]),t._v(" "),s("div",{staticClass:"question-and-answer"},[t._m(0),t._v(" "),t._l(t.questionList,function(e){return s("div",{key:e.index,staticClass:"qa"},[s("div",{staticClass:"help-question"},[t._v(t._s(e.title))]),t._v(" "),s("div",{staticClass:"help-answer",domProps:{innerHTML:t._s(e.content)}})])})],2)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"qa-title"},[e("img",{attrs:{src:"/static/img/share/rule.png"}}),this._v(" "),e("span",[this._v("常见问题")])])}]};var a=s("VU/8")(n,i,!1,function(t){s("fp5P")},"data-v-1b33c247",null);e.default=a.exports},fp5P:function(t,e){}});