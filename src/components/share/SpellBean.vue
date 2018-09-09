<template>
	<div class="content">
		<div class="terms-div-wrapper" v-if="rulesOpen">
			<div class="terms-div-header">
			<div class="header-title-wrapper">
				{{ $t("pddrule") }}
			</div>
			<div class="header-back-wrapper" v-on:click="backKey">
				<div class="header-back-arrow">
				<img src="/static/img/icon/goback.png">
				</div>
			</div>
			</div>
			<div class="terms-div-contents">
				<iframe src="https://www.beanpop.cn/pddrule"  width='100%' height='100%' frameborder='0' name="_blank" id="_blank"></iframe>
			</div>
		</div>
		<div class="fixed-right-btn" v-on:click="openApp(phoneKind)">打开App</div>
		<div class="main-top">
			<div class="main-top-title">
				<img src="/static/img/share/rule.png" alt="" v-on:click="rulesClick"/>
				<span>{{groupStatusDesc}}</span>
			</div>
			<div class="finish-time" v-if="pinIng">
				<span>22:33:44.0</span>
				<span class="orange">后结束</span>
			</div>
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
					<div class="times">
						<span>发起时间：</span>
						<span>{{groupCreateAt}}</span>
					</div>
					<div class="times" v-if="pinSuccess">
						<span>成功时间：</span>
						<span>{{groupSuccessAt}}</span>
					</div>
					<div class="times" v-if="!pinSuccess&&!pinIng">
						<span>失败时间：</span>
						<span>{{groupExpriedAt}}</span>
					</div>
					<div class="group-info" v-if="pinIng">
						<span class="orange">{{pinzhu}}</span>
						<span class="grey">发起的拼豆豆还差</span>
						<span class="orange">3人</span>
						<span class="grey">，即可获得优惠 </span>
					</div>
				</div>
			</div>
		</div>
		<div class="pindou-details">
			<div class="pindou-details-top">{{shopName}}</div>
			<div class="pindou-details-middle">
				<div class="middle-left">
					<img v-bind:src="shopImage" alt="" />
				</div>
				<div class="middle-right">
					<div class="package-name">{{groupName}}</div>
					<div class="right-second-div clear-fix">
						<div class="owner-box">拼主</div>
						<div class="new-package-price">￥{{discountPrice}}</div>
					</div>
					<div class="right-third-div clear-fix">
						<div class="really-price-box">
							<span>到店使用仍需支付：</span>
							<span>￥{{newPrice}}</span>
						</div>
						<div class="old-package-price"><del>￥{{oldPrice}}</del></div>
					</div>
				</div>
			</div>
			<div class="pindou-details-bottom">
				<div v-if="pinSuccess">
					<span>使用期限：</span>
					<span>{{startUseTime}}</span>
					<span>至</span>
					<span>{{endUseTime}}</span>
				</div>
			</div>
		</div>
		<div class="must-know justified" v-on:click="showMustKnow">
			<span class="must-know-text">使用须知</span>
			<div class="must-know-icon">
				<img src="/static/img/share/close_hollow.png"/>
			</div>
		</div>
		<div class="must-know-contain"></div>
		<div class="applicative justified" v-on:click="showApplicative">
			<div class="applicative-text">适用门店</div>
			<div class="applicative-icon justified">
				<div class="min-distance">
					<span>最近门店{{minDistance}}米</span>
				</div>
				<div class="shop-count">
					<span>共{{shopCount}}家门店</span>
				</div>
				<img src="/static/img/share/close_hollow.png"/>
			</div>
		</div>
		<div class="applicative-contain"></div>
		<div class="goto-pindou"><span>去拼豆</span></div>
	</div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import vueCookie from 'vue-cookie'
import axios from 'axios'
import $ from 'jquery'

// axios.defaults.withCredentials=true
// Vue.prototype.$axios = axios

