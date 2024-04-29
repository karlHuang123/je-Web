import Vue from 'vue'
import Router from 'vue-router'
// import CasinoDapp from '@/components/casino-dapp'
import Home from '@/pages/home'
import AteliterLayout from '@/pages/ateliter-layout'
import CollegeLayout from '@/pages/college-layout'
import Introduction from '@/pages/introduction-layout/introduction-layout'
import LessonDetails from '@/pages/lesson-details-layout/lesson-details-layout'
import UpgradeInformation from '@/pages/upgrade-information-layout/upgrade-information-layout'
import Resource from '@/pages/resource-layout/resource-layout.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
  scrollBehavior (to, from, saveTop) {
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/je-ateliter',
      name: 'ateliter',
      component: AteliterLayout
    },
    {
      path: '/je-college',
      name: 'college',
      component: CollegeLayout
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: Introduction
    },
    {
      path: '/lesson-details',
      name: 'lesson-details',
      component: LessonDetails
    },
    {
      path: '/upgrade-information',
      name: 'upgrade-information',
      component: UpgradeInformation
    },
    {
      path: '/resource',
      name: 'resource',
      component: Resource
    }
  ]
})
