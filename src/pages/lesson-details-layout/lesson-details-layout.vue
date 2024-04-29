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
        <div><img src="../../../static/image/lesson-details.png" alt=""></div>
        <div class="nav-section">
          <div class="left">
            <div class="nav-ele" v-for="(item) in lessonList" v-bind:key="item._id" @click="switchSection(item.discipline)">
              <div class="course-title">{{ item.discipline }}</div>
              <div class="dot" :ref="item.discipline"></div>
            </div>
          </div>
          <div class="right" v-if="lessonList.length !== 0">
            <div class="nav-ele" v-for="(item) in rightList" v-bind:key="item.tagName" @click="switchRight(item.tag)">
              <div class="dot" style="margin-right: 5px" :ref="item.tag"></div>
              <div>{{ item.title }}</div>
              <div class="circle">{{ item.tagName }}</div>
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
            <div>Arts</div>
            <div class="second-title">&Design.</div>
          </div>
        </div>
        <class-intro v-if="rightTag === 'introduction'" :classIntro="tempObj"></class-intro>
        <lesson-structure v-if="rightTag === 'structure'" :courseStructure="tempObj"></lesson-structure>
        <lesson-content-layout v-if="rightTag === 'class'" :department="department" :discipline="discipline"></lesson-content-layout>
        <online v-if="rightTag === 'audit'" :department="department" :discipline="discipline"></online>
      </div>
    </div>
    <div class="connect-line" v-if="lessonList.length !== 0">
      <svg height="1000" :width="'265'">
        <polyline
          :class="'className'"
          stroke="#EC3939"
          stroke-width="3"
          :points="points"
        />
      </svg>
    </div>
    <je-contact v-if="activeComponent === 'contact'" />
    <je-footer v-if="activeComponent !== 'contact'" />
  </div>
</template>

