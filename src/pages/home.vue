<template>
  <div class="main-container">
    <header-list :routerList="routerList" @switchComponent="handleTabChanged" />
    <div class="main-section" v-if="activeComponent !== 'contact'">
      <div class="main-image" id="main-image">
        <el-carousel indicator-position="none" :height="headerImageHeight" :interval="4000">
          <el-carousel-item v-for="(item, index) in headerImages" :key="index">
            <img class="card-image" :src="item.image_url" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="introduction-section">
      <div class="instruction-container">
        <div class="je-introduction">
          <div class="title-image">
            <img style="margin-left: 70px" src="../../static/icon/je-college-icon.png" alt="">
            <img 
              class="circle-button"
              src="../../static/icon/circle-arrow-right.png" 
              v-bind:class="[isShowCollegeTab ? 'rotate' : '']"
              @click="mouseEnterCollege">
          </div>
          <div class="comment-container" style="margin-top: 10px">
            <div class="content">
              <div class="title flex">
                 <div class="relative">
                   堺塾
                   <img class="one" src="../../static/icon/one.svg" alt="">
                 </div>
                <div class="flex show-tab" v-if="isShowCollegeTab">
                  <div @click="goTo('/je-college', 'architecture')">建筑大类</div>
                  <div @click="goTo('/je-college', 'engineering')">理工大类</div>
                  <div @click="goTo('/je-college', 'art')">设计大类</div>
                </div>
              </div>
              <div style="text-align:left">
                堺塾是日本东京「株式会社堺アトリエ」旗下的留学教育平台，团队成员来自耶鲁大学，东京大学，早稻田大学，东京工业大学，东京艺术大学，芝加哥艺术学院等世界名校。拥有领域内最专业的师资储备及丰富的教学经验。
              </div>
              <div style="text-align:left">目前堺塾分为日本版块，欧洲版块和美国版块，涉及的专业有：</div>
              <div style="text-align:left">建筑大类 「建筑 / 景观 / 城规 / 土木 / 室内」</div>
              <div style="text-align:left">理工大类 「计算机 / 电子电气 / 机械工学 / 空间信息] 等相关理工专业</div>
              <div style="text-align:left">设计大类 「设计 / 工艺 / 舞美 / 平面 / 多媒体 / 映像 / 产品 / 动漫 / 服装」</div>
              <div style="text-align:left">艺术大类 「绘画 / 雕刻 / 先端艺术表现 / 数字艺术 / 艺术学 / 音乐」</div>
            </div>
          </div>
        </div>
        <div class="je-introduction" style="padding-left: 50px">
          <div class="title-image">
            <img src="../../static/icon/je-Ateliter-icon.png" alt="">
          </div>
          <div class="comment-container">
            <div class="content">
              <div class="title">
                <span>堺工作室</span>
                <!-- <img src="../../static/icon/circle-arrow-right.png" alt="" @click="goTo('/je-ateliter', null)"> -->
              </div>
              <div style="text-align:left">堺工作室是日本东京「株式会社堺アトリエ」旗下的工作平台，涉及建筑设计 / 景观设计 / 室内设计 / 产品设计 / 家居设计 / 服装设计 / 策展 / 出版等多项业务。</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hover-img" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <transition 
          name="fade" >
          <div v-show="!hoverd" class="image-container">
            <img src="../../static/image/top-first.png">
          </div>
        </transition>
        <transition name="fade">
          <div v-show="hoverd" class="image-container">
            <img src="../../static/image/top-second.png">
            <div class="college-hover" @mouseenter="enterCollege" @mouseleave="leaveCollege"></div>
            <transition name="fade" :duration="{enter: 1000, leave: 300}">
              <div class="college-list" v-show="collegeShow" @mouseenter="enterCollege" @mouseleave="leaveCollege">
                <div @click="goTo('/je-college', 'architecture')">建筑大类</div>
                <div @click="goTo('/je-college', 'engineering')">理工大类</div>
                <div @click="goTo('/je-college', 'art')">设计大类</div>
              </div>
            </transition>
            <div class="ateliter-hover" @click="goTo('/je-ateliter', null)"></div>
          </div>
        </transition>
      </div>
      <div class="news-section">
        <div class="news-title">
          新闻 News
        </div>
        <div class="black-line"></div>
        <div class="news-container">
          <div 
            class="news-item relative" 
            :style="{'background-image' : `url(${item.images[0].url})`}"
            @click="jump(item.link)" 
            v-for="(item, index) in news" 
            v-bind:key="index">
            <div class="news-title">{{ item.title }} {{item.created_at}}</div>
          </div>
        </div>
      </div>
    </div>
    <je-contact v-if="activeComponent === 'contact'" />
    <je-footer v-if="activeComponent !== 'contact'" :bgColor="'EC3939'" />
  </div>
</template>