const langData = require('../lang/share.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'spellBean',
  phone: '',
  messages: langData
})
export default {
	name: 'spellBean',
	i18n: i18n,
	components: {
	},
	data () {
		return {
			rulesOpen: false,
			phoneKind: '',
			groupStatus: '',
			groupCreateAt: '',
			groupExpriedAt: '',
			groupSuccessAt: '',
			groupStatusDesc: '',
			groupName: '',
			shopImage: '',
			groupSize: '',
			groupLeftTime: '',
			pinzhu: '',
			ownerAvater: '',
			pinSuccess: true,
			pinFailed: true,
			pinIng: true,
			shopName: '',
			groupOnPrice: '',
			oldPrice: '',
			discountPrice: '',
			newPrice: '',
			startUseTime: '',
			endUseTime: '',
			minDistance: '',
			shopCount: ''
		}
	},
	created: function () {
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			this.phoneKind = 'ios'
		} else if (/(Android)/i.test(navigator.userAgent)) {
			this.phoneKind = 'android'
		}
		$('body').css({'background-color': '#F4F4F4', 'font-family': 'PingFangSC-Regular', 'font-size': '16px'})
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/myGroupOn/1',
			// url: '/api/myGroupOn/1',
			withCredentials: true,
			headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': '', 'Content-Type': 'application/x-www-form-urlencoded'}
		}).then((response) => {
			let responseData = response.data.data
			this.groupName = responseData.groupName
			this.groupCreateAt = responseData.createdAt
			this.groupSuccessAt = responseData.paidAt
			this.groupExpriedAt = responseData.expriedAt
			this.shopName = responseData.shopName
			this.shopImage = responseData.image
			this.groupOnPrice = responseData.grouponPrice
			this.oldPrice = responseData.price
			this.discountPrice = responseData.discountedPrice
			this.newPrice = parseFloat(this.discountPrice - this.groupOnPrice)
			this.startUseTime = responseData.startUseTime
			this.endUseTime = responseData.endUseTime
			this.groupStatus = responseData.groupStatus
			if (this.groupStatus == 1) {
				this.groupStatusDesc = '拼团成功'
				this.pinSuccess = true
			} else if (this.groupStatus == 2) {
				this.groupStatusDesc = '拼豆中...'
				this.pinSuccess = false
				this.pinIng = true
			} else {
				this.groupStatusDesc = '拼团失败'
				this.pinSuccess = false
				this.pinIng = false
			}
			this.groupLeftTime = responseData.timeLeft
			this.groupSize = responseData.groupSize

			var tips = responseData.tips
			var $tipsDiv = '<div class="must-know-title"></div><div class="must-know-text"></div>'
			for (let i = 0; i < tips.length; i++) {
				let tipsTitle = tips[i].title
				let tipsValue = tips[i].value
				$('.must-know-contain').append($tipsDiv)
				$(".must-know-contain .must-know-title:eq("+ i +")").text(tipsTitle)
				$(".must-know-contain .must-know-text:eq("+ i +")").text(tipsValue)
			}

			var user = responseData.user
			for (let i = 0; i < user.length; i++) {
				let isOwner = user[i].isOwner
				if (isOwner == 1){
					this.ownerAvater = user[i].image
					this.pinzhu = user[i].nickname
					if (this.ownerAvater == null) {
						this.ownerAvater = '/static/img/share/pindou-wait.png'
					}
				}
			}

			var groupNum = responseData.nowSize
			var $partnerBox = '<div class="pindou-partner"><div class="avatar"><img/></div></div>'
			for (let i = 1; i < groupNum; i++) {
				console.log('====')
				$('.user-joined').append($partnerBox)
				let partnerAvater = user[i].image
				if (partnerAvater == null) {
					partnerAvater = '/static/img/share/pindou-wait.png'
				}
				$(".user-joined .avater:eq("+ i +") img").attr('src', partnerAvater)
			}
			
			var shop = responseData.shop
			var $shopBox = '<div class="applicative-shop justified"><div class="applicative-shop-desc"><div class="applicative-shop-name-box justified"><div class="applicative-shop-name"></div><div class="applicative-shop-distance"></div></div><div class="applicative-shop-location"></div></div><div class="applicative-shop-icon"><img src="/static/img/share/position.png"/></div></div>'
			this.minDistance = 9999999
			this.shopCount = shop.length
			if (this.shopCount == 0) {
				$(".min-distance span").text("附近无门店")
			}
			for (let i = 0; i < shop.length; i++) {
				$(".applicative-contain").append($shopBox)
				let sName = shop[i].name
				let sLocation = shop[i].location
				let sDistance = shop[i].distance
				this.minDistance = sDistance < this.minDistance ? sDistance : this.minDistance
				if (sDistance >= 1000) {
					sDistance = parseFloat(sDistance/1000) + 'km'
				} else {
					sDistance = sDistance + 'm'
				}
				$(".applicative-contain .applicative-shop-name:eq("+ i +")").text(sName)
				$(".applicative-contain .applicative-shop-distance:eq("+ i +")").text(sDistance)
				$(".applicative-contain .applicative-shop-location:eq("+ i +")").text(sLocation)
			}
			console.log(responseData)
		}).catch((ex) => {
			console.log(ex)
		})
	},
	methods: {
		showMustKnow: function () {
			var knowStatus = $(".must-know-contain").css('display')
			if (knowStatus == 'none') {
				$(".must-know-contain").show()
				$(".must-know-icon img").attr('src', '/static/img/share/open_hollow.png')
			} else {
				$(".must-know-contain").hide()
				$(".must-know-icon img").attr('src', '/static/img/share/close_hollow.png')
			}
		},
		showApplicative: function () {
			if (this.shopCount > 0) {
				var appStatus = $(".applicative-contain").css('display')
				if (appStatus == 'none') {
					$(".applicative-contain").show()
					$(".shop-count").show()
					$(".min-distance").hide()
					$(".applicative-icon img").attr('src', '/static/img/share/open_hollow.png')
				} else {
					$(".applicative-contain").hide()
					$(".shop-count").hide()
					$(".min-distance").show()
					$(".applicative-icon img").attr('src', '/static/img/share/close_hollow.png')
				}
			}
		},
		rulesClick: function () {
			this.rulesOpen = true
		},
		backKey: function () {
			this.rulesOpen = false
		}
	}
}
</script>

