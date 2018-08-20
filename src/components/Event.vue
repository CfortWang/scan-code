<template>
  <div class="ticket-event">
    <transition>
      <div class="modal-wrapper">
        <img class="logo" src="/static/img/complete/rule-logo.png" alt="">
        <div v-if="openModal">
          <div class="modal-img">
            <!-- <img v-bind:src="rulePicUrl"> -->
            <div class="rule-title">{{ $t("rule.title") }}</div>
            <div class="rule-rules">{{ $t("rule.rules") }}</div>
            <div class="rule-prize">{{ $t("rule.firstPrize") }}</div>
            <div class="rule-prize">{{ $t("rule.secondPrize") }}</div>
            <div class="rule-prize">{{ $t("rule.thirdPrize") }}</div>
            <div class="rule-prize">{{ $t("rule.fourthPrize") }}</div>
            <div class="rule-prize">{{ $t("rule.fifthPrize") }}</div>
            <div class="rule-prize">{{ $t("rule.sixthPrize") }}</div>
            <div class="rule-example">{{ $t("rule.example") }}</div>
          </div>
          <div class="modal-close" v-on:click="hide">
              <img src="/static/img/complete/delete_new.png">
          </div>
        </div>
      </div>
    </transition>

    <div class="ready-box">
      <div class="ready-img">
          <img v-bind:src="readyImgUrl" v-on:click="goEvent">
      </div>
    </div>
    <!-- <div class="ready-box">
        <img src="static/img/event/ready-top.png" class="ready-top">
      <div class="ready-middle">
        <img v-bind:src="readyImgUrl">
        <button class="ready-btn" v-on:click="goEvent">{{ $t("ready.btn-right") }}</button>
      </div>
    </div> -->
    <!-- <div class="ready-box">
        <img class="ready-logo" src="/static/img/complete/rule-logo.png">
        <div class="ready-border">
          <div class="ready">
            <div class="ready-title">{{ $t("ready.title") }}</div>
            <div class="ready-body">
              <img v-bind:src="readyImgUrl">
            </div>
          <div class="ready-button">
            <button class="btn-right" v-on:click="goEvent">{{ $t("ready.btn-right") }}</button>
          </div>
        </div>
      </div>
    </div> -->
    <header>
      <div class="header-title-wrapper fs-14">
        {{ $t("title") }}
      </div>
      <div class="header-language-wrapper">
        <img src="/static/img/icon/language_icon_black.png">
        <div class="header-language-text float-wrapper">
          <select v-on:change="changeItem($event)" class="float-l">
            <option v-for="item in items" v-bind:key="item.index" v-bind:value="item.value" :selected="currentLanguage === item.value">{{item.title}}</option>
          </select>
          <div class="language-arrow-wrapper fs-05 float-l dsp-table">
            <div class="dsp-table-cell">▼</div>
          </div>
        </div>
      </div>
    </header>
    <div class="mask blockScroll"></div>
    <div class="contents-wrapper">
      <div class="event-intro-wrapper">
        <div class="event-intro-top-wrapper float-wrapper">
          <div class="event-intro-top-title float-l dsp-table">
            <div class="dsp-table-cell fs-auto1">{{ $t("selectedNum") }}</div>
          </div>
          <div class="event-intro-top-ball float-r dsp-table">
            <div class="event-intro-ball-wrapper float-wrapper dsp-table-cell">
              <div class="ball-wrapper ball-size float-l yellow" v-if="selected1">
                <div class="ball-size-item">{{selected1}}</div>
              </div>
              <div class="ball-wrapper ball-size float-l gray" v-else>
              </div>
              <div class="ball-wrapper ball-size float-l yellow" v-if="selected2">
                <div class="ball-size-item">{{selected2}}</div>
              </div>
              <div class="ball-wrapper ball-size float-l gray" v-else>
              </div>
              <div class="ball-wrapper ball-size float-l yellow" v-if="selected3">
                <div class="ball-size-item">{{selected3}}</div>
              </div>
              <div class="ball-wrapper ball-size float-l gray" v-else>
              </div>
              <div class="ball-wrapper ball-size float-l yellow" v-if="selected4">
                <div class="ball-size-item">{{selected4}}</div>
              </div>
              <div class="ball-wrapper ball-size float-l gray" v-else>
              </div>
              <div class="ball-wrapper ball-size float-l yellow" v-if="selected5">
                <div class="ball-size-item">{{selected5}}</div>
              </div>
              <div class="ball-wrapper ball-size float-l gray" v-else>
              </div>
              <div class="ball-wrapper ball-size float-l yellow" v-if="selected6">
                <div class="ball-size-item">{{selected6}}</div>
              </div>
              <div class="ball-wrapper ball-size float-l gray" v-else>
              </div>
              <div class="ball-wrapper ball-size float-l green" v-if="selected7">
                <div class="ball-size-item">{{selected7}}</div>
              </div>
              <div class="ball-wrapper ball-size float-l gray" v-else>
              </div>
            </div>
          </div>
        </div>
        <div class="event-intro-desc-wrapper float-wrapper">
          <div class="float-l fs-auto">
          {{ $t("guidMsg1") }}<span class="event-text-red">6{{ $t("guidMsg2") }}</span>{{ $t("guidMsg4") }}<span class="event-text-blue">1{{ $t("guidMsg3") }}</span>
          </div>
          <div class="desc-text float-r fs-09 dsp-table" v-on:click="openModal">
            <!-- <img src="/static/img/event/question.jpg"> -->
            <!-- {{ $t("desc") }} -->
          </div>
          <div class="ques" v-on:click="openModal"><img src="/static/img/event/nav_question.png"></div>
        </div>
      </div>
      <div class="event-balls-wrapper float-wrapper">
        <button class="ball-wrapper responsive-size float-l yellow" v-for="item in yellowItems" v-bind:key="item.ballKey" v-bind:class="{ballOff: !item.active}" v-on:click="yellowBallClicked(item.number)">
          <span v-if="item.number < 10">
            0{{item.number}}
          </span>
          <span v-else>
            {{item.number}}
          </span>
        </button>
        <button class="ball-wrapper responsive-size float-l green" v-for="item in greenItems" v-bind:key="item.ballKey" v-bind:class="{ ballOff: !item.active }" v-on:click="greenBallClicked(item.number)">
          <span v-if="item.number < 10">
            0{{item.number}}
          </span>
          <span v-else>
            {{item.number}}
          </span>
        </button>
      </div>
      <div class="event-btn-wrapper float-wrapper">
        <div class="w-50 float-l">
          <div class="auto-btn-wrapper">
            <button type="button" class="btn btn-auto-select fs-11" v-on:click="autoSelect">{{ $t("autoSelect") }}</button>
          </div>
        </div>
        <div class="w-50 float-l">
          <div class="confirm-btn-wrapper">
            <button type="button" class="btn btn-confirm fs-11" v-on:click="confirmGame">{{ $t("confirm") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import vueCookie from 'vue-cookie'
import _global from '../App.vue'
import $ from 'jquery'

const langData = require('./lang/event.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})

function shuffle (a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
}

export default {
  name: 'event',
  i18n: i18n,
  components: {
  },
  data () {
    return {
      yellowItems: [],
      greenItems: [],
      selected1: '',
      selected2: '',
      selected3: '',
      selected4: '',
      selected5: '',
      selected6: '',
      selected7: '',
      items: [
        {title: 'English', value: 'en'},
        {title: '한국어', value: 'ko'},
        {title: '中国', value: 'zh'}
      ],
      currentLanguage: 'zh',
      skipAD: null,
      banner: null,
      bottomAd: null,
      readyImgArr: [],
      readyImgUrl: '',
      landingUrl: '',
      reload: true
    }
  },
  created: function () {
    var qrCode = this.$route.query.code
    Vue.prototype.GLOBAL = _global
    if (vueCookie.get('qr_language')) {
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    } else {
      $.ajax({
        // url: 'https://geoip-db.com/json/',
        url: 'https://geoip.nekudo.com/api/',
        dataType: 'json',
        async: false,
        type: 'GET',
        timeout: 3000,
        success: function (req) {
          _global.ipAddress = req.country.code
          // _global.ipAddress = req.country_code
        },
        error: function () {
          _global.ipAddress = 'ZH'
        }
      })
      var getIP = this.GLOBAL.ipAddress
      console.log(getIP)
      if (getIP == 'GB' || getIP == 'FR' || getIP == 'AU' || getIP == 'CA' || getIP == 'BR' || getIP == 'JP' || getIP == 'RU' || getIP == 'US' || getIP == 'IT') {
        this.$i18n.locale = 'en'
        this.currentLanguage = 'en'
        vueCookie.set('qr_language', 'en', 1)
      } else if (getIP == 'KR') {
        this.$i18n.locale = 'ko'
        this.currentLanguage = 'ko'
        vueCookie.set('qr_language', 'ko', 1)
      } else {
        this.$i18n.locale = 'zh'
        this.currentLanguage = 'zh'
        vueCookie.set('qr_language', 'zh', 1)
      }
    }
    // console.log(getIP)
    // if (vueCookie.get('qr_language')) {
    //   this.$i18n.locale = vueCookie.get('qr_language')
    //   this.currentLanguage = vueCookie.get('qr_language')
    // } else if (getIP == 'CN') {
    //   this.$i18n.locale = 'zh'
    //   this.currentLanguage = 'zh'
    //   vueCookie.set('qr_language', 'zh', 1)
    // } else if (getIP == 'KR') {
    //   this.$i18n.locale = 'ko'
    //   this.currentLanguage = 'ko'
    //   vueCookie.set('qr_language', 'ko', 1)
    // } else {
    //   this.$i18n.locale = 'en'
    //   this.currentLanguage = 'en'
    //   vueCookie.set('qr_language', 'en', 1)
    // }

    if (this.currentLanguage === 'zh') {
      this.readyImgArr = [
        '/static/img/event/tanchuang.png'
        // '/static/img/event/H5_alert_1.jpg',
        // '/static/img/event/H5_alert_2.jpg',
        // // '/static/img/event/H5_alert_3.jpg',
        // '/static/img/event/H5_alert_4.jpg',
        // '/static/img/event/H5_alert_5.jpg',
        // '/static/img/event/H5_alert_6.jpg',
        // '/static/img/event/H5_alert_7.jpg',
        // '/static/img/event/H5_alert_8.jpg',
        // '/static/img/event/H5_alert_9.jpg',
        // '/static/img/event/H5_alert_10.jpg',
        // '/static/img/event/H5_alert_11.jpg',
        // '/static/img/event/H5_alert_12.jpg'
      ]
    } else if (this.currentLanguage === 'ko') {
      [
        '/static/img/event/tanchuang.png'
      ]
    } else {
      this.readyImgArr = [
        '/static/img/event/tanchuang.png'
      ]
    }
    shuffle(this.readyImgArr)
    this.readyImgUrl = this.readyImgArr.slice(0, 1)
    console.log(this.readyImgUrl)

    if (!this.$route.query.code) {
      this.$router.push({name: 'AppDown', params: {code: 'default'}})
    } else {
      axios({ // check validation qr code
        method: 'POST',
        url: process.env.api_url + '/api/validations/q35-code',
        params: { code: qrCode }
      }).then((response) => {
        // var responseMessage = response.data.message
        // var responseData = response.data.data
        // console.log(responseMessage)
        // console.log(responseData)

        axios({ // get skip AD
          method: 'GET',
          url: process.env.api_url + '/api/ad/game',
          params: { lang: this.currentLanguage }
        }).then((response) => {
          // var responseMessage = response.data.message
          var responseData = response.data.data
          // console.log(responseMessage)
          console.log(responseData)
          // var banner = responseData.complete_banner.product.image_url
          // var bottomAd = responseData.complete_banner.bottom.image_url
          // console.log(banner)
          // console.log(bottomAd)
          this.landingUrl = responseData.complete_banner.bottom.landing_url
          var downloadingImage = new Image()
          downloadingImage.src = responseData.game_ad
          this.skipAD = responseData.game_ad
          var downloadingBanner = new Image()
          downloadingBanner.src = responseData.complete_banner.product.image_url
          this.banner = responseData.complete_banner.product.image_url
          var downloadingBottomAd = new Image()
          downloadingBottomAd.src = responseData.complete_banner.bottom.image_url
          this.bottomAd = responseData.complete_banner.bottom.image_url
        }).catch((ex) => {
          console.log(ex)
          // var errorResponseData = ex.response.data
          // console.log(errorResponseData)
        })
      }).catch((ex) => {
        console.log(ex)
        // var errorResponseData = ex.response.data
        var errorStatus = ex.response.status
        // console.log(errorResponseData)
        if (errorStatus === 400) {
          this.$router.push({name: 'AppDown', params: {code: errorStatus, reload: this.reload}})
          return false
        } else if (errorStatus === 410) {
          this.$router.push({name: 'AppDown', params: {code: errorStatus, reload: this.reload}})
          return false
        } else {
          this.$router.push({name: 'AppDown', params: {code: 'default', reload: this.reload}})
          return false
        }
      })
    }
    this.yellowItems = []
    this.greenItems = []

    for (var i = 1; i < 34; i++) {
      var numberValue = i
      var isActive = false

      if (numberValue < 17) {
        this.yellowItems.push({number: numberValue, active: isActive, ballKey: 'r-' + numberValue})
        this.greenItems.push({number: numberValue, active: isActive, ballKey: 'b-' + numberValue})
      } else {
        this.yellowItems.push({number: numberValue, active: isActive, ballKey: 'r-' + numberValue})
      }
    }
  },
  methods: {
    changeItem: function (event) {
      vueCookie.set('qr_language', event.target.value, 1)
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    },
    openModal: function () {
      document.getElementsByClassName('modal-wrapper')[0].style.display = 'block'
      document.getElementsByClassName('mask')[0].style.display = 'block'
    },
    hide: function () {
      document.getElementsByClassName('modal-wrapper')[0].style.display = 'none'
      document.getElementsByClassName('mask')[0].style.display = 'none'
    },
    goEvent: function () {
      document.getElementsByClassName('ready-box')[0].style.display = 'none'
      document.getElementsByClassName('contents-wrapper')[0].style.display = 'block'
      document.getElementsByClassName('mask')[0].style.display = 'none'
    },
    yellowBallClicked: function (event) {
      var currentNumber = parseInt(event) - 1
      var isActive = this.yellowItems[currentNumber].active
      var count = 0

      this.yellowItems.forEach(function (value, key) {
        if (value.active === true) {
          count++
        }
      })

      if (count < 6) {
        if (isActive) {
          this.yellowItems[currentNumber].active = false
        } else {
          this.yellowItems[currentNumber].active = true
        }
      } else if (count === 6) {
        if (isActive) {
          this.yellowItems[currentNumber].active = false
        } else {
          alert(this.$i18n.t('finishYellowBall'))
        }
      }

      this.selected1 = ''
      this.selected2 = ''
      this.selected3 = ''
      this.selected4 = ''
      this.selected5 = ''
      this.selected6 = ''
      var selectedArray = []
      this.yellowItems.forEach(function (value, key) {
        if (value.active === true) {
          if (value.number < 10) {
            selectedArray.push('0' + value.number)
          } else {
            selectedArray.push(value.number)
          }
        }
      })

      this.selected1 = selectedArray[0]
      this.selected2 = selectedArray[1]
      this.selected3 = selectedArray[2]
      this.selected4 = selectedArray[3]
      this.selected5 = selectedArray[4]
      this.selected6 = selectedArray[5]
    },
    greenBallClicked: function (event) {
      var currentNumber = parseInt(event) - 1
      var isActive = this.greenItems[currentNumber].active
      var count = 0

      this.greenItems.forEach(function (value, key) {
        if (value.active === true) {
          count++
        }
      })
      if (count === 0) {
        if (!isActive) {
          this.greenItems[currentNumber].active = true
        }
      } else if (count === 1) {
        if (isActive) {
          this.greenItems[currentNumber].active = false
        } else {
          alert(this.$i18n.t('finishGreenBall'))
        }
      }
      this.selected7 = ''
      var selectedArray = []
      this.greenItems.forEach(function (value, key) {
        if (value.active === true) {
          if (value.number < 10) {
            selectedArray.push('0' + value.number)
          } else {
            selectedArray.push(value.number)
          }
        }
      })
      this.selected7 = selectedArray[0]
    },
    autoSelect: function (event) {
      this.yellowItems.forEach(function (value, key) {
        if (value.active === true) {
          value.active = false
        }
      })

      this.greenItems.forEach(function (value, key) {
        if (value.active === true) {
          value.active = false
        }
      })

      var yellowItemArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
      var greenItemArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      shuffle(yellowItemArray)
      shuffle(greenItemArray)

      var yellowSelectArray = yellowItemArray
      var greenSelectArray = greenItemArray

      yellowSelectArray = yellowSelectArray.slice(0, 6)
      greenSelectArray = greenSelectArray.slice(0, 1)
      this.yellowItems.forEach(function (value, key) {
        var found = yellowSelectArray.find(function (element) {
          if (element === value.number) {
            return true
          } else {
            return false
          }
        })
        if (found) {
          value.active = true
        }
      })

      this.greenItems.forEach(function (value, key) {
        var found = greenSelectArray.find(function (element) {
          if (element === value.number) {
            return true
          } else {
            return false
          }
        })
        if (found) {
          value.active = true
        }
      })
      var selectedArray = []
      this.yellowItems.forEach(function (value, key) {
        if (value.active === true) {
          if (value.number < 10) {
            selectedArray.push('0' + value.number)
          } else {
            selectedArray.push(value.number)
          }
        }
      })

      this.selected1 = selectedArray[0]
      this.selected2 = selectedArray[1]
      this.selected3 = selectedArray[2]
      this.selected4 = selectedArray[3]
      this.selected5 = selectedArray[4]
      this.selected6 = selectedArray[5]

      this.selected7 = ''
      selectedArray = []
      this.greenItems.forEach(function (value, key) {
        if (value.active === true) {
          if (value.number < 10) {
            selectedArray.push('0' + value.number)
          } else {
            selectedArray.push(value.number)
          }
        }
      })

      this.selected7 = selectedArray[0]
    },
    confirmGame: function (event) {
      var activeYellow = []
      var activeGreen = []
      var yellowCount = 0
      var greenCount = 0

      this.yellowItems.forEach(function (value, key) {
        if (value.active === true) {
          activeYellow.push(value.number)
          yellowCount++
        }
      })

      this.greenItems.forEach(function (value, key) {
        if (value.active === true) {
          activeGreen.push(value.number)
          greenCount++
        }
      })

      if (yellowCount < 6) {
        alert(this.$i18n.t('notEnoughBall'))
        return false
      }
      if (greenCount < 1) {
        alert(this.$i18n.t('notEnoughBall'))
        return false
      }
      var qrCode = this.$route.query.code
      this.$router.push({
        name: 'AD',
        params: {
          yellowBall: activeYellow,
          greenBall: activeGreen,
          type: 'code',
          qrCode: qrCode,
          skipAD: this.skipAD,
          banner: this.banner,
          bottomAd: this.bottomAd,
          landingUrl: this.landingUrl
        }
      })
    }
  }
}
</script>

<style scoped>
.header-title-wrapper {
  font-size: 20px;
  display:table-cell;
  vertical-align:middle;
}

.header-language-wrapper {
  height:60px;
  margin-right:10px;
  position:absolute;
  top:0;
  right:0;
  display:table;
}

.header-language-wrapper img {
  height:15px;
  margin-top:24px;
  margin-right:5px;
}

.header-language-text select {
  height:40px;
  background-color:#FFCB00;
  color:#000000;
  border:0px;
  padding-left:5px;
  margin-right:10px;
  -webkit-appearance:none;
  -moz-appearance:none;
  -ms-appearance:none;
}

.header-language-text {
  display:table-cell;
  vertical-align: middle;
}

.language-arrow-wrapper {
  height:40px;
}

.event-intro-top-wrapper {
  margin:0px 3.5vw;
  padding:10px 0px;
  border-bottom:1px solid #CCCCCC;
  height:10vw;
}

.event-intro-top-title {
  text-align:left;
  border-right:1px solid #CCCCCC;
  width:calc(25% - 1px);
  height:10vw
}

.event-intro-top-ball {
  text-align:center;
  width:calc(75% - 20px);
  height:10vw;
  margin-left:10px;
}

.event-intro-ball-wrapper .ball-size {
  width:12%;
  margin-left:calc((30% - 28px)/13);
  overflow:hidden;
  font-size:0.6em;
}

.event-intro-ball-wrapper .ball-size:before {
  content:'';
  padding-top:100%;
  float:left;
}

.ball-size-item {
  width:100%;
  margin-top:28%;
  /* margin-top:calc((90vw - 100px)/25); */
  font-size: 4vw;
  /* font-size: calc((100vw - 110px)/20); */
}

/* .contents-wrapper{
  display: none;
} */
.ready-top{
  margin-top: 30%;
  width: 80%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.ready-img{
  width: 80%;
  margin-top: 30%;
  margin-left: 10%;
  /* padding: 10px 0px; */
}
.ready-img img{
  width: 100%;
  display: inherit;
}
.ready-middle{
  width: 80%;
  margin-top: -5px;
  margin-left: 10%;
  padding: 10px 0px;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.ready-middle img{
  width: 100%;
  display: inherit;
}
.ready-btn{
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 8px 24px;
  border: none;
  background-color:#FFCB00;
  font-family:'PingFangSC-Regular';
  font-size: 1.3rem;
  border-radius: 20px;
}
.ready-box{
  width: 100%;;
  text-align: center;
  top:0px;
  position: absolute;
  cursor: pointer;
  z-index: 999;
}
/* .ready{
  color: #000;
  width: 90%;
  height: 30%;
  margin-top: 50%;
  margin-left: 5%;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.ready-title{
  width: 90%;
  margin-left: 5%;
  padding-top: 10px;
  padding-bottom: 20px;
  font-weight: 600;
  font-size: 1.4rem;
  color: #6985C6;
  text-align: left;
  border-bottom: 1px solid #CCCCCC;
}
.ready-body{
  font-size: 0.8rem;
  padding: 15px 0px;
}
.ready-body p{
  margin-bottom: 10px;
}
.ready-body img{
  width: 100%;
  display: inherit;
}
.ready-logo{
  float: right;
  margin-right: 6%;
  margin-top: 29%;
  width: 30%;
}
.ready-button{
  font-size: 1.3rem;
  border-radius: 5px;
}

.btn-right{
  background-color: #fff;
  border: none;
  border-top: 1px solid #ccc;
  width: 100%;
  height: 50px;
  font-size: inherit;
} */

.modal-wrapper {
  height: calc(100% - 60px);
  width: 100%;
  top:0px;
  text-align: center;
  position: absolute;
  display: none;
  cursor: pointer;
  z-Index: 9999;
}

.modal-img {
  background-color: white;
  color: #000;
  width: 80%;
  height: 40%;
  margin-top: 30%;
  margin-left: 6%;
  border-radius: 10px;
  padding: 5% 4%;
  text-align: left;
}
.logo{
  float: right;
  margin-right: 6%;
  margin-top: 10%;
  width: 30%;
}
.rule-title{
  font-family: 'PingFangSC';
  color: #6985C6;
  font-size: 1.4rem;
  font-weight: 600;
  padding-bottom: 20px;
  border-bottom: 1px solid #CCCCCC;
}
.rule-rules{
  margin-top: 20px;
  color: #6985C6;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 30px;
}
.rule-prize{
  font-size: 0.8rem;
  line-height: 25px;
}
.rule-example{
  font-size: 0.8rem;
  padding-left: 3rem;
}
/* .modal-img img {
  width: 80%;
  height: 40%;
  margin-top: 30%;
} */

.modal-close img {
  width: 8%;
  height: 8%;
  margin-top: 10%;
}
.mask{
  width: 100%;
  height: 100%;
  background-color: #000;
  filter: alpha(opacity=70);
  -moz-opacity: 0.7;
  opacity: 0.7;
  position: absolute;
  left: 0px;
  top: 0px;
  display: block;
  z-index: 888;
}

.ball-wrapper.gray {
  background-color:#CCCCCC;
  border:1px solid #CCCCCC;
  border-radius:200px;
}

.event-intro-desc-wrapper {
  /* text-align:center; */
  padding:30px 3.5vw 20px 3.5vw;
}

.event-text-yellow {
  color:#FFCB00;
  font-weight:bold;
}

.event-text-green {
  color:#A7AC00;
  font-weight:bold;
}

.event-text-red {
  color:#EE6807;
  font-weight:bold;
}

.event-text-blue {
  color:#6985C6;
  font-weight:bold;
}

.event-balls-wrapper {
  padding:1vw;
  padding-bottom:20px;
}

.event-btn-wrapper {
  /* border-top:1px solid #CCCCCC; */
  padding:20px 3.5vw;
}

.w-50 {
  width:50%;
}

.btn-auto-select {
  /* background-color:#FFCB00;
  border:1px solid #FFCB00; */
  background-color:#6985C6;
  border:1px solid #6985C6;
  color:#FFFFFF;
}

.auto-btn-wrapper {
  padding-right:5px;
}

.btn-confirm {
  /* background-color:#A7AC00;
  border:1px solid #A7AC00; */
  background-color:#EE6807;
  border:1px solid #EE6807;
  color:#FFFFFF;
}

.confirm-btn-wrapper {
  padding-left:5px;
}

.btn {
  width:100%;
}

.fs-05 {
  font-size:0.5em;
}
.blockScroll {
  width:100%;
  position:fixed;
  overflow-y:scroll;
}
.fs-auto{
  font-size: calc((100vw - 110px)/15);
}
.fs-auto1{
  font-size: calc((100vw - 140px)/15);
}
.ques{
  height: 20px;
  float: right;
  margin-top: calc((30vw - 110px)/24);
}
.ques img{
  height: calc((100vw - 110px)/15);
  border-radius: 50%;
  vertical-align: middle;
}
.desc-text {
  height:20px;
  line-height: 20px;
  color:#A7AC00;
  /* color: #6985C6; */
  float: right;
}
.desc-text img {
  height: 15px;
}

</style>
