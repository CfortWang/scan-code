<template>
  <div>
    <transition>
      <div class="modal-wrapper">
          <div v-if="openModal">
              <div class="modal-img">
                  <img src="/static/img/complete/notice.png">
              </div>
              <div class="modal-close" v-on:click="hide">
                  <img src="/static/img/complete/delete.png">
              </div>
          </div>
      </div>
    </transition>
    <header>
      <div class="header-title-wrapper fs-14">
        {{ $t("title") }}
      </div>
    </header>
    <div class="mask blockScroll"></div>
    <div class="contents-wrapper">
      <div class="complete-event-contents-wrapper">
        <div class="complete-ball-wrapper float-wrapper">
          <div class="ball-wrapper complete-size float-l" v-bind:class="[yellowItems[0]]"></div>
          <div class="ball-wrapper complete-size float-l" v-bind:class="[yellowItems[1]]"></div>
          <div class="ball-wrapper complete-size float-l" v-bind:class="[yellowItems[2]]"></div>
          <div class="ball-wrapper complete-size float-l" v-bind:class="[yellowItems[3]]"></div>
          <div class="ball-wrapper complete-size float-l" v-bind:class="[yellowItems[4]]"></div>
          <div class="ball-wrapper complete-size float-l" v-bind:class="[yellowItems[5]]"></div>
          <div class="ball-wrapper complete-size float-l" v-bind:class="[greenItems[0]]"></div>
        </div>
        <div class="complete-ball-wrapper-title">
          <div class="ball-title float-wrapper fs-09">
            <div class="ball-title-date float-l dsp-table">
              <div class="dsp-table-cell">
              {{ $t("info.winningDate") }} : {{moment(moment.utc(currentDate).toDate()).format('MM.DD H:mm')}}
              </div>
            </div>
            <div class="ball-title-time float-r dsp-table">
              <div class="dsp-table-cell">
              {{ $t("info.remainTime") }} :
              <vue-countdown :time="endTime" :interval="1000">
                <template slot-scope="props">{{ props.totalHours }}:{{ props.minutes }}:{{ props.seconds }}</template>
              </vue-countdown>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn more-info-btn" v-on:click="openModal">{{ $t("moreInfo") }}</button>
      </div>
      <div class="section-divider" v-if="shopADUrl !== null || marketUrl !== null">
      </div>
      <div class="complete-event-contents-wrapper" v-if="shopADUrl !== null">
        <div class="company-event-wrapper">
          <div class="event-title fs-09">
            {{ $t("event.title1") }}
          </div>
          <div class="event-img-wrapper">
            <img v-bind:src="shopADUrl">
          </div>
        </div>
      </div>
      <div class="complete-event-contents-wrapper" v-if="shopEventUrl !== null">
        <div class="company-event-wrapper">
          <div class="event-title fs-09">
            {{ $t("event.title1") }}
          </div>
          <div class="event-img-wrapper">
            <img v-bind:src="shopEventUrl">
          </div>
        </div>
      </div>
      <div class="complete-event-contents-wrapper" v-if="marketUrl !== null">
        <div class="company-event-wrapper">
          <div class="event-title fs-09">
            {{ $t("event.title2") }}
          </div>
          <div class="event-img-wrapper">
            <img v-bind:src="marketUrl">
          </div>
        </div>
      </div>
      <div class="section-divider">
      </div>
      <div class="complete-event-contents-wrapper">
        <div class="event-title fs-09">
          {{ $t("event.title3") }}
        </div>
        <div class="main-game-img-wrapper">
          <img src="/static/img/ad/seedo_main_event.png">
        </div>
        <div class="ad-wrapper">
          <img src="/static/img/ad/end_ad.jpg">
        </div>
      </div>
      <div class="section-divider">
      </div>
      <div class="login-wrapper">
        <div class="complete-info-wrapper">
          <div class="info-title float-wrapper fs-11">
            {{ $t("info.title") }}
          </div>
        </div>
        <div class="login-box">
          <div class="login-input-wrapper float-wrapper">
            <select class="w-25 float-l" v-on:change="countryChangeItem($event)">
              <option v-for="item in countryItems" v-bind:key="item.index" v-bind:value="item.seq">+{{item.calling_code}}</option>
            </select>
            <input type="number" class="phone-number-input w-72 float-r" v-bind:placeholder="$t('phone.placeholder')" v-model="phoneNumber">
          </div>
          <div class="login-btn-wrapper">
            <button type="button" class="btn btn-green fs-11" v-on:click="entryButton">{{ $t("phone.button")}}</button>
          </div>
        </div>
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

