<template>
	<div class="centent">
		<header class="header">
			<div class="header-title">趣味猜猜猜</div>
		</header>
		<div class="open-app">
			<div class="open-app-tip">是否前往喜豆app打开?</div>
			<div class="btn-yes" v-on:click="openApp">是</div>
			<div class="btn-no" v-on:click="closeTop">否</div>
		</div>
		<div class="quiz-kind clear-fix">
			<div class="quiz-kind-left" v-on:click="changeTabIng">
				<span class="quiz-text quiz-active">热猜中</span>
			</div>
			<div class="middle-line"></div>
			<div class="quiz-kind-right" v-on:click="changeTabEd">
				<span class="quiz-text">已结束</span>
			</div>
		</div>
		<div class="quizing">
			<!-- <div class="quizing-content">
				<div class="quizing-top">
					<img src="/static/img/share/quizing-top.png"/>
				</div>
				<div class="quizing-bottom">
					<div class="question">长条形杜萨开奖号打卡获得不少客户的单空间安康电话快点哈算了电话快点哈算</div>
					<div class="answer-box">
						<div class="answer-btn-no clear-fix" v-on:click="changeAnswer">
							<span class="option">A.不会</span>
							<span class="reward">奖励×1.7</span>
						</div>
						<div class="answer-btn-no clear-fix" v-on:click="changeAnswer">
							<span class="option">B.会</span>
							<span class="reward">奖励×1.7</span>
						</div>
					</div>
					<div class="countdown clear-fix">
						<hr class="countdown-line" />
						<div class="countdown-time">
							<img src="/static/img/share/clock.png"/>
							<span class="countdown-text">截止倒计时：15:25:23</span>
						</div>
						<hr class="countdown-line" />
					</div>
					<div class="answer-div">
						<div class="my-answer-box">
							<div class="answer-date">08-03&nbsp;&nbsp;12:30</div>
							<div class="my-answer justified">
								<span class="answer">我猜:B.涨或不变</span>
								<span class="betting">100喜豆</span>
								<span class="odds">赔率1.70</span>
							</div>
						</div>
						<div class="my-answer-box">
							<div class="answer-date">08-03&nbsp;&nbsp;12:30</div>
							<div class="my-answer justified">
								<span class="answer">我猜:B.涨或不变</span>
								<span class="betting">100喜豆</span>
								<span class="odds">赔率1.70</span>
							</div>
						</div>
					</div>
				</div>
			</div> -->
		</div>
		<div class="quized">
			<!-- <div class="quized-content">
				<div class="quized-top">
					<img src="/static/img/share/quizing-top.png"/>
				</div>
				<div class="quized-bottom">
					<div class="question">长条形杜萨开奖号打卡获得不少客户的单空间安康电话快点哈算了电话快点哈算</div>
					<div class="answer-box">
						<div class="answer-btn clear-fix">
							<span class="option">A.不会</span>
							<span class="reward">奖励×1.7</span>
						</div>
						<div class="answer-btn clear-fix">
							<span class="option">B.会</span>
							<span class="reward">奖励×1.7</span>
						</div>
					</div>
					<div class="countdown clear-fix">
						<hr class="countdown-line" />
						<div class="countdown-time">
							<span class="countdown-text">&nbsp;&nbsp;&nbsp;&nbsp;已截止投注,未结算&nbsp;&nbsp;&nbsp;&nbsp;</span>
						</div>
						<hr class="countdown-line" />
					</div>
					<div class="my-answer-box">
						<div class="answer-date">08-03&nbsp;&nbsp;12:30</div>
						<div class="my-answer justified">
							<span class="answer">我猜:B.涨或不变</span>
							<span class="betting">100喜豆</span>
							<span class="odds">赔率1.70</span>
						</div>
					</div>
					<div class="dividing-line"></div>
					<div class="my-answer-box">
						<div class="answer-date">08-03&nbsp;&nbsp;12:30</div>
						<div class="my-answer justified">
							<span class="answer">我猜:B.涨或不变</span>
							<span class="betting">100喜豆</span>
							<span class="odds">赔率1.70</span>
						</div>
					</div>
				</div>
			</div>
			<div class="quized-content">
				<div class="quized-top">
					<img src="/static/img/share/quizing-top.png"/>
				</div>
				<div class="quized-bottom">
					<div class="question">长条形杜萨开奖号打卡获得不少客户的单空间安康电话快点哈算了电话快点哈算</div>
					<div class="answer-box">
						<div class="answer-btn-no clear-fix">
							<span class="option">A.不会</span>
							<span class="reward">奖励×1.7</span>
						</div>
						<div class="answer-btn-yes answer-right clear-fix">
							<span class="option">B.会</span>
							<span class="reward">奖励×1.7</span>
						</div>
					</div>
					<div class="countdown clear-fix">
						<hr class="countdown-line" />
						<div class="countdown-time">
							<span class="countdown-text">&nbsp;&nbsp;&nbsp;&nbsp;已结算&nbsp;&nbsp;&nbsp;&nbsp;</span>
						</div>
						<hr class="countdown-line" />
					</div>
					<div class="my-answer-box">
						<div class="answer-date">08-03&nbsp;&nbsp;12:30</div>
						<div class="my-answer justified">
							<span class="answer">我猜:B.涨或不变</span>
							<span class="betting">100喜豆</span>
							<div class="loser">未中奖</div>
						</div>
					</div>
					<div class="dividing-line"></div>
					<div class="my-answer-box">
						<div class="answer-date">08-03&nbsp;&nbsp;12:30</div>
						<div class="my-answer justified">
							<span class="answer">我猜:B.涨或不变</span>
							<span class="betting">100喜豆</span>
							<div class="winner">
								<p>恭喜获得</p><p>8500喜豆点</p>
							</div>
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import vueCookie from 'vue-cookie'
import axios from 'axios'
import $ from 'jquery'
// import wx from 'weixin-js-sdk'