<style scoped>
.body{
	font-family: "PingFangSC-Regular";
	font-size: 16px;
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
.header-title-wrapper {
  display:table-cell;
  vertical-align:middle;
}
.terms-div-wrapper {
  position: absolute;
  z-index:999;
  top:0;
  left:0;
  height:100vh;
  background-color:#FFFFFF;
  width:100%;
}
.terms-div-header {
  background-color:#FFE300;
  display:table;
  text-align:center;
  width:100%;
  height:60px;
  color:#333333;
  font-size: 18px;
}
.header-back-wrapper {
  height:60px;
  width:60px;
  position:fixed;
  left:0;
  top:0;
  bottom:0;
  right:0;
  display:table;
}
.terms-div-contents {
  height: calc(100vh - 70px);
}
.header-back-arrow {
  display:table-cell;
  vertical-align: middle;
}

.header-back-arrow img {
  width:20px;
  height:20px;
  margin-top:5px;
}
.main-top{
	/* border-top: 1px solid #DDDDDD; */
	padding-top: 30px;
	background: #FFFFFF;
	margin-bottom: 10px;
}
.main-top-title{
	font-family: "PingFangSC-Semibold";
	font-size: 20px;
	text-align: center;
	vertical-align: middle;
	line-height: 28px;
	padding: 0px 25px;
}
.main-top-title img{
	width: 20px;
	float: left;
	margin-top: 4px;
}
.finish-time{
	text-align: center;
	font-family: "PingFangSC-Semibold";
	font-size: 18px;
	margin: 8px 10px 20px;
}
.main-top .join-pindou-desc{
	padding-bottom: 30px;
	font-size: 14px;
}
.times{
	color: #999999;
	font-size: 14px;
}
.pin-success-box, .ped-success-box{
	width: 70%;
	margin-left: 15%;
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
.main-top .join-pindou-desc > div:first-child span{
	color: #999999;
	font-size: 14px;
}
.user-joined{
	margin: 20px 0px;
	display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
}
.user-joined > div{
	margin: 0px 2vw;
}
.pindou-details{
	font-family: "PingFangSC-Regular";
	font-size: 14px;
	margin-bottom: 10px;
}
.pindou-details-top, .pindou-details-bottom{
	padding: 8px 15px;
	text-align: left;
	line-height: 20px;
	color: #333333;
	background: #FFFFFF;
}
.pindou-details-bottom{
	text-align: right;
	color: #999999;
	padding: 0px 15px;
	height: 36px;
	line-height: 36px;
}
.pindou-details-middle{
	background: #F3F4F7;
	padding: 15px;
	display: flex;
	align-items: center;
}
.middle-left{
	width: 70px;
	height: 70px;
}
.middle-left img{
	width: 100%;
	height: 100%;
	border-radius: 4px;
}
.middle-right{
	flex: 1;
	padding-left: 8px;
}
.middle-right .package-name{
	width: 160px;
	font-family: "PingFangSC-Semibold";
	line-height: 22px;
}
.right-second-div{
	margin: 4px 0px 8px;
}
.owner-box{
	width: 60px;
	height: 18px;
	background-image: url('/static/img/share/pindou-owner.png');
	background-size: 100% 100%;
	text-align: center;
	color: #FFFFFF;
	font-size: 12px;
	float: left;
}
.new-package-price{
	font-family: "PingFangSC-Medium";
	color: #EE6807;
	font-size: 14px;
	line-height: 20px;
	float: right;
}
.really-price-box{
	font-family: "PingFangSC-Semibold";
	font-size: 12px;
	color: #57A0FF;
	float: left;
}
.old-package-price{
	font-size: 10px;
	color: #999999;
	float: right;
}
.must-know, .applicative{
	padding: 15px;
	font-size: 14px;
	background: #FFFFFF;
	/* box-shadow:0px 0px 0px 0px rgba(221,221,221,1),0px 1px 0px 0px rgba(221,221,221,1); */
	border-bottom: 1px solid #dddddd;
}
.must-know-icon img{
	width: 16px;
}
.must-know-contain{
	padding: 15px;
	background: #FFFFFF;
	border-bottom: 1px solid #DDDDDD;
	display: none;
	font-size: 14px;
}
.use-condition, .warm-tips{
	font-family: "PingFangSC-Semibold";
	font-size: 14px;
	color: #333333;
	margin-bottom: 8px;
}
.condition-desc, .wram-tips-desc{
	margin-bottom: 8px;
}
.wram-tips-desc:last-child{
	margin-bottom: 0px;
}
.applicative-contain{
	display: none;
}
.shop-count{
	display: none;
}
.goto-pindou{
	width: 70%;
	margin: 20px 0px 20px 15%;
	background:linear-gradient(90deg,rgba(255,222,0,1) 0%,rgba(255,230,0,1) 100%);
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:22px;
	text-align: center;
	padding: 10px 0px;
}
.goto-pindou span{
	line-height: 25px;
	color:rgba(51,51,51,1);
	font-size: 18px;
}
</style>
