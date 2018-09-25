<template>
  <div class="outer-box">
    <div class="terms-div-wrapper" v-if="rulesOpen">
      <div class="terms-div-header">
        <div class="header-title-wrapper">
          {{ $t("gameRule") }}
        </div>
        <div class="header-back-wrapper" v-on:click="backKey">
          <div class="header-back-arrow">
            <img src="/static/img/icon/goback.png">
          </div>
        </div>
      </div>
      <div class="terms-div-contents">
        <iframe src="https://wap.beanpop.cn/rule"  width='100%' height='100%' frameborder='0' name="_blank" id="_blank"></iframe>
      </div>
    </div>

    <div class="game-rule-box" v-if="qqqq">
      <div class="game-rule">
        <div class="closeRule" v-on:click="closeRule">
          <img src="/static/img/complete/delete_new.png" alt="">
        </div>
        <div class="rule-title">游戏规则：</div>
        <div class="rule-content">
          <div class="rule-number">1</div>
          <div class="rule-text-box">
            <div class="rule-text">喜豆抽奖每次下注消耗20个喜豆点。</div>
            <span class="red-text">6个红球</span>+<span class="blue-text">1个蓝球</span>=1注
          </div>
        </div>
        <div class="rule-content">
          <div class="rule-number">2</div>
          <div class="rule-text-box">
            <div class="rule-text">投注区分为红色球号码区和蓝色球号码区，红色球号码区由1-33共三十三个号码组成，蓝色球号码区由1-16共十六个号码组成。</div>
          </div>
        </div>
        <div class="lottery-desc">开奖说明：开奖时间及开奖结果以双色球为准。</div>
        <div class="award-set">奖项设置:</div>
        <div class="award-detail">
          <img src="/static/img/complete/award-rule.png">
        </div>
        <div class="award-desc">奖品说明：中奖奖品为喜豆点，中奖后24小时内到账。</div>
        <div class="remark">注：游戏最终解释权归深圳喜豆文化发展有限公司所有。</div>
      </div>
    </div>

    <header v-if="showHeader">
      <div class="header-title-wrapper fs-14">
        {{ $t("title") }}
      </div>
    </header>
    <div class="mask blockScroll"></div>
    <div class="contents-wrapper">
      <div class="complete-event-top-wrapper">
        <div class="win-rule" v-on:click="rulesClick" v-if="showHeader">
          <img src="/static/img/complete/rule.png" alt="">
          <span>{{ $t("moreInfo") }}</span>
        </div>
        <div class="win-rule" v-on:click="appRulesClick" v-if="!showHeader">
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
              <span>距离开奖{{leftTime}}</span>
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
          <span>{{roundNow}}期</span>
        </div>
      </div>
      <div class="complete-event-bottom-wrapper">
        <!-- 非扫码进入不显示 -->
        <div class="shop-gift-wrapper" v-if="shopCouponShow">
          <div class="shop-gift-title">{{ $t("event.title1")}}</div>
          <div class="shop-gift-box"></div>
        </div>

        <div class="seedo-gifts-wrapper">
          <div class="seedo-gifts-title">喜豆大礼包</div>
          <div class="seedo-gifts-box" v-on:click="history">
            <img v-bind:src="marketUrl" alt="">
          </div>
          <!-- <div class="seedo-gifts-box" v-on:click="history">
            <div class="seedo-gifts">
              <div class="congratulate">恭喜您获得800喜豆点</div>
              <div class="gifts-desc">累积喜豆点可兑换现金及其他礼物哦</div>
            </div>
          </div>
          <div class="seedo-gifts-box" v-on:click="history">
            <div class="seedo-gifts">
              <div class="congratulate">恭喜您获得一次发起拼豆豆机会</div>
              <div class="gifts-desc">成为拼主发起拼豆豆获更多奖励</div>
            </div>
          </div> -->
        </div>
        <div class="login-wrapper"  v-bind:class="{showLoginBox: noCookie, notShowLoginBox: hasCookie}" v-if="showHeader">
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
            <div class="verification-box clear-fix">
              <input type="text" id="verification" class="verification" v-bind:placeholder="$t('phone.verification')" v-model="verificationCode"/>
              <span class="count-down">01:00</span>
              <button id="get-verification" class="get-verification" v-on:click="getVerification">{{ $t("phone.getVerification") }}</button>
            </div>
            <div class="login-btn">
              <span v-on:click="entryButton">{{ $t("phone.button")}}</span>
            </div>
            <div class="reg-btn">
              <span v-on:click="doRegister">{{ $t("phone.button")}}</span>
            </div>
          </div>
          <!-- <div class="dashed-line"></div> -->
        </div>
        <div class="hasLogined" v-bind:class="{showLoginedBox: hasCookie, notShowLoginedBox: noCookie}">
          礼包已放入手机号 : {{currentPhoneNum}}
        </div>
        <div class="go-to-download" v-bind:class="{showLoginedBox: hasCookie, notShowLoginedBox: noCookie}">登录或下载APP即可使用</div>
        <div class="dashed-line"></div>

        <!-- bottom ad -->
        <!-- <div class="complete-event-contents-wrapper">
          <div class="ad-wrapper">
            <img v-bind:src="bottomAdUrl" v-on:click="clickBottomAd(landingUrl)">
          </div>
        </div> -->
        <div class="complete-event-contents-wrapper" v-if="shopADUrl !== ''">
          <div class="company-event-wrapper">
            <div class="event-img-wrapper">
              <img v-bind:src="shopADUrl">
            </div>
          </div>
        </div>
        <div class="complete-event-contents-wrapper" v-if="shopEventUrl !== ''">
          <div class="company-event-wrapper">
            <div class="event-img-wrapper">
              <img v-bind:src="shopEventUrl">
            </div>
          </div>
        </div>
        <div class="bottom-ad" v-if="!showHeader"></div>
      </div>
      <div class="bottom-btn clear-fix" v-if="!showHeader">
        <div class="play-again" v-on:click="palyAgain">
          <img src="/static/img/complete/bet_finished_btn_replay.png" alt="">
          <span>再玩一次</span>
        </div>
        <div class="go-back" v-on:click="goBack"><span>回到首页</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import vueCookie from 'vue-cookie'
