<template>
  <div class="main-container">
    <header-list :isFromAteliter="true" :routerList="routerList" v-if="routerList" @switchComponent="handleTabChanged"/>
    <div class="sub-container">
      <je-news v-if="activeComponent === 'news'" />
      <je-designers v-if="activeComponent === 'designer'" />
      <je-works v-if="activeComponent === 'works'" @details="handleDetailShow" />
      <je-contact v-if="activeComponent === 'contact'" />
    </div>
    <je-footer v-if="activeComponent !== 'contact' && showFooter" :bgColor="'EC3939'" />
  </div>
</template>

<script>
import HeaderList from '@/components/header'
import JeFooter from '@/components/footer'
import JeNews from '@/components/news'
import JeDesigners from '@/components/designer'
import JeContact from '@/components/contact'
import JeWorks from '@/components/works'
export default {
  name: 'ateliter-layout',
  components: {
    HeaderList,
    JeFooter,
    JeNews,
    JeDesigners,
    JeContact,
    JeWorks
  },
  data () {
    return {
      routerList: null,
      activeComponent: 'news',
      showFooter: true
    }
  },
  methods: {
    handleTabChanged (e) {
      this.activeComponent = e
      this.showFooter = true
      sessionStorage.setItem('ateliterComponent', e)
    },
    handleDetailShow (e) {
      this.showFooter = !e
    }
  },
  mounted () {
    const ateliterComponent = sessionStorage.getItem('ateliterComponent')
    if (ateliterComponent) {
      this.activeComponent = ateliterComponent
    }
    this.routerList = [
      {
        routerName: '新闻',
        component: 'news',
        isActive: this.activeComponent === 'news',
        activeClass: 'activeRed'
      },
      {
        routerName: '作品',
        component: 'works',
        isActive: this.activeComponent === 'works',
        activeClass: 'activeRed'
      },
      {
        routerName: '设计师',
        component: 'designer',
        isActive: this.activeComponent === 'designer',
        activeClass: 'activeRed'
      },
      {
        routerName: '联系我们',
        component: 'contact',
        isActive: this.activeComponent === 'contact',
        activeClass: 'activeRed'
      }
    ]
  }
}
</script>

<style scoped lang="scss">
.main-container {
  .sub-container {
  }
}
</style>
