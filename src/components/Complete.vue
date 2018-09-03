<template>
  <div class="outer-box">
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
              <div class="modal-close">
                  <img src="/static/img/complete/delete_new.png" v-on:click="hide">
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
      <div class="complete-event-top-wrapper">
        <div class="win-rule" v-on:click="openModal">
          <img src="/static/img/complete/rule.png" alt="">
          <span>{{ $t("moreInfo") }}</span>
        </div>
        <!-- <div class="complete-ball-wrapper-title">
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
        </div> -->
        <div class="lottery-date">
          <div class="lottery-date-line"></div>
            <div class="lottery-date-text">
              <span>距离开奖2天9小时</span>
              <span></span>
              <span></span>
            </div>
          <div class="lottery-date-line"></div>
        </div>
        <div class="complete-ball-wrapper float-wrapper justified">
          <div class="ball-wrapper ball-size yellow complete-size float-l" >
            <div data-v-18718bba="" class="ball-size-item1">{{selectedRed[0]}}</div>
          </div>
          <div class="ball-wrapper ball-size yellow complete-size float-l" >
            <div data-v-18718bba="" class="ball-size-item1">{{selectedRed[1]}}</div>
          </div>
          <div class="ball-wrapper ball-size yellow complete-size float-l" >
            <div data-v-18718bba="" class="ball-size-item1">{{selectedRed[2]}}</div>
          </div>
          <div class="ball-wrapper ball-size yellow complete-size float-l" >
            <div data-v-18718bba="" class="ball-size-item1">{{selectedRed[3]}}</div>
          </div>
          <div class="ball-wrapper ball-size yellow complete-size float-l" >
            <div data-v-18718bba="" class="ball-size-item1">{{selectedRed[4]}}</div>
          </div>
          <div class="ball-wrapper ball-size yellow complete-size float-l" >
            <div data-v-18718bba="" class="ball-size-item1">{{selectedRed[5]}}</div>
          </div>
          <div class="ball-wrapper ball-size green complete-size float-l" >
            <div data-v-18718bba="" class="ball-size-item1">{{selectedBlue[0]}}</div>
          </div>
        </div>
        <div class="terms">
          <span></span>
          <span>20180908期</span>
        </div>
      </div>
      <div class="complete-event-bottom-wrapper">
        <div class="login-wrapper"  v-bind:class="{showLoginBox: noCookie, notShowLoginBox: hasCookie}">
          <div class="complete-info-wrapper">
            <div class="info-title float-wrapper">
              {{ $t("info.title") }}
            </div>
          </div>
          <div class="login-box">
            <div class="login-input-wrapper">
              <select class="country-selete" v-on:change="countryChangeItem($event)">
                <option v-for="item in countryItems" v-bind:key="item.index" v-bind:value="item.seq">+{{item.calling_code}}</option>
              </select>
              <input type="number" id="phoneNum" class="phone-number-input" v-bind:placeholder="$t('phone.placeholder')" v-model="phoneNumber">
            </div>
            <div class="login-btn">
              <span v-on:click="entryButton">{{ $t("phone.button")}}</span>
            </div>
          </div>
          <div class="dashed-line"></div>
        </div>

        <!-- 非扫码进入不显示 -->
        <div class="shop-coupon-wrapper">
          <div class="shop-coupon-title">商家优惠卷</div>
          <div class="shop-coupon-box">
            <div class="shop-coupon">
              <div class="coupon-img">
                <img src="/static/img/share/pindou-img.jpg"/>
              </div>
              <div class="shop-coupon-detail justified">
                <div class="coupon-desc">
                  <div class="coupon-name">买一送一</div>
                  <div class="store-name">袁老四的火锅店</div>
                  <div class="term">2018/03/24至2018/05/24</div>
                </div>
                <div class="use-shop-coupon-btn">使用</div>
              </div>
            </div>
            <div class="shop-coupon">
              <div class="coupon-img">
                <img src="/static/img/share/pindou-img.jpg"/>
              </div>
              <div class="shop-coupon-detail justified">
                <div class="coupon-desc">
                  <div class="coupon-name">买一送一</div>
                  <div class="store-name">袁老四的火锅店</div>
                  <div class="term">2018/03/24至2018/05/24</div>
                </div>
                <div class="use-shop-coupon-btn">使用</div>
              </div>
            </div>
          </div>
        </div>

        <div class="seedo-gifts-wrapper">
          <div class="seedo-gifts-title">喜豆大礼包</div>
          <div class="seedo-gifts-box">
            <div class="seedo-gifts">
              <div class="congratulate">恭喜您获得800喜豆点</div>
              <div class="gifts-desc">累积喜豆点可兑换现金及其他礼物哦</div>
            </div>
          </div>
          <div class="seedo-gifts-box">
            <div class="seedo-gifts">
              <div class="congratulate">恭喜您获得一次发起拼豆豆机会</div>
              <div class="gifts-desc">成为拼主发起拼豆豆获更多奖励</div>
            </div>
          </div>
        </div>
        <div class="hasLogined" v-bind:class="{showLoginedBox: hasCookie, notShowLoginedBox: noCookie}">
          礼包已放入手机号 : {{currentPhoneNum}}
        </div>
        <div class="go-to-download">登录或下载APP即可使用</div>
        <div class="dashed-line"></div>

        <!-- bottom ad -->
        <div class="complete-event-contents-wrapper">
          <div class="ad-wrapper">
            <img v-bind:src="bottomAdUrl" v-on:click="clickBottomAd(landingUrl)">
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
  phone: '',
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
      currentPhoneNum: '',
      countryItems: [],
      phoneNumber: '',
      selectedCountry: 1,
      shopADUrl: null,
      shopEventUrl: null,
      marketUrl: null,
      tmpUser: null,
      bannerUrl: null,
      bottomAdUrl: null,
      rulePicUrl: '',
      landingUrl: '',
      reload: false,
      hasCookie: false,
      noCookie: true
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

    if (vueCookie.get('qr_phone_num')) {
      this.$i18n.phone = vueCookie.get('qr_phone_num')
      this.currentPhoneNum = vueCookie.get('qr_phone_num')
      this.hasCookie = true
      this.noCookie = false
    } else {
      this.hasCookie = false
      this.noCookie = true
    }
    console.log(this.$i18n.phone)
    var getParams = this.$route.params
    this.tmpUser = getParams.tmpUser
    this.shopADUrl = getParams.shopAD
    this.shopEventUrl = getParams.shopEvent
    this.marketUrl = getParams.market
    this.bannerUrl = getParams.banner
    this.bottomAdUrl = getParams.bottomAd
    this.landingUrl = getParams.landingUrl
    // this.yellowItems = ['yellow-' + getParams.yellowBall[0], 'yellow-' + getParams.yellowBall[1], 'yellow-' + getParams.yellowBall[2], 'yellow-' + getParams.yellowBall[3], 'yellow-' + getParams.yellowBall[4], 'yellow-' + getParams.yellowBall[5]]
    // this.greenItems = ['green-' + getParams.greenBall[0]]
    this.yellowItems = [getParams.yellowBall[0], getParams.yellowBall[1], getParams.yellowBall[2], getParams.yellowBall[3], getParams.yellowBall[4], getParams.yellowBall[5]]
    this.greenItems = [getParams.greenBall[0]]

    // 为小于10的球号加0
    this.selectedBlue = []
    this.selectedRed = []
    for (var i = 0; i < this.greenItems.length; i++) {
      if (this.greenItems[i] < 10) {
        this.selectedBlue.push('0' + this.greenItems[i])
      } else {
        this.selectedBlue.push(this.greenItems[i])
      }
    }
    for (i = 0; i < this.yellowItems.length; i++) {
      if (this.yellowItems[i] < 10) {
        this.selectedRed.push('0' + this.yellowItems[i])
      } else {
        this.selectedRed.push(this.yellowItems[i])
      }
    }

    // var ua = navigator.userAgent.toLowerCase()
    // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //   this.reload = false
    // } else {
    //   this.reload = true
    // }

    // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //   this.phoneKind = 'ios'
    // } else if (/(Android)/i.test(navigator.userAgent)) {
    //   this.phoneKind = 'android'
    // }

    // var ua = navigator.userAgent.toLowerCase()
    // if ((ua.match(/MicroMessenger/i) == 'micromessenger') || (ua.match(/QQ/i) == 'qq')) {
    //   this.notWechat = false
    // } else {
    //   this.notWechat = true
    // }

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
    clickBottomAd: function (gotoUrl) {
      window.location.href = gotoUrl
    },
    entryButton: function () {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.phoneKind = 'ios'
      } else if (/(Android)/i.test(navigator.userAgent)) {
        this.phoneKind = 'android'
      }

      var ua = navigator.userAgent.toLowerCase()
      if ((ua.match(/MicroMessenger/i) == 'micromessenger') || (ua.match(/QQ/i) == 'qq')) {
        this.notWechat = false
      } else {
        this.notWechat = true
      }

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

        var getParams = this.$route.params
        this.$router.push({
          name: 'Register',
          params: {
            yellowBall: getParams.yellowBall,
            greenBall: getParams.greenBall,
            type: 'event',
            qrCode: getParams.qrCode,
            countryCode: this.selectedCountry,
            phoneNumber: this.phoneNumber,
            tempUser: this.tmpUser
          }
        })
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
            // var this_ = this
            // if (this.notWechat) {
            //   if (this.phoneKind == 'android') {
            //     window.location.href = 'xidou://app'
            //     window.setTimeout(function () {
            //       this_.$router.push({name: 'AppDown', params: {code: 'default', phoneKind: this_.phoneKind, notWechat: this_.notWechat}})
            //     }, 2000)
            //   } else if (this.phoneKind == 'ios') {
            //     window.location.href = 'seedo://'
            //     window.setTimeout(function () {
            //       this_.$router.push({name: 'AppDown', params: {code: 'default', phoneKind: this_.phoneKind, notWechat: this_.notWechat}})
            //     }, 2000)
            //   }
            // } else {
            //   this_.$router.push({name: 'AppDown', params: {code: 'default', phoneKind: this_.phoneKind, notWechat: this_.notWechat}})
            // }

            // if (this.notWechat) {
            //   if (this.phoneKind == 'android') {
            //     window.location.href = 'xidou://app'
            //     window.setTimeout(function () {
            //       this_.$router.push({name: 'AppDown', params: {code: 'default'}})
            //     }, 1500)
            //   } else if (this.phoneKind == 'ios') {
            //     window.location.href = 'seedo://'
            //     window.setTimeout(function () {
            //       this_.$router.push({name: 'AppDown', params: {code: 'default'}})
            //     }, 1500)
            //   } else {
            //     this_.$router.push({name: 'WechatOpen', params: {code: 'default', phoneKind: this.phoneKind, notWechat: this.notWechat}})
            //   }
            // } else {
            //   this_.$router.push({name: 'WechatOpen', params: {code: 'default', phoneKind: this.phoneKind, notWechat: this.notWechat}})
            // }

            // var responseMessage = response.data.message
            // var responseData = response.data.data
            // console.log(responseMessage)
            // console.log(responseData)
            var phoneNum = document.getElementById('phoneNum').value
            vueCookie.set('qr_phone_num', phoneNum, 1)
            this.$i18n.phone = vueCookie.get('qr_phone_num')
            this.currentPhoneNum = vueCookie.get('qr_phone_num')
            this.$router.push({name: 'AppDown', params: {code: 'default', reload: this.reload, refresh: this.refresh}})
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
      alert(this.$i18n.t('info.click'))
    }
  }
}
</script>

