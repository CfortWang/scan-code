<template>
  <div>
    <header>
      <div class="header-title-wrapper fs-14">
        {{ $t("title") }}
      </div>
    </header>
    <div class="contents-wrapper">
      <div class="top-image-wrapper">
        <img src="/static/img/recommend/game_img.png">
      </div>
      <div class="bottom-contents-wrapper">
        <div class="bottom-text-wrapper">
          <span v-if="currentLanguage === 'en'">
            {{ $t("recommend2") }} <span class="text-bold">{{code}}({{nickname}})</span> {{ $t("recommend1") }}
          </span>
          <span v-else-if="currentLanguage === 'zh'">
            {{ $t("recommend1") }} <span class="text-bold">{{code}}({{nickname}})</span> {{ $t("recommend2") }}
          </span>
          <span v-else>
            <span class="text-bold">{{code}}({{nickname}})</span>{{ $t("recommend1") }} {{ $t("recommend2") }}
          </span>
        </div>
        <div class="bottom-input-wrapper">
          <div class="input-row float-wrapper">
            <input type="text" v-model="countryCode" class="p-l-10 w-30 float-l" disabled>
            <input type="text" v-model="phoneNumber" class="p-l-10 w-65 float-r" disabled>
          </div>
          <div class="input-row">
            <input type="password" v-model="password" placeholder="Password" class="w-100 p-l-10">
          </div>
        </div>
        <div class="bottom-button-wrapper">
          <button type="button" class="btn btn-green fs-12" v-on:click="doRegister">{{ $t("button")}}</button>
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

const langData = require('./lang/confirmRecommend.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})

export default {
  name: 'confirmRecommend',
  i18n: i18n,
  components: {
  },
  data () {
    return {
      countryCode: '',
      countrySeq: '',
      phoneNumber: '',
      password: '',
      code: '',
      nickname: '',
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
    this.phoneNumber = getParams.phoneNumber
    this.nickname = getParams.nickname
    this.code = getParams.code

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
    doRegister: function () {
      this.password = this.password.replace(/ /gi, '')
      if (this.password === '') {
        alert(this.$i18n.t('message.insertPW'))
        return false
      }

      axios({ // qr3355 Login
        method: 'POST',
        url: process.env.api_url + '/api/login/phone-num',
        params: { country: this.countrySeq, phone_num: this.phoneNumber, password: this.password }
      }).then((response) => {
        // var responseMessage = response.data.message
        var responseData = response.data.data
        // console.log(responseMessage)
        // console.log(responseData)
        var qrAccessToken = responseData.token.access_token
        axios({
          method: 'PUT',
          url: process.env.api_url + '/api/user/recommend-user',
          headers: { Accept: 'application/json', Authorization: 'Bearer ' + qrAccessToken },
          params: { recommender_code: this.code }
        }).then((response) => {
          // var responseMessage = response.data.message
          // var responseData = response.data.data
          // console.log(responseMessage)
          // console.log(responseData)
          this.$router.push({name: 'AppDown', params: {code: 'recommend'}})
        }).catch((ex) => {
          console.log(ex)
          var errorResponseData = ex.response.data
          console.log(errorResponseData)
          if (errorResponseData.status === 404) {
            alert(this.$i18n.t('message.wrongCode'))
            return false
          } else if (errorResponseData.status === 409) {
            alert(this.$i18n.t('message.areadyRegist'))
            return false
          } else {
            console.log(ex)
            return false
          }
        })
      }).catch((ex) => {
        console.log(ex)
        var responseStatus = ex.response.status
        var errorResponseData = ex.response.data
        // console.log(responseStatus)
        // console.log(errorResponseData)
        if (responseStatus === 404) {
          alert(this.$i18n.t('message.wrongPhone'))
          return false
        } else if (responseStatus === 400) {
          if (errorResponseData.status === 100) {
            alert(this.$i18n.t('message.wrongPW'))
            return false
          } else {
            console.log(ex)
            return false
          }
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

.top-image-wrapper {
  height:calc((100vh - 120px) / 2);
  text-align:center;
  width:100%;
}

.top-image-wrapper img {
  height:calc((100vh - 120px) / 4);
  padding-top:calc((100vh - 120px) / 8);
}

.bottom-contents-wrapper {
  height:calc((100vh - 120px) / 2);
}

.bottom-contents-wrapper {
  padding:0 50px;
}

.bottom-text-wrapper {
  margin-bottom:20px;
}

.text-bold {
  font-weight:bold;
}

.w-30 {
  width:30%;
}

.w-65 {
  width:65%;
}

.w-100 {
  width:100%;
}

.p-l-10 {
  padding-left:10px;
}

.input-row {
  height:40px;
  margin-bottom:15px;
}

.input-row input {
  height:40px;
  border:0px;
  background-color:#F0F1F2;
  color:#666666;
  border-radius:3px;
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

.bottom-button-wrapper button {
  width:100%;
}
</style>
