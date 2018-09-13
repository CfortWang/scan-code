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
        <img v-bind:src="readyImgArr" v-on:click="goEvent" usemap="#alert-map">
        <!-- <map name="alert-map" v-on:click="goEvent">
            <area shape="rect" coords="30,313,260,362" alt="know" class="maparea"/>
        </map> -->
      </div>
    </div>
    <!-- <div class="ready-box">
      <img src="static/img/event/ready-top.png" class="ready-top">
      <div class="ready-middle">
        <img v-bind:src="readyImgUrl">
        <button class="ready-btn" v-on:click="goEvent">{{ $t("ready.btn-right") }}</button>
      </div>
    </div> -->
    <header>
      <div class="header-title-wrapper fs-14">
        {{ $t("title") }}
      </div>
    </header>
    <div class="mask blockScroll"></div>
    <div class="contents-wrapper">
      <div class="event-round-wrapper">
        <div class="event-round-left-wrapper float-wrapper">
          <div class="event-round">{{round[0]}}{{ $t("round") }}</div>
          <div class="event-intro-ball-wrapper float-wrapper justified">
            <div class="ball-wrapper ball-size float-l">
              <div class="ball-size-item">{{ballNums0[0]}}</div>
            </div>
            <div class="ball-wrapper ball-size float-l">
              <div class="ball-size-item">{{ballNums0[1]}}</div>
            </div>
            <div class="ball-wrapper ball-size float-l">
              <div class="ball-size-item">{{ballNums0[2]}}</div>
            </div>
            <div class="ball-wrapper ball-size float-l">
              <div class="ball-size-item">{{ballNums0[3]}}</div>
            </div>
            <div class="ball-wrapper ball-size float-l">
              <div class="ball-size-item">{{ballNums0[4]}}</div>
            </div>
            <div class="ball-wrapper ball-size float-l">
              <div class="ball-size-item">{{ballNums0[5]}}</div>
            </div>
            <div class="ball-wrapper ball-size float-l">
              <div class="ball-size-item">{{ballNums0[6]}}</div>
            </div>
          </div>
        </div>
        <div class="event-round-right-wrapper float-l" v-on:click="getMoreWinner">
          <div class="lastTenRound">{{ $t("lastTenRound") }}<img class="round-icon1" src="/static/img/event/close.png" alt=""><img class="round-icon2" src="/static/img/event/open.png" alt=""></div>
          <!-- <div class="round-icon1"><img class="round-icon1" src="/static/img/event/close.png" alt=""></div>
          <div class="round-icon2"><img class="round-icon2" src="/static/img/event/open.png" alt=""></div> -->
        </div>
      </div>
      <div class="moreData"></div>
      <div class="event-balls-wrapper float-wrapper">
        <div class="select-ball-title">
          <span class="ball-kind">{{ $t("ball.redBall") }}</span>
          <span class="plz-select">{{ $t("ball.selectRedBall") }}</span>
        </div>
        <div class="red-ball-wrapper clear-fix">
          <button class="ball-wrapper responsive-size float-l yellow" v-for="item in yellowItems" v-bind:key="item.ballKey" v-bind:class="{ballOff: !item.active}" v-on:click="yellowBallClicked(item.number)">
            <span v-if="item.number < 10">
              0{{item.number}}
            </span>
            <span v-else>
              {{item.number}}
            </span>
          </button>
        </div>
        <div class="select-ball-title">
          <span class="ball-kind">{{ $t("ball.blueBall") }}</span>
          <span class="plz-select">{{ $t("ball.selectBlueBall") }}</span>
        </div>
        <div class="blue-ball-wrapper clear-fix">
          <button class="ball-wrapper responsive-size float-l green" v-for="item in greenItems" v-bind:key="item.ballKey" v-bind:class="{ ballOff: !item.active }" v-on:click="greenBallClicked(item.number)">
            <span v-if="item.number < 10">
              0{{item.number}}
            </span>
            <span v-else>
              {{item.number}}
            </span>
          </button>
        </div>
      </div>
      <div class="dividing-line"></div>
      <div class="event-bottom-text clear-fix">
        <div class="winTimeBox">
          <span class="nowRound">{{nowRound}}{{ $t("round") }}</span>
          <span class="winTime">{{ $t("winTime") }}</span>
        </div>
        <div class="pointCount">
          <span class="pointText1">{{ $t("prizePool") }}</span>
          <span class="pointText2">{{prizePool}}</span>
          <span class="pointText3">{{ $t("seedoPoint") }}</span>
        </div>
      </div>
      <div class="event-btn-wrapper float-wrapper">
        <div class="w-30-l float-l">
          <div class="re-btn-wrapper">
            <button type="button" class="btn btn-re-select fs-11" v-on:click="reSelect">{{ $t("reSelect") }}</button>
          </div>
        </div>
        <div class="w-30-l float-l">
          <div class="auto-btn-wrapper">
            <button type="button" class="btn btn-auto-select fs-11" v-on:click="autoSelect">{{ $t("autoSelect") }}</button>
          </div>
        </div>
        <div class="w-30 float-r">
          <div class="confirm-btn-wrapper">
            <button type="button" class="btn btn-confirm fs-11" v-on:click="confirmGame">{{ $t("confirm") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueI18n from 'vue-i18n'
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
      pastWinnerNum: [],
      round: [],
      nowRound: '',
      prizePool: '',
      ballNums0: [],
      ballNums1: [],
      ballNums2: [],
      ballNums3: [],
      ballNums4: [],
      ballNums5: [],
      ballNums6: [],
      ballNums7: [],
      ballNums8: [],
      ballNums9: [],
      items: [
        {title: 'English', value: 'en'},
        {title: '???', value: 'ko'},
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

    if (this.currentLanguage === 'zh') {
      this.readyImgArr = [
      '/static/img/event/tanchuang.png'
      ]
    } else if (this.currentLanguage === 'ko') {
      this.readyImgArr = [
      '/static/img/event/tanchuang.png'
      ]
    } else {
      this.readyImgArr = [
      '/static/img/event/tanchuang.png'
      ]
    }
    // shuffle(this.readyImgArr)
    // this.readyImgUrl = this.readyImgArr.slice(0, 1)
    // console.log(this.readyImgUrl)

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

        axios({ // get the old winner number
          method: 'GET',
          url: process.env.api_url + '/api/drawings/complete'
        }).then((response) => {
          // var responseMessage = response.data.message
          var responseData = response.data.data
          // console.log(responseData)
          for (var j = 0; j < 10; j++) {
            var ballNums = []
            var ball = 'ballNums' + j
            for (var k = 1; k <= 7; k++) {
              var round = responseData[j].drawing_num
              var ballNum = 'num_' + k
              ballNums[k - 1] = responseData[j][ballNum]
              if (ballNums[k - 1] < 10) {
                ballNums[k - 1] = '0' + ballNums[k - 1]
              }
            }
            this.pastWinnerNum[j] = ballNums
            this.round[j] = round
            this[ball] = this.pastWinnerNum[j]
          }
          // console.log(this.pastWinnerNum)

          var $div1 = '<div class="event-round-wrapper"><div class="event-round-left-wrapper float-wrapper"><div class="event-round"></div><div class="event-intro-ball-wrapper float-wrapper justified"></div></div></div>'
          var $div5 = '<div class="ball-wrapper ball-size float-l"><div class="ball-size-item"></div></div>'
          for (let i = 1; i <= 9; i++) {
            var roundText = ""+this.round[i]+"" + ""+this.$t('round')+""
            var t = i - 1
            $('.moreData').append($div1)
            $(".moreData .event-round-wrapper:eq("+t+") .event-round").text(roundText)
            for (var m = 1; m <= 7; m++) {
              var ballnum = 'ballNums' + i
              var mm = m-1
              var ballnums = ""+this[ballnum][mm]+""
              $(".moreData .event-intro-ball-wrapper:eq(" + t + ")").append($div5)
              $(".moreData .event-round-wrapper:eq("+t+") .ball-wrapper:eq("+mm+") .ball-size-item").text(ballnums)
            }
          }
        }).catch((ex) => {
          console.log(ex)
        })

        axios({ // get the newest prizePool point
          method: 'GET',
          url: process.env.api_url + '/api/drawings/progress'
        }).then((response) => {
          // var responseMessage = response.data.message
          var responseData = response.data.data
          this.nowRound = responseData.drawing_num
          this.prizePool = responseData.prev_drawing_point + responseData.point
        }).catch((ex) => {
          console.log(ex)
        })

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
    getMoreWinner: function () {
      var status = document.getElementsByClassName('moreData')[0].style.display
      if (status == '' || status == 'none') {
        document.getElementsByClassName('moreData')[0].style.display = 'block'
        document.getElementsByClassName('round-icon1')[0].style.display = 'none'
        document.getElementsByClassName('round-icon2')[0].style.display = 'block'
      }
      if (status == 'block') {
        document.getElementsByClassName('moreData')[0].style.display = 'none'
        document.getElementsByClassName('round-icon1')[0].style.display = 'block'
        document.getElementsByClassName('round-icon2')[0].style.display = 'none'
      }
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
    reSelect: function () {
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

.event-round-wrapper{
  width: 100%;
  background:rgba(248,248,248,1);
  padding:12px 0px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.moreData{
  width: 100%;
  display: none;
  box-shadow:0px 5px 19px 1px rgba(51,85,164,0.18);
  position: absolute
}

.moreData .event-round-wrapper:nth-child(odd){
  /* background:rgba(248,248,248,1); */
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
  width: 30%;
  line-height: 14px;
  color: #666;
}

.event-round-right-wrapper {
  /* padding-left: 20px; */
  width: 100%;
  flex: 1;
}

.event-intro-ball-wrapper{
  line-height: 14px;
}

.event-intro-ball-wrapper .ball-size {
  margin-left:8px;
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
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}
.round-icon1{
  height: 13px;
  margin-left: 6px;
}
.round-icon2{
  width: 13px;
  display: none;
  margin-left: 6px;
}
.ball-size-item {
  width:100%;
  /* margin-top:20%; */
  /* margin-top:calc((90vw - 100px)/25); */
  font-size: 14px;
  /* font-size: calc((100vw - 110px)/20); */
}

.select-ball-title{
  margin-top: 20px;
  font-size: 14px;
  color: #000;
}
.ball-kind{
  margin-left: 2.5vw;
}
.plz-select{
  color: #999;
  padding-left: 8px;
}

.clear-fix:after {
  content: "";
  display: block;
  clear: both;
}

.red-ball-wrapper, .blue-ball-wrapper{
  margin-top: 15px;
}

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
  -moz-opacity: 0.5;
  opacity: 0.5;
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
  color:#FF5F57;
  font-weight:bold;
}

.event-text-blue {
  color:#57A0FF;
  font-weight:bold;
}

.event-balls-wrapper {
  padding:1vw;
  padding-bottom:20px;
}

.dividing-line{
  width: 90%;
  margin-left: 5%;
  margin-bottom: 20px;
  border-bottom: 1px solid #DDD;
}

.event-bottom-text{
  padding: 0px 15px;
  font-size:16px;
  font-family: "PingFangSC-Regular";
  color:rgba(51,51,51,1);
}
.winTimeBox{
  float: left;
}
.winTime, .pointText2{
  color: #EE4E07;
}
.pointCount{
  float: right;
}

.event-btn-wrapper {
  /* border-top:1px solid #CCCCCC; */
  padding:15px;
}

.w-30 {
  width:30%;
}
.w-30-l {
  width:30%;
}
.btn-re-select {
  background-color:#DDDDDD;
  border:none;
  color:#666666;
}
.btn-auto-select {
  /* background-color:#FFCB00;
  border:1px solid #FFCB00; */
  background-color:#57A0FF;
  border:none;
  color:#FFFFFF;
  padding: 10px 0px;
}
@media (max-width: 344px){
  .w-30-l{
    width: 35%;
  }
}
@media (min-width: 377px){
  .event-intro-ball-wrapper .ball-size{
    margin-left: 10px;
  }
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
.re-btn-wrapper{
  padding-right: 3px;
}

.auto-btn-wrapper {
  padding-left: 3px;
}

.btn-confirm {
  /* background-color:#A7AC00;
  border:1px solid #A7AC00; */
  background-color:#FF5F57;
  border:none;
  color:#FFFFFF;
}

.confirm-btn-wrapper {
  padding-left:3px;
}

.btn {
  width:100%;
  height: 44px;
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
  /* font-size: calc((100vw - 140px)/15); */
  font-size: 14px;
  line-height: 14px;
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