<style scoped>
.showLoginBox, .showLoginedBox{
  display: block;
}
.notShowLoginBox, .notShowLoginedBox{
  display: none;
}

.header-title-wrapper {
  display:table-cell;
  vertical-align:middle;
}

.outer-box{
  background: #57A0FF;
}

.contents-wrapper {
  min-height:calc(100vh - 60px);
}

.complete-event-top-wrapper {
  width: 100vw;
  height: 108vw;
  background-color:#FFFFFF;
  background: url('/static/img/complete/complete-background.png') no-repeat;
  background-size: 100vw 108vw;
  /* padding:10px 20px; */
  text-align:center;
  margin-top: -2px;
  border-top: 1px solid #FFE300;
}
.complete-event-contents-wrapper{
  padding: 20px 15px;
  text-align: center;
}
.event-title {
  text-align:left;
  /* padding-bottom:10px; */
  border-left: 0.4rem solid #FFCB00;
  padding-left: 10px;
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
  /* height:calc((100vw - 110px)/7);
  width:calc((100vw - 110px)/7); */
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-game-img-wrapper {
  /* margin-bottom:20px; */
  /* margin-top: 20px; */
  /* border: 1px solid #000; */
  border-radius: 5px
}
.main-game-img-wrapper img {
  width:100%;
}

.section-divider {
  background-color:#F0F1F3;
  height:10px;
}

.section-divider1 {
  height:10px;
}

.complete-event-bottom-wrapper{
  background: #57A0FF;
  padding-top: 25px;
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
  background-color:#FFAC00;
  border:1px solid #FFAC00;
  border-radius:5px;
  padding:8px 15px;
  color:white;
}

.complete-ball-wrapper {
  width: 90%;
  margin: 5vw 5%;
}

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
  display: none;
  z-index: 1000;
}

