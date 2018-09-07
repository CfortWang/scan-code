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
						<img src="/static/img/share/avatar.jpg"/>
					</div>
					<div class="owner">
						<img src="/static/img/share/pindou-owner.png"/>
						<div class="owner-text">拼主</div>
					</div>
				</div>
				<div class="pindou-partner">
					<div class="avatar">
						<img src="/static/img/share/avatar.jpg"/>
					</div>
				</div>
				<div class="pindou-partner">
					<div class="avatar">
						<img src="/static/img/share/avatar.jpg"/>
					</div>
				</div>
				<div class="pindou-wait">
					<div class="avatar">
						<img src="/static/img/share/pindou-wait.png"/>
					</div>
				</div>
				<div class="pindou-wait">
					<div class="avatar">
						<img src="/static/img/share/pindou-wait.png"/>
					</div>
				</div>
			</div>
			<div class="join-pindou-desc">
				<span class="grey">还剩</span>
				<span class="orange">3个</span>
				<span class="grey">名额即可获得优惠 </span>
				<br />
				<span class="orange">22:33:44.0</span>
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
// import axios from 'axios'
import $ from 'jquery'
// import Swiper from 'swiper'

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
	},
	methods: {
		changeTabMarket: function () {
			$(".shop-coupon-box").hide()
			$(".package-data-box").show()
			$(".shop-kind-left .shop-text").addClass('kind-active')
			$(".shop-kind-right .shop-text").removeClass('kind-active')
		},
		changeTabShop: function () {
			$(".shop-coupon-box").show()
			$(".package-data-box").hide()
			$(".shop-kind-left .shop-text").removeClass('kind-active')
			$(".shop-kind-right .shop-text").addClass('kind-active')
		},
		showRule: function () {
			var ruleStatus = $(".rule-detail").css('display')
			if (ruleStatus == 'none') {
				$(".rule-detail").show()
				$(".pindou-rule").css('margin-bottom', '0px')
				$(".open-rule img").attr('src', '/static/img/share/opened.png')
			} else {
				$(".rule-detail").hide()
				$(".pindou-rule").css('margin-bottom', '10px')
				$(".open-rule img").attr('src', '/static/img/share/closed.png')
			}
		},
		goToPindou: function () {
			$(".join-pindou-box, .mask2").show()
			// $(".initiate-box").hide()
		},
		closePindou: function () {
			// $(".join-pindou-box, .mask2").hide()
			// $(".initiate-box").show()
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
	margin-top: -5px;
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
