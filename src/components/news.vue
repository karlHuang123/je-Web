<template>
  <div class="news-container">
    <div class="title">
      <div class="">News of</div>
      <div class="">Je Atelier.</div>
      <img src="../../static/image/red-line.png" alt="">
    </div>
    <div class="content-container">
      <div class="content-ele" v-for="(item, index) in news" v-bind:key="index">
        <div class="left-part">
          <div class="sub-title">
            <span>{{item.title}}</span>
            <!-- <img src="../../static/icon/right-bottom-arrow.svg" alt=""> -->
          </div>
          <div class="date">{{ item.created_at }}</div>
          <div class="sub-content-container">
            <div class="context" v-if="item.paragraphs">
              <div v-for="(ele, index) in item.paragraphs" v-bind:key="index">
                {{ ele }}
              </div>
            </div>
            <div class="right-part">
              <img :src="item.images.length === 0 ? '' : item.images[0].url" alt="">
            </div>
          </div>
          <div class="goto-icon" @click="jump(item.link)">
            <img src="../../static/icon/goto-icon.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGet } from '../axios-instance'
export default {
  name: 'je-news',
  props: {
    routerList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      news: []
    }
  },
  methods: {
    getNewsList() {
      fetchGet('/studio/news/list').then(res => {
        this.news = res.data.data
        this.news.forEach(ele => {
          const paragraphs = ele.body.split('\n')
          ele.paragraphs = paragraphs
        })
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
    }
  },
  mounted () {
    this.getNewsList()
  }
}
</script>

<style scoped lang="scss">
.news-container {
  padding-top: 88px;
  color: black;
  .title {
    position: relative;
    text-align: left;
    font-family: "Britannic Bold";
    font-size: 80px;
    font-weight: bold;
    line-height: .9;
    margin-bottom: 157px;
    padding: 0 80px;
    img {
      position: absolute;
      width: 175px;
      height: 23px;
      left: 82px;
      top: 34px;
    }
  }
  .content-container {
    background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 30%, #F7A9A9 70%, #EC3939 100%);
    overflow-y: scroll;
    height: 1565px;
    padding: 0 80px;
    .content-ele {
      margin: 50px auto;
      .left-part {
        text-align: left;
        position: relative;
        .sub-title {
          display: flex;
          align-items: center;
          font-family: "Britannic Bold";
          font-size: 20px;
          border-bottom: 4px solid black;
          padding-bottom: 12px;
          font-weight: bolder;
          img {
            margin-left: auto;
            width: 15px;
            height: 15px;
          }
        }
        .sub-content-container {
          display: -webkit-box;
          margin-top: 10px;
          position: relative;
        }
        .goto-icon {
          cursor: pointer;
        }
        .date {
          margin-top: 18px;
          font-size: 16px;
          // font-family: "HYQiHei";
          font-weight: bolder;
        }
        .context {
          font-family: "Montserrat";
          font-size: 18px;
          flex-grow: 1;
          padding-right: 80px;
        }
        .right-part {
          width: 250px;
          height: 250px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
