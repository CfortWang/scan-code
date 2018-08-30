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
				<div class="swiper-slide swiper-div">
					<img class="swiper-img-index" src="/static/img/share/pindou.png">
				</div>
			</div>
			<div class="swiper-pagination"></div>
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
			<div class="selected-food">
				<div class="food-details justified">
					<span>
						<span class="food-name">·黄焖鸡米饭套餐（含饭）</span>
						<span class="food-amount">（1份）</span>
					</span>
					<span class="price">￥55</span>
				</div>
				<div class="food-details justified">
					<span>
						<span class="food-name">·青岛啤酒500ml</span>
						<span class="food-amount">（1份）</span>
					</span>
					<span class="price">￥66</span>
				</div>
				<div class="food-details justified">
					<span>
						<span class="food-name">·喜茶超大杯</span>
						<span class="food-amount">（1份）</span>
					</span>
					<span class="price">￥77</span>
				</div>
				<div class="food-details justified">
					<span>
						<span class="food-name">·清爽可口柠檬水</span>
						<span class="food-amount">（1份）</span>
					</span>
					<span class="price">￥99</span>
				</div>
			</div>
			<div class="pindou-remarks">
				<div class="pindou-remarks-title">备注</div>
				<div class="pindou-remarks-content">
					<div class="remarks-desc">·饮料无限续杯</div>
					<div class="remarks-desc">·米饭任意续碗</div>
					<div class="remarks-desc">·免费停车位</div>
				</div>
			</div>
		</div>
		<div class="tips">
			<div class="tips-title">温馨提示</div>
			<div class="tips-content">
				<div class="effective">有效期</div>
				<div class="effective-time">2018.08.18至2018.12.31（周末、法定节假日通用）</div>
				<div class="use">使用时间：</div>
				<div class="usage-time">11：00-22：30</div>
				<div class="restriction">使用限制：</div>
				<div class="use-restriction">周末以及节假日不可用</div>
				<div class="rule">使用规则：</div>
				<div class="use-rule">不可与店内其他优惠同时使用</div>
			</div>
		</div>
		<div class="shop-info">
			<div class="shop-info-title">袁老四的火锅店·蛇口店</div>
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
		<div class="pindouing-title">
			<span class="people-count">{{groupOnNumber}}人</span>
			<span>正在拼豆豆</span>
		</div>
		<div class="pindouing">
			<div class="pindou-box justified">
				<div class="user-info">
					<img src="/static/img/share/avatar.jpg"/>
					<span class="user-name">猪猪侠豆塞雷</span>
				</div>
				<div class="pindou-right justified">
					<div class="pindou-info">
						<span>还差</span><span class="lack-people">3人</span><span>拼成</span>
						<p>剩余22:33:44.5</p>
					</div>
					<div class="go-pindou" v-on:click="goToPindou"><span>去拼豆</span></div>
				</div>
			</div>
			<div class="pindou-box justified">
				<div class="user-info">
					<img src="/static/img/share/avatar.jpg"/>
					<span class="user-name">猪猪侠豆塞雷</span>
				</div>
				<div class="pindou-right justified">
					<div class="pindou-info">
						<span>还差</span><span class="lack-people">3人</span><span>拼成</span>
						<p>剩余22:33:44.5</p>
					</div>
					<div class="go-pindou" v-on:click="goToPindou"><span>去拼豆</span></div>
				</div>
			</div>
		</div>
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
				<div class="join-pindou-title">参与猪猪侠豆塞雷的拼豆豆单</div>
				<div class="join-pindou-desc">
					<span>仅限</span>
					<span>3个</span>
					<span>名额，</span>
					<span>22:33:44.0</span>
					<span>后结束</span>
				</div>
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
				<div class="join-pindou-btn"><span>参与拼豆豆</span></div>
			</div>
			<div class="close-join-pindou" v-on:click="closePindou">
				<img src="/static/img/share/close.png" alt="" />
			</div>
		</div>
		<div class="mask1"></div>
		<div class="mask2"></div>
		<div class="awrad">
			<div class="awrad-title">拼主拼团成功额外奖励</div>
			<p>·拼主拼团成功后，除了商品优惠外，将获得额外的<span class="aqiyi">15元爱奇艺月卡</span></p>
			<p>·额外奖励请在我的 - 中奖纪录中查看</p>
		</div>
		<div class="initiate-box">
			<div class="initiate-left">
				<p><span class="deposit">10元</span><span>订金</span></p>
				<span class="initiate-remark">拼主拼团成功将获得额外奖励</span>
				<img class="pindou-question" src="/static/img/share/question.png"/>
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
import $ from 'jquery'
import Swiper from 'swiper'
export default {
	name: 'pindouDetails',
	// i18n: i18n,
	components: {
	},
	data () {
		return {
			packageName: '',
			packagePrice: '',
			packageDesc: '',
			newPackagePrice: '',
			groupSize: '',
			joinNumber: '',
			groupOnNumber: ''
		}
	},
	created: function () {
		$('body').css({'background-color': '#F4F4F4', 'font-family': 'PingFangSC-Regular', 'font-size': '16px'})
		axios({
			method: 'GET',
			url: 'http://dev-new-api.beanpop.cn/event/groupOn/1'
		}).then((response) => {
			var responseData = response.data.data
			console.log(responseData)

			this.packageName = responseData.title
			this.packagePrice = '￥' + responseData.price
			this.newPackagePrice = '￥' + responseData.discountedPrice
			this.groupSize = responseData.groupSize
			this.joinNumber = responseData.joinNumber
			this.packageDesc = this.groupSize + '人成团·' + this.joinNumber + '人已拼'
			this.groupOnNumber = responseData.groupOnNumber
		}).catch((ex) => {
			console.log(ex)
			// var errorResponseData = ex.response.data
			// console.log(errorResponseData)
		})
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
		goToPindou: function () {
			var cliheight = $(window).height()
			$('.mask1, .mask2').height(cliheight + 100)
			$(".join-pindou-box, .mask2").show()
			$(".initiate-box").hide()
		},
		closePindou: function () {
			$(".join-pindou-box, .mask2").hide()
			$(".initiate-box").show()
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
.food-details, .remarks-desc{
	font-size: 14px;
	margin-bottom: 8px;
	line-height: 20px;
}
.food-amount{
	color: #999999;
}
.food-details:last-child{
	margin-bottom: 12px;
}
.remarks-desc:last-child{
	margin-bottom: 0px;
}
.tips-content div{
	font-size: 14px;
	line-height: 20px;
	margin-bottom: 8px;
}
.tips-content div:nth-child(odd){
	font-family: "PingFangSC-Semibold";
}
.tips div:last-child{
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
.people-count{
	color: #EE6807;
	margin-right: -3px;
}
.pindouing{
	padding-bottom: 0px;
	margin-bottom: 80px;
}
.pindou-box{
	padding-bottom: 15px;
	border-bottom: 1px solid #E6E7E8;
	color: #333333;
}
.user-info{
	display: flex;
	align-items: center;
}
.user-info img{
	width: 40px;
	border-radius: 50%;
}
.user-name{
	font-size: 12px;
}
.pindou-right{
	align-items: center;
}
.pindou-info{
	text-align: center;
	margin-right: 10px;
}
.pindou-info span{
	font-size: 12px;
}
.pindou-info .lack-people{
	color: #EE6807;
}
.pindou-info p{
	font-size: 10px;
	color: #999999;
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
.join-pindou-desc span:nth-child(even){
	color: #EE6807;
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
.awrad{
	display: none;
	padding: 20px 15px;
	background: #FFFFFF;
	position: fixed;
	left: 0px;
	bottom: 67px;
	border-radius:10px 10px 0px 0px;
	color: #333333;
	z-index: 100;
}
.awrad-title{
	text-align: center;
	font-size: 16px;
	font-family: "PingFangSC-Semibold";
	line-height: 22px;
	margin-bottom: 4px;
}
.awrad p{
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
</style>