const langData = require('./lang/complete.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})

export default {
  name: 'complete',
  i18n: i18n,
  components: {
    VueCountdown
  },
  data () {
    var now = new Date()
    var setNow = new Date(now.getTime() + 100000)

    return {
      result: [],
      endTime: setNow - now,
      currentDate: now,
      yellowItems: [],
      greenItems: [],
      currentLanguage: 'zh',
      countryItems: [],
      phoneNumber: '',
      selectedCountry: 1,
      shopADUrl: null,
      shopEventUrl: null,
      marketUrl: null,
      tmpUser: null
    }
  },
  created: function () {
    if (vueCookie.get('qr_language')) {
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    } else {
      this.$i18n.locale = 'zh'
      this.currentLanguage = 'zh'
    }

    var getParams = this.$route.params
    this.yellowItems = ['yellow-' + getParams.yellowBall[0], 'yellow-' + getParams.yellowBall[1], 'yellow-' + getParams.yellowBall[2], 'yellow-' + getParams.yellowBall[3], 'yellow-' + getParams.yellowBall[4], 'yellow-' + getParams.yellowBall[5]]
    this.greenItems = ['green-' + getParams.greenBall[0]]

    axios({ // WAS event result
      method: 'POST',
      url: process.env.api_url + '/api/entries/event',
      params: {
        code: getParams.qrCode
      }
    }).then((response) => {
      // var responseMessage = response.data.message
      var responseData = response.data.data
      // console.log(responseMessage)
      // console.log(responseData)
      var marketResult = responseData.marketing_event_result
      var shopADResult = responseData.shop.ad
      var shopEventResult = responseData.shop.event_result

      if (shopADResult.length !== 0) {
        this.shopADUrl = shopADResult[0].shop_ad_image_file_url
      }
      if (shopEventResult.length !== 0) {
        if (shopEventResult[0].result === 'win') {
          this.tmpUser = shopEventResult[0].temp_user
          this.shopEventUrl = shopEventResult[0].gift.shop_gift_image_file.url
        }
      }

      if (marketResult.length !== 0) {
        if (marketResult[0].result === 'win') {
          this.tmpUser = marketResult[0].temp_user
          this.marketUrl = marketResult[0].img
        } else {
          this.tmpUser = shopEventResult[0].temp_user
          this.marketUrl = marketResult[0].img
        }
      }
    }).catch((ex) => {
      console.log(ex)
      // var errorResponseData = ex.response.data
      // console.log(errorResponseData)
    })

    axios({ // Current Drawings Info
      url: process.env.api_url + '/api/drawings/progress'
    }).then((response) => {
      // var responseMessage = response.data.message
      var responseData = response.data.data
      // console.log(responseMessage)
      // console.log(responseData)

      var array = responseData.end_at.split(' ')
      var date = array[0].split('-')
      var time = array[1].split(':')
      var currentTime = new Date()
      var endTimeLocal = new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]))

      if (endTimeLocal > currentTime) {
        this.endTime = endTimeLocal - currentTime
      }
      this.result = responseData
    }).catch((ex) => {
      console.log(ex)
      // var errorResponseData = ex.response.data
      // console.log(errorResponseData)
    })

    axios({ // Get Country Info
      url: process.env.api_url + '/api/countries'
    }).then((response) => {
      // var responseMessage = response.data.message
      var responseData = response.data.data
      // console.log(responseMessage)
      // console.log(responseData)

      this.countryItems = responseData.data
      this.selectedCountry = parseInt(this.countryItems[0].seq)
    }).catch((ex) => {
      console.log(ex)
      // var errorResponseData = ex.response.data
      // console.log(errorResponseData)
    })
  },
  methods: {
    countryChangeItem: function (event) {
      this.selectedCountry = parseInt(event.target.value)
    },
    openModal: function () {
      document.getElementsByClassName('modal-wrapper')[0].style.display = 'block'
      document.getElementsByClassName('mask')[0].style.display = 'block'
    },
    hide: function () {
      document.getElementsByClassName('modal-wrapper')[0].style.display = 'none'
      document.getElementsByClassName('mask')[0].style.display = 'none'
    },
    entryButton: function () {
      this.phoneNumber = this.phoneNumber.replace(/ /gi, '')
      if (this.phoneNumber === '') {
        alert(this.$i18n.t('message.insertPhone'))
        return false
      }
      axios({ // qr3355 check register
        method: 'POST',
        url: process.env.api_url + '/api/validations/phone-num',
        params: { phone_num: this.phoneNumber, country: this.selectedCountry }
      }).then((response) => {
        // var responseMessage = response.data.message
        // var responseData = response.data.data
        // console.log(responseMessage)
        // console.log(responseData)
        if (!confirm(this.$i18n.t('message.noUser'))) {
          return false
        } else {
          if (!confirm(this.$i18n.t('message.noUser2'))) {
            return false
          } else {
            var getParams = this.$route.params
            this.$router.push({
              name: 'Register',
              params: {
                yellowBall: getParams.yellowBall,
                greenBall: getParams.greenBall,
                type: 'event',
                qrCode: getParams.qrCode,
                phoneNumber: this.phoneNumber,
                countryCode: this.selectedCountry,
                tempUser: this.tmpUser
              }
            })
          }
        }
      }).catch((ex) => {
        console.log(ex)
        var errorResponseData = ex.response.data
        // console.log(errorResponseData)
        if (errorResponseData.status === 409) {
          var getParams = this.$route.params
          var qrCode = this.$route.params.qrCode
          var num1 = getParams.yellowBall[0]
          var num2 = getParams.yellowBall[1]
          var num3 = getParams.yellowBall[2]
          var num4 = getParams.yellowBall[3]
          var num5 = getParams.yellowBall[4]
          var num6 = getParams.yellowBall[5]
          var num7 = getParams.greenBall[0]

          axios({
            method: 'POST',
            url: process.env.api_url + '/api/entries/phone-num',
            params: {
              code: qrCode,
              num_1: num1,
              num_2: num2,
              num_3: num3,
              num_4: num4,
              num_5: num5,
              num_6: num6,
              num_7: num7,
              country: this.selectedCountry,
              phone_num: this.phoneNumber,
              temp_user: this.tmpUser
            }
          }).then((response) => {
            // var responseMessage = response.data.message
            // var responseData = response.data.data
            // console.log(responseMessage)
            // console.log(responseData)
            this.$router.push({name: 'AppDown', params: {code: 'default'}})
          }).catch((ex) => {
            console.log(ex)
            var errorResponseData = ex.response.data
            console.log(errorResponseData)
          })
        } else {
          alert(this.$i18n.t('message.wrongRequest'))
          return false
        }
      })
    },
    noPage: function () {
      alert('Comming soon')
    }
  }
}
</script>

