<template>
	<div class="content">
		<header class="header">
			<div class="goback-pay"><img src="/static/img/share/goback.png"/></div>
			<div class="pay-header-title">参与拼豆豆</div>
		</header>
		<div v-if="payStatus&&!groupFinish">
			<div class="congratulate">恭喜您！支付定金成功</div>
			<div class="success-icon">
				<img src="/static/img/share/icon_pay_successed_90x90.png"/>
			</div>
		</div>
		<div v-if="!payStatus&&!groupFinish">
			<div class="congratulate">支付失败</div>
			<div class="success-icon">
				<img src="/static/img/share/icon_pay_successed_90x90.png"/>
			</div>
		</div>
		<div v-if="groupFinish">
			<div class="congratulate">很抱歉，拼团已结束</div>
			<div class="success-icon">
				<img src="/static/img/share/pay-error.png"/>
			</div>
		</div>
		<div class="fixed-right-btn">打开App</div>
		<div class="pin-success-box">
			<div class="user-joined">
				<div class="pindou-partner">
					<div class="avatar">
						<img v-bind:src="ownerAvatar"/>
					</div>
					<div class="owner">
						<img src="/static/img/share/pindou-owner.png"/>
						<div class="owner-text">拼主</div>
					</div>
				</div>
			</div>
			<div class="join-pindou-desc" v-if="!groupFinish">
				<span class="grey">还剩</span>
				<span class="orange">{{needNum}}个</span>
				<span class="grey">名额即可获得优惠 </span>
				<br />
				<span class="orange time"></span>
				<span class="grey">后结束</span>
			</div>
			<div class="share-soon">赶紧邀请好友来拼豆豆吧！</div>
		</div>
		<div class="pay-error-desc" v-if="groupFinish">
			<div class="grey">有人抢先一步付款成功</div>
			<div>你可以开一个新团，或者看看别的团哦~</div>
		</div>
		<div class="use-coupon-btn" v-if="!groupFinish">下载APP，拼豆成功后立享优惠</div>
		<div class="pay-error-text" v-if="groupFinish">已支持的费用将退还至您的支付账户</div>
	</div>
</template>

<script>
// import vueCookie from 'vue-cookie'
import $ from 'jquery'

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
			groupFinish: false,
			countDown: 0,
			ownerAvatar: ''
		}
	},
	created: function () {
		var args = this.$options.methods.getArgs()
		this.payID = args['groupon_record_id']
		axios({
			method: 'GET',
			// url: 'http://dev-new-api.beanpop.cn/event/success' + '?groupon_record_id=' + this.payID,
			url: 'http://dev-new-api.beanpop.cn/event/success' + '?groupon_record_id=248',
			withCredentials: true,
			headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
		}).then((response) => {
			let responseData = response.data.data
			let responseStatus = response.data.code
			this.needNum = responseData.needNum
			this.timeLeft = responseData.timeLeft
			this.timer(this.timeLeft)
			if (responseStatus == 200) {
				this.payStatus = true
				this.groupFinish = false
			} else if (responseStatus == 100) {
				this.groupFinish = true
			} else if (responseStatus == 101) {
				this.payStatus = false
				this.groupFinish = false
			}

			var user = responseData.user
			for (let i = 0; i < user.length; i++) {
				let isOwner = user[i].isOwner
				if (isOwner == 1) {
					this.ownerAvatar = user[i].image
					if (this.ownerAvatar == null || this.ownerAvatar == '') {
						this.ownerAvatar = '/static/img/share/pindou-wait.png'
					}
				}
			}
			var groupSize = this.needNum + user.length
			var $partnerBox = '<div class="pindou-partner"><div class="avatar"><img/></div></div>'
			setTimeout(() => {
				for (let i = 1; i < user.length; i++) {
					$('.user-joined').append($partnerBox)
					let partnerAvatar = user[i].image
					if (partnerAvatar == null || partnerAvatar == '') {
						partnerAvatar = '/static/img/share/pindou-wait.png'
					}
					$(".user-joined .avatar:eq("+ i +") img").attr('src', partnerAvatar)
				}
				for (let i = user.length; i < groupSize; i++) {
					$('.user-joined').append($partnerBox)
					let partnerAvatar = '/static/img/share/pindou-wait.png'
					$(".user-joined .avatar:eq("+ i +") img").attr('src', partnerAvatar)
				}
			}, 100)
			console.log(responseData)
		}).catch((ex) => {
			console.log(ex)
		})
		setInterval(() => {
			this.timer(this.timeLeft)
			this.timeLeft--
		}, 1000)
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
		},
		timer: function (event) {
			var seconds = parseInt(event % 60) < 10 ? '0' + parseInt(event % 60) : parseInt(event % 60)
			var minutes = parseInt((event / 60) % 60) < 10 ? '0' + parseInt((event / 60) % 60) : parseInt((event / 60) % 60)
			var hours = parseInt((event / 3600) % 24) < 10 ? '0' + parseInt((event / 3600) % 24) : parseInt((event / 3600) % 24)
			var days = Math.floor(event / (3600 * 24)) >= 1 ? Math.floor(event / (3600 * 24)) : ''
			var leftDate = days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
			$(".time").text(leftDate)
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
	display: inline-block;
	text-align: center
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
.pay-error-text{
	font-size: 12px;
	font-weight: 400;
	color: #EE6807;
	text-align: center;
	margin-top: 12px;
}
.pay-error-desc{
	text-align: center;
}
.pay-error-desc div:last-child{
	font-weight: 600;
	margin-top: 4px;
}
</style>
