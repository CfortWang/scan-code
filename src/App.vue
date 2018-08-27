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
.join-pindou-desc span:nth-child(even){
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
  background-color:#FFCB00;
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
  background-color:#EE6807;
  border:1px solid #EE6807;
  border-radius:200px;
  color:#FFFFFF;
  font-weight:bold;
}

.ball-wrapper.yellow.ballOff {
  background-color:#FFFFFF;
  color:#EE6807;
}

.ball-wrapper.green {
  background-color:#6985C6;
  border:1px solid #6985C6;
  border-radius:200px;
  color:#FFFFFF;
  font-weight:bold;
}

.ball-wrapper.green.ballOff {
  background-color:#FFFFFF;
  color:#6985C6;
}

.ball-wrapper.yellow-1 {
  background-image: url('/static/img/ball/yellow_01.png');
}

.ball-wrapper.yellow-2 {
  background-image: url('/static/img/ball/yellow_02.png');
}

.ball-wrapper.yellow-3 {
  background-image: url('/static/img/ball/yellow_03.png');
}

.ball-wrapper.yellow-4 {
  background-image: url('/static/img/ball/yellow_04.png');
}

.ball-wrapper.yellow-5 {
  background-image: url('/static/img/ball/yellow_05.png');
}

.ball-wrapper.yellow-6 {
  background-image: url('/static/img/ball/yellow_06.png');
}

.ball-wrapper.yellow-7 {
  background-image: url('/static/img/ball/yellow_07.png');
}

.ball-wrapper.yellow-8 {
  background-image: url('/static/img/ball/yellow_08.png');
}

.ball-wrapper.yellow-9 {
  background-image: url('/static/img/ball/yellow_09.png');
}

.ball-wrapper.yellow-10 {
  background-image: url('/static/img/ball/yellow_10.png');
}

.ball-wrapper.yellow-11 {
  background-image: url('/static/img/ball/yellow_11.png');
}

.ball-wrapper.yellow-12 {
  background-image: url('/static/img/ball/yellow_12.png');
}

.ball-wrapper.yellow-13 {
  background-image: url('/static/img/ball/yellow_13.png');
}

.ball-wrapper.yellow-14 {
  background-image: url('/static/img/ball/yellow_14.png');
}

.ball-wrapper.yellow-15 {
  background-image: url('/static/img/ball/yellow_15.png');
}

.ball-wrapper.yellow-16 {
  background-image: url('/static/img/ball/yellow_16.png');
}

.ball-wrapper.yellow-17 {
  background-image: url('/static/img/ball/yellow_17.png');
}

.ball-wrapper.yellow-18 {
  background-image: url('/static/img/ball/yellow_18.png');
}

.ball-wrapper.yellow-19 {
  background-image: url('/static/img/ball/yellow_19.png');
}

.ball-wrapper.yellow-20 {
  background-image: url('/static/img/ball/yellow_20.png');
}

.ball-wrapper.yellow-21 {
  background-image: url('/static/img/ball/yellow_21.png');
}

.ball-wrapper.yellow-22 {
  background-image: url('/static/img/ball/yellow_22.png');
}

.ball-wrapper.yellow-23 {
  background-image: url('/static/img/ball/yellow_23.png');
}

.ball-wrapper.yellow-24 {
  background-image: url('/static/img/ball/yellow_24.png');
}

.ball-wrapper.yellow-25 {
  background-image: url('/static/img/ball/yellow_25.png');
}

.ball-wrapper.yellow-26 {
  background-image: url('/static/img/ball/yellow_26.png');
}

.ball-wrapper.yellow-27 {
  background-image: url('/static/img/ball/yellow_27.png');
}

.ball-wrapper.yellow-28 {
  background-image: url('/static/img/ball/yellow_28.png');
}

.ball-wrapper.yellow-29 {
  background-image: url('/static/img/ball/yellow_29.png');
}

.ball-wrapper.yellow-30 {
  background-image: url('/static/img/ball/yellow_30.png');
}

.ball-wrapper.yellow-31 {
  background-image: url('/static/img/ball/yellow_31.png');
}

.ball-wrapper.yellow-32 {
  background-image: url('/static/img/ball/yellow_32.png');
}

.ball-wrapper.yellow-33 {
  background-image: url('/static/img/ball/yellow_33.png');
}

.ball-wrapper.green-1 {
  background-image: url('/static/img/ball/green_01.png');
}

.ball-wrapper.green-2 {
  background-image: url('/static/img/ball/green_02.png');
}

.ball-wrapper.green-3 {
  background-image: url('/static/img/ball/green_03.png');
}

.ball-wrapper.green-4 {
  background-image: url('/static/img/ball/green_04.png');
}

.ball-wrapper.green-5 {
  background-image: url('/static/img/ball/green_05.png');
}

.ball-wrapper.green-6 {
  background-image: url('/static/img/ball/green_06.png');
}

.ball-wrapper.green-7 {
  background-image: url('/static/img/ball/green_07.png');
}

.ball-wrapper.green-8 {
  background-image: url('/static/img/ball/green_08.png');
}

.ball-wrapper.green-9 {
  background-image: url('/static/img/ball/green_09.png');
}

.ball-wrapper.green-10 {
  background-image: url('/static/img/ball/green_10.png');
}

.ball-wrapper.green-11 {
  background-image: url('/static/img/ball/green_11.png');
}

.ball-wrapper.green-12 {
  background-image: url('/static/img/ball/green_12.png');
}

.ball-wrapper.green-13 {
  background-image: url('/static/img/ball/green_13.png');
}

.ball-wrapper.green-14 {
  background-image: url('/static/img/ball/green_14.png');
}

.ball-wrapper.green-15 {
  background-image: url('/static/img/ball/green_15.png');
}

.ball-wrapper.green-16 {
  background-image: url('/static/img/ball/green_16.png');
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
  padding:12px 15px;
  font-size: 14px;
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
}

.event-round {
  width: 30%;
  line-height: 14px;
  color: #666;
}

.event-round-right-wrapper {
  padding-left: 20px;
  width: 100%;
}

.event-intro-ball-wrapper{
  line-height: 14px;
}

.event-intro-ball-wrapper .ball-size {
  margin-left:10px;
  overflow:hidden;
  /* color:rgba(255,95,87,1); */
}
.event-intro-ball-wrapper .ball-size:first-child{
  margin-left: 0px;
}
.event-intro-ball-wrapper .ball-size:last-child{
  /* color:rgba(87,160,255,1); */
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
@media (max-width: 366px){
  .event-intro-ball-wrapper .ball-size{
    margin-left: 8px;
  }
}
@media (max-width: 338px){
  .event-intro-ball-wrapper .ball-size{
    margin-left: 6px;
  }
}
</style>
