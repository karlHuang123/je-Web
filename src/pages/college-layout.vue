<template>
  <div class="main-container">
    <header-list :routerList="routerList" v-if="routerList" @switchComponent="handleTabChanged"/>
    <div class="sub-container">
      <je-architecture :lessonList="lessonList" v-if="activeComponent === 'architecture'" />
      <je-engineering :lessonList="lessonList" v-if="activeComponent === 'engineering'" />
      <je-arts :lessonList="lessonList" v-if="activeComponent === 'art'" />
      <je-contact v-if="activeComponent === 'contact'" />
    </div>
    <je-footer v-if="activeComponent !== 'contact'" :bgColor="footerColor" />
  </div>
</template>

<script>
import HeaderList from '@/components/header'
import JeFooter from '@/components/footer'
import JeArchitecture from '@/components/architecture'
import JeEngineering from '@/components/engineering'
import JeArts from '@/components/arts'
import JeContact from '@/components/contact'
import { fetchGet } from '../axios-instance'
export default {
  name: 'ateliter-layout',
  components: {
    HeaderList,
    JeFooter,
    JeArchitecture,
    JeEngineering,
    JeArts,
    JeContact
  },
  data () {
    return {
      routerList: null,
      activeComponent: 'architecture',
      footerColor: 'EC3939',
      lessonList: [],
      show: false
    }
  },
  methods: {
    handleTabChanged (e) {
      this.activeComponent = e
      sessionStorage.setItem('collegeComponent', e)
      this.$router.push(`/je-college?anchor=${e}`)
      switch (e) {
        case 'architecture':
          this.footerColor = 'EC3939'
          this.show = false
          this.getCourseList()
          break
        case 'engineering':
          this.footerColor = '5482A3'
          this.getCourseList()
          break
        case 'art':
          this.footerColor = 'E83468'
          this.getCourseList()
          break
      }
    },
    getImages(discipline, index) {
      fetchGet(`/college/course-detail/discipline-intro/get?department=${this.activeComponent}&discipline=${discipline}`).then(res => {
        this.lessonList[index].image_url = res.data.data ? res.data.data.image_url : '../../static/image/fill-image.png'
        this.lessonList[index].description = res.data.data ? res.data.data.description : ''
      })
    },
    getCourseList() {
      fetchGet(`/college/course-detail/discipline/list?department=${this.activeComponent}`).then(res => {
        this.lessonList = res.data.data
        this.lessonList.forEach((item, index) => {
          this.getImages(item.discipline, index)
        })
        setTimeout(() => {
          this.show = true
        }, 500)
      })
    }
  },
  mounted () {
    const collegeComponent = this.$route.query.anchor ? this.$route.query.anchor : sessionStorage.getItem('collegeComponent')
    if (collegeComponent) {
      this.activeComponent = collegeComponent
      switch (this.activeComponent) {
        case 'architecture':
          this.footerColor = 'EC3939'
          break
        case 'engineering':
          this.footerColor = '5482A3'
          break
        case 'art':
          this.footerColor = 'E83468'
          break
      }
    }
    this.getCourseList()
    this.routerList = [
      {
        routerName: '建筑大类',
        component: 'architecture',
        isActive: this.activeComponent === 'architecture',
        activeClass: 'activeRed'
      },
      {
        routerName: '理工大类',
        component: 'engineering',
        isActive: this.activeComponent === 'engineering',
        activeClass: 'activeBlue'
      },
      {
        routerName: '艺术大类',
        component: 'art',
        isActive: this.activeComponent === 'art',
        activeClass: 'activePink'
      },
      {
        routerName: '堺工作室',
        routerLink: '/je-ateliter',
        isActive: false,
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
.eng {
  font-family: "Montserrat";
  font-weight: bolder;
}
</style>