export default {
	name: 'funnyQuiz',
	// i18n: i18n,
	components: {
	},
	data () {
		return {
		}
	},
	created: function () {
		// wx.config({
		// 	debug: true,
		// 	appId: 'wx5dc2298841cf0098',
		// 	timestamp: '',
		// 	nonceStr: '',
		// 	signature: '',
		// 	jsApiList: [
		// 		'onMenuShareTimeline',
		// 		'onMenuShareAppMessage',
		// 		'onMenuShareQQ',
		// 		'onMenuShareWeibo'
		// 	]
		// })
		// wx.ready(function () {
		// 	wx.onMenuShareAppMessage({
		// 		title: '老王保健开业啦', // 分享标题
		// 		desc: '啦啦啦', // 分享描述
		// 		link: 'dev-www.beanpop.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		// 		imgUrl: '/static/img/share/avatar.jpg', // 分享图标
		// 		type: '', // 分享类型,music、video或link，不填默认为link
		// 		success: function () {
		// 			console.log('hahaha')
		// 		}
		// 	})
		// })
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/hotQuiz'
		}).then((response) => {
			var responseData = response.data.data
			console.log(responseData)

			// get the quizing data
			var quizList = responseData.quizList
			var $quizDiv = '<div class="quizing-content"><div class="quizing-top"><img /></div><div class="quizing-bottom"><div class="question"></div><div class="answer-box"></div></div><div class="countdown clear-fix"><hr class="countdown-line" /><div class="countdown-time"><img src="/static/img/share/clock.png"/><span class="countdown-text"></span></div><hr class="countdown-line" /></div></div></div>'
			var $answerBtn = '<div class="answer-btn clear-fix"><span class="option"></span><span class="reward"></span></div>'
			for (var i = 0; i < quizList.length; i++) {
				$('.quizing').append($quizDiv)
				let quizTitle = quizList[i].quizTitle
				let quizImg = quizList[i].image
				let timeLeft = quizList[i].time
				let seconds = timeLeft % 60
				let minutes = Math.floor((timeLeft / 60) % 60)
				let hours = Math.floor((timeLeft / 3600) % 24)
				let days = Math.floor(timeLeft / (3600 * 24)) >= 1 ? Math.floor(timeLeft / (3600 * 24)) + ':' : ''
				let leftDate = '截止倒计时：' + days + hours + ':' + minutes + ':' + seconds
				$(".quizing .quizing-content:eq("+ i +") .quizing-top img").attr('src', quizImg)
				$(".quizing .quizing-content:eq("+ i +") .question").text(quizTitle)
				$(".quizing .quizing-content:eq("+ i +") .countdown-text").text(leftDate)
				var answerList = quizList[i].optionList
				for (var j = 0; j < answerList.length; j++) {
					$(".quizing .quizing-content:eq("+ i +") .answer-box").append($answerBtn)
					let answer = answerList[j].title
					let odd = answerList[j].odds
					$(".quizing .quizing-content:eq("+ i +") .answer-box .answer-btn:eq("+ j +") .option").text(answer)
					$(".quizing .quizing-content:eq("+ i +") .answer-box .answer-btn:eq("+ j +") .reward").text(odd)
				}
			}

			// get the quized data
			var quizedList = responseData.overList
			var $quizedDiv = '<div class="quized-content"><div class="quized-top"><img /></div><div class="quized-bottom"><div class="question"></div><div class="answer-box"></div></div><div class="countdown clear-fix"><hr class="countdown-line" /><div class="countdown-time"><span class="countdown-text"></span></div><hr class="countdown-line" /></div></div></div>'
			for (i = 0; i < quizedList.length; i++) {
				$('.quized').append($quizedDiv)
				var quizedTitle = quizedList[i].quizTitle
				var quizedImg = quizedList[i].image
				$(".quized .quized-content:eq("+ i +") .quized-top img").attr('src', quizedImg)
				$(".quized .quized-content:eq("+ i +") .question").text(quizedTitle)
				var quizedAnswer = quizedList[i].optionList
				for (j = 0; j < quizedAnswer.length; j++) {
					$(".quized .quized-content:eq("+ i +") .answer-box").append($answerBtn)
					var answer = quizedAnswer[j].title
					var odd = quizedAnswer[j].odds
					$(".quized .quized-content:eq("+ i +") .answer-box .answer-btn:eq("+ j +") .option").text(answer)
					$(".quized .quized-content:eq("+ i +") .answer-box .answer-btn:eq("+ j +") .reward").text(odd)
				}
			}
		}).catch((ex) => {
			console.log(ex)
			// var errorResponseData = ex.response.data
			// console.log(errorResponseData)
		})
	},
	methods: {
		changeTabIng: function () {
			$(".quiz-kind-left .quiz-text").addClass('quiz-active')
			$(".quiz-kind-right .quiz-text").removeClass('quiz-active')
			$(".quizing").show()
			$(".quized").hide()
		},
		changeTabEd: function () {
			$(".quiz-kind-right .quiz-text").addClass('quiz-active')
			$(".quiz-kind-left .quiz-text").removeClass('quiz-active')
			$(".quizing").hide()
			$(".quized").show()
		},
		changeAnswer: function () {
			$(this).css({'background': '#57A0FF', 'color': '#FFFFFF'})
			$(this).siblings().css({'background': '#FFFFFF', 'color': '#57A0FF'})
			$(".open-app").css('visibility', 'visible')
		},
		openApp: function () {
			window.location.href = 'https://wap.beanpop.cn/downloads'
		},
		closeTop: function () {
			$(".open-app").css('visibility', 'hidden')
		}
	}
}
</script>