<script>
import HeaderList from '@/components/header'
import JeFooter from '@/components/footer'
import JeContact from '@/components/contact'
import { fetchGet } from '../axios-instance'
export default {
  name: 'home',
  components: {
    HeaderList,
    JeFooter,
    JeContact
  },
  data () {
    return {
      routerList: [
        {
          routerName: '堺塾',
          routerLink: '/je-college',
          isActive: false,
          activeClass: 'activeRed'
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
          isActive: false,
          activeClass: 'activeRed'
        }
      ],
      headerImages: [],
      activeComponent: null,
      hoverd: false,
      collegeShow: false,
      landingImg: '../../static/image/top-first.png',
      headerImageHeight: null,
      screenWidth: 0,
      headerImageEle: null,
      isShowCollegeTab: false,
      showNewsHintIndex: null,
      news: null
    }
  },
  computed: {
    balance: function () {
      return this.$store.state.balance
    }
  },
  methods: {
    onChange () {
      this.isDeposited = !this.isDeposited
      this.$emit('handle', this.isDeposited)
    },
    
    goTo (path, anchor) {
      if (anchor) {
        sessionStorage.setItem('collegeComponent', anchor)
      }
      this.$router.push({ 
        path: path,
        query: {
          anchor: anchor
        }
      })
    },
    jump(link) {
        if (link && link !== '') {
          let tempLink = ''
          if (link.includes('https://') || link.includes('http://')) {
            tempLink = link
          } else {
            tempLink = 'https://' + link
          }
          window.open(tempLink)
        }
    },
    handleTabChanged (e) {
      this.activeComponent = e
    },
    handleMouseEnter() {
      this.hoverd = true
      this.landingImg = '../../static/image/top-second.png'
    },
    handleMouseLeave() {
      this.hoverd = false
      this.landingImg = '../../static/image/top-first.png'
    },
    getcarsouelImg() {
      fetchGet('/studio/news/list').then(res => {
        this.news = res.data.data
        this.news.forEach(ele => {
          const paragraphs = ele.body.split('\n')
          ele.paragraphs = paragraphs
        })
      })
    },
    enterCollege() {
      this.collegeShow = true
    },
    leaveCollege() {
      this.collegeShow = false
    },
    getWidth() {
      this.headerImageHeight = '400px'
    },
    mouseEnterCollege() {
      this.isShowCollegeTab = !this.isShowCollegeTab
    },
    getNewsList() {
      fetchGet('/studio/news/list').then(res => {
        this.news = res.data.data
        this.news.forEach(ele => {
          const paragraphs = ele.body.split('\n')
          ele.paragraphs = paragraphs
        })
      })
    },
    getCarouselList() {
      fetchGet('/home/carousel/list').then(res => {
        this.headerImages = res.data.data
      })
    }
  },
  mounted () {
    this.headerImageEle = document.getElementById('main-image')
    this.screenWidth =  this.headerImageEle.clientWidth
		this.getWidth()
    this.getNewsList()
    this.getCarouselList()
    window.onresize = () =>{
      this.headerImageEle = document.getElementById('main-image')
      this.screenWidth =  this.headerImageEle.clientWidth
      this.getWidth()
    }
  }
}
</script>

<style scoped lang="scss">
.main-container {
  .main-section {
    padding: 0 60px 35px;
    height: 400px;
    img {
      width: 100%;
    }
  }
  .introduction-section {
    padding: 60px 60px 120px;
    background: linear-gradient(to bottom, #FFFFFF 0%, #F7A9A9 43.66%, #EC3939 100%);
    .instruction-container{
      display: grid;
      grid-template-columns: 1fr 1fr;
      .je-introduction {
        text-align: center;
        .title-image {
          height: 90px;
          img:first-child {
            width: 500px;
          }
          .circle-button {
            width: 48px;
            height: 48px;
            margin-left: 20px;
            cursor: pointer;
          }
        }
        .comment-container{
          color: black;
          margin-top: 10px;
          .title {
            font-size: 42px;
            font-weight: bold;
            font-family: "Britannic Bold";
            display: flex;
            align-items: center;
            margin-bottom: 40px;
          }
          .content {
            font-size: 20px;
            font-weight: bold;
            width: 500px;
            margin: 0 auto;
          }
          .show-tab {
            font-size: 20px;
            margin-left: 40px;
            background-color: white;
            border: 1px solid black;
            border-radius: 40px;
            padding: 10px 20px;
            div {
              margin: 0 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.hover-img {
  width: 1100px;
  margin: 60px auto 0;
  position: relative;
  height: 640px;
  img {
    width: 100%;
    animation: 2 linear;
  }
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
  }
  .back-btn {
    position: relative;
    img {
      position: relative;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
  .college-hover {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 275px;
    left: 260px;
    cursor: pointer;
  }
  .ateliter-hover {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 275px;
    left: 740px;
    cursor: pointer;
  }
  .college-list {
    position: absolute;
    top: 320px;
    left: 320px;
    font-size: 28px;
    font-weight: bolder;
    z-index: 3;
    color: black;
    div {
      margin: 10px auto;
      cursor: pointer;
    }
  }
}
.news-section {
  color: black;
  .news-title {
    font-size: 28px;
    text-align: left;
    margin-top: 150px;
    font-family: 'Britannic Bold';
  }
  .news-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    .news-item {
      width: 95%;
      height: 230px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin-bottom: 20px;
      cursor: pointer;
      .news-title {
        position: absolute;
        bottom: 0;
        background-color: rgba(217, 217, 217, 0.5);
        font-size: 14px;
        padding: 10px 18px;
        width: 100%;
        font-family: 'HYQiHei Light';
        font-weight: bolder;
      }
    }
  }
}
.black-line {
  width: 100%;
  height: 4px;
  background-color: black;
  margin-top: 10px;
  margin-bottom: 30px;
}
.rotate {
  transform: rotate(90deg);
}
.flex {
  display: flex;
}
.one {
  position: absolute;
  top: 10px;
}
.relative {
  position: relative;
}
</style>
