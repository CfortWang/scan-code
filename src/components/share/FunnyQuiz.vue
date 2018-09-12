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
		<div class="quizing" v-if="hasQuizData"></div>
		<div class="quized" v-if="hasQuizedData"></div>
		<!-- <div class="no-data" v-if="!hasQuizData">
			<img src="/static/img/share/empty_page.png" alt="">
			<div class="no-data-desc">对不起，暂无数据</div>
		</div> -->
	</div>
</template>

<script>
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import vueCookie from 'vue-cookie'
import axios from 'axios'
import $ from 'jquery'

export default {
	name: 'funnyQuiz',
	// i18n: i18n,
	components: {
	},
	data () {
		return {
			hasQuizData: true,
			hasQuizedData: true
		}
	},
	created: function () {
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/hotQuiz',
			withCredentials: true,
			headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
		}).then((response) => {
			var responseData = response.data.data
			console.log(responseData)

			// get the quizing data
			var quizList = responseData.quizList
			if (!quizList.length) {
				this.hasQuizData = false
			}
			var $quizDiv = '<div class="quizing-content"><div class="quizing-top"><img /></div><div class="quizing-bottom"><div class="question"></div><div class="answer-box"></div><div class="countdown clear-fix"><hr class="countdown-line" /><div class="countdown-time"><img src="/static/img/share/clock.png"/><span>截止倒计时：</span><span class="countdown-text"></span></div><hr class="countdown-line" /></div><div class="answer-div"></div></div></div></div>'
			var $answerBtn = '<div class="answer-btn clear-fix"><span class="option"></span><span class="reward"></span></div>'
			for (let i = 0; i < quizList.length; i++) {
				$('.quizing').append($quizDiv)
				let quizTitle = quizList[i].quizTitle
				let quizImg = quizList[i].image
				let timeLeft = quizList[i].time
				var that = this
				$(".quizing .quizing-content:eq("+ i +") .countdown-text").text(this.timer(timeLeft));
				(function (timeLeft) {
					setInterval(function () {
						timeLeft--
						$(".quizing .quizing-content:eq("+ i +") .countdown-text").text(that.timer(timeLeft, i))
					}, 1000)
				})(timeLeft)
				$(".quizing .quizing-content:eq("+ i +") .quizing-top img").attr('src', quizImg)
				$(".quizing .quizing-content:eq("+ i +") .question").text(quizTitle)
				var answerList = quizList[i].optionList
				for (let j = 0; j < answerList.length; j++) {
					$(".quizing .quizing-content:eq("+ i +") .answer-box").append($answerBtn)
					let answer = answerList[j].title
					let odd = answerList[j].odds
					$(".quizing .quizing-content:eq("+ i +") .answer-box .answer-btn:eq("+ j +") .option").text(answer)
					$(".quizing .quizing-content:eq("+ i +") .answer-box .answer-btn:eq("+ j +") .reward").text(odd)
				}
				let myQuizList = quizList[i].myQuizList
				var $myAnswerBox = '<div class="my-answer-box"><div class="answer-date"></div><div class="my-answer justified"><span class="answer"></span><span class="betting"></span><span class="odds"></span></div></div>'
				for (let k = 0; k < myQuizList.length; k++) {
					$(".quizing .quizing-content:eq("+ i +") .answer-div").append($myAnswerBox)
					let myGuessTime = myQuizList[k].created_at
					let myGuessAnswer = "我猜" + myQuizList[k].title
					let spendPoint = myQuizList[k].spend_point + "喜豆"
					let myGuessOdd = "赔率" + myQuizList[k].odds
					$(".quizing .quizing-content:eq("+ i +") .answer-div .answer-date:eq("+ k +")").text(this.timetrans(myGuessTime))
					$(".quizing .quizing-content:eq("+ i +") .answer-div .answer:eq("+ k +")").text(myGuessAnswer)
					$(".quizing .quizing-content:eq("+ i +") .answer-div .betting:eq("+ k +")").text(spendPoint)
					$(".quizing .quizing-content:eq("+ i +") .answer-div .my-answer .odds:eq("+ k +")").text(myGuessOdd)
				}
			}

			// get the quized data
			var quizedList = responseData.overList
			if (!quizedList.length) {
				this.hasQuizedData = false
			}
			var $quizedDiv = '<div class="quized-content"><div class="quized-top"><img /></div><div class="quized-bottom"><div class="question"></div><div class="answer-box"></div><div class="countdown clear-fix"><hr class="countdown-line" /><div class="countdown-time"><span class="countdown-status"></span></div><hr class="countdown-line" /></div><div class="quized-answer-div"></div></div></div></div>'
			for (let i = 0; i < quizedList.length; i++) {
				$('.quized').append($quizedDiv)
				let quizedTitle = quizedList[i].quizTitle
				let quizedImg = quizedList[i].image
				let status = quizedList[i].is_done
				var statusDesc = ''
				if (status) {
					statusDesc = '已截止投注,未结算'
				} else {
					statusDesc = '已结算'
				}

				let myQuizedList = quizedList[i].myQuizList
				var $statusFalseAnswer = '<div class="my-answer-box"><div class="answer-date"></div><div class="my-answer justified"><span class="answer"></span><span class="betting"></span><span class="odds last-span"></span></div></div>'
				for (let k = 0; k < myQuizedList.length; k++) {
					$(".quized .quized-content:eq("+ i +") .quized-answer-div").append($statusFalseAnswer)
					let myGuessTime = myQuizedList[k].created_at
					let myGuessAnswer = "我猜" + myQuizedList[k].title
					let spendPoint = myQuizedList[k].spend_point + "喜豆"
					let myGuessOdd = "赔率" + myQuizedList[k].odds
					let isAnswer = myQuizedList[k].is_answer
					if (!status) {
						if (isAnswer) {
							let winnerPoint = myQuizedList[k].win_point
							myGuessOdd = "恭喜获得" + winnerPoint + "喜豆点"
							$(".quized .quized-content:eq("+ i +") .quized-answer-div .my-answer .last-span:eq("+ k +")").removeClass('odds').addClass('winner').text(myGuessOdd)
						} else {
							myGuessOdd = "未中奖"
							$(".quized .quized-content:eq("+ i +") .quized-answer-div .my-answer .last-span:eq("+ k +")").removeClass('odds').addClass('loser').text(myGuessOdd)
						}
					} else {
						$(".quized .quized-content:eq("+ i +") .quized-answer-div .my-answer .odds:eq("+ k +")").text(myGuessOdd)
					}
					$(".quized .quized-content:eq("+ i +") .quized-answer-div .answer-date:eq("+ k +")").text(this.timetrans(myGuessTime))
					$(".quized .quized-content:eq("+ i +") .quized-answer-div .answer:eq("+ k +")").text(myGuessAnswer)
					$(".quized .quized-content:eq("+ i +") .quized-answer-div .betting:eq("+ k +")").text(spendPoint)
				}

				$(".quized .quized-content:eq("+ i +") .quized-top img").attr('src', quizedImg)
				$(".quized .quized-content:eq("+ i +") .question").text(quizedTitle)
				$(".quized .quized-content:eq("+ i +") .countdown-status").text(statusDesc)
				var quizedAnswer = quizedList[i].optionList
				for (let j = 0; j < quizedAnswer.length; j++) {
					$(".quized .quized-content:eq("+ i +") .answer-box").append($answerBtn)
					let answer = quizedAnswer[j].title
					let odd = quizedAnswer[j].odds
					let isAnswer = quizedAnswer[j].is_answer
					if ((!status)&&isAnswer) {
						$(".quized .quized-content:eq("+ i +") .answer-box .answer-btn:eq("+ j +")").css({'background': '#FFE200', 'color': '#333333'})
					}
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
		},
		timer: function (event) {
			var seconds = parseInt(event % 60) < 10 ? '0' + parseInt(event % 60) : parseInt(event % 60)
			var minutes = parseInt((event / 60) % 60) < 10 ? '0' + parseInt((event / 60) % 60) : parseInt((event / 60) % 60)
			var hours = parseInt((event / 3600) % 24) < 10 ? '0' + parseInt((event / 3600) % 24) : parseInt((event / 3600) % 24)
			var days = Math.floor(event / (3600 * 24)) >= 1 ? Math.floor(event / (3600 * 24)) + ':' : ''
			var leftDate = days + hours + ':' + minutes + ':' + seconds
			return leftDate
		},
		timetrans: function (event) {
			var date = new Date(event*1000)
			var Y = date.getFullYear() + '-'
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
			var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
			var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
			var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds())
			return Y+M+D+h+m+s
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
.no-data{
	text-align: center;
	width: 100%;
	color: #999999;
	font-size: 14px;
}
.no-data img{
	width: 50%;
	margin-top: 40%;
	margin-bottom: 14px;
}
</style>
