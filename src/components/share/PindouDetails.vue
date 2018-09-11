<template>
	<div class="content">
		<div class="terms-div-wrapper" v-if="moreData">
			<div class="terms-div-header">
				<div class="header-title-wrapper">更多拼豆豆</div>
				<div class="header-back-wrapper" v-on:click="goBack">
				<div class="header-back-arrow">
					<img src="/static/img/icon/goback.png">
				</div>
				</div>
			</div>
			<div class="terms-div-contents"></div>
		</div>
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
				<div class="swiper-slide swiper-div">
					<img class="swiper-img-index" src="/static/img/share/pindou.png">
				</div>
			</div>
			<div class="swiper-pagination">

			</div>
		</div>
		<div class="fixed-right-btn">打开App</div>
		<div class="package">
			<div class="package-top justified">
				<div class="package-name">{{packageName}}</div>
				<div class="new-price">{{newPackagePrice}}</div>
			</div>
			<div class="package-bottom justified">
				<div class="package-desc">{{packageDesc}}</div>
				<div class="old-price"><del>{{packagePrice}}</del></div>
			</div>
		</div>
		<div class="pindou-content">
			<div class="pindou-titlt">拼豆豆内容</div>
			<div class="selected-food"></div>
			<div class="pindou-remarks">
				<div class="pindou-remarks-title">备注</div>
				<div class="pindou-remarks-content"></div>
			</div>
		</div>
		<div class="tips">
			<div class="tips-title">温馨提示</div>
			<div class="tips-content"></div>
		</div>
		<div class="shop-info">
			<div class="shop-info-title">{{shopName}}</div>
			<div class="location-info justified">
				<div class="location justified">
					<div class="location-icon">
						<img src="/static/img/share/position.png"/>
					</div>
					<div class="address">
						<span>{{shopAddress}}</span>
						<p>{{shopAddressDetail}}</p>
					</div>
				</div>
				<div class="contact-box" v-on:click="callShop">
					<img src="/static/img/share/contact.png"/>
				</div>
			</div>
		</div>
		<div class="pindouing-title">
			<span class="people-count">{{groupOnNumber}}人</span>
			<span>正在拼豆豆</span>
			<span class="more-pindou" v-on:click="morePindou">查看更多</span>
		</div>
		<div class="pindouing"></div>
		<div class="initiate-failed-box">
			<div class="initiate-failed">
				<div class="initiate-failed-title">您还没资格成为拼主哦！</div>
				<div class="get-qualifications">您可以去购买带有喜豆码商品后获得发起资格，享更多优惠或参与其他拼主已发起的拼豆豆。</div>
				<div class="join-other-btn" v-on:click="joinOther"><span>参与其他拼豆豆</span></div>
			</div>
			<div class="close-join-other" v-on:click="closeSign">
				<img src="/static/img/share/close.png" alt="" />
			</div>
		</div>
		<div class="join-pindou-box">
			<div class="join-pindou">
				<div class="join-pindou-title"></div>
				<div class="join-pindou-desc">
					<span class="grey">仅限</span>
					<span class="orange"></span>
					<span class="grey">名额，</span>
					<span class="orange"></span>
					<span class="grey">后结束</span>
				</div>
				<div class="user-joined"></div>
				<div class="join-pindou-btn"><span>参与拼豆豆</span></div>
			</div>
			<div class="close-join-pindou" v-on:click="closePindou">
				<img src="/static/img/share/close.png" alt="" />
			</div>
		</div>
		<div class="mask1" v-on:click="closeAward"></div>
		<div class="mask2"></div>
		<div class="award">
			<div class="award-title">拼主拼团成功额外奖励</div>
		</div>
		<div class="initiate-box">
			<div class="initiate-left">
				<p><span class="deposit">10元</span><span>订金</span></p>
				<span class="initiate-remark">拼主拼团成功将获得额外奖励</span>
				<img class="pindou-question" src="/static/img/share/question.png" v-on:click="showAward"/>
			</div>
			<div class="initiate-btn" v-on:click="signPindou">
				<span>发起拼豆豆</span>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vueCookie from 'vue-cookie'
