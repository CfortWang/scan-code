<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
  }
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
  margin:2.5vw;
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
</style>
