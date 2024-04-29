<template>
  <div :class="background">
    <introduction-header
      :routerList="routerList"
      :dropdownList="dropdownList"
      :department="department"
      v-if="routerList"
      @switchComponent="handleTabChanged"
      @itemClick="handleItemClick"/>
    <div class="main-section" v-if="activeComponent !== 'contact'">
      <div class="works-nav">
        <div style="padding-left: 55px"><img src="../../../static/image/lesson-introduction.png" alt=""></div>
        <div class="nav-section">
          <div class="nav-ele" @click="switchSection('teamMember')">
            <div>团队介绍</div>
            <div class="circle">MEMB</div>
            <div class="cross-line" v-if="tag === 'teamMember'"></div>
          </div>
          <div class="nav-ele" @click="switchSection('collegeLife')">
            <div>塾内生活</div>
            <div class="circle">LIFE</div>
            <div class="cross-line" v-if="tag === 'collegeLife'"></div>
          </div>
          <div class="nav-ele" @click="switchSection('qualifiedCase')">
            <div>合格案例</div>
            <div class="circle">EXAMPLE</div>
            <div class="cross-line" v-if="tag === 'qualifiedCase'"></div>
          </div>
          <div class="nav-ele" @click="switchSection('qualifiedPerformance')">
            <div>合格实绩</div>
            <div class="circle">OFFER</div>
            <div class="cross-line" v-if="tag === 'qualifiedPerformance'"></div>
          </div>
          <div class="year-filter" v-if="tag === 'qualifiedCase'">
            <div 
              class="list-ele" 
              v-bind:class="[item.isActive ? 'bottom-line' : '']"
              v-for="(item, index) in searchOptions" 
              :key="index" 
              @click="selectMajor(item.value)">
              {{ item.value }}
            </div>
          </div>
          <div class="year-filter" v-if="tag === 'qualifiedPerformance'">
            <div 
              class="list-ele" 
              v-bind:class="[item.isActive ? 'bottom-line' : '']"
              v-for="(item, index) in yearList" 
              :key="index" 
              @click="selectYear(item.value)">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
      <div class="section-container">
        <div class="main-title">
          <div v-if="department === 'architecture'">Architecture</div>
          <div v-if="department === 'engineering'">
            <div>Science</div>
            <div class="second-title">&Engineering.</div>
          </div>
          <div v-if="department === 'art'">
            <div>Art</div>
            <div class="second-title">&Design.</div>
          </div>
        </div>
        <team-member v-if="tag === 'teamMember'" :department="department"></team-member>
        <offer v-if="tag === 'qualifiedPerformance'" :department="department" :year="year"></offer>
        <life v-if="tag === 'collegeLife'" :department="department"></life>
        <case v-if="tag === 'qualifiedCase'" :department="department" :major="major"></case>
      </div>
    </div>
    <je-contact v-if="activeComponent === 'contact'" />
    <je-footer v-if="activeComponent !== 'contact'" />
  </div>
</template>

