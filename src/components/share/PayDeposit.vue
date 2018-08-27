<template>
	<div class="content">
		<header class="header">
			<div class="goback-pindou"><img src="/static/img/share/goback.png"/></div>
			<div class="pay-header-title">拼豆豆订金支付</div>
		</header>
		<div class="order-amount-box">
			<div class="order-amount">
				<span>￥</span>
				<span>10.00</span>
			</div>
			<div class="shop-package">袁老四的火锅店 - 单身贵族套餐 3选1</div>
		</div>
		<div class="amount-desc-box">
			<div class="amount-desc-title">拼豆豆订金说明:</div>
			<div class="amount-desc">·10元订金只做预定用，可用来充当支付金额使用</div>
			<div class="amount-desc">·到店后支付后续优惠金额，方可消费</div>
			<div class="amount-desc">·更多细节请咨询店内工作人员</div>
			<div class="amount-remark">※最终解释权归商家所有，与深圳喜豆文化发展无关</div>
		</div>
		<div class="wechat-pay justified">
			<div class="wechat-icon">
				<img src="/static/img/share/wechat-pay.png"/>
				<span>微信支付</span>
			</div>
			<div class="pay-choose">
				<img src="/static/img/share/pay-choose.png"/>
			</div>
		</div>
		<div class="alipay justified">
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
		<div class="sure-pay-btn"><span>确认支付</span></div>
	</div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vueCookie from 'vue-cookie'
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper'

export default {
	name: 'shopDetails',
	// i18n: i18n,
	components: {
	},
	data () {
		return {
		}
	},
	created: function () {
		$('body').css({'background-color': '#F4F4F4', 'font-family': 'PingFangSC-Regular', 'font-size': '16px'})
	},
	methods: {
		
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
