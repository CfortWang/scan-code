<template>
  <div class="ad-page-wrapper">
    <div class="skip-btn-wrapper" v-if="endCountDown" @click="skipAD">
      <div class="skip-btn fs-12">
        {{ $t("skip") }}
      </div>
    </div>
    <div class="count-down-wrapper" v-else>
      <div class="count-down-circle fs-15">
        {{ $t("wait")}}{{countdownText}}
      </div>
    </div>
    <img v-bind:src="adURL">
  </div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vueCookie from 'vue-cookie'

const langData = require('./lang/ad.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})

export default {
  name: 'ad',
  i18n: i18n,
  data: function () {
    return {
      countdownText: 3,
      endCountDown: false,
      adURL: ''
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
    this.adURL = getParams.skipAD
    var setTimer = 3
    var countDown = setInterval(() => {
      this.countdownText = setTimer
      setTimer = setTimer - 1
      if (setTimer === -1) {
        this.endCountDown = true
        clearInterval(countDown)
        var getParams = this.$route.params
        this.$router.push({
          name: 'Complete',
          params: {
            yellowBall: getParams.yellowBall,
            greenBall: getParams.greenBall,
            type: getParams.type,
            qrCode: getParams.qrCode
          }
        })
      }
    }, 1000)
  },
  methods: {
    skipAD: function () {
      var getParams = this.$route.params
      this.$router.push({
        name: 'Complete',
        params: {
          yellowBall: getParams.yellowBall,
          greenBall: getParams.greenBall,
          type: getParams.type,
          qrCode: getParams.qrCode
        }
      })
    }
  }
}
</script>

<style scoped>
.ad-page-wrapper {
  position: relative;
  width:100vw;
  height:100vh;
  overflow: hidden;
}

.ad-page-wrapper img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100vh;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}

.count-down-wrapper {
  position:absolute;
  z-index:9999;
  top:0;
  right:0;
  /* height:50px; */
  /* width:50px; */
  margin-top:10px;
  margin-right:10px;
  display:table;
  text-align: center;
}

.count-down-circle {
  display:table-cell;
  vertical-align:middle;
  background-color:rgba(255,255,255,0.5);
  padding:10px 15px;
  font-weight: bold;
  border-radius:5px;
}

.skip-btn-wrapper {
  position:absolute;
  z-index:9999;
  top:0;
  right:0;
  /* height:40px;
  width:80px; */
  margin-top:10px;
  margin-right:10px;
  display:table;
  text-align: center;
}

.skip-btn {
  display:table-cell;
  vertical-align:middle;
  background-color:rgba(255,255,255,0.5);
  font-weight: bold;
  padding:10px 15px;
  border-radius:5px;
}
</style>