<style scoped>
body{
	font-family: "PingFangSC-Regular";
	font-size: 16px;
	background-color: #f4f4f4;
	margin: 0px;
	padding: 0px;
}
li{
	list-style: none;
}
a{
	text-decoration: none;
}
a:active, a:hover{
	text-decoration: none;
}
p, li{
	margin: 0px;
	padding: 0px;
}
.header{
	width: 100%;
	text-align: center;
	background-color: #FFE300;
}
.header-title{
	font-family: "PingFangSC-Medium";
	font-size: 20px;
	line-height: 60px;
}
.pay-header-title{
	font-family: "PingFangSC-Regular";
	font-size: 18px;
	line-height: 20px;
}
.goback-pay img, .goback-pindou img{
	height: 20px;
	position: absolute;
	left: 15px;
}
.open-app{
	position: fixed;
	width: 100%;
	/*left: 3%;*/
	top: 0px;
	z-index: 100;
	background: #F4F4F4;
    -moz-box-shadow: 0 0 12px #999;
    -webkit-box-shadow: 0 0 12px #999;
    box-shadow: 0 0 12px #999;
    padding: 25px 0px;
    visibility: hidden;
    display: flex;
}
.open-app-tip{
	flex: 5;
	text-align: center;
}
.btn-yes, .btn-no{
	flex: 1;
	text-align: center;
	background: #57A0FF;
	margin-right: 20px;
	-moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
}
.btn-no{
	background: #D3D3D3;
}
.quiz-kind{
	width: 100%;
	height: 45px;
	line-height: 45px;
	font-size: 14px;
	background-color: #fff;
}
.quiz-kind-left, .quiz-kind-right{
	display: inline-block;
	width: 49.8%;
	text-align: center;
	color: #999;
	font-family: "PingFangSC-Regular";
}
.quiz-text{
	display: inline-block;
	height: 45px;
}
.quiz-active{
	font-family: "PingFangSC-Semibold";
	color: #000;
	border-bottom: 4px solid #FFE200;
}
.middle-line{
	display: inline-block;
	width: 0px;
	height: 20px;
	border-left: 1px solid #ddd;
	margin:0 -5px;
}
.quizing, .quized{
	font-family: "PingFangSC-Regular";
}
.quizing-content, .quized-content{
	width: 90%;
	margin: 0 auto;
	margin-top: 15px;
	margin-bottom: 15px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	box-shadow:0px 3px 7px 0px rgba(51,85,164,0.14);
}
.quizing-top img, .quized-top img{
	width: 100%;
}
.quizing-bottom, .quized-bottom{
	padding: 15px;
}
.question{
	font-size: 16px;
	color: #333333;
	line-height: 24px;
	padding: 4px 5px 10px;
}

