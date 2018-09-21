<template>
	<div class="content">
		<header class="header">
			<div class="goback-pindou"><img src="/static/img/share/goback.png" v-on:click="goBack"/></div>
			<div class="pay-header-title">拼豆豆订金支付</div>
		</header>
		<div class="order-amount-box">
			<div class="order-amount">
				<span>￥</span>
				<span>{{payAmount}}</span>
			</div>
			<div class="shop-package">{{payShopName}} - {{payPackageName}}</div>
		</div>
		<div class="amount-desc-box">
			<div class="amount-desc-title">拼豆豆订金说明:</div>
			<div v-html = "payRule"></div>
			<div class="amount-remark">※最终解释权归商家所有，与深圳喜豆文化发展无关</div>
		</div>
		<div class="wechat-pay justified" v-on:click="changeWePay">
			<div class="wechat-icon">
				<img src="/static/img/share/wechat-pay.png"/>
				<span>微信支付</span>
			</div>
			<div class="pay-choose">
				<img src="/static/img/share/pay-choose.png"/>
			</div>
		</div>
		<div class="alipay justified" v-on:click="changeAliPay">
			<div class="alipay-icon">
				<img src="/static/img/share/alipay.png"/>
				<span>支付宝支付</span>
			</div>
			<div class="pay-choose">
				<img src="/static/img/share/pay-choose.png"/>
			</div>
		</div>
		<div class="tip-container">
			<div class="tip-error">
				<img src="/static/img/share/error.png"/>
				<span class="tip-error-msg">请选择支付方式</span>
			</div>
		</div>
		<div class="sure-pay-btn" v-on:click="goToPay"><span>确认支付</span></div>
	</div>
</template>

<script>
// import vueCookie from 'vue-cookie'
import $ from 'jquery'

export default {
	name: 'payDeposit',
	// i18n: i18n,
	components: {
	},
	data () {
		return {
			payID: '',
			payAmount: '',
			payPackageName: '',
			payShopName: '',
			payRule: '',
			payWay: '',
			payReturnUrl: '',
			payType: '',
			alipayReturn: '',
			timeLeft: ''
		}
	},
	created: function () {
		$('body').css({'background-color': '#F4F4F4', 'font-family': 'PingFangSC-Regular', 'font-size': '16px'})
		var getParams = this.$route.params
		this.payID = getParams.payID
		this.payAmount = getParams.payAmount
		this.payPackageName = getParams.payPackageName
		this.payShopName = getParams.payShopName
		this.payRule = getParams.payRule
		this.payWay = 'wechat'
	},
	methods: {
		goBack: function () {
			this.$router.push({name: 'SpellBean'})
		},
		changeWePay: function () {
			$(".wechat-pay .pay-choose").show()
			$(".alipay .pay-choose").hide()
			this.payWay = 'wechat'
		},
		changeAliPay: function () {
			$(".wechat-pay .pay-choose").hide()
			$(".alipay .pay-choose").show()
			this.payWay = 'alipay'
		},
		goToPay: function () {
			// axios({
			// 	method: 'GET',
			// 	url: 'http://dev-new-api.beanpop.cn/event/success' + '?groupon_record_id=' + this.payID,
			// 	withCredentials: true,
			// 	headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
			// }).then((response) => {
			// 	let responseData = response.data.data
			// 	this.timeLeft = responseData.timeLeft
			// }).catch((ex) => {
			// 	console.log(ex)
			// })
			this.payReturnUrl = 'http://dev-m.beanpop.cn/share/paySuccess?groupon_record_id=' + this.payID
			this.payType = 'groupon'
			if (this.payWay == 'wechat') {
				axios({
					method: 'POST',
					url: 'http://dev-new-api.beanpop.cn/pay/weixinPay',
					params: {type: this.payType, id: this.payID, return_url: this.payReturnUrl},
					withCredentials: true,
					headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': '', 'Content-Type': 'application/x-www-form-urlencoded', 'referer': this.payReturnUrl}
				}).then((response) => {
					console.log(response.data.data)
					if (response.status == 200) {
						$('body').append(response.data.data)
						$("form").attr("target", "_blank")
						console.log(this.payReturnUrl)
					} else {
						console.log('error~')
					}
				}).catch((ex) => {
					console.log(ex)
				})
			}

			if (this.payWay == 'alipay') {
				axios({
					method: 'POST',
					url: 'http://dev-new-api.beanpop.cn/pay/alipay',
					params: {type: this.payType, id: this.payID, return_url: this.payReturnUrl},
					withCredentials: true,
					headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': '', 'Content-Type': 'application/x-www-form-urlencoded'}
				}).then((response) => {
					if (response.status == 200) {
						$('body').append(response.data)
						$("form").attr("target", "_blank")
						console.log(this.payReturnUrl)
					} else {
						console.log('error~')
					}
				}).catch((ex) => {
					console.log(ex)
				})
			}
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
.order-amount-box, .amount-desc-box, .wechat-pay, .alipay{
	padding: 15px;
	background: #FFFFFF;
	font-family: "PingFangSC-Regular";
	color: #333333;
}
.order-amount-box{
	text-align: center;
	margin-bottom: 10px;
}
.order-amount{
	margin-bottom: 8px;
}
.order-amount span{
	font-size: 18px;
	color: #EE6807;
}
.order-amount span:last-child{
	font-size: 30px;
	line-height: 36px;
}
.amount-desc-box{
	margin-bottom: 10px;
}
.amount-desc-title{
	font-family: "PingFangSC-Semibold";
	font-size: 16px;
	margin-bottom: 12px;
	line-height: 22px;
}
.amount-desc{
	font-size: 14px;
	line-height: 20px;
	margin-bottom: 8px;
}
.amount-remark{
	font-size: 10px;
	line-height: 14px;
	color: #999999;
	padding-top: 12px;
}
.wechat-pay{
	box-shadow:0px 0px 0px 0px rgba(221,221,221,1);
	border-bottom: 1px solid #DDDDDD;
}
.alipay{
	box-shadow:0px 0px 0px 0px rgba(221,221,221,1);
}
.wechat-icon, .alipay{
	height: 20px;
}
.wechat-icon img, .alipay-icon img{
	width: 20px;
}
.wechat-icon span, .alipay-icon span{
	font-size: 14px;
	line-height: 20px;
	vertical-align: top;
}
.pay-choose{
	display: none;
	height: 20px;
}
.wechat-pay .pay-choose{
	display: block;
}
.pay-choose img{
	width: 16px;
}
.tip-container{
	position: fixed;
    z-index: 999;
    pointer-events: none;
    left: 0;
    top: 45%;
    width: 100%;
    display: none;
}
.tip-error{
    width: 50%;
    left: 25%;
    height: 24px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    overflow: hidden;
    padding: 10px 0px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -moz-box-shadow: 0 0 12px #999;
    -webkit-box-shadow: 0 0 12px #999;
    box-shadow: 0 0 12px #999;
    background: #BD362F;
    color: #FFF;
    opacity: .8;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
    filter: alpha(opacity=80);
}
.tip-error-msg{
	word-wrap: break-word;
	font-size: 14px;
	line-height: 20px;
	margin-left: 15px;
}
.sure-pay-btn, .use-coupon-btn{
	width: 70%;
	margin-left: 15%;
	margin-top: 30px;
	text-align: center;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:22px;
	padding: 10px 0px;
}
.use-coupon-btn{
	width: 80%;
	margin-left: 10%;
}
.sure-pay-btn span{
	line-height: 25px;
}
</style>