<script>
// import { allTempData } from '../../static/constant/temp-data.js'
import IntroductionHeader from '@/components/introduction-header'
import JeFooter from '@/components/footer'
import TeamMember from './components/team-member.vue'
import Offer from './components/offer.vue'
import Life from './components/life.vue'
import Case from './components/case.vue'
import JeContact from '@/components/contact'
import { fetchGet } from '../../axios-instance'
export default {
  name: 'je-introduction',
  components: {
      IntroductionHeader,
      JeFooter,
      JeContact,
      TeamMember,
      Offer,
      Life,
      Case
  },
  props: {
  },
  data () {
    return {
      department: null,
      tag: null,
      routerList: null,
      background: '',
      activeComponent: '',
      dropdownList: null,
      yearList: [],
      searchOptions: [],
      major: '',
      year: ''
    }
  },
  methods: {
    switchSection (tagName) {
      this.tag = tagName
    },
    handleTabChanged (e) {
      this.activeComponent = e
      this.generateYear()
    },
    handleItemClick (e) {
      this.department = e
      this.getTagList(this.department)
      this.background = this.department + '-bg'
    },
    selectYear(year) {
      this.year = year
      this.yearList.forEach(item => {
        item.isActive = false
        if (item.value == year) {
          item.isActive = true
        }
      })
    },
    selectMajor(major) {
      this.major = major
      this.searchOptions.forEach(item => {
        item.isActive = false
        if (item.value == major) {
          item.isActive = true
        }
      })
    },
    getTagList(department) {
      this.searchOptions = []
      fetchGet(`/college/intro/member/tag/list?department=${department}`).then(res => {
        if (res && res.data.code === 0) {
          res.data.data.forEach(item => {
            const ele = {
              isActive: false,
              value: item.name
            }
            this.searchOptions.push(ele)
          })
        }
        this.searchOptions.unshift({
          isActive: true,
          value: '全部案例'
        })
      })
    },
    generateYear() {
      console.log('hey')
      this.yearList = []
      const date = new Date()
      const year = date.getFullYear()
      for (let i = year; i >= 2017; i--) {
        const ele = {
          isActive: false,
          value: i.toString()
        }
        this.yearList.push(ele)
      }
      this.yearList.unshift({
        isActive: true,
        value: '历年合格总览'
      })
    }
  },
  mounted () {
      this.department = this.$route.query.id
      this.tag = this.$route.query.tag ? this.$route.query.tag : 'teamMember'
      this.background = this.department + '-bg'
      this.getTagList(this.department)
      this.generateYear()
      this.dropdownList = [
        {
          title: '介绍',
          path: 'introduction'
        },
        {
          title: '课程详解',
          path: 'lesson-details'
        },
        {
          title: '升学资讯',
          path: 'upgrade-information'
        },
        {
          title: '资料库',
          path: 'resource'
        }
      ]
      this.routerList = [
      {
        routerName: '建筑大类',
        component: 'architecture',
        isActive: this.activeComponent === 'architecture',
        activeClass: 'activeRed',
        borderClass: 'red-border'
      },
      {
        routerName: '理工大类',
        component: 'engineering',
        isActive: this.activeComponent === 'engineering',
        activeClass: 'activeBlue',
        borderClass: 'blue-border'
      },
      {
        routerName: '艺术大类',
        component: 'art',
        isActive: this.activeComponent === 'art',
        activeClass: 'activePink',
        borderClass: 'pink-border'
      },
      {
        routerName: '堺工作室',
        routerLink: '/je-ateliter',
        isActive: false,
        activeClass: 'activePink'
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
.introduction-container {
}
.main-title {
  font-family: "Britannic Bold";
  font-size: 65px;
  font-weight: 800;
  line-height: .9;
  color: black;
  text-align: right;
  padding-right: 63px;
  margin-bottom: 82px;
}
.main-section {
    display: flex;
    max-height: 980px;
    margin-top: 74px;
    .works-nav {
      width: 260px;
      font-size: 24px;
      color: black;
      img {
        width: 305px;
        margin-bottom: 82px;
      }
      .year-filter::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .year-filter {
        border: 2px solid black;
        border-radius: 8px;
        width: 180px;
        padding: 5px 10px;
        margin-left: 60px;
        max-height: 220px;
        overflow-y: scroll;
        font-size: 18px;
        .list-ele {
          margin: 6px 0;
          cursor: pointer;
        }
      }
      .nav-section {
        margin-bottom: 70px;
        .nav-ele {
          padding: 0 0 0 87px;
          padding-bottom: 18px;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          font-weight: 800;
          cursor: pointer;
          position: relative;
          font-family: "HYQiHei Bold" !important;
          .circle {
              font-size: 10px;
              border-radius: 40px;
              border: 1px solid black;
              padding: 2px 4px;
              background-color: white;
              position: absolute;
              top: 9px;
              left: 177px;
          }
          .cross-line {
              position: absolute;
              width: 234px;
              border: 1.5px solid #EC3939;
              right: -30px;
          }
        }
      }
    }
    .section-container {
      flex: 1;
      width: 100%;
    }
}
.architecture-bg {
  background: linear-gradient(90deg, #EC3939 1.26%, rgba(247, 169, 169, 0.436621) 4.46%, rgba(255, 255, 255, 0) 6.19%, rgba(255, 255, 255, 0) 93.44%, rgba(247, 169, 169, 0.436621) 95.74%, #EC3939 100%);
}
.engineering-bg {
  background: linear-gradient(90deg, #5482A3 1.26%, rgba(122, 158, 183, 0.776042) 4.46%, rgba(255, 255, 255, 0) 6.19%, rgba(255, 255, 255, 0) 93.44%, rgba(122, 158, 183, 0.776042) 95.74%, #5482A3 100%);
}
.art-bg {
  background: linear-gradient(90deg, #E83468 1.26%, rgba(240, 122, 156, 0.65625) 4.46%, rgba(255, 255, 255, 0) 6.19%, rgba(255, 255, 255, 0) 93.44%, rgba(240, 122, 156, 0.65625) 95.74%, #E83468 100%);
}
.second-title {
  position: absolute;
  right: 40px;
}
.bottom-line {
  border-bottom: 2px solid red;
}
</style>