.countdown{
	margin-top: 5px;
	display: flex;
	align-items: center;
}
.countdown-line{
	float: left;
	flex: 1;
	border: none;
	height: 1px;
	color: #DDDDDD;
	background: #DDDDDD;
}
.countdown-time img{
	width: 14px;
	margin:0 4px 0 5px;
}
.countdown-text{
	flex: 4;
	margin-right: 5px;
	color: #333333;
}
.my-answer-box{
	font-size: 14px;
	border-bottom: 1px solid #DDDDDD;
	padding-bottom: 8px;
	margin-bottom: 8px;
}
.my-answer-box:last-child{
	border:none;
	padding-bottom: 0px;
	margin-bottom: 0px;
}
.answer-date{
	font-size: 12px;
	color: #999999;
}
.my-answer{
	color: #666666;
}
.dividing-line{
	width: 100%;
	border-bottom: 1px solid #DDDDDD;
	margin: 8px 0px;
}
.quized{
	display: none;
}
.quized .question{
	color: #999999;
}
.quized .answer-btn{
	border: none;
	background: #F4F4F4;
	color: #999999;
}
.quized .my-answer{
	color: #333333;
	align-items: center;
}
.quized .my-answer span{
	vertical-align: bottom;
}
.quized .answer-right{
	color: #333333;
	background: #FFE200;
}
.loser{
	padding: 4px 10px;
	background: #EEEEEE;
	border-radius: 4px;
}
.winner{
	background: #EE6807;
	color: #FFFFFF;
	padding: 4px 8px;
	border-radius: 4px;
}
.winner p{
	text-align: center;
}
</style>
