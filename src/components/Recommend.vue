<template>
  <div>
    <div class="contents-wrapper">
      <header>
        <div class="header-logo-wrapper fs-14">
          <!-- <img src="/static/img/logo/logo_text.png"> -->
          {{ $t("title") }}
        </div>
        <div class="header-language-wrapper">
          <img src="/static/img/icon/language_icon_black.png">
          <div class="header-language-text float-wrapper">
            <select v-on:change="languageChangeItem($event)" class="float-l">
              <option v-for="item in items" v-bind:key="item.index" v-bind:value="item.value" :selected="currentLanguage === item.value">{{item.title}}</option>
            </select>
            <div class="language-arrow-wrapper fs-05 float-l dsp-table">
              <div class="dsp-table-cell">▼</div>
            </div>
          </div>
        </div>
      </header>
      <div class="contents-wrapper">
        <div class="recommend-wrapper">
          <div class="recommend-text-wrapper dsp-table">
            <div class="dsp-table-cell">
              <span class="tl-20 fs-14">{{ $t("info.title") }}</span><br>
              <span class="tl-15">{{ $t("info.remark1") }}<br>
              {{ $t("info.remark2") }}</span>
            </div>
          </div>
          <div class="recommend-img-wrapper">
            <img src="/static/img/recommend/recommend_phone_ko.png" v-if="currentLanguage === 'ko'">
            <img src="/static/img/recommend/recommend_phone_en.png" v-else-if="currentLanguage === 'en'">
            <img src="/static/img/recommend/recommend_phone_zh.png" v-else>
          </div>
          <div class="recommend-recommender-wrapper dsp-table">
            <div class="dsp-table-cell fs-11 tl-15">
              <span class="bold-text">{{code}}({{nickname}})</span> {{ $t("recommend1") }}<br>
              {{ $t("recommend2") }}
            </div>
          </div>
          <div class="recommend-input-wrapper">
            <div class="input-box">
              <div class="input-title">
                {{ $t("input.title") }}
              </div>
              <div class="input-row-wrapper float-wrapper">
                <select class="w-25 float-l" v-on:change="countryChangeItem($event)">
                  <option v-for="item in countryItems" v-bind:key="item.index" v-bind:value="item.seq" :selected="selectedCountry === item.seq">+{{item.calling_code}}</option>
                </select>
                <input type="number" class="phone-number-input w-70 float-r" v-bind:placeholder="$t('input.phonePlaceholder')" v-model="phoneNumber">
              </div>
              <div class="input-button-wrapper">
                <button type="button" class="btn recommend-btn" v-on:click="confirmButton">{{ $t("input.confirmButton") }}</button>
              </div>
            </div>
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

const langData = require('./lang/recommend.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})

export default {
  name: 'recommend',
  i18n: i18n,
  components: {
  },
  data () {
    return {
      items: [
        {title: 'English', value: 'en'},
        {title: '한국어', value: 'ko'},
        {title: '中国', value: 'zh'}
      ],
      currentLanguage: 'zh',
      phoneNumber: '',
      countryItems: [],
      selectedCountry: 1,
      nickname: '',
      code: ''
    }
  },
  created: function () {
    if (vueCookie.get('qr_language')) {
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    } else {
      this.$i18n.locale = 'zh'
      this.currentLanguage = 'zh'
      vueCookie.set('qr_language', 'zh', 1)
      // if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Seoul') {
      //   this.$i18n.locale = 'ko'
      //   this.currentLanguage = 'ko'
      // } else if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Shanghai') {
      //   this.$i18n.locale = 'zh'
      //   this.currentLanguage = 'zh'
      // } else {
      //   this.$i18n.locale = 'en'
      //   this.currentLanguage = 'en'
      // }
    }

    this.nickname = this.$route.query.nickname
    this.code = this.$route.query.recommend_code

    if (!this.nickname || !this.code) {
      this.$router.push({name: 'AppDown', params: {code: 'default'}})
      return false
    }

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
    languageChangeItem: function (event) {
      vueCookie.set('qr_language', event.target.value, 1)
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    },
    confirmButton: function () {
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
          this.$router.push({
            name: 'Register',
            params: {
              type: 'recommend',
              phoneNumber: this.phoneNumber,
              countryCode: this.selectedCountry,
              nickname: this.nickname,
              code: this.code
            }
          })
        }
      }).catch((ex) => {
        console.log(ex)
        var errorResponseData = ex.response.data
        // console.log(errorResponseData)
        // console.log(errorResponseData.status)
        if (errorResponseData.status === 409) {
          if (errorResponseData.data.recommended_user) {
            alert(this.$i18n.t('message.areadyRecommend'))
            this.$router.push({name: 'AppDown', params: {code: 'recommend'}})
          } else {
            this.$router.push({
              name: 'ConfirmRecommend',
              params: {
                phoneNumber: this.phoneNumber,
                countryCode: this.selectedCountry,
                nickname: this.nickname,
                code: this.code
              }
            })
          }
        } else {
          alert(this.$i18n.t('message.wrongRequest'))
          return false
        }
      })
    },
    countryChangeItem: function (event) {
      this.selectedCountry = parseInt(event.target.value)
    }
  }
}
</script>

