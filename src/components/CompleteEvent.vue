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
      <div class="section-divider" v-if="shopAdURL !== null || marketingAdURL !== null">
      </div>
      <div class="complete-event-contents-wrapper" v-if="shopAdURL !== null">
        <div class="company-event-wrapper">
          <div class="event-title fs-09">
            {{ $t("event.title1") }}
          </div>
          <div class="event-img-wrapper">
            <img v-bind:src="shopAdURL">
          </div>
        </div>
      </div>
      <div class="complete-event-contents-wrapper" v-if="marketingAdURL !== null">
        <div class="company-event-wrapper">
          <div class="event-title fs-09">
            {{ $t("event.title2") }}
          </div>
          <div class="event-img-wrapper">
            <img v-bind:src="marketingAdURL">
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
          <img src="/static/img/ad/seedo_main_event.jpg">
        </div>
        <div class="ad-wrapper">
          <img src="/static/img/ad/end_ad.jpg">
        </div>
      </div>
      <div class="section-divider">
      </div>
      <div class="app-down-wrapper">
        <div class="app-down-text fs-12">
          {{ $t("appDownMessage") }}
        </div>
        <div class="app-button-wrapper float-wrapper">
          <button type="button" class="btn down-btn float-l" v-on:click="downloadAndroid">
            <div class="android">
              <img src="/static/img/app_down/android_icon_white.png">
              <div class="android-text fs-11">
                Android
              </div>
            </div>
          </button>
          <button type="button" class="btn down-btn float-r" v-on:click="noPage">
            <div class="ios">
              <img src="/static/img/app_down/ios_icon_white.png">
              <div class="ios-text fs-11">
                iOS
              </div>
            </div>
          </button>
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

const langData = require('./lang/completeEvent.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})

export default {
  name: 'completeEvent',
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
      shopAdURL: null,
      marketingAdURL: null
    }
  },
  created: function () {
    if (vueCookie.get('qr_language')) {
      this.$i18n.locale = vueCookie.get('qr_language')
    } else {
      this.$i18n.locale = 'zh'
      if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Seoul') {
        this.$i18n.locale = 'ko'
      } else if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Shanghai') {
        this.$i18n.locale = 'zh'
      } else {
        this.$i18n.locale = 'en'
      }
    }

    var getParams = this.$route.params
    this.yellowItems = ['yellow-' + getParams.yellowBall[0], 'yellow-' + getParams.yellowBall[1], 'yellow-' + getParams.yellowBall[2], 'yellow-' + getParams.yellowBall[3], 'yellow-' + getParams.yellowBall[4], 'yellow-' + getParams.yellowBall[5]]
    this.greenItems = ['green-' + getParams.greenBall[0]]
    console.log(getParams)
    if (getParams.entryInfo.shop.ad.length === 0 && getParams.entryInfo.shop.event_result.length === 0) {
      this.shopAdURL = null
    } else if (getParams.entryInfo.shop.ad.length !== 0) {
      this.shopAdURL = getParams.entryInfo.shop.ad[0].shop_img_file
    } else {
      if (getParams.entryInfo.shop.event_result[0].result === 'win') {
        this.shopAdURL = getParams.entryInfo.shop.event_result[0].gift.shop_gift_image_file.url
      } else {
        this.shopAdURL = getParams.entryInfo.shop.event_result[0].shop_img_file
      }
    }
    this.currentDate = getParams.entryInfo.entry.drawing_end_at
    if (getParams.entryInfo.marketing_event_result.length === 0) {
      this.marketingAdURL = null
    } else {
      this.marketingAdURL = getParams.entryInfo.marketing_event_result[0].img
    }
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
  },
  methods: {
    noPage: function () {
      alert('comming soon.')
    },
    openModal: function () {
      document.getElementsByClassName('modal-wrapper')[0].style.display = 'block'
      document.getElementsByClassName('mask')[0].style.display = 'block'
    },
    hide: function () {
      document.getElementsByClassName('modal-wrapper')[0].style.display = 'none'
      document.getElementsByClassName('mask')[0].style.display = 'none'
    },
    downloadAndroid: function () {
      window.location.href = process.env.appdown_url
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
</style>
