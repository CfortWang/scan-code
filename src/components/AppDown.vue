<template>
  <div class="father">
    <div class="app-down-bc" v-bind:class="{showInBroswer: isActive, notShowInBroswer: noActive}">
      <div class="app-down">
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
        <div class="contents-wrapper">
          <div class="app-text-wrapper">
            <div class="main-text-wrapper fs-14" v-if="pageMessageStatus === 200">
              <span v-if="currentLanguage === 'zh'">
                {{ $t("mainText.text1") }} <span class="text-bold">{{ $t("mainText.text2") }}</span><br>{{ $t("mainText.text3") }}
              </span>
              <span v-else>
                <span class="text-bold">{{ $t("mainText.text1") }}</span> {{ $t("mainText.text2") }}<br>{{ $t("mainText.text3") }}
              </span>
            </div>
            <div class="main-text-wrapper fs-14" v-else-if="pageMessageStatus === 400">
              {{ $t("error.invalidCode") }}
            </div>
            <div class="main-text-wrapper fs-14" v-else>
              {{ $t("error.expireCode") }}
            </div>
            <div class="sub-text-wrapper">
              {{ $t("subText.text1") }}<br>{{ $t("subText.text2") }}
            </div>
          </div>
          <div class="app-button-wrapper">
            <button type="button" class="btn down-btn" v-on:click="downloadAndroid">
              <div class="android">
                <img src="/static/img/app_down/android_icon_white.png">
                <div class="android-text fs-11">
                  Android
                </div>
              </div>
            </button>
            <button type="button" class="btn down-btn" v-on:click="downloadIos">
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
    <div class="son" v-bind:class="{showInWechat: noActive, notShowInWechat: isActive}">
      <div class="mask"></div>
      <div class="ready-box">
        <div class="ready-img">
        <img src="http://dev-www.beanpop.cn/img/live_weixin.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vueCookie from 'vue-cookie'

const langData = require('./lang/appdown.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})
export default {
  name: 'appDown',
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
      pageMessageStatus: 200,
      notWechat: '',
      phoneKind: '',
      isActive: null,
      noActive: null
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

    if (this.notWechat) {
      this.isActive = true
      this.noActive = false
      if (this.phoneKind == 'android') {
        window.location.href = 'xidou://app'
      } else if (this.phoneKind == 'ios') {
        window.location.href = 'seedo://'
      } else {
        console.log('why?')
      }
    } else {
      this.isActive = false
      this.noActive = true
    }

    var getParams = this.$route.params
    var getParamCode = ''
    if (getParams.code) {
      getParamCode = getParams.code
    } else {
      getParamCode = 'default'
    }
    // console.log(getParamCode)
    if (getParamCode === 400) {
      this.pageMessageStatus = 400
    } else if (getParamCode === 410) {
      this.pageMessageStatus = 410
    } else {
      this.pageMessageStatus = 200
    }
  },
  methods: {
    changeItem: function (event) {
      vueCookie.set('qr_language', event.target.value, 1)
      this.$i18n.locale = vueCookie.get('qr_language')
      this.currentLanguage = vueCookie.get('qr_language')
    },
    downloadAndroid: function () {
      window.location.href = process.env.appdown_url
    },
    downloadIos: function () {
      window.location.href = 'https://itunes.apple.com/cn/app/%E5%96%9C%E8%B1%86/id1399448154?mt=8'
    }
  }
}
</script>

<style scoped>
#_embed_v3_dc{
  display: none;
}
.son{
  /* display: none; */
}
.showInBroswer{
  display: block;
}
.notShowInBroswer{
  display: none;
}
.showInWechat{
  display: block;
}
.notShowInWechat{
  display: none;
}
.header-title-wrapper {
  display:table-cell;
  vertical-align:middle;
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

.app-down-bc{
  width: 100%;
  height: 100vh;
  background-size:100%;
  background-position:center 110px;
  background-image: url('/static/img/app_down/app_down_bc.jpg');
  z-index: 100;
}
.app-down {
  height:100vh;
  /* background-color:#FFCB00; */
  background-repeat: no-repeat;
  background-size:120%;
  background-position:center 325px;
  background-image: url('/static/img/app_down/app_info.png');
}

.app-text-wrapper {
  padding:50px 40px 20px 40px;
  text-align:center;
  color:#FFFFFF;
}

.main-text-wrapper {
  line-height:30px;
}

.sub-text-wrapper {
  margin-top:20px;
  line-height:25px;
}

.text-bold {
  font-weight:bold;
  color:#FFFFFF;
}

.app-button-wrapper {
  text-align:center;
  padding-bottom:40px;
}

.app-button-wrapper button{
  margin:0 5px;
}

.down-btn {
  background-color:#133461;
  border:1px solid #FFFFFF;
  color:#FFFFFF;
  border-radius:100px;
  /* padding:10px 20px; */
  width:125px;
}

.down-btn img {
  height:20px;
}

.down-btn .android {
  height:20px;
  display:table;
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

.ready-box{
  width: 100%;;
  text-align: center;
  top:0px;
  position: absolute;
  cursor: pointer;
  z-index: 999;
  }.ready-img{
  width: 80%;
  margin-top: 10%;
  margin-left: 13%;
}
.ready-img img{
  width: 100%;
  display: inherit;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  filter: alpha(opacity=80);
  width: 100%;
  height:100%;
  z-index: 100;
}
</style>
