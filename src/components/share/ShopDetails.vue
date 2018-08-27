<template>
	<div class="content">
		<div class="swiper-container" id="top-swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide swiper-div">
					<img class="swiper-img-index" src="/static/img/share/pindou.png">
				</div>
				<div class="swiper-slide swiper-div">
					<img class="swiper-img-index" src="/static/img/share/pindou.png">
				</div>
				<div class="swiper-slide swiper-div">
					<img class="swiper-img-index" src="/static/img/share/pindou.png">
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
		<div class="fixed-right-btn">打开App</div>
		<div class="mask2"></div>
		<div class="shop-name-box">
			<div class="shop-name">袁老四的火锅店·蛇口店</div>
			<div class="operate-time">
				<img src="/static/img/share/operate_time.png"/>
				<span>10:00-22:00（法定工作日）</span>
			</div>
		</div>
		<div class="shop-info">
			<div class="location-info justified">
				<div class="location justified">
					<div class="location-icon">
						<img src="/static/img/share/position.png"/>
					</div>
					<div class="address">
						<span>深圳市南山区蛇口街道石云路喜豆 大厦7楼(招商银行总行对面）</span>
						<p>距地铁2号线湾厦地铁站D口300米</p>
					</div>
				</div>
				<div class="contact-box">
					<img src="/static/img/share/contact.png"/>
				</div>
			</div>
		</div>
		<div class="shop-kind clear-fix">
			<div class="shop-kind-left" v-on:click="changeTabMarket">
				<span class="shop-text kind-active">拼豆豆</span>
			</div>
			<div class="shop-kind-right" v-on:click="changeTabShop">
				<span class="shop-text">商家</span>
			</div>
		</div>
		<div class="pindou-rule" v-on:click="showRule">
			<img src="/static/img/share/pin-icon.png"/>
			<span>拼豆豆规则说明</span>
			<div class="open-rule">
				<img src="/static/img/share/closed.png"/>
			</div>
		</div>
		<div class="rule-detail">
			<div class="rules">参与拼豆豆需支付押金，拼豆成功可享受优惠</div>
			<div class="rules">拼豆不成功，则退还用户押金</div>
			<div class="rules">拼豆成功后，用户不予使用，押金不予退还</div>
			<div class="rules">拼主可享受额外优惠</div>
			<div class="rules">购买带有喜豆码商品可获得拼豆发起团机会一次</div>
		</div>
		<div class="package-data-box">
			<div class="package-data">
				<div class="package-img">
					<img src="/static/img/share/pindou-img.jpg"/>
				</div>
				<div class="package-data-detail">
					<div class="package-name">招牌双人餐</div>
					<div class="package-price">
						<span class="package-new-price">￥2048</span>
						<span class="package-old-price"><del>8848</del></span>
					</div>
					<div class="team-scale">
						<span>2人成团</span>
						<div class="go-pindou" v-on:click="goToPindou">去拼豆</div>
					</div>
				</div>
			</div>
			<div class="package-data">
				<div class="package-img">
					<img src="/static/img/share/pindou-img.jpg"/>
				</div>
				<div class="package-data-detail">
					<div class="package-name">招牌双人餐撒大苏打实打实的风速达到撒旦</div>
					<div class="package-price">
						<span class="package-new-price">￥2048</span>
						<span class="package-old-price"><del>8848</del></span>
					</div>
					<div class="team-scale">
						<span>2人成团</span>
						<div class="go-pindou" v-on:click="goToPindou">去拼豆</div>
					</div>
				</div>
			</div>
			<div class="package-data">
				<div class="package-img">
					<img src="/static/img/share/pindou-img.jpg"/>
				</div>
				<div class="package-data-detail">
					<div class="package-name">招牌双人餐</div>
					<div class="package-price">
						<span class="package-new-price">￥2048</span>
						<span class="package-old-price"><del>8848</del></span>
					</div>
					<div class="team-scale">
						<span>2人成团</span>
						<div class="go-pindou" v-on:click="goToPindou">去拼豆</div>
					</div>
				</div>
			</div>
		</div>
		<div class="shop-coupon-box">
			<div class="shop-coupon">
				<div class="coupon-img">
					<img src="/static/img/share/pindou-img.jpg"/>
				</div>
				<div class="shop-coupon-detail justified">
					<div class="coupon-desc">
						<div class="coupon-name">买一送一</div>
						<div class="store-name">袁老四的火锅店</div>
						<div class="term">2018/03/24至2018/05/24</div>
					</div>
					<div class="use-shop-coupon-btn">使用</div>
				</div>
			</div>
			<div class="shop-coupon">
				<div class="coupon-img">
					<img src="/static/img/share/pindou-img.jpg"/>
				</div>
				<div class="shop-coupon-detail justified">
					<div class="coupon-desc">
						<div class="coupon-name">买一送一</div>
						<div class="store-name">袁老四的火锅店</div>
						<div class="term">2018/03/24至2018/05/24</div>
					</div>
					<div class="use-shop-coupon-btn">使用</div>
				</div>
			</div>
			<div class="shop-coupon">
				<div class="coupon-img">
					<img src="/static/img/share/pindou-img.jpg"/>
				</div>
				<div class="shop-coupon-detail justified">
					<div class="coupon-desc">
						<div class="coupon-name">买一送一</div>
						<div class="store-name">袁老四的火锅店</div>
						<div class="term">2018/03/24至2018/05/24</div>
					</div>
					<div class="use-shop-coupon-btn">使用</div>
				</div>
			</div>
			<div class="shop-coupon">
				<div class="coupon-img">
					<img src="/static/img/share/pindou-img.jpg"/>
				</div>
				<div class="shop-coupon-detail justified">
					<div class="coupon-desc">
						<div class="coupon-name">买一送一</div>
						<div class="store-name">袁老四的火锅店</div>
						<div class="term">2018/03/24至2018/05/24</div>
					</div>
					<div class="use-shop-coupon-btn">使用</div>
				</div>
			</div>
		</div>
		<div class="no-mare-data">
			<div class="nodata-line"></div>
			<div class="nodata-text">
				<span>已无更多数据</span>
			</div>
			<div class="nodata-line"></div>
		</div>
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
	mounted () {
		new Swiper('#top-swiper', {
			autoplay: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			// pagination: '.swiper-pagination',
			paginationClickable: true,
			centeredSlides: true,
			loop: true
		})
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
			if(ruleStatus == 'none') {
				$(".rule-detail").show()
				$(".pindou-rule").css('margin-bottom','0px')
				$(".open-rule img").attr('src', '/static/img/share/opened.png')
			} else {
				$(".rule-detail").hide()
				$(".pindou-rule").css('margin-bottom','10px')
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
@import "swiper/dist/css/swiper.css";
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
.shop-name-box{
	background: #FFFFFF;
	border-bottom: 1px solid #DDDDDD;
	margin-top: -5px;
	padding: 15px;
	color: #333333;
}

.shop-name{
	font-size: 18px;
	margin-bottom: 4px;
}
.operate-time{
	line-height: 17px;
}
.operate-time img{
	width: 13px;
	vertical-align: middle;
}
.operate-time span{
	font-size: 12px;
	vertical-align: middle;
}
.location-info{
	align-items: center;
}
.location{
	width: 85%;
	padding-right: 10px;
	border-right: 1px solid #E6E7E8;
}
.location img{
	width: 13px;
}
.contact-box{
	margin-right: 5px;
}
.contact-box img{
	width: 24px;
}
.address span{
	line-height: 20px;
}
.address p{
	font-size: 12px;
	color: #999999;
	line-height: 17px;
}
.shop-kind{
	width: 100%;
	height: 45px;
	line-height: 45px;
	font-size: 0;
	background-color: #fff;
	border-bottom: 1px solid #DDDDDD;
}

.shop-kind-left, .shop-kind-right{
	display: inline-block;
	width: 50%;
	text-align: center;
	color: #999;
	font-size: 14px;
	font-family: "PingFangSC-Regular";
}
.shop-text{
	display: inline-block;
	height: 41px;
}
.kind-active{
	font-family: "PingFangSC-Semibold";
	color: #000;
	border-bottom: 4px solid #FFE200;
}
.pindou-rule{
	padding: 8px 16px;
	color: #333333;
	font-size: 14px;
	background: #FFFFFF;
	border-bottom: 1px solid #DDDDDD;
	margin-bottom: 10px;
}
.pindou-rule img{
	width: 18px;
	vertical-align: middle;
}
.pindou-rule span{
	vertical-align: middle;
}
.open-rule{
	float: right;
}
.open-rule img{
	width: 13px;
}
.rule-detail{
	background: #FFFFFF;
	font-size: 14px;
	color: #333333;
	padding: 15px;
	margin-bottom: 10px;
	display: none;
}
.rules{
	margin-bottom: 4px;
	line-height: 20px;
}
.package-data{
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 0px 0px rgba(221,221,221,1);
	border-bottom: 1px solid #DDDDDD;
	padding: 15px;
	font-family: "PingFangSC-Regular";
	display: flex;
}
.package-data-box .package-data:last-child{
	border: none;
}
.package-img{
	width:80px;
	height:80px;
	display: inline-block;
}
.package-img img{
	border-radius:4px;
	width: 100%;
}
.package-data-detail{
	flex: 1;
	padding-left: 15px;
	vertical-align: top;
}
.package-name{
	font-size:16px;
	color: #333333;
	width: 180px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.package-new-price{
	color: #EE6807;
	font-family: "PingFangSC-Semibold";
	font-size: 16px;
}
.package-old-price{
	color: #999999;
	font-size: 12px;
}
.team-scale{
	float: right;
}
.team-scale span{
	color: #999999;
	font-size: 14px;
	display: inline-block;
	margin-right: 3px;
}
.team-scale .go-pindou{
	display: inline-block;
}
.shop-coupon-box{
	width: 100%;
	display: none;
}
.shop-coupon{
	display: flex;
	background: #FFFFFF;
	padding: 15px;
	margin: 10px 15px 0px;
}
.coupon-img{
	width: 60px;
	height: 60px;
}
.coupon-img img{
	width: 100%;
	border-radius: 2px;
}
.shop-coupon-detail{
	flex: 1;
	padding-left: 15px;
	align-items: center;
}
.coupon-desc{
}
.coupon-name{
	font-family: "PingFangSC-Semibold";
	font-size: 14px;
	color: #333333;
}
.store-name, .term{
	color: #666666;
	font-size: 10px;
	line-height: 14px;
}
.store-name{
	margin: 4px 0 8px;
}
.use-shop-coupon-btn{
	float: right;
	width: 75px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:15px;
}
.go-pindou{
	width: 75px;
	height: 30px;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:15px;
	text-align: center;
	line-height: 30px;
}
.go-pindou span{
	font-size: 14px;
}
.no-mare-data{
	display: flex;
	margin: 20px 0px;
	width: 55%;
	margin-left: 22.5%;
	align-items: center;
}
.nodata-line{
	border-bottom: 1px solid #CCCCCC;
	flex: 1;
}
.nodata-text{
	font-size:12px;
	font-family:"PingFangSC-Light";
	color:#CCCCCC;
	margin: 0 12px;
}
</style>