import $ from 'jquery'

const langData = require('./lang/complete.json')

const i18n = new VueI18n({
  locale: 'zh',
  phone: '',
  messages: langData
})

export default {
  name: 'complete',
  i18n: i18n,
  components: {
    // VueCountdown
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
      verificationCode: '',
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
      noCookie: true,
      rulesOpen: false,
      shopCouponShow: false,
      shopCoupon: [],
      device: '',
      shopAdLanding: '',
      lang: '',
      showHeader: false,
      round: '',
      deviceUrl: '',
      qqqq: false,
      leftTime: '',
      roundNow: ''
    }
  },
  created: function () {
    var getParams = this.$route.params
    alert(getParams.market)
    this.lang = getParams.lang
    this.device = getParams.device
    this.shopAdLanding = getParams.shopAdLanding
    this.leftTime = getParams.timeLeft
    this.roundNow = getParams.roundNow
    var qrCode = getParams.qrCode
    console.log(qrCode)
    console.log(this.lang)
    if (!qrCode) {
      this.$i18n.locale = this.lang
      this.shopCouponShow = false
    } else {
      if (this.device == 'ios' || this.device =='android') {
        console.log('app complete')
        this.showHeader = false
        if (this.device == 'ios') {
          this.deviceUrl = 'seedo://'
        }
        if (this.device == 'android') {
          this.deviceUrl = 'xidou://app'
        }
        console.log(this.deviceUrl)
      } else {
        this.showHeader = true
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

        axios({ // Get Country Info
          url: process.env.api_url + '/api/countries'
        }).then((response) => {
          var responseData = response.data.data

          this.countryItems = responseData.data
          this.selectedCountry = parseInt(this.countryItems[0].seq)
        }).catch((ex) => {
          console.log(ex)
        })
      }
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
    this.shopCoupon = getParams.shopCoupon
    console.log(this.shopCoupon)
    console.log(this.marketUrl)

    this.yellowItems = [getParams.yellowBall[0], getParams.yellowBall[1], getParams.yellowBall[2], getParams.yellowBall[3], getParams.yellowBall[4], getParams.yellowBall[5]]
    this.greenItems = [getParams.greenBall[0]]

    if (this.shopCoupon) {
      if (this.shopCoupon.length > 0) {
        this.shopCouponShow = true
        var that = this
        setTimeout(function () {
          let $shopCoupon = '<div class="shop-gift"><div class="gift-img"><img/></div><div class="shop-gift-detail"><div class="gift-desc"><div class="gift-name"></div><div class="store-name"></div><div class="term"><span class="start-date"></span><span class="end-date"></span></div></div><div class="use-shop-gift-btn">使用</div></div></div>'
          let counponLength = that.shopCoupon.length
          // $('.shop-coupon-box').append($shopCoupon)
          console.log(counponLength)
          for (let i = 0; i < counponLength; i++) {
            $('.shop-gift-box').append($shopCoupon)
            let startDate = that.shopCoupon[i].coupon.create_date.split(' ')[0] + '至'
            let endDate = that.shopCoupon[i].coupon.expire_date.date.split(' ')[0]
            let giftImage = that.shopCoupon[i].coupon.shop_logo
            let giftTitle = that.shopCoupon[i].coupon.name
            let shopName = that.shopCoupon[i].coupon.shop_name
            $(".shop-gift-box .shop-gift:eq("+ i +") img").attr('src', giftImage)
            $(".shop-gift-box .shop-gift:eq("+ i +") .gift-name").text(giftTitle)
            $(".shop-gift-box .shop-gift:eq("+ i +") .store-name").text(shopName)
            $(".shop-gift-box .shop-gift:eq("+ i +") .start-date").text(startDate)
            $(".shop-gift-box .shop-gift:eq("+ i +") .end-date").text(endDate)
          }
          $(".use-shop-coupon-btn").click(function () {
            xidou.startPage(1)
          })
        }, 100)
      }
    }

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
    rulesClick: function () {
      this.rulesOpen = true
    },
    appRulesClick: function () {
      // window.location.href = 'https://wap.beanpop.cn/rule'
      // document.getElementsByClassName('game-rule-box')[0].style.display = 'block'
      this.qqqq = true
      document.getElementsByClassName('mask')[0].style.display = 'block'
    },
    closeRule: function () {
      this.qqqq = false
      // document.getElementsByClassName('game-rule-box')[0].style.display = 'none'
      document.getElementsByClassName('mask')[0].style.display = 'none'
    },
    backKey: function () {
      this.rulesOpen = false
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
        // var responseData = response.data.data
        // console.log(responseData)
        document.getElementsByClassName('verification-box')[0].style.display = 'block'
        document.getElementsByClassName('login-btn')[0].style.display = 'none'
        document.getElementsByClassName('reg-btn')[0].style.display = 'block'
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
            // var responseData = response.data.data
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
    },
    timer: function (event) {
      var seconds = parseInt(event % 60) < 10 ? '0' + parseInt(event % 60) : parseInt(event % 60)
      var minutes = parseInt((event / 60) % 60) < 10 ? '0' + parseInt((event / 60) % 60) : parseInt((event / 60) % 60)
      var leftDate = minutes + ':' + seconds
      $(".count-down").text(leftDate)
    },
    getVerification: function () {
      axios({ // get auth code
        method: 'POST',
        url: process.env.api_url + '/api/certifications/phone-num/sign-up',
        params: { phone_num: this.phoneNumber, country: this.selectedCountry }
      }).then((response) => {
        // var responseData = response.data.data
        // console.log(responseData)
        var timeLeft = 59
        this.$options.methods.timer(timeLeft)
        document.getElementById("get-verification").disabled = true
        var that = this
        var t = setInterval(() => {
          that.$options.methods.timer(timeLeft)
          timeLeft--
          if (timeLeft < 0) {
            clearInterval(t)
            document.getElementById("get-verification").disabled = false
          }
        }, 1000)
      }).catch((ex) => {
        console.log(ex)
        alert(this.$i18n.t('message.sendFail'))
        // var errorResponseData = ex.response.data
        // console.log(errorResponseData)
      })
    },
    doRegister: function () {
      if (this.verificationCode === '') {
        alert(this.$i18n.t('message.insertAuthCode'))
        return false
      }
      if (this.verificationCode.length !== 6) {
        alert(this.$i18n.t('message.wrongAuthCodeSize'))
        return false
      }

      axios({ // sign up
        method: 'POST',
        url: process.env.api_url + '/api/register/code',
        params: {
          country: this.selectedCountry,
          phone_num: this.phoneNumber,
          code: this.verificationCode
        }
      }).then((response) => {
        // var responseData = response.data.data
        // console.log(responseData)
        var getParams = this.$route.params
        console.log(getParams)
        if (getParams.type === 'event' || getParams.type === 'code') {
          var qrCode = getParams.qrCode
          var num1 = getParams.yellowBall[0]
          var num2 = getParams.yellowBall[1]
          var num3 = getParams.yellowBall[2]
          var num4 = getParams.yellowBall[3]
          var num5 = getParams.yellowBall[4]
          var num6 = getParams.yellowBall[5]
          var num7 = getParams.greenBall[0]
          var tmpUser = getParams.tempUser

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
              temp_user: tmpUser
            }
          }).then((response) => {
            // var responseData = response.data.data
            // console.log(responseData)

            // save the phone number has been registed success
            // 添加cookie
            // var phoneNum = document.getElementById('phoneNum').value
            // vueCookie.set('qr_phone_num', phoneNum, 1)
            // this.$i18n.phone = vueCookie.get('qr_phone_num')
            // this.currentPhoneNum = vueCookie.get('qr_phone_num')

            this.$router.push({name: 'AppDown', params: {code: 'default'}})
          }).catch((ex) => {
            console.log(ex)
            // var errorResponseData = ex.response.data
            // console.log(errorResponseData)
          })
        } else if (getParams.type === 'recommend') {
          this.$router.push({name: 'AppDown', params: {code: 'recommend'}})
        }
      }).catch((ex) => {
        console.log(ex)
        var responseStatus = ex.response.status
        var errorResponseData = ex.response.data
        // console.log(responseStatus)
        // console.log(errorResponseData)
        if (responseStatus === 404) {
          if (errorResponseData.status === 100) {
            alert(this.$i18n.t('message.wrongRecommendCode'))
            return false
          } else if (errorResponseData.status === 200) {
            alert(this.$i18n.t('message.wrongAuthCode'))
            return false
          } else {
            console.log(ex)
            return false
          }
        } else if (responseStatus === 400) {
          alert(this.$i18n.t('message.wrongAuthCode'))
          return false
        } else {
          console.log(ex)
          return false
        }
      })
    },
    history: function () {
      xidou.startPage(1)
    },
    palyAgain: function () {
      window.location.href = 'http://dev-m.beanpop.cn/event?lang=' + this.lang + '&device=' + this.device
    },
    goBack: function () {
      xidou.startPage(0)
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
.terms-div-wrapper {
  position: absolute;
  z-index:999;
  top:0;
  left:0;
  height:100vh;
  background-color:#FFFFFF;
  width:100%;
}
.terms-div-header {
  background-color:#FFE300;
  display:table;
  text-align:center;
  width:100%;
  height:60px;
  color:#333333;
  font-size: 18px;
}
.header-back-wrapper {
  height:60px;
  width:60px;
  position:fixed;
  left:0;
  top:0;
  bottom:0;
  right:0;
  display:table;
}
.terms-div-contents {
  height: calc(100vh - 70px);
}
.header-back-arrow {
  display:table-cell;
  vertical-align: middle;
}

.header-back-arrow img {
  width:20px;
  height:20px;
  margin-top:5px;
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

.bottom-ad{
  width: 100%;
  height: 50px;
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
  margin-top: 10px;
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

.verification-box{
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  margin: 10px 0px 15px;
  padding: 10px 0px;
  background: #fff;
  line-height: 38px;
  display: none;
}
.verification{
  display: inline-block;
  width: 40%;
  border: none;
  height: 35px;
  padding-left: 10px;
  font-size: 1em;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  color: #666666;
}
.get-verification{
  display: inline-block;
  float: right;
  padding:0px 10px;
  background-color: #a0b7ee;
  height: 38px;
  outline: none;
  border: none;
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

.login-btn, .reg-btn{
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
.reg-btn{
  display: none;
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
.shop-gift-wrapper{
  margin-bottom: 20px;
  padding: 0px 15px;
}
.shop-gift-title, .seedo-gifts-title{
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
}
.shop-gift-box{
	width: 100%;
  border-bottom: 1px solid #57A0FF;
  border-top: 1px solid #57A0FF;
}

/* .shop-gift{
	display: flex;
	background: #FFFFFF;
	padding: 15px;
	margin: 10px 0px;
}
.gift-img{
	width: 77px;
	height: 77px;
}
.gift-img img{
	width: 100%;
	border-radius: 2px;
}
.shop-gift-detail{
	flex: 1;
	padding-left: 15px;
	align-items: center;
}

.gift-name{
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
.use-shop-gift-btn{
	float: right;
	width: 75px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	background:linear-gradient(90deg,rgba(255,222,0,1),rgba(255,230,0,1));
	box-shadow:0px 2px 4px 0px rgba(255,226,0,0.3);
	border-radius:15px;
} */
.seedo-gifts-wrapper{
  padding: 0px 15px;
}
.seedo-gifts-title{
  margin-bottom: 5px;
}
/* .seedo-gifts-box{
  margin: 10px 0px 10px;
} */
.seedo-gifts-box img{
  width: 100%;
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

.bottom-btn{
  /* padding: 10px 20px; */
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 20px;
}
.bottom-btn > div{
  width: 41%;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  height:45px;
  border-radius:4px;
  text-align: center;
  line-height: 45px;
}
.play-again{
  background:rgba(238,104,7,1);
  float: left;
  margin-left: 20px;
}
.go-back{
  background:rgba(105,133,198,1);
  float: right;
  margin-right: 20px;
}
.play-again img{
  vertical-align: baseline;
}

.game-rule-box{
  width: 84%;
  z-index: 9999;
  position: absolute;
  top:5%;
  left:8%;
}
.game-rule{
  padding: 15px;
  font-size: 14px;
  font-family: "PingFangSC-Regular";
  color: #333333;
  background: #FFF;
  border-radius: 15px;
}
.rule-title, .lottery-desc{
  padding-left: 5px;
  margin-bottom: 12px;
}
.rule-content{
  padding-left: 10px;
  margin-bottom: 10px;
  display: flex;
}
.rule-number{
  font-size: 11px;
  color: white;
  background: #333333;
  height: 13px;
  width: 13px;
  text-align: center;
  line-height: 13px;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 3px;
}
.rule-text-box{
  flex: 1;
  color: #666666;
}
.red-text{
  color: #FF5F57;
}
.blue-text{
  color: #3A85E5;
}
.award-set{
  padding-left: 5px;
  margin-bottom: 7px;
}
.award-detail{
  margin-bottom: 30px;
}
.award-detail img{
  width: 100%;
}
.award-desc{
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
}
.remark{
  font-size: 10px;
  text-align: center;
  color: #999999;
}
.closeRule{
  position: absolute;
  right: 20px;
  top: 20px;
}
.closeRule img{
  width: 22px;
}
</style>
