import Vue from 'vue'
import Router from 'vue-router'
import AppDown from '@/components/AppDown'
import Recommend from '@/components/Recommend'
import ConfirmRecommend from '@/components/ConfirmRecommend'
import Event from '@/components/Event'
import AD from '@/components/AD'
import Complete from '@/components/Complete'
import Register from '@/components/Register'
import CompleteEvent from '@/components/CompleteEvent'
// import WechatOpen from '@/components/WechatOpen'
import FunnyQuiz from '@/components/share/FunnyQuiz'
import SpellBean from '@/components/share/SpellBean'
import ShopDetails from '@/components/share/ShopDetails'
import PindouDetails from '@/components/share/PindouDetails'
import PayDeposit from '@/components/share/PayDeposit'
import PaySuccess from '@/components/share/PaySuccess'
import ShareRegister from '@/components/share/ShareRegister'
import Login from '@/components/share/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/app',
      // component: (resolve) => require(['@/components/AppDown'], resolve),
      component: AppDown,
      afterEach: (to, from, next) => {
        setTimeout(() => {
          var _hmt = _hmt || []
          window._hmt = _hmt;
          (function () {
            document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
            var hm = document.createElement('script')
            hm.src = 'https://hm.baidu.com/hm.js?a855d76dab351ab3c43db054b6bdb9ed'
            hm.id = 'baidu_tj'
            var s = document.getElementsByTagName('script')[0]
            s.parentNode.insertBefore(hm, s)
          })()
        }, 0)
      }
    },
    {
      path: '/app',
      name: 'AppDown',
      // component: (resolve) => require(['@/components/AppDown'], resolve)
      component: AppDown
    },
    {
      path: '/share/funnyQuiz',
      name: 'FunnyQuiz',
      // component: (resolve) => require(['@/components/share/FunnyQuiz'], resolve)
      component: FunnyQuiz
    },
    {
      path: '/share/spellBean',
      name: 'SpellBean',
      // component: (resolve) => require(['@/components/share/SpellBean'], resolve)
      component: SpellBean
    },
    {
      path: '/share/shopDetails',
      name: 'ShopDetails',
      // component: (resolve) => require(['@/components/share/ShopDetails'], resolve)
      component: ShopDetails
    },
    {
      path: '/share/pindouDetails',
      name: 'PindouDetails',
      // component: (resolve) => require(['@/components/share/PindouDetails'], resolve)
      component: PindouDetails
    },
    {
      path: '/share/payDeposit',
      name: 'PayDeposit',
      // component: (resolve) => require(['@/components/share/PayDeposit'], resolve)
      component: PayDeposit
    },
    {
      path: '/share/paySuccess',
      name: 'PaySuccess',
      // component: (resolve) => require(['@/components/share/PaySuccess'], resolve)
      component: PaySuccess
    },
    {
      path: '/shareRegister',
      name: 'ShareRegister',
      // component: (resolve) => require(['@/components/share/ShareRegister'], resolve)
      component: ShareRegister
    },
    {
      path: '/share/login',
      name: 'Login',
      // component: (resolve) => require(['@/components/share/Login'], resolve)
      component: Login
    },
    {
      path: '/recommend',
      name: 'Recommend',
      // component: (resolve) => require(['@/components/Recommend'], resolve)
      component: Recommend
    },
    {
      path: '/recommend/confirm',
      name: 'ConfirmRecommend',
      // component: (resolve) => require(['@/components/ConfirmRecommend'], resolve),
      component: ConfirmRecommend,
      beforeEnter: (to, from, next) => {
        if (from.path.startsWith('/recommend') || from.path.startsWith('/register')) {
          next()
        } else {
          next('/app')
        }
      }
    },
    {
      path: '/event',
      name: 'Event',
      // component: (resolve) => require(['@/components/Event'], resolve)
      component: Event
    },
    // {
    //   path: '/wechatopen',
    //   name: 'WechatOpen',
    //   component: WechatOpen
    // },
    {
      path: '/ad',
      name: 'AD',
      // component: (resolve) => require(['@/components/AD'], resolve),
      component: AD,
      beforeEnter: (to, from, next) => {
        if (from.path.startsWith('/event')) {
          next()
        } else {
          next('/app')
        }
      }
    },
    {
      path: '/complete',
      name: 'Complete',
      // component: (resolve) => require(['@/components/Complete'], resolve),
      component: Complete,
      beforeEnter: (to, from, next) => {
        if (from.path.startsWith('/ad')) {
          next()
        } else {
          next('/app')
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      // component: (resolve) => require(['@/components/Register'], resolve),
      component: Register,
      beforeEnter: (to, from, next) => {
        if (from.path.startsWith('/complete') || from.path.startsWith('/recommend')) {
          next()
        } else {
          next('/app')
        }
      }
    },
    {
      path: '/complete/event',
      name: 'CompleteEvent',
      // component: (resolve) => require(['@/components/CompleteEvent'], resolve)
      component: CompleteEvent,
      beforeEnter: (to, from, next) => {
        if (from.path.startsWith('/complete') || from.path.startsWith('/register')) {
          next()
        } else {
          next('/app')
        }
      }
    }
  ]
})
