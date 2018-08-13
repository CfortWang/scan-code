<template>
    <div>
        <div class="mask"></div>
        <div class="ready-box">
            <div class="ready-img">
            <img src="http://dev-www.beanpop.cn/img/live_weixin.png">
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vueCookie from 'vue-cookie'

const langData = require('./lang/WechatOpen.json')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',
  messages: langData
})
export default {
  name: 'wechatopen',
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
      phoneKind: '',
      notWechat: ''
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
    }
    var getParams = this.$route.params
    this.phoneKind = getParams.phoneKind
    this.notWechat = getParams.notWechat
    console.log(this.notWechat)
    var this_ = this
    if (this.notWechat) {
      if (this.phoneKind == 'android') {
        window.location.href = 'xidou://app'
        window.setTimeout(function () {
          this_.$router.push({name: 'AppDown', params: {code: 'default'}})
        }, 3000)
      } else if (this.phoneKind == 'ios') {
        window.location.href = 'seedo://'
        window.setTimeout(function () {
          this_.$router.push({name: 'AppDown', params: {code: 'default'}})
        }, 3000)
      } else {
        console.log('error')
      }
    } else {
    //   this_.$router.push({name: 'AppDown', params: {code: 'default'}})
    }
  }
}
</script>

<style scoped>
*{
    margin: 0px;
    padding: 0px;
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
