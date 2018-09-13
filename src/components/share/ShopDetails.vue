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
		<div class="download-wrapper">
			<div class="download-title">下载喜豆APP</div>
			<div class="download-text">获得更多奖励</div>
			<div class="download-btn">去下载</div>
		</div>
		<div class="shop-name-box">
			<div class="shop-name">{{shopName}}</div>
			<div class="operate-time">
				<img src="/static/img/share/operate_time.png"/>
				<span>{{shopOpenTime}}-{{shopCloseTime}}（法定工作日）</span>
			</div>
		</div>
		<div class="shop-info">
			<div class="location-info justified">
				<div class="location">
					<div class="location-icon">
						<img src="/static/img/share/position.png"/>
					</div>
					<div class="address">
						<span>{{shopAddress}}</span>
						<p>{{addressDetail}}</p>
					</div>
				</div>
				<div class="contact-box" v-on:click="callShop">
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
			<span>{{ruleTitle}}</span>
			<div class="open-rule">
				<img src="/static/img/share/closed.png"/>
			</div>
		</div>
		<div class="rule-detail"></div>
		<div class="package-data-box"></div>
		<div class="shop-coupon-box"></div>
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
import vueCookie from 'vue-cookie'
import $ from 'jquery'

const langData = require('../lang/share.json')

const i18n = new VueI18n({
  locale: 'shopDetails',
  shopID: '',
  messages: langData
})

export default {
	name: 'shopDetails',
	i18n: i18n,
	components: {
	},
	data () {
		return {
			shopName: '',
			shopOpenTime: '',
			shopCloseTime: '',
			shopAddress: '',
			addressDetail: '',
			shopPhoneNum: '',
			ruleTitle: '',
			rule: [],
			shopID: '',
			groupID: ''
		}
	},
	created: function () {
		$('body').css({'background-color': '#F4F4F4', 'font-family': 'PingFangSC-Regular', 'font-size': '16px'})
		var getParams = this.$route.params
		if (getParams.shopID) {
			this.shopID = getParams.shopID
		} else {
			this.shopID = vueCookie.get('shop_id')
		}
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/event/shop/' + this.shopID
			// url: 'http://dev-new-api.beanpop.cn/game/recentWinnerRecord'
		}).then((response) => {
			var responseData = response.data.data
			var that = this
			vueCookie.set('shop_id', this.shopID, 1)
			this.$i18n.shopID = vueCookie.get('shop_id')
			console.log(responseData)
			this.shopName = responseData.name
			this.shopOpenTime = responseData.openTime
			this.shopCloseTime = responseData.closeTime
			this.shopAddress = responseData.addressDetail
			this.addressDetail = responseData.nearAddress
			this.shopPhoneNum = responseData.phoneNum
			this.ruleTitle = responseData.rule.title

			// get the rule
			var ruleArr = responseData.rule.content.split('<br>')
			var $ruleDiv = '<div class="rules"></div>'
			for (let i = 0; i < ruleArr.length; i++) {
				$('.rule-detail').append($ruleDiv)
				$(".rule-detail .rules:eq(" + i + ")").text(ruleArr[i])
			}

			// get pdd package data
			var pddData = responseData.GroupProduct
			console.log(pddData)
			var $pddBox = '<div class="package-data"><div class="package-img" data-id=""><img src=""/></div><div class="package-data-detail"><div class="package-name"></div><div class="package-price"><span class="package-new-price"></span><span class="package-old-price"><del></del></span></div><div class="team-scale"><span></span><div class="go-pindou">去拼豆</div></div></div></div>'
			for (let i = 0; i < pddData.length; i++) {
				$('.package-data-box').append($pddBox)
				var discountedPrice = '￥' + pddData[i].discountedPrice
				var groupSize = pddData[i].groupSize + '人成团'
				var pddDataImage = pddData[i].image
				var price = pddData[i].price
				var title = pddData[i].title
				let pinDetailID = pddData[i].id
				$(".package-data-box .package-data:eq("+ i +") .package-img").attr('data-id', pinDetailID)
				$(".package-data-box .package-data:eq("+ i +") img").attr('src', pddDataImage)
				$(".package-data-box .package-data:eq("+ i +") .package-name").text(title)
				$(".package-data-box .package-data:eq("+ i +") .package-new-price").text(discountedPrice)
				$(".package-data-box .package-data:eq("+ i +") .package-old-price del").text(price)
				$(".package-data-box .package-data:eq("+ i +") .team-scale span").text(groupSize)
			}

			// get shop coupon data
			var couponData = responseData.ShopEvent
			var $couponBox = '<div class="shop-coupon"><div class="coupon-img"><img/></div><div class="shop-coupon-detail justified"><div class="coupon-desc"><div class="coupon-name"></div><div class="store-name"></div><div class="term"><span class="start-date"></span><span class="end-date"></span></div></div><div class="use-shop-coupon-btn">使用</div></div></div>'
			for (let i = 0; i < couponData.length; i++) {
				$('.shop-coupon-box').append($couponBox)
				var startDate = couponData[i].startDate.replace(/-/, '/') + '至'
				var endDate = couponData[i].endDate.replace(/-/, '/')
				var couponImage = couponData[i].image
				var couponTitle = couponData[i].title
				$(".shop-coupon-box .shop-coupon:eq("+ i +") img").attr('src', couponImage)
				$(".shop-coupon-box .shop-coupon:eq("+ i +") .coupon-name").text(couponTitle)
				$(".shop-coupon-box .shop-coupon:eq("+ i +") .store-name").text(this.shopName)
				$(".shop-coupon-box .shop-coupon:eq("+ i +") .start-date").text(startDate)
				$(".shop-coupon-box .shop-coupon:eq("+ i +") .end-date").text(endDate)
			}
			$('.go-pindou, .use-shop-coupon-btn').click(function () {
				var cliheight = $(window).height()
				$('.mask1, .mask2').height(cliheight + 100)
				$(".download-wrapper, .mask2").show()
			})
			$('.mask2').click(function () {
				$(".download-wrapper, .mask2").hide()
			})
			$(".package-data .package-img").click(function () {
				that.groupID = $(this).attr('data-id')
				that.$router.push({
					name: 'PindouDetails',
					params: {
						groupID: that.groupID
					}
				})
			})
		}).catch((ex) => {
			console.log(ex)
			// var errorResponseData = ex.response.data
			// console.log(errorResponseData)
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
		callShop: function () {
			var tel = 'tel:' + this.shopPhoneNum
			window.location.href = tel
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
	display: flex;
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
.address{
	flex: 1;
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

.shop-coupon-box{
	width: 100%;
	display: none;
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
.download-wrapper{
	font-family: 'PingFangSC-Regular';
	width: 80%;
	background: #FFFFFF;
	color: #333333;
	padding: 20px 0px;
	text-align: center;
	position: fixed;
	left: 10%;
	top: 35%;
	border-radius:4px;
	z-index: 50;
	display: none;
}
.download-title{
	font-size:18px;
	font-weight:400;
	line-height:25px;
}
.download-text{
	margin: 12px 0px 16px;
	font-size:14px;
	font-weight:400;
	line-height:20px;
}
.download-btn{
	width: 42%;
	margin: 0 auto;
	height:44px;
	line-height: 44px;
	background:linear-gradient(90deg,rgba(255,222,0,1) 0%,rgba(255,230,0,1) 100%);
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:22px;
}
</style>