.blockScroll {
  width:100%;
  position:fixed;
  overflow-y:scroll;
}

.win-rule{
  display: inline-block;
  margin-top: 63vw;
  margin-bottom: 5.7vw;
  vertical-align: middle;
}
.win-rule img{
  width: 13px;
}

.complete-ball-wrapper-title {
  margin-bottom:10px;
}

.login-wrapper {
  padding: 0px 30px;
  margin-bottom: 18px;
}
.dashed-line{
  width: 100%;
  margin-top: 25px;
  border-bottom: 1px dashed #ffffff;
}

.login-input-wrapper {
  display: flex;
  height:35px;
  padding: 10px 0px;
  background:rgba(255,255,255,1);
  border-radius:5px;
  box-shadow:0px 0px 11px 0px rgba(255,95,87,0.18);
  margin-bottom: 15px;
}

.login-input-wrapper select {
  border: none;
	outline: none;
	appearance:none;
	-moz-appearance:none;
	-webkit-appearance: none;
  background: #fff;
	padding: 0px 13px 0px 20px;
  height:35px;
  color:#000;
  font-size:16px;
  border-right: 1px solid #DDD;
  text-align: center;
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color:#999999;
}
input:-moz-placeholder, textarea:-moz-placeholder {
    color:#999999;
}
input::-moz-placeholder, textarea::-moz-placeholder {
    color:#999999;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:#999999;
}
.phone-number-input {
  flex: 1;
  height:35px;
  border:none;
  color:#666666;
  padding-left: 10px;
  font-size:16px;
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
}