import axios from 'axios'
import VueCountdown from '@xkeshi/vue-countdown'
import $ from 'jquery'
import Swiper from 'swiper'

const langData = require('../lang/share.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'pindouDetails',
  groupID: '',
  messages: langData
})

export default {
	name: 'pindouDetails',
	i18n: i18n,
	components: {
		VueCountdown
	},
	data () {
		return {
			packageName: '',
			packagePrice: '',
			packageDesc: '',
			newPackagePrice: '',
			groupSize: '',
			joinNumber: '',
			groupOnNumber: '',
			shopName: '',
			shopAddress: '',
			shopAddressDetail: '',
			shopPhoneNum: '',
			groupID: '',
			moreData: false
		}
	},
	created: function () {
		$('body').css({'background-color': '#F4F4F4', 'font-family': 'PingFangSC-Regular', 'font-size': '16px'})
		var getParams = this.$route.params
		if (getParams.groupID) {
			this.groupID = getParams.groupID
		} else {
			this.groupID = vueCookie.get('group_id')
		}
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/event/groupOn/' + this.groupID,
			headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
		}).then((response) => {
			var responseData = response.data.data
			vueCookie.set('group_id', this.groupID, 1)
			this.$i18n.groupID = vueCookie.get('group_id')
			console.log(responseData)
			this.packageName = responseData.title
			this.packagePrice = '￥' + responseData.price
			this.newPackagePrice = '￥' + responseData.discountedPrice
			this.groupSize = responseData.groupSize
			this.joinNumber = responseData.joinNumber
			this.packageDesc = this.groupSize + '人成团·' + this.joinNumber + '人已拼'
			this.groupOnNumber = responseData.groupOnNumber
			var shop = responseData.shop
			this.shopName = shop.name
			this.shopAddress = shop.addressDetail
			this.shopAddressDetail = shop.nearAddress
			this.shopPhoneNum = shop.phoneNum

			// get the seleted food
			var food = responseData.goods
			var $foodDiv = '<div class="food-details justified"><span><span class="food-name"></span><span class="food-amount"></span></span><span class="price"></span></div>'
			for (let i = 0; i < food.length; i++) {
				var foodName = '·' + food[i].name
				var foodAmount = '（' + food[i].number + '份）'
				var foodPrice = '￥' + food[i].price
				$('.selected-food').append($foodDiv)
				$(".selected-food .food-details:eq("+ i +") .food-name").text(foodName)
				$(".selected-food .food-details:eq("+ i +") .food-amount").text(foodAmount)
				$(".selected-food .food-details:eq("+ i +") .price").text(foodPrice)
			}

			// get the remark
			var $remark = responseData.remark
			$('.pindou-remarks-content').append($remark)

			// get the tips
			var tips = responseData.tips
			var $tipsDiv = '<div class="tips-content-title"></div><div class="tips-content-text"></div>'
			for (let i = 0; i < tips.length; i++) {
				var tipsTitle = tips[i].title
				var tipsValue = tips[i].value
				$('.tips-content').append($tipsDiv)
				$(".tips-content .tips-content-title:eq("+ i +")").text(tipsTitle)
				$(".tips-content .tips-content-text:eq("+ i +")").text(tipsValue)
			}

			// get pindouimg data
			var groupOn = responseData.groupOn
			var that = this
			var $pingBox = '<div class="pindou-box justified"><div class="user-info"><img/><span class="user-name"></span></div><div class="pindou-right justified"><div class="pindou-info"><span>还差</span><span class="lack-people"></span><span>拼成</span><p></p></div><div class="go-pindou" data-groupid=""><span>去拼豆</span></div></div></div>'
			for (let i = 0; i < groupOn.length; i++) {
				var groupOnImg
				if (groupOn[i].iamge == '' || groupOn[i].image == null) {
					groupOnImg = '/static/img/share/no-image.png'
				} else {
					groupOnImg = groupOn[i].image
				}
				var groupOnID = groupOn[i].id
				var groupOnUser = groupOn[i].nickname
				var needNum = groupOn[i].needNum + '人'
				var timeLeft = groupOn[i].timeLeft
				$('.pindouing').append($pingBox)
				$(".pindouing .pindou-box:eq("+ i +") .go-pindou").attr('data-groupid', groupOnID)
				$(".pindouing .pindou-box:eq("+ i +") img").attr('src', groupOnImg)
				$(".pindouing .pindou-box:eq("+ i +") .user-name").text(groupOnUser)
				$(".pindouing .pindou-box:eq("+ i +") .lack-people").text(needNum)
				this.timer(timeLeft, i);
				(function (timeLeft) {
					setInterval(function () {
						timeLeft--
						that.timer(timeLeft, i)
					}, 1000)
				})(timeLeft)
			}

			$('.go-pindou').click(function () {
				that.$options.methods.goToPindou()
				let beforeGroupId = $(this).attr('data-groupid')
				axios({
					method: 'GET',
					// url: 'http://dev-new-api.beanpop.cn/event/beforeGroupOn/' + 133,
					url: 'http://dev-new-api.beanpop.cn/event/beforeGroupOn/' + beforeGroupId,
					withCredentials: true,
					headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
				}).then((response) => {
					let responseData = response.data.data
					console.log(responseData)
					let ownerName = responseData.ownerName
					let needNum = responseData.needNum
					let timeLeft = responseData.timeLeft
					let user = responseData.user
					var groupSize = responseData.groupSize
					console.log(user.length)
					var $ownerBox = '<div class="pindou-partner"><div class="avatar"><img/></div><div class="owner"><img src="/static/img/share/pindou-owner.png"/><div class="owner-text">拼主</div></div></div>'
					var $partnerBox = '<div class="pindou-partner"><div class="avatar"><img/></div></div>'
					$(".join-pindou-box .join-pindou-title").text("参与" + ownerName + "的拼豆豆单")
					$(".join-pindou-box .join-pindou-desc .orange:eq(0)").text(needNum + "个")
					$(".join-pindou-box .join-pindou-desc .orange:eq(1)").text(timeLeft)
					$('.user-joined').append($ownerBox)
					setTimeout(() => {
						for (let i = 0; i < user.length; i++) {
							// 第一个子元素为拼主，已添加，无需重复添加
							if (i >= 1) {
								$('.user-joined').append($partnerBox)
							}
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
					}, 1)
				}).catch((ex) => {
					console.log(ex)
				})
			})

			for (let i = 0; i < 10; i++) {
				// this.$options.methods.timer(i)
			}
			// this.$options.methods.send()
			// get owner arawd
			var $ownerGot = responseData.ownerGot
			$('.award').append($ownerGot)
		}).catch((ex) => {
			console.log(ex)
			// var errorResponseData = ex.response.data
			// console.log(errorResponseData)
		})
	},
	mounted () {
		let sp = new Swiper('#top-swiper', {
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

		Vue.use({
			sp
		})
	},
	methods: {
		goToPindou: function () {
			var cliheight = $(window).height()
			$('.mask1, .mask2').height(cliheight + 100)
			$(".join-pindou-box, .mask2").show()
			$(".initiate-box").hide()
		},
		closePindou: function () {
			$(".join-pindou-box, .mask2").hide()
			$(".initiate-box").show()
			$(".user-joined").empty()
		},
		signPindou: function () {
			var cliheight = $(window).height()
			$('.mask1, .mask2').height(cliheight + 100)
			$(".initiate-failed-box, .mask2").show()
			$(".initiate-box").hide()
		},
		closeSign: function () {
			$(".initiate-failed-box, .mask2").hide()
			$(".initiate-box").show()
		},
		joinOther: function () {
			$(".initiate-failed-box, .mask2").hide()
			$(".initiate-box").show()
			$("html,body").animate({
				scrollTop: $(".pindouing").offset().top
			}, 500)
		},
		showAward: function () {
			var cliheight = $(window).height()
			$('.mask1, .mask2').height(cliheight + 100)
			$(".award, .mask1").show()
		},
		closeAward: function () {
			$(".award, .mask1").hide()
		},
		callShop: function () {
			var tel = 'tel:' + this.shopPhoneNum
			window.location.href = tel
		},
		goBack: function () {
			this.moreData = false
		},
		timer: function (event, item) {
			var seconds = parseInt(event % 60) < 10 ? '0' + parseInt(event % 60) : parseInt(event % 60)
			var minutes = parseInt((event / 60) % 60) < 10 ? '0' + parseInt((event / 60) % 60) : parseInt((event / 60) % 60)
			var hours = parseInt((event / 3600) % 24) < 10 ? '0' + parseInt((event / 3600) % 24) : parseInt((event / 3600) % 24)
			var days = Math.floor(event / (3600 * 24)) >= 1 ? Math.floor(event / (3600 * 24)) : ''
			var leftDate = days + ':' + hours + ':' + minutes + ':' + seconds
			$(".pindouing .pindou-box:eq("+ item +") .pindou-info p").text(leftDate)
		},
		moreDataTimer: function (event, item) {
			var seconds = parseInt(event % 60) < 10 ? '0' + parseInt(event % 60) : parseInt(event % 60)
			var minutes = parseInt((event / 60) % 60) < 10 ? '0' + parseInt((event / 60) % 60) : parseInt((event / 60) % 60)
			var hours = parseInt((event / 3600) % 24) < 10 ? '0' + parseInt((event / 3600) % 24) : parseInt((event / 3600) % 24)
			var days = Math.floor(event / (3600 * 24)) >= 1 ? Math.floor(event / (3600 * 24)) : ''
			var leftDate = "剩余" + days + ':' + hours + ':' + minutes + ':' + seconds
			$(".terms-div-contents .pindou-box:eq("+ item +") .pindou-info p").text(leftDate)
		},
		morePindou: function () {
			this.moreData = true
			axios({
				method: 'GET',
				url: 'http://dev-new-api.beanpop.cn/event/groupOnList/' + this.groupID,
				withCredentials: true,
				headers: {'lang': 'zh', 'token': '', 'os': 'web', 'version': '1.0.0', 'time': ''}
			}).then((response) => {
				let responseData = response.data.data
				var $pingBox = '<div class="pindou-box justified"><div class="user-info"><span class="user-name"></span><img/></div><div class="pindou-right justified"><div class="pindou-info"><span>还差</span><span class="lack-people"></span><span>拼成</span><p></p></div><div class="go-pindou" data-groupid=""><span>去拼豆</span></div></div></div>'
				for (let i = 0; i < responseData.length; i++) {
					var groupOnImg
					if (responseData[i].iamge == '' || responseData[i].image == null) {
						groupOnImg = '/static/img/share/no-image.png'
					} else {
						groupOnImg = responseData[i].image
					}
					var groupOnID = responseData[i].id
					var groupOnUser = responseData[i].nickname
					var needNum = responseData[i].needNum + '人'
					var timeLeft = responseData[i].timeLeft
					var that = this
					$('.terms-div-contents').append($pingBox)
					$(".terms-div-contents .pindou-box:eq("+ i +") .go-pindou").attr('data-groupid', groupOnID)
					$(".terms-div-contents .pindou-box:eq("+ i +") img").attr('src', groupOnImg)
					$(".terms-div-contents .pindou-box:eq("+ i +") .user-name").text(groupOnUser)
					$(".terms-div-contents .pindou-box:eq("+ i +") .lack-people").text(needNum)
					this.$options.methods.moreDataTimer(timeLeft, i);
					(function (timeLeft) {
						setInterval(function () {
							timeLeft--
							that.$options.methods.moreDataTimer(timeLeft, i)
						}, 1000)
					})(timeLeft)
				}
				console.log(responseData)
			}).catch((ex) => {
				console.log(ex)
			})
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
.package-top{
	font-family: "PingFangSC-Semibold";
	font-size: 20px;
	margin-bottom: 4px;
	line-height: 28px;
}
.package-bottom{
	line-height: 17px;
	font-size: 12px;
}
.new-price{
	color: #EE6807;
}
.old-price{
	color: #999999;
	font-size: 14px;
}

.remarks-desc:last-child{
	margin-bottom: 0px;
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
.pindouing-title{
	padding: 15px;
	background: #FFFFFF;
	font-family: "PingFangSC-Semibold";
	font-size: 16px;
	line-height: 22px;
	border-bottom: 1px solid #E6E7E8;
}
.more-pindou{
	float: right;
	font-size: 12px;
	color: #999999;
	font-weight: 400;
}
.people-count{
	color: #EE6807;
	margin-right: -3px;
}
.pindouing{
	padding-bottom: 0px;
	margin-bottom: 80px;
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
.initiate-failed-box, .join-pindou-box{
	font-family: "PingFangSC-Regular";
	color: #333333;
	width: 80%;
	position: fixed;
	left: 10%;
	top: 30%;
	z-index: 100;
	display: none;
}
.initiate-failed, .join-pindou{
	padding: 30px 20px;
	background: #FFFFFF;
	border-radius:4px;
	margin-bottom: 25px;
}
.initiate-failed-title, .join-pindou-title{
	font-size: 18px;
	text-align: center;
	line-height: 25px;
}
.get-qualifications, .join-pindou-desc{
	font-size: 14px;
	padding: 20px 5px;
	line-height: 20px;
}
.join-other-btn, .join-pindou-btn{
	width: 100%;
	text-align: center;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:22px;
	padding: 10px 0px;
}
.join-other-btn span, .join-pindou-btn span{
	line-height: 25px;
}
.close-join-other, .close-join-pindou{
	text-align: center;
}
.close-join-other img, .close-join-pindou img{
	width: 36px;
}

.join-pindou-desc{
	text-align: center;
}
.user-joined{
	padding-bottom: 20px;
	text-align: center;
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
.award{
	display: none;
	padding: 20px 15px;
	background: #FFFFFF;
	position: fixed;
	left: 0px;
	right: 0px;
	bottom: 63px;
	border-radius:10px 10px 0px 0px;
	color: #333333;
	z-index: 100;
}
.award-title{
	text-align: center;
	font-size: 16px;
	font-family: "PingFangSC-Semibold";
	line-height: 22px;
	margin-bottom: 4px;
}
.award p, award li{
	font-size: 14px;
	line-height: 20px;
	margin-top: 8px;
}
.aqiyi{
	color: #EE6807;
}
.initiate-box{
	position: fixed;
	left: 0px;
	bottom: 0px;
	z-index: 100;
	width: 100%;
	display: flex;
}
.initiate-left{
	flex: 2;
	background: #FFFFFF;
	padding: 10px 15px;
	box-shadow:0px 1px 0px 0px rgba(221,221,221,0.5);
}
.initiate-left p{
	font-family: "PingFangSC-Semibold";
	font-size: 18px;
	color: #999999;
	line-height: 25px;
}
.deposit{
	color: #EE6807;
}
.initiate-remark{
	font-size: 12px;
	color: #666666;
	line-height: 17px;
}
.initiate-left img{
	width: 12px;
}
.initiate-btn{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
}

.terms-div-wrapper {
  position: fixed;
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
  padding: 0px 15px;
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
.header-title-wrapper {
  display:table-cell;
  vertical-align:middle;
}
</style>