<script>
import IntroductionHeader from '@/components/introduction-header'
import JeFooter from '@/components/footer'
import JeContact from '@/components/contact'
import ClassIntro from './components/class-introduction.vue'
import LessonStructure from './components/lesson-structure.vue'
import LessonContentLayout from './components/lesson-content-layout.vue'
import Online from './components/online.vue'
import { fetchGet } from '../../axios-instance'
export default {
  name: 'je-lesson-details',
  components: {
      IntroductionHeader,
      JeFooter,
      JeContact,
      ClassIntro,
      LessonStructure,
      LessonContentLayout,
      Online
  },
  props: {
  },
  data () {
    return {
      tag: null,
      routerList: null,
      dropdownList: null,
      background: '',
      department: '',
      activeComponent: '',
      lessonList: [],
      rightList: null,
      points: '',
      rightTag: '',
      tempObj: null,
      discipline: ''
    }
  },
  methods: {
    switchSection (tagName) {
      this.tag = tagName
      this.discipline = tagName
      this.rightTag = 'introduction'
      setTimeout(() => {
        this.points = 
          this.getParentLeft(this.$refs[this.tag]) + ' ' 
          + this.getParentTop(this.$refs[this.tag]) + ' ' 
          + this.getParentLeft(this.$refs[this.rightTag]) + ' ' 
          + this.getParentTop(this.$refs[this.rightTag])
          this.getClassIntro()
      }, 100);
    },
    switchRight (tag) {
      this.rightTag = tag
      switch (tag) {
        case 'introduction':
          this.getClassIntro()
          break
        case 'structure': 
          this.getStructure()
          break
        case 'class': 
          break
        default:
          this.getClassIntro()
          break
      }
      setTimeout(() => {
        this.points = 
          this.getParentLeft(this.$refs[this.tag]) + ' ' 
          + this.getParentTop(this.$refs[this.tag]) + ' ' 
          + this.getParentLeft(this.$refs[this.rightTag]) + ' ' 
          + this.getParentTop(this.$refs[this.rightTag])
      }, 100);
    },
    handleTabChanged (e) {
      this.activeComponent = e
    },
    handleItemClick (e) {
      this.department = e
      this.background = this.department + '-bg'
      this.getCourseList()
    },
    init (tag) {
      // const tag = this.lessonList[0].discipline
      this.rightTag = 'introduction'
      this.discipline = tag ? tag : this.lessonList[0].discipline
      setTimeout(() => {
        this.points = 
          this.getParentLeft(this.$refs[tag]) + ' ' 
          + this.getParentTop(this.$refs[tag]) + ' ' 
          + this.getParentLeft(this.$refs.introduction) + ' ' 
          + this.getParentTop(this.$refs.introduction)
      }, 0)
      this.getClassIntro()
    },
    getParentTop (e) {
      let event
      if (typeof e.length === 'number') {
        event = e[0]
      } else {
        event = e
      }
      var offset = event.offsetTop
      if (event.offsetParent && event.offsetParent != null) {
        offset += this.getParentTop(event.offsetParent)
      }
      return (offset + 0.5)
    },
    /**
     * 获取左侧div的距离
     */
    getParentLeft (e) {
      let event
      if (e && typeof e.length === 'number') {
        event = e[0]
      } else {
        event = e
      }
      var offset = event.offsetLeft
      if (event.offsetParent && event.offsetParent != null) {
        offset += this.getParentLeft(event.offsetParent)
      }
      return (offset + 0.5)
    },
    getCourseList() {
      fetchGet(`/college/course-detail/discipline/list?department=${this.department}`).then(res => {
        this.lessonList = res.data.data
        if (this.lessonList && typeof this.lessonList.length === 'number') {
          console.log(this.$route.query.tag)
          this.tag = this.$route.query.tag ? this.$route.query.tag : this.lessonList[0].discipline
          this.init(this.tag)
        } else {
          this.tempObj = null
        }
      })
    },
    getClassIntro(inter) {
      fetchGet(`/college/course-detail/discipline-intro/get?department=${this.department}&discipline=${this.discipline}`).then(res => {
        this.tempObj = res.data.data
        if (inter) clearInterval(inter)
      })
    },
    getStructure() {
      fetchGet(`/college/course-detail/course-structure/get?department=${this.department}&discipline=${this.discipline}`).then(res => {
        this.tempObj = res.data.data
      })
    }
  },
  mounted () {
      this.department = this.$route.query.id
      this.background = this.department + '-bg'
      this.getCourseList()
      const getClass = setInterval(() => {
        if (this.discipline) {
          console.log(this.discipline)
          this.getClassIntro(getClass)
        }
      }, 100)
      this.rightList = [
        {
          title: '学科介绍',
          tag: 'introduction',
          tagName: 'INTRO'
        },
        {
          title: '课程架构',
          tag: 'structure',
          tagName: 'STRUC'
        },
        {
          title: '授课内容',
          tag: 'class',
          tagName: 'CLASS'
        },
        {
          title: '线上试听',
          tag: 'audit',
          tagName: 'AUDIT'
        }
      ]
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
        activeClass: 'activePink'
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
    // max-height: 980px;
    margin-top: 74px;
    .works-nav {
      width: 330px;
      font-size: 20px;
      color: black;
      margin-left: 87px;
      img {
        width: 305px;
        margin-bottom: 82px;
      }
      .nav-section {
        margin-bottom: 70px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        .nav-ele {
          padding-bottom: 18px;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          font-weight: 800;
          cursor: pointer;
          position: relative;
          .dot {
            background-color: black;
            border-radius: 50%;
            width: 6px;
            height: 6px;
            margin-left: 7px;
          }
          .course-title {
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            width: 120px;
            text-align: left;
          }
          .circle {
            font-size: 10px;
            border-radius: 40px;
            border: 1px solid black;
            padding: 2px 4px;
            margin-top: 4px;
            margin-left: 10px;
            position: relative;
            left: -15px;
            background-color: white;
          }
        }
      }
    }
    .section-container {
      flex: 1;
      width: 100%;
    }
}
.works-nav {
  position: relative;
}
.connect-line {
  position: absolute;
  top: 0;
  z-index: -1;
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
</style>
