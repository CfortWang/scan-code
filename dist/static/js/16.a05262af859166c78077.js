webpackJsonp([16],{KXpF:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("OMN4"),s=i.n(n),a=i("4kSj"),d=i.n(a),o={name:"funnyQuiz",components:{},data:function(){return{hasQuizData:!0,hasQuizedData:!0}},created:function(){var e=this;s()({method:"GET",url:"http://dev-new-api.beanpop.cn/hotQuiz",withCredentials:!0,headers:{lang:"zh",token:"",os:"web",version:"1.0.0",time:""}}).then(function(t){var i=t.data.data;console.log(i);var n=i.quizList;n.length||(e.hasQuizData=!1);for(var s='<div class="answer-btn clear-fix"><span class="option"></span><span class="reward"></span></div>',a=function(t){d()(".quizing").append('<div class="quizing-content"><div class="quizing-top"><img /></div><div class="quizing-bottom"><div class="question"></div><div class="answer-box"></div><div class="countdown clear-fix"><hr class="countdown-line" /><div class="countdown-time"><img src="/static/img/share/clock.png"/><span>截止倒计时：</span><span class="countdown-text"></span></div><hr class="countdown-line" /></div><div class="answer-div"></div></div></div></div>');var i=n[t].quizTitle,a=n[t].image,o=n[t].time;c=e,d()(".quizing .quizing-content:eq("+t+") .countdown-text").text(e.timer(o)),function(e){setInterval(function(){e--,d()(".quizing .quizing-content:eq("+t+") .countdown-text").text(c.timer(e,t))},1e3)}(o),d()(".quizing .quizing-content:eq("+t+") .quizing-top img").attr("src",a),d()(".quizing .quizing-content:eq("+t+") .question").text(i),u=n[t].optionList;for(var q=0;q<u.length;q++){d()(".quizing .quizing-content:eq("+t+") .answer-box").append(s);var l=u[q].title,v=u[q].odds;d()(".quizing .quizing-content:eq("+t+") .answer-box .answer-btn:eq("+q+") .option").text(l),d()(".quizing .quizing-content:eq("+t+") .answer-box .answer-btn:eq("+q+") .reward").text(v)}var z=n[t].myQuizList;r='<div class="my-answer-box"><div class="answer-date"></div><div class="my-answer justified"><span class="answer"></span><span class="betting"></span><span class="odds"></span></div></div>';for(var p=0;p<z.length;p++){d()(".quizing .quizing-content:eq("+t+") .answer-div").append(r);var g=z[p].created_at,w="我猜"+z[p].title,h=z[p].spend_point+"喜豆",f="赔率"+z[p].odds;d()(".quizing .quizing-content:eq("+t+") .answer-div .answer-date:eq("+p+")").text(e.timetrans(g)),d()(".quizing .quizing-content:eq("+t+") .answer-div .answer:eq("+p+")").text(w),d()(".quizing .quizing-content:eq("+t+") .answer-div .betting:eq("+p+")").text(h),d()(".quizing .quizing-content:eq("+t+") .answer-div .my-answer .odds:eq("+p+")").text(f)}},o=0;o<n.length;o++){var c,u,r;a(o)}var q=i.overList;q.length||(e.hasQuizedData=!1);for(o=0;o<q.length;o++){d()(".quized").append('<div class="quized-content"><div class="quized-top"><img /></div><div class="quized-bottom"><div class="question"></div><div class="answer-box"></div><div class="countdown clear-fix"><hr class="countdown-line" /><div class="countdown-time"><span class="countdown-status"></span></div><hr class="countdown-line" /></div><div class="quized-answer-div"></div></div></div></div>');var l=q[o].quizTitle,v=q[o].image,z=q[o].is_done,p="";p=z?"已截止投注,未结算":"已结算";for(var g=q[o].myQuizList,w=0;w<g.length;w++){d()(".quized .quized-content:eq("+o+") .quized-answer-div").append('<div class="my-answer-box"><div class="answer-date"></div><div class="my-answer justified"><span class="answer"></span><span class="betting"></span><span class="odds last-span"></span></div></div>');var h=g[w].created_at,f="我猜"+g[w].title,x=g[w].spend_point+"喜豆",b="赔率"+g[w].odds,m=g[w].is_answer;if(z)d()(".quized .quized-content:eq("+o+") .quized-answer-div .my-answer .odds:eq("+w+")").text(b);else if(m)b="恭喜获得"+g[w].win_point+"喜豆点",d()(".quized .quized-content:eq("+o+") .quized-answer-div .my-answer .last-span:eq("+w+")").removeClass("odds").addClass("winner").text(b);else b="未中奖",d()(".quized .quized-content:eq("+o+") .quized-answer-div .my-answer .last-span:eq("+w+")").removeClass("odds").addClass("loser").text(b);d()(".quized .quized-content:eq("+o+") .quized-answer-div .answer-date:eq("+w+")").text(e.timetrans(h)),d()(".quized .quized-content:eq("+o+") .quized-answer-div .answer:eq("+w+")").text(f),d()(".quized .quized-content:eq("+o+") .quized-answer-div .betting:eq("+w+")").text(x)}d()(".quized .quized-content:eq("+o+") .quized-top img").attr("src",v),d()(".quized .quized-content:eq("+o+") .question").text(l),d()(".quized .quized-content:eq("+o+") .countdown-status").text(p);for(var _=q[o].optionList,C=0;C<_.length;C++){d()(".quized .quized-content:eq("+o+") .answer-box").append(s);var F=_[C].title,k=_[C].odds,y=_[C].is_answer;!z&&y&&d()(".quized .quized-content:eq("+o+") .answer-box .answer-btn:eq("+C+")").css({background:"#FFE200",color:"#333333"}),d()(".quized .quized-content:eq("+o+") .answer-box .answer-btn:eq("+C+") .option").text(F),d()(".quized .quized-content:eq("+o+") .answer-box .answer-btn:eq("+C+") .reward").text(k)}}}).catch(function(e){console.log(e)})},methods:{changeTabIng:function(){d()(".quiz-kind-left .quiz-text").addClass("quiz-active"),d()(".quiz-kind-right .quiz-text").removeClass("quiz-active"),d()(".quizing").show(),d()(".quized").hide()},changeTabEd:function(){d()(".quiz-kind-right .quiz-text").addClass("quiz-active"),d()(".quiz-kind-left .quiz-text").removeClass("quiz-active"),d()(".quizing").hide(),d()(".quized").show()},changeAnswer:function(){d()(this).css({background:"#57A0FF",color:"#FFFFFF"}),d()(this).siblings().css({background:"#FFFFFF",color:"#57A0FF"}),d()(".open-app").css("visibility","visible")},openApp:function(){window.location.href="https://wap.beanpop.cn/downloads"},closeTop:function(){d()(".open-app").css("visibility","hidden")},timer:function(e){var t=parseInt(e%60)<10?"0"+parseInt(e%60):parseInt(e%60),i=parseInt(e/60%60)<10?"0"+parseInt(e/60%60):parseInt(e/60%60),n=parseInt(e/3600%24)<10?"0"+parseInt(e/3600%24):parseInt(e/3600%24);return(Math.floor(e/86400)>=1?Math.floor(e/86400)+":":"")+n+":"+i+":"+t},timetrans:function(e){var t=new Date(1e3*e);return t.getFullYear()+"-"+((t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-")+((t.getDate()<10?"0"+t.getDate():t.getDate())+" ")+((t.getHours()<10?"0"+t.getHours():t.getHours())+":")+((t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":")+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"centent"},[e._m(0),e._v(" "),i("div",{staticClass:"open-app"},[i("div",{staticClass:"open-app-tip"},[e._v("是否前往喜豆app打开?")]),e._v(" "),i("div",{staticClass:"btn-yes",on:{click:e.openApp}},[e._v("是")]),e._v(" "),i("div",{staticClass:"btn-no",on:{click:e.closeTop}},[e._v("否")])]),e._v(" "),i("div",{staticClass:"quiz-kind clear-fix"},[i("div",{staticClass:"quiz-kind-left",on:{click:e.changeTabIng}},[i("span",{staticClass:"quiz-text quiz-active"},[e._v("热猜中")])]),e._v(" "),i("div",{staticClass:"middle-line"}),e._v(" "),i("div",{staticClass:"quiz-kind-right",on:{click:e.changeTabEd}},[i("span",{staticClass:"quiz-text"},[e._v("已结束")])])]),e._v(" "),e.hasQuizData?i("div",{staticClass:"quizing"}):e._e(),e._v(" "),e.hasQuizedData?i("div",{staticClass:"quized"}):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("header",{staticClass:"header"},[t("div",{staticClass:"header-title"},[this._v("趣味猜猜猜")])])}]};var u=i("VU/8")(o,c,!1,function(e){i("ZdlL")},"data-v-400b839f",null);t.default=u.exports},ZdlL:function(e,t){}});