.info-title {
  color:#FFF;
  margin-bottom:25px;
  font-weight:600;
  font-size: 18px;
}

.login-btn {
  height:55px;
  text-align: center;
  line-height: 55px;
  background:rgba(255,226,0,1);
  border-radius:4px;
  box-shadow:0px 0px 11px 0px rgba(87,160,255,0.18);
  font-size: 16px;
  font-weight:600;
  color:rgba(91,57,25,1);
}

.ball-wrapper.yellow, .ball-wrapper.green{
    font-weight: normal;
}
.ball-size-item1 {
  /* width:100%; */
  /* margin-top:calc((90vw - 100px)/25); */
  /* font-size: 5vw; */
  /* font-size: calc((100vw - 110px)/20); */
  font-size: 16px;
}
.lottery-date{
	display: flex;
	width: 88%;
	margin-left: 6%;
	align-items: center;
}
.lottery-date-line{
	border-bottom: 1px solid #FFFFFF;
	flex: 1;
}
.lottery-date-text{
	font-size:16px;
	font-family:"PingFangSC-Light";
	color:#333333;
	margin: 0 20px;
}
.terms{
  font-size: 12px;
  color: #666666;
  text-align: center;
  line-height: 12px;
}
.shop-coupon-wrapper{
  margin-bottom: 20px;
  padding: 0px 15px;
}
.shop-coupon-title, .seedo-gifts-title{
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
}
.shop-coupon-box{
	width: 100%;
  border-bottom: 1px solid #57A0FF;
  border-top: 1px solid #57A0FF;
}

.shop-coupon{
	display: flex;
	background: #FFFFFF;
	padding: 15px;
	margin: 10px 0px;
}
.coupon-img{
	width: 77px;
	height: 77px;
}
.coupon-img img{
	width: 100%;
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
	margin: 10px 0 20px;
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
.seedo-gifts-wrapper{
  padding: 0px 15px;
}
.seedo-gifts-title{
  margin-bottom: 20px;
}
.seedo-gifts-box{
  margin: 10px 0px 10px;
}
.seedo-gifts{
  width: 91vw;
  height: 25vw;
  margin: 0 auto;
  background: url('/static/img/complete/awrad-background.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  color: #5B3919;
  display: table-cell;
  vertical-align: middle;
}
.congratulate{
  font-size: 16px;
  font-weight: 600;
}
.gifts-desc{
  font-size: 11px;
  font-weight: 400;
}
.hasLogined{
  width: 86%;
  margin: 25px auto 0px;
  height:45px;
  background:rgba(116,174,250,1);
  border-radius:5px;
  line-height: 45px;
  text-align: center;
  color: #FFFFFF;
}
.go-to-download{
    width: 86%;
    margin-left: 7%;
    margin-top: 20px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: -webkit-gradient(linear,left top, right top,from(rgba(255,222,0,1)),to(rgba(255,230,0,1)));
    background: linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
    -webkit-box-shadow: 0px 2px 4px 0px rgba(255,226,0,0.3);
    box-shadow: 0px 2px 4px 0px rgba(255,226,0,0.3);
    border-radius: 22px;
}
@media (max-width: 340px){
  .login-input-wrapper select{
    padding: 0px 4px 0px 10px;
  }
}
@media (max-width: 320px){
  .login-input-wrapper select{
    padding: 0px 0px 0px 6px;
  }
}
</style>
