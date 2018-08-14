// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {
//   setTimeout(() => {
//     let _hmt = _hmt || []
//     window._hmt = _hmt
//     (() => {
//       document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
//       let hm = document.createElement('script')
//       hm.src = 'https://hm.baidu.com/hm.js?9129e2c0bb32fff3e4170347beab141e'
//       hm.id = 'baidu_tj'
//       let s = document.getElementsByTagName('script')[0]
//       s.parentNode.insertBefore(hm, s)
//     })()
//   }, 50)
// })
router.afterEach((to, from, next) => {
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function () {
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?9129e2c0bb32fff3e4170347beab141e'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
})
