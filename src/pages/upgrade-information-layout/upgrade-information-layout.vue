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
        <div style="padding-left: 55px"><img src="../../../static/image/upgrade-information.png" alt=""></div>
        <div class="nav-section">
          <div class="nav-ele" @click="switchSection('method', 1)">
            <div>留学方式相关</div>
            <div class="circle" style="left: 223px">INTRO</div>
            <div class="cross-line" v-if="tag === 'method'"></div>
          </div>
          <div class="nav-ele" @click="switchSection('collegeSelect', 2)">
            <div>择校相关</div>
            <div class="circle" style="left: 175px">MAJOR</div>
            <div class="cross-line" v-if="tag === 'collegeSelect'"></div>
          </div>
          <div class="nav-ele" @click="switchSection('prepareExam', 3)">
            <div>备考相关</div>
            <div class="circle" style="left: 175px">EXAM</div>
            <div class="cross-line" v-if="tag === 'prepareExam'"></div>
          </div>
          <div class="nav-ele" @click="switchSection('lifeShare', 4)">
            <div>留学生活分享</div>
            <div class="circle" style="left: 223px">SHARE</div>
            <div class="cross-line" v-if="tag === 'lifeShare'"></div>
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
          <method :list="dataList"></method>
        </div>
      </div>
    </div>
    <je-contact v-if="activeComponent === 'contact'" />
    <je-footer v-if="activeComponent !== 'contact'" />
  </div>
</template>

<script>
import IntroductionHeader from '@/components/introduction-header'
import Method from './components/method.vue'
import JeFooter from '@/components/footer'
import JeContact from '@/components/contact'
import { fetchGet } from '../../axios-instance'
export default {
  name: 'je-lesson-details',
  components: {
    IntroductionHeader,
    Method,
    JeFooter,
    JeContact
  },
  props: {
  },
  data () {
    return {
      department: null,
      tag: null,
      routerList: null,
      dropdownList: null,
      background: '',
      activeComponent: '',
      dataList: null,
      tempIndex: 1
    }
  },
  methods: {
    switchSection (tagName, index) {
      this.tag = tagName
      this.tempIndex = index
      this.getList(index)
    },
    handleTabChanged (e) {
      this.activeComponent = e
    },
    handleItemClick (e) {
      this.department = e
      this.background = this.department + '-bg'
      this.tag = 'method'
      this.getList(1)
    },
    getList(index) {
      fetchGet(`college/careers/list?department=${this.department}&category=${index}`).then(res => {
        this.dataList = res.data.data
      })
    }
  },
  mounted () {
      this.department = this.$route.query.id
      this.tag = this.$route.query.tag ? this.$route.query.tag : 'method'
      this.background = this.department + '-bg'
      this.getList(1)
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
    max-height: 1080px;
    margin-top: 74px;
    .works-nav {
      width: 310px;
      font-size: 24px;
      color: black;
      img {
        width: 305px;
        margin-bottom: 82px;
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
          .circle {
              font-size: 10px;
              border-radius: 40px;
              border: 1px solid black;
              padding: 2px 4px;
              background-color: white;
              position: absolute;
              top: 9px;
          }
          .cross-line {
              position: absolute;
              width: 234px;
              border: 1.5px solid #EC3939;
              right: 0px;
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
</style>
