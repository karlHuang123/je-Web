<template>
  <div class="works-container">
    <div class="title">
      <div class="">Architecture.</div>
      <img class="line" src="../../static/image/red-line.png" alt="">
      <div class="introduction-logo"><img src="../../static/image/introduction.png" alt=""></div>
    </div>
    <div class="main-section">
      <div class="works-nav">
        <div class="nav-section" v-for="(item, index) in collegeSideData" v-bind:key="index">
          <div class="nav-ele">
            <span>{{item.title}}<span class="eng">{{ item.engTitle }}</span></span>
            <img src="../../static/icon/right-bottom-arrow.svg" alt="">
          </div>
          <div class="section-ele" v-for="(ele, index) in item.element" v-bind:key="index" @click="goToSection(ele.link, ele.tag)">
            {{ ele.title }}
          </div>
        </div>
      </div>
      <div class="section-container">
        <div class="section-title">
          <span>课程详解 Course Details</span>
          <img src="../../static/icon/right-bottom-arrow.svg" alt="">
        </div>
        <div class="lesson-list" v-if="showImage">
          <div class="lesson-ele" v-for="(item, index) in lessonListComponent" v-bind:key="index">
            <div class="ele-bg" @click="goToLessonDetails(item.discipline)" @mouseenter="getImageHeight" @mouseleave="() => { imageHeight = 0 }">
              <img ref="landing" :src="item.image_url" alt="">
              <div class="mask" :style="{height: `${imageHeight}px`, width: `${imageWidth}px`}"></div>
            </div>
            <div class="lesson-title">{{ item.discipline }}</div>
            <!-- <div class="lesson-eng-title">{{ item.engTitle }}</div> -->
            <div class="lesson-description">{{ item.description }}</div>
            <div class="go-to-button" @click="goToLessonDetails(item.discipline)">
              <img class="un-hover" src="../../static/icon/right-arrow-white.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allTempData } from '../../static/constant/temp-data.js'
export default {
  name: 'je-architecture',
  components: {
  },
  props: {
    lessonList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    lessonList: {
      handler(newVal) {
        this.showImage = false
        this.lessonListComponent = newVal
        setTimeout(() => {
          this.showImage = true
        }, 500)
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    return {
      collegeSideData: JSON.parse(JSON.stringify(allTempData.collegeSideBar)),
      lessonListComponent: [],
      showImage: false,
      imageHeight: 0,
      imageWidth: 0
    }
  },
  methods: {
    goToSection (link, tag) {
      // sessionStorage.setItem('collegeSectionTag', tag)
      this.$router.push({
        path: link,
        query: {
          id: 'architecture',
          tag: tag
        }
      })
    },
    goToLessonDetails (tag) {
      this.$router.push({
        path: '/lesson-details',
        query: {
          id: 'architecture',
          tag: tag
        }
      })
    },
    getImageHeight() {
      this.imageHeight = this.$refs.landing[0].offsetHeight
      this.imageWidth = this.$refs.landing[0].offsetWidth
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.works-container {
  background: linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 51.04%, #EC3939 100%);
  color: black;
  text-align: left;
  max-height: 100%;
  overflow-y: scroll;
  .title {
    position: relative;
    text-align: left;
    font-family: "Britannic Bold";
    font-size: 65px;
    font-weight: 800;
    line-height: .9;
    margin-bottom: 157px;
    margin-top: 150px;
    padding: 0 80px;
    .line {
      position: absolute;
      width: 351px;
      height: 23px;
      left: 82px;
      top: 34px;
    }
    .introduction-logo {
      position: absolute;
      right: 78px;
      top: -20px;
      img {
          width: 90px;
      }
    }
  }
  .main-section {
    display: flex;
    max-height: 1480px;
    // font-family: "HYQiHei Bold";
    .works-nav {
      width: 500px;
      padding: 0 87px;
      font-size: 24px;
      .nav-section {
        margin-bottom: 70px;
        .nav-ele {
          padding-bottom: 18px;
          border-bottom: 5px solid black;
          display: flex;
          align-items: center;
          margin-bottom: 55px;
          font-weight: 800;
          font-family: "HYQiHei Bold";
          img {
            margin-left: auto;
            width: 16px;
            height: 16px;
          }
        }
        .section-ele {
          font-weight: 600;
          cursor: pointer;
          margin: 30px auto;
          font-family: 'HYQiHei Light';
        }
        .section-ele:hover {
          color: red;
        }
      }
    }
    .section-container {
      flex: 1;
      width: 100%;
      padding: 0 80px;
      .section-title {
        border-bottom: 5px solid black;
        display: flex;
        align-items: center;
        font-size: 24px;
        padding-bottom: 18px;
        img {
          margin-left: auto;
        }
      }
      .lesson-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .lesson-ele:hover {
          .ele-bg {
            .mask {
              opacity: 1;
            }
          }
          .go-to-button {
            background-color: red;
          }
        }
        .lesson-ele {
          padding-right: 58px;
          margin-bottom: 30px;
          margin-top: 35px;
          position: relative;
          .ele-bg {
            img {
              width: 100%;
            }
            .mask {
              background: linear-gradient(180deg, transparent 0%, transparent 71.04%, #EC3939 100%);
              position: absolute;
              top: 0;
              position: absolute;
              opacity: 0;
              cursor: pointer;
            }
          }
          .lesson-title {
            margin-top: 23px;
            font-size: 20px;
            font-weight: 800;
          }
          .lesson-eng-title {
            font-size: 16px;
            font-weight: 800;
          }
          .lesson-description {
            font-size: 15px;
            color: rgba(0, 0, 0, 0.67);
            // width: 141px;
          }
          .go-to-button {
            width: 21px;
            height: 21px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            background-color: black;
            margin-top: 34px;
            cursor: pointer;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
.active {
  color: black !important;
  border-bottom: 5px solid black !important;
}
.eng {
  font-family: "Montserrat";
  font-weight: bolder;
}
.art-bg {
  background: linear-gradient(90deg, #E83468 1.26%, rgba(240, 122, 156, 0.65625) 4.46%, rgba(255, 255, 255, 0) 6.19%, rgba(255, 255, 255, 0) 93.44%, rgba(240, 122, 156, 0.65625) 95.74%, #E83468 100%);
}
</style>
