// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.prototype.moment = moment
Vue.prototype.openApp = function (event) {
  if (event == 'android') {
    window.location.href = 'xidou://app'
    setTimeout(function () {
      window.location.href = 'https://www.beanpop.cn/downloads'
    }, 1300)
  }
  if (event == 'ios') {
    window.location.href = 'seedo://'
    setTimeout(function () {
      window.location.href = 'https://www.beanpop.cn/downloads'
    }, 1300)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.afterEach((to, from, next) => {
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function () {
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?a855d76dab351ab3c43db054b6bdb9ed'
      hm.id = 'baidu_tj'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
})
