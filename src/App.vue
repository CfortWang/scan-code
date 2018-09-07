<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
  },
	ipAddress: ' '
}
</script>

<style>

/* @font-face {
  font-family:'NanumBarunGothic';
  src:url('/static/fonts/NanumBarunGothic.eot') format('embedded-opentype'), url('/static/fonts/NanumBarunGothic.woff') format('woff'), url('/static/fonts/NanumBarunGothic.ttf') format('ttf');
  font-weight:normal;
  font-style:normal;
} */

input:focus {
  outline: none;
}

button:focus {
  outline: none;
}

select:focus {
  outline: none;
}

body {
  margin:0;
  background-color: #FFFFFF;
  color:#333333;
}

.clear-fix:after {
  content: "";
  display: block;
  clear: both;
}
.justified{
  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-pack:justify;
  -webkit-justify-content:space-between;
  -ms-flex-pack:justify;
  justify-content:space-between;
}
.join-pindou-desc{
	text-align: center;
}
.grey{
	color: #999999;
}
.orange{
	color: #EE6807;
}
.fixed-right-btn{
	position: fixed;
	right: 0%;
	top: 50px;
	z-index: 10;
	background:rgba(255,226,0,1);
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:19px 0px 0px 19px;
	padding: 8px 12px 8px 16px;
}
.swiper-div img{
	width: 100%;
}
.swiper-pagination-bullet{
	width: 8px;
	height: 8px;
	background: RGBA(0, 0, 0, 1);
	border-radius: 50%;
}
.swiper-pagination-bullet-active {
    opacity: 1;
    width: 16px;
    background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
    border-radius:8px;
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    width: 100%;
}
.mask1, .mask2{
	display: none;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.6);
	filter: alpha(opacity=80);
	width: 100%;
	z-index: 30;
}

.package, .pindou-content, .tips, .shop-info, .pindouing{
	padding: 15px;
	background: #FFFFFF;
	margin-bottom: 10px;
	color: #333333;
}
.pindou-titlt, .pindou-remarks-title, .tips-title, .shop-info-title{
	font-family: "PingFangSC-Semibold";
	font-size: 16px;
	line-height: 22px;
	margin-bottom: 12px;
}
#app {
  font-family: 'PingFangSC', 'NanumBarunGothic', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background-color:#FFE300;
  display:table;
  text-align:center;
  width:100%;
  height:60px;
  color:#000000;
}

.float-wrapper:after {
  content:'';
  display:block;
  clear:both;
}
.float-l {
  float:left;
}

.float-r {
  float:right;
}

.text-yellow {
  color:#FFCB00;
}

.fs-05 {
  font-size:0.5em;
}

.fs-08 {
  font-size:0.8em;
}

.fs-09 {
  font-size:0.9em;
}

.fs-11 {
  font-size:1.1em;
}

.fs-12 {
  font-size:1.2em;
}

.fs-13 {
  font-size:1.3em;
}

.fs-14 {
  font-size:1.4em;
}

.m-r-10 {
  margin-right:10px;
}

