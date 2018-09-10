<template>
	<div class="content">
		<header class="header">
			<div class="goback-pay"><img src="/static/img/share/goback.png"/></div>
			<div class="pay-header-title">参与拼豆豆</div>
		</header>
		<div class="congratulate">恭喜您！支付定金成功</div>
		<div class="success-icon">
			<img src="/static/img/share/icon_pay_successed_90x90.png"/>
		</div>
		<div class="fixed-right-btn">打开App</div>
		<div class="pin-success-box">
			<div class="user-joined justified">
				<div class="pindou-owner">
					<div class="avatar">
						<img v-bind:src="ownerAvater"/>
					</div>
					<div class="owner">
						<img src="/static/img/share/pindou-owner.png"/>
						<div class="owner-text">拼主</div>
					</div>
				</div>
			</div>
			<div class="join-pindou-desc">
				<span class="grey">还剩</span>
				<span class="orange">{{needNum}}个</span>
				<span class="grey">名额即可获得优惠 </span>
				<br />
				<span class="orange">
					<vue-countdown :time="countDown" :interval="1000" :auto-start="true" ref="countdown" class="count-down">
						<template slot-scope="props">{{ props.days }}天{{ props.hours }}时{{ props.minutes }}分{{ props.seconds }}秒</template>
					</vue-countdown>
				</span>
				<span class="grey">后结束</span>
			</div>
			<div class="share-soon">赶紧邀请好友来拼豆豆吧！</div>
		</div>
		<div class="use-coupon-btn">下载APP，拼豆成功后立享优惠</div>
	</div>
</template>

<script>
// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import vueCookie from 'vue-cookie'
import axios from 'axios'
import VueCountdown from '@xkeshi/vue-countdown'
import $ from 'jquery'
// import Swiper from 'swiper'

export default {
	name: 'paySuccess',
	// i18n: i18n,
	components: {
		VueCountdown
	},
	data () {
		return {
			payID: '',
			needNum: '',
			timeLeft: '',
			payStatus: '',
			countDown: 0,
			ownerAvater: ''
		}
	},
	created: function () {
		var args = this.$options.methods.getArgs()
		this.payID = args['groupon_record_id']
		// this.timeLeft = args['timeLeft']
		// console.log(this.timeLeft)
		// let now = new Date()
		// let timer = (this.timeLeft + 0) * 1000
		// let setNow = new Date(now.getTime() + timer)
		// this.countDown = setNow - now
		// this.$refs.countdown.init()
		// this.$refs.countdown.start()
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/event/success' + '?groupon_record_id=' + this.payID,
			withCredentials: true,
			headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
		}).then((response) => {
			let responseData = response.data.data
			let responseStatus = response.data.code
			this.needNum = responseData.needNum
			this.timeLeft = responseData.timeLeft
			if (responseStatus == 200) {
				this.payStatus = true
				let now = new Date()
				let timer = (this.timeLeft + 0) * 1000
				let setNow = new Date(now.getTime() + timer)
				this.countDown = setNow - now
				this.$refs.countdown.init()
				this.$refs.countdown.start()
			} else if (responseStatus == 100) {
				this.payStatus = false
			} else if (responseStatus == 101) {

			}

			var user = responseData.user
			for (let i = 0; i < user.length; i++) {
				let isOwner = user[i].isOwner
				if (isOwner == 1) {
					this.ownerAvater = user[i].image
					if (this.ownerAvater == null || this.ownerAvater == '') {
						this.ownerAvater = '/static/img/share/pindou-wait.png'
					}
				}
			}
			var groupSize = this.needNum + user.length
			var $partnerBox = '<div class="pindou-partner"><div class="avatar"><img/></div></div>'
			for (let i = 1; i < user.length; i++) {
				$('.user-joined').append($partnerBox)
				let partnerAvater = user[i].image
				if (partnerAvater == null) {
					partnerAvater = '/static/img/share/pindou-wait.png'
				}
				$(".user-joined .avater:eq("+ i +") img").attr('src', partnerAvater)
			}
			for (let i = user.length; i < groupSize; i++) {
				// console.log(user.length)
				console.log(i)
				$('.user-joined').append($partnerBox)
				let partnerAvater = '/static/img/share/pindou-wait.png'
				$(".user-joined .avater:eq("+ i +") img").attr('src', partnerAvater)
			}
			console.log(responseData)
		}).catch((ex) => {
			console.log(ex)
		})
	},
	methods: {
		getArgs: function () {
			var url = location.search
			var args = {}
			if (url.indexOf("?") != -1) {
				var str = url.substr(1)
				var strs = str.split("&")
				for (let i = 0; i < strs.length; i++) {
					args[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
				}
			}
			return args
		}
	}
}
</script>

<style scoped>
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
	line-height: 60px;
}
.goback-pay img, .goback-pindou img{
	height: 20px;
	position: absolute;
	left: 15px;
	top: 18px;
}
.pin-success-box, .ped-success-box{
	width: 70%;
	margin-left: 15%;
}
.congratulate{
	font-family: "PingFangSC-Semibold";
	font-size: 18px;
	text-align: center;
	line-height: 25px;
	margin-top: 30px;
	color: #333333;
}
.success-icon{
	text-align: center;
	margin: 20px 0px;
}
.success-icon img{
	width: 90px;
}
.pin-success-box .user-joined, .ped-success-box .user-joined{
	padding-bottom: 0px;
}
.get-qualifications, .join-pindou-desc{
	font-size: 14px;
	padding: 20px 5px;
	line-height: 20px;
}
.share-soon, .success-tips{
	text-align: center;
	font-family: "PingFangSC-Semibold";
	font-size: 14px;
	line-height: 20px;
}
.ped-success-box{
	/*display: none;*/
}
.success-tips{
	margin: 28px 0px 40px;
}
.user-joined{
	padding-bottom: 20px;
}
.avatar img{
	width: 42px;
	border-radius: 50%;
	z-index: 5;
}
.owner{
	font-size: 8px;
	line-height: 12px;
	text-align: center;
	margin-top: -8px;
	z-index: 20;
	color: #FFFFFF;
}
.owner img{
	width: 42px;
	height: 12px;
}
.owner-text{
	margin-top: -14px;
}
.use-coupon-btn{
	width: 70%;
	margin-left: 15%;
	margin-top: 30px;
	text-align: center;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:22px;
	padding: 10px 0px;
}
</style>
