<template>
  <div>
    <div class="terms-div-wrapper" v-if="termsOpen">
      <div class="terms-div-header">
        <div class="header-title-wrapper fs-14">
          {{ $t("terms.title") }}
        </div>
        <div class="header-back-wrapper" v-on:click="backKey">
          <div class="header-back-arrow">
            <img src="/static/img/icon/title_back_icon.png">
          </div>
        </div>
      </div>
      <div class="terms-div-contents">
        <iframe src="http://www.qr3355.cn/policy/policy.html"  width='100%' height='100%' frameborder='0' name="_blank" id="_blank"></iframe>
      </div>
    </div>
    <header>
      <div class="header-title-wrapper fs-14">
        {{ $t("title") }}
      </div>
    </header>
    <div class="contents-wrapper" :class="{ blockScroll: termsOpen }">
      <div class="input-box-wrapper">
        <div class="register-input-wrapper">
          <div class="inline-input-wrapper float-wrapper">
            <div class="input-label w-30 float-l dsp-table">
              <div class="dsp-table-cell">
                {{ $t("phone") }} :
              </div>
            </div>
            <div class="w-70 float-l">
              <div class="input-wrapper float-wrapper">
                <!-- <input type="text" v-model="countryCode" class="p-l-10 w-23 float-l" disabled> -->
                <input type="text" v-model="phoneNumber" class="p-l-10 w-100 float-r">
              </div>
            </div>
          </div>
          <div class="inline-input-wrapper float-wrapper">
            <div class="input-label w-30 float-l dsp-table">
              <div class="dsp-table-cell">
                {{ $t("authCode") }} :
              </div>
            </div>
            <div class="w-70 float-l">
              <div class="input-wrapper float-wrapper">
                <input type="text" class="code-input w-40 float-l" v-model="authCode">
                <div class="timer-wrapper w-20 float-l fs-08">
                  <div class="timer-contents-wrapper float-wrapper">
                    <div class="timer-text-wrapper dsp-table float-l">
                      <vue-countdown :time="countDown" :interval="1000" :auto-start="false" ref="countdown" class="dsp-table-cell">
                        <template slot-scope="props">{{ props.minutes }}:{{ props.seconds }}</template>
                      </vue-countdown>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn code-button w-35 float-r" v-on:click="getAuthCode">{{ $t("authCodeBtn") }}</button>
              </div>
            </div>
          </div>
          <!-- 取消密码输入框 -->
          <!-- <div class="inline-input-wrapper float-wrapper">
            <div class="input-label w-30 float-l dsp-table">
              <div class="dsp-table-cell">
                {{ $t("password1") }} :
              </div>
            </div>
            <div class="w-70 float-l">
              <div class="input-wrapper float-wrapper">
                <input type="password" v-model="password1" class="w-100">
              </div>
              <div class="remark-text fs-08">
                {{ $t("passwordRemark") }}
              </div>
            </div>
          </div> -->
          <div class="inline-input-wrapper float-wrapper" v-if="!isEvent">
            <div class="input-label must-insert w-30 float-l dsp-table">
              <div class="dsp-table-cell">
                {{ $t("recommendCode") }}
              </div>
            </div>
            <div class="w-70 float-l">
              <div class="input-wrapper float-wrapper">
                <input type="text" v-model="recommendCode" class="p-l-10 w-100" :disabled="!isEvent">
              </div>
              <div class="remark-text fs-08">
                {{ $t("recommendRemark") }}
              </div>
            </div>
          </div>
          <div class="terms-wrapper float-wrapper">
            <div class="terms-btn float-l" v-on:click="termsCheck">
              <img src="/static/img/register/signUp_agree.jpg" class="check-img" v-if="termsChecked">
              <img src="/static/img/register/signUp_disagree.jpg" class="check-img" v-else>
            </div>
            <div class="terms-text float-l dsp-table">
              <div class="dsp-table-cell">
                <div v-if="currentLanguage === 'ko'">
                  <span class="text-red" v-on:click="termsOn">{{ $t("terms.text1") }}</span>{{ $t("terms.text2") }}
                </div>
                <div v-else>
                  {{ $t("terms.text2") }}<span class="text-red" v-on:click="termsOn">{{ $t("terms.text1") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-box-wrapper">
        <div class="register-input-wrapper">
          <div class="confirm-button-wrapper">
            <button type="button" class="btn btn-green fs-12" v-on:click="doRegister">{{ $t("register") }}</button>
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
import VueCountdown from '@xkeshi/vue-countdown'

const langData = require('./lang/register.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})

export default {
  name: 'register',
  i18n: i18n,
  components: {
    VueCountdown
  },
  data () {
    var now = new Date()
    var setNow = new Date(now.getTime() + 180000)

    return {
      countryCode: '',
      countrySeq: '',
      phoneNumber: '',
      password1: '',
      password2: '',
      recommendCode: '',
      authCode: '',
      isEvent: true,
      termsChecked: true,
      termsOpen: false,
      countDown: setNow - now,
      currentLanguage: 'zh'
    }
  },
  created: function () {
    var getParams = this.$route.params
    if (vueCookie.get('qr_language')) {
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    } else {
      this.$i18n.locale = 'zh'
      this.currentLanguage = 'zh'
      if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Seoul') {
        this.$i18n.locale = 'ko'
        this.currentLanguage = 'ko'
      } else if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Shanghai') {
        this.$i18n.locale = 'zh'
        this.currentLanguage = 'zh'
      } else {
        this.$i18n.locale = 'en'
        this.currentLanguage = 'en'
      }
    }

    // 注册页面添加区号
    if (getParams.countryCode === 1) {
      this.countryCode = 86
    } else if (getParams.countryCode === 2) {
      this.countryCode = 61
    } else if (getParams.countryCode === 3) {
      this.countryCode = 82
    } else if (getParams.countryCode === 4) {
      this.countryCode = 81
    } else if (getParams.countryCode === 5) {
      this.countryCode = 60
    } else if (getParams.countryCode === 6) {
      this.countryCode = 62
    } else if (getParams.countryCode === 7) {
      this.countryCode = 852
    } else if (getParams.countryCode === 8) {
      this.countryCode = 886
    } else if (getParams.countryCode === 9) {
      this.countryCode = 1
    } else if (getParams.countryCode === 10) {
      this.countryCode = 64
    }

    this.phoneNumber = '+' + this.countryCode + ' ' + getParams.phoneNumber

    if (getParams.type === 'recommend') {
      this.isEvent = false
      this.recommendCode = getParams.code
    }

    axios({ // Get Country Info
      url: process.env.api_url + '/api/countries'
    }).then((response) => {
      // var responseMessage = response.data.message
      var responseData = response.data.data
      // console.log(responseMessage)
      // console.log(responseData)

      for (var i = 0; i < responseData.total_cnt; i++) {
        if (responseData.data[i].seq === getParams.countryCode) {
          this.countrySeq = responseData.data[i].seq
          this.countryCode = '+' + responseData.data[i].calling_code
        }
      }
    }).catch((ex) => {
      console.log(ex)
      // var errorResponseData = ex.response.data
      // console.log(errorResponseData)
    })
  },
  methods: {
    termsCheck: function () {
      if (this.termsChecked === true) {
        this.termsChecked = false
      } else {
        this.termsChecked = true
      }
    },
    termsOn: function () {
      this.termsOpen = true
    },
    backKey: function () {
      this.termsOpen = false
    },
    agreeTerms: function () {
      this.termsOpen = false
      this.termsChecked = true
    },
    getAuthCode: function () {
      var getParams = this.$route.params
      axios({ // get auth code
        method: 'POST',
        url: process.env.api_url + '/api/certifications/phone-num/sign-up',
        params: { phone_num: this.phoneNumber, country: getParams.countryCode }
      }).then((response) => {
        // var responseMessage = response.data.message
        // var responseData = response.data.data
        // console.log(responseMessage)
        // console.log(responseData)
        // alert(this.$i18n.t('message.sendSuccess'))
        var now = new Date()
        var setNow = new Date(now.getTime() + 180000)
        this.countDown = setNow - now
        this.$refs.countdown.init()
        this.$refs.countdown.start()
      }).catch((ex) => {
        console.log(ex)
        alert(this.$i18n.t('message.sendFail'))
        this.isCountDown = false
        // var errorResponseData = ex.response.data
        // console.log(errorResponseData)
      })
    },
    doRegister: function () {
      this.password1 = this.password1.replace(/ /gi, '')
      this.recommendCode = this.recommendCode.replace(/ /gi, '')
      this.authCode = this.authCode.replace(/ /gi, '')
      if (!this.termsChecked) {
        alert(this.$i18n.t('message.termsCheck'))
        return false
      }
      if (this.authCode === '') {
        alert(this.$i18n.t('message.insertAuthCode'))
        return false
      }
      if (this.authCode.length !== 6) {
        alert(this.$i18n.t('message.wrongAuthCodeSize'))
        return false
      }
      // 取消密码输入及验证功能
      // if (this.password1 === '') {
      //   alert(this.$i18n.t('message.insertPW'))
      //   return false
      // }
      // if (this.password1.length < 8 || this.password1.length > 20) {
      //   alert(this.$i18n.t('message.wrongPWSize'))
      //   return false
      // }
      // if (this.recommendCode !== '' && this.recommendCode.length !== 6) {
      //   alert(this.$i18n.t('message.wrongRecommendCodeSize'))
      //   return false
      // }
      axios({ // sign up
        method: 'POST',
        url: process.env.api_url + '/api/register/phone-num',
        params: {
          country: this.countrySeq,
          phone_num: this.phoneNumber,
          password: this.password1,
          code: this.authCode,
          recommendee_user_code: this.recommendCode
        }
      }).then((response) => {
        // var responseMessage = response.data.message
        // var responseData = response.data.data
        // console.log(responseMessage)
        // console.log(responseData)
        var getParams = this.$route.params

        if (getParams.type === 'event') {
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
              country: getParams.countryCode,
              phone_num: getParams.phoneNumber,
              temp_user: tmpUser
            }
          }).then((response) => {
            // var responseMessage = response.data.message
            // var responseData = response.data.data
            // console.log(responseMessage)
            // console.log(responseData)
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
    }
  }
}
</script>

<style scoped>
.header-title-wrapper {
  display:table-cell;
  vertical-align:middle;
}

.arrow-img {
  margin-top:5px;
  height:18px;
}

.input-box-wrapper {
  padding:0 20px 40px 20px;
}

.remark-star {
  text-align:right;
  color:#FFCB00;
}

.register-input-wrapper {
  color:#333333;
}

.text-red {
  color:#F05050;
}

.w-20 {
  width:20%;
}

.w-23 {
  width:23%;
}

.w-30 {
  width:30%;
}

.w-35 {
  width:35%;
}

.w-40 {
  width:40%;
}

.w-45 {
  width:45%;
}

.w-70 {
  width:70%;
}

.w-80 {
  width:80%;
}

.w-100 {
  width:100%;
}

.inline-input-wrapper {
  margin-top:20px;
}

.input-label {
  height:40px;
}

.must-insert {
  color:#FFCB00;
}

.input-wrapper {
  height:40px;
}

.input-wrapper input {
  height:40px;
  border:0px;
  border-bottom:1px solid #CCCCCC;
  box-sizing: border-box;
  -webkit-appearance:none;
  -moz-appearance:none;
  -ms-appearance:none;
}

input:disabled {
  border:0px;
  background-color:#CCCCCC;
  color:#666666;
  border-radius:3px;
}

.p-l-10  {
  padding-left:10px;
}

.remark-text {
  padding-top:10px;
  color:#666666;
}

.divider-box {
  background-color:#F0F1F2;
  height:20px;
}

.confirm-button-wrapper .btn {
  width:100%;
}

.timer-wrapper {
  height:39px;
  border-bottom:1px solid #CCCCCC;
}

.timer-text-wrapper {
  height:39px;
}

.code-button {
  padding:0px;
  height:38px;
  background-color:#FFFFFF;
  color:#666666;
  border:1px solid #666666;
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

.contents-wrapper.blockScroll {
  width:100%;
  position:fixed;
  overflow-y:scroll;
}

.terms-wrapper {
  padding-top:10px;
}

.terms-btn {
  border-radius: 3px;
  padding: 10px 15px 10px 0;
  height:30px;
}

.check-img {
  height:24px;
  margin-top:3px;
}

.terms-text {
  height:50px;
}

.terms-div-header {
  background-color:#FFCB00;
  display:table;
  text-align:center;
  width:100%;
  height:60px;
  color:#FFFFFF;
}

.terms-div-contents {
  height: calc(100vh - 70px);
}

.terms-div-button-wrapper {
  height:50px;
  padding:10px 20px;
}

.terms-div-button-wrapper button {
  width:100%;
  height:100%;
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

.header-back-arrow {
  display:table-cell;
  vertical-align: middle;
}

.header-back-arrow img {
  width:20px;
  height:20px;
  margin-top:5px;
}
</style>