.ball-wrapper {
  background-size:100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.ball-wrapper.responsive-size {
  height:9vw;
  width:9vw;
  margin: 1.1vw 2.5vw;
  cursor:pointer;
  background-color:#FFFFFF;
  border:0px;
  padding:0px;
  font-size:4vw;
}

.ball-wrapper.yellow {
  background-color:#FF5F57;
  border:1px solid #FF5F57;
  border-radius:200px;
  color:#FFFFFF;
  font-weight:bold;
}

.ball-wrapper.yellow.ballOff {
  background-color:#FFFFFF;
  color:#FF5F57;
}

.ball-wrapper.green {
  background-color:#57A0FF;
  border:1px solid #57A0FF;
  border-radius:200px;
  color:#FFFFFF;
  font-weight:bold;
}

.ball-wrapper.green.ballOff {
  background-color:#FFFFFF;
  color:#57A0FF;
}

.dsp-table {
  display:table;
}

.dsp-table-cell {
  display:table-cell;
  vertical-align:middle;
}

.btn {
  border-radius: 5px;
  padding:10px;
  text-align:center;
}

.btn-yellow {
  background-color:#FFCB00;
  border:1px solid #FFCB00;
  color:#FFFFFF;
}

.btn-green {
  background-color:#6985C6;
  border:1px solid #6985C6;
  color:#FFFFFF;
}

.btn-white {
  background-color:#FFFFFF;
  border:1px solid #FFCB00;
  color:#FFCB00;
}

.bottom-slide-wrapper .swiper-pagination-bullet {
  background: #FFFFFF;
}

.event-round-wrapper{
  width: 100%;
  background:rgba(248,248,248,1);
  padding:12px 0px;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.moreData{
  display: none;
  box-shadow:0px 5px 19px 1px rgba(51,85,164,0.18);
  position: absolute
}

.moreData .event-round-wrapper:nth-child(odd){
  background: #fff;
}

.event-round-left-wrapper {
  width: 60%;
  text-align: left;
  display: flex;
  flex: 2;
  margin-left: 15px;
}

.event-round {
  width: 20%;
  line-height: 14px;
  color: #666;
}

.event-intro-ball-wrapper{
  line-height: 14px;
}

.event-intro-ball-wrapper .ball-size {
  margin-left:10px;
  overflow:hidden;
  color:rgba(255,95,87,1);
}
.event-intro-ball-wrapper .ball-size:first-child{
  margin-left: 0px;
}
.event-intro-ball-wrapper .ball-size:last-child{
  color:rgba(87,160,255,1);
}
.event-intro-ball-wrapper .ball-size:before {
  content:'';
  padding-top:100%;
  float:left;
}
.lastTenRound{
  line-height: 14px;
  color: #666;
}
.ball-size-item {
  width:100%;
  font-size: 14px;
}

@media (max-width: 376px){
  .event-intro-ball-wrapper .ball-size{
    margin-left: 8px;
  }
}
@media (max-width: 350px){
  .event-intro-ball-wrapper .ball-size{
    margin-left: 6px;
  }
}
@media (max-width: 330px){
  .event-intro-ball-wrapper .ball-size{
    margin-left: 4px;
  }
}
@media (max-width: 302px){
  .event-intro-ball-wrapper .ball-size{
    margin-left: 2px;
  }
}

/* share */
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
	height: 100%;
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
  height: 100%;
	border-radius: 2px;
}
.shop-coupon-detail{
	flex: 1;
	padding-left: 15px;
	align-items: center;
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
.pindou-remarks-content{
  font-size: 14px;
	line-height: 20px;
}
.pindou-remarks-content p, .pindou-remarks-content div, .pindou-remarks-content li{
  margin: 0px;
  padding: 0px;
  list-style: none;
  font-size: 14px;
	margin-bottom: 8px;
	line-height: 20px;
}
.pindou-remarks-content p:last-child, .pindou-remarks-content div:last-child, .pindou-remarks-content li:last-child{
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
.pindouing{
  padding-top: 0px;
}
.pindou-box{
	padding: 15px 0px;
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
  margin: 0px;
	font-size: 10px;
	color: #999999;
}

/* quiz */
.quizing, .quized{
	font-family: "PingFangSC-Regular";
}
.quizing-content, .quized-content{
	width: 90%;
	margin: 0 auto;
	margin-top: 15px;
	margin-bottom: 15px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	box-shadow:0px 3px 7px 0px rgba(51,85,164,0.14);
}
.quizing-top img, .quized-top img{
	width: 100%;
  border-radius: 4px;
}
.quizing-bottom, .quized-bottom{
	padding: 15px;
}
.question{
	font-size: 16px;
	color: #333333;
	line-height: 24px;
	padding: 4px 5px 10px;
}
.answer-btn{
	background: #FFFFFF;
	border-radius:5px;
	color: #57A0FF;
	font-size: 16px;
	border: 1px solid #57A0FF;
	padding: 13px 15px;
	margin-top: 5px;
}
.option{
	float: left;
	line-height: 16px;
}
.reward{
	float: right;
	line-height: 16px;
}
.countdown{
	margin-top: 5px;
	display: flex;
	align-items: center;
}
.countdown-line{
	float: left;
	flex: 1;
	border: none;
	height: 1px;
	color: #DDDDDD;
	background: #DDDDDD;
}
.countdown-time img{
	width: 14px;
	margin:0 4px 0 5px;
}
.countdown-text{
	flex: 4;
	margin-right: 5px;
	color: #333333;
}
.my-answer-box{
	font-size: 14px;
	border-bottom: 1px solid #DDDDDD;
	padding-bottom: 8px;
	margin-bottom: 8px;
}
.my-answer-box:last-child{
	border:none;
	padding-bottom: 0px;
	margin-bottom: 0px;
}
.answer-date{
	font-size: 12px;
	color: #999999;
}
.my-answer{
	color: #666666;
}
.dividing-line{
	width: 100%;
	border-bottom: 1px solid #DDDDDD;
	margin: 8px 0px;
}
.quized{
	display: none;
}
.quized .question{
	color: #999999;
}
.quized .answer-btn{
	border: none;
	background: #F4F4F4;
	color: #999999;
}
.quized .my-answer{
	color: #333333;
	align-items: center;
}
.quized .my-answer span{
	vertical-align: bottom;
}
.quized .answer-right{
	color: #333333;
	background: #FFE200;
}
.loser{
	padding: 4px 10px;
	background: #EEEEEE;
	border-radius: 4px;
}
.winner{
	background: #EE6807;
	color: #FFFFFF;
	padding: 4px 8px;
	border-radius: 4px;
}
.winner p{
	text-align: center;
}

.must-know-contain div{
	font-size: 14px;
	line-height: 20px;
	margin-bottom: 8px;
}
.must-know-title{
	font-family: "PingFangSC-Semibold";
}
</style>
