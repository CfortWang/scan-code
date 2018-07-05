<template>
  <div class="ticket-event">
    <transition>
      <div class="modal-wrapper">
          <div v-if="openModal">
              <div class="modal-img">
                  <img src="/static/img/event/lottogame_alert_new.png">
              </div>
              <div class="modal-close" v-on:click="hide">
                  <img src="/static/img/event/delete_new.png">
              </div>
          </div>
      </div>
    </transition>
    <header>
      <div class="header-title-wrapper fs-14">
        {{ $t("title") }}
      </div>
      <div class="header-language-wrapper">
        <img src="/static/img/icon/language_icon.png">
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
            <div class="dsp-table-cell">{{ $t("selectedNum") }}</div>
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
          <div class="float-l fs-09">
          {{ $t("guidMsg1") }}<span class="event-text-yellow">6</span>{{ $t("guidMsg2") }}<span class="event-text-green">1</span>{{ $t("guidMsg3") }}
          </div>
          <div class="desc-text float-r fs-09 dsp-table" v-on:click="openModal">
            <!-- <img src="/static/img/event/question.jpg"> -->
            {{ $t("desc") }}
          </div>
          <div class="ques"><img src="/static/img/event/question.jpg"></div>
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
      skipAD: null
    }
  },
  created: function () {
    var qrCode = this.$route.query.code
    if (vueCookie.get('qr_language')) {
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    } else {
      this.$i18n.locale = 'zh'
      this.currentLanguage = 'zh'
      vueCookie.set('qr_language', 'zh', 1)
    }

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
          // console.log(responseData)
          var downloadingImage = new Image()
          downloadingImage.src = responseData.game_ad
          this.skipAD = responseData.game_ad
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
          this.$router.push({name: 'AppDown', params: {code: errorStatus}})
          return false
        } else if (errorStatus === 410) {
          this.$router.push({name: 'AppDown', params: {code: errorStatus}})
          return false
        } else {
          this.$router.push({name: 'AppDown', params: {code: 'default'}})
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
      this.yellowItems.forEach(function (value, key) {
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
          skipAD: this.skipAD
        }
      })
    }
  }
}
</script>

<style scoped>
.header-title-wrapper {
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
  margin-top:22px;
  margin-right:5px;
}

.header-language-text select {
  height:40px;
  background-color:#FFCB00;
  color:#FFFFFF;
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
  margin:0px 10px;
}

.event-intro-ball-wrapper .ball-size {
  width:10%;
  margin:0px calc((30% - 28px)/14);
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
  margin-top:20%;
}

.modal-wrapper {
  height: calc(100% - 60px);
  top:0px;
  text-align: center;
  position: absolute;
  display: none;
  cursor: pointer;
  z-Index: 9999;
}

.modal-img img {
  width: 80%;
  height: 40%;
  margin-top: 30%;
}

.modal-close img {
  width: 50px;
  height: 50px;
  margin-top: 7%;
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
  display: none;
  z-index: 1000;
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
  background-color:#FFCB00;
  border:1px solid #FFCB00;
  color:#FFFFFF;
}

.auto-btn-wrapper {
  padding-right:5px;
}

.btn-confirm {
  background-color:#A7AC00;
  border:1px solid #A7AC00;
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
.ques{
  height: 20px;
  float: right;
}
.ques img{
  height: 15px;
  border-radius: 50%;
  vertical-align: middle;
}
.desc-text {
  height:20px;
  line-height: 20px;
  color:#A7AC00;
  float: right;
}
.desc-text img {
  height: 15px;
}

</style>