<style scoped>
.header-title-wrapper {
  display:table-cell;
  vertical-align:middle;
}

.contents-wrapper {
  min-height:calc(100vh - 60px);
}

.complete-event-contents-wrapper {
  background-color:#FFFFFF;
  padding:10px 20px;
  text-align:center;
}

.event-title {
  text-align:left;
  padding-bottom:10px;
}

.event-img-wrapper img {
  width:100%;
}

.ball-title-date {
  height:30px;
}

.ball-title-time {
  height:30px;
}

.ad-wrapper img {
  width:100%;
}

.complete-size {
  height:calc((100vw - 110px)/7);
  width:calc((100vw - 110px)/7);
  margin:5px;
}

.main-game-img-wrapper {
  margin-bottom:20px;
}
.main-game-img-wrapper img {
  width:100%;
}

.section-divider {
  background-color:#CCCCCC;
  height:10px;
}

.app-down-wrapper {
  padding:0 20px 30px 20px;
}
.app-down-text {
  color:#A7AC00;
  text-align:center;
  line-height:25px;
  margin:20px 0;
}

/* .app-button-wrapper {
  text-align:center;
  padding-bottom:40px;
} */

/* .app-button-wrapper button{
  margin:0 5px;
} */

.down-btn {
  background-color:#A7AC00;
  border:1px solid #A7AC00;
  color:#FFFFFF;
  border-radius:5px;
  padding:10px 20px;
  width:calc(50% - 5px);
}

.down-btn img {
  height:20px;
}

.down-btn .android {
  height:20px;
  display:table;
  margin:auto;
}

.android-text {
  padding-left:10px;
  display:table-cell;
  vertical-align:middle;
}

.down-btn .ios {
  height:20px;
  display:table;
  margin:auto;
}

.ios-text {
  padding-left:10px;
  display:table-cell;
  vertical-align:middle;
}

.more-info-btn {
  background-color:#FFFFFF;
  border:1px solid #A7AC00;
  border-radius:5px;
  padding:8px 15px;
  color:#A7AC00;
}

.complete-ball-wrapper {
  margin-bottom:10px;
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

.blockScroll {
  width:100%;
  position:fixed;
  overflow-y:scroll;
}

.complete-ball-wrapper-title {
  margin-bottom:10px;
}

.login-wrapper {
  width:100%;
}

.login-title {
  background-color:#666666;
  padding:10px 20px;
}

.login-input-wrapper {
  padding:0px 20px 5px 20px;
}

.login-input-wrapper select {
  height:40px;
  border:1px solid #CCCCCC;
  color:#666666;
  padding:10px;
  border-radius:3px;
  font-size:1em;
}

.phone-number-input {
  height:40px;
  border:0px;
  border:1px solid #CCCCCC;
  color:#666666;
  font-size:1em;
  border-radius:3px;
  padding:10px;
  box-sizing: border-box;
  -webkit-appearance:none;
  -moz-appearance:none;
  -ms-appearance:none;
}

.w-25 {
  width:25%;
}

.w-72 {
  width:72%;
}

.complete-info-wrapper {
  text-align:center;
  margin:20px 0;
}

.info-title {
  color:#333333;
  margin-bottom:10px;
  font-weight:bold;
}

.login-btn-wrapper {
  padding:10px 20px;
}

.login-btn-wrapper .btn {
  width:100%;
  border-radius:8px;
}
</style>