<style scoped>
.header-logo-wrapper {
  display:table-cell;
  vertical-align:middle;
}

.header-logo-wrapper img {
  height:25px;
}

.header-language-wrapper {
  height:60px;
  margin-right:10px;
  position: absolute;
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
  /* color:#FFFFFF; */
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

.recommend-wrapper {
  border-top:1px solid #CCCCCC;
  /* height:calc(100vh - 61px); */
  height:100%;
  min-height:calc(100vh - 61px);
  /* background-image:url('/static/img/recommend/recommend_bg.jpg');
  background-size:100%; */
  background:#FFCB00;
  color:#FFFFFF;
  text-align:center;
}

.recommend-text-wrapper {
  padding:0px 20px;
  /* height:calc((100vh - 61px) / 5); */
  height:150px;
  width:calc(100vw - 40px);
}

.tl-15 {
  line-height:1.5em;
}

.tl-20 {
  line-height:2em;
}

.recommend-img-wrapper {
  margin:0px 20px;
  height:220px;
  /* height:calc(((100vh - 61px) / 4) * 1.5); */
  position: relative;
  overflow: hidden;
  border-bottom:1px solid #CCCCCC;
}

.recommend-img-wrapper img {
  height:100%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}

.recommend-recommender-wrapper {
  padding:0px 20px;
  /* height:calc(((100vh - 61px) / 4) * 0.5); */
  height:80px;
  width:calc(100vw - 40px);
}

.bold-text {
  font-weight: bold;
}

.recommend-input-wrapper {
  padding:0px 20px;
  margin-bottom:20px;
  /* height:calc((100vh - 61px) / 4); */
}

.input-box {
  background-color:#FFFFFF;
  color:#666666;
  border-radius:5px;
  text-align:left;
  padding:20px 10px;
}

.input-title {
  /* height:calc((((100vh - 61px) / 4) - 40px) * 0.25); */
  height:40px;
}

.input-row-wrapper {
  /* height:calc((((100vh - 61px) / 4) - 40px) * 0.35); */
  height:40px;
}

.input-row-wrapper select {
  height:100%;
  border:1px solid #CCCCCC;
  color:#666666;
  padding:10px;
  border-radius:5px;
  font-size:1em;
}

.phone-number-input {
  /* height:calc(100% - 1px); */
  height:40px;
  border:0px;
  border-bottom:1px solid #CCCCCC;
  color:#666666;
  font-size:1em;
  border-radius:0px;
  padding:0px;
  box-sizing: border-box;
  -webkit-appearance:none;
  -moz-appearance:none;
  -ms-appearance:none;
}

.w-25 {
  width:25%;
}

.w-70 {
  width:70%;
}

/* .input-button-wrapper {
  height:calc((((100vh - 61px) / 4) - 40px) * 0.4);
} */

.recommend-btn {
  width:100%;
  margin-top:10px;
  /* height:calc(100% - 10px); */
  height:40px;
  color:#FFFFFF;
  background-color:#A7AC00;
}
</style>
