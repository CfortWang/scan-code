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
// import Pop from '@/components/Pop'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/app',
      component: AppDown
    },
    {
      path: '/app',
      name: 'AppDown',
      component: AppDown
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/recommend/confirm',
      name: 'ConfirmRecommend',
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
      component: Event
    },
    // {
    //   path: '/pop',
    //   name: 'Pop',
    //   component: Pop
    // },
    {
      path: '/ad',
      name: 'AD',
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
