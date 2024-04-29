<template>
  <div class="members-container">
      <div 
        class="member-ele" 
        v-for="(offer, index) in filterList" 
        v-bind:key="index" 
        @click="jump(offer.link)"
        :id="offer._id">
          <div class="landing-page">
              <img :src="offer.image_url" :style="{ 'height': `${imgBoxHeight}px`}" alt="">
          </div>
          <div class="date">{{ offer.name }}</div>
          <div class="context">
            <div v-for="(ele, index) in offer.paragraphs" v-bind:key="index">
            {{ ele }}
            </div>
          </div>
          <div class="side-hint">&nbsp;&nbsp;&nbsp;&nbsp;合&nbsp;格&nbsp;案&nbsp;例&nbsp;</div>
      </div>
  </div>
</template>

<script>
import { fetchGet } from '../../../axios-instance'
export default {
  name: 'je-case',
  components: {
  },
  props: {
    department: {
      type: String,
      default: () => {
        return null
      }
    },
    major: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      offerList: null,
      filterList: null,
      imgBoxHeight: 0,
    }
  },
  watch: {
    department: {
      handler(newVal) {
        this.getList(newVal)
      }
    },
    major: {
      handler(newVal) {
        if (newVal === '全部案例') {
          this.filterList = this.offerList
        } else {
          this.filterList = this.offerList.filter(item => {
            if (item.tag)
            return item.tag.indexOf(newVal) !== -1
          })
        }
      }
    }
  },
  methods: {
    getList(department, tag = []) {
      fetchGet(`/college/intro/qualified-case/list?department=${department}&${tag}`).then(res => {
        if (res.data.data && typeof res.data.data.length === 'number') {
          this.offerList = res.data.data
          this.offerList.forEach(ele => {
            const paragraphs = ele.description.split('\n')
            ele.paragraphs = paragraphs
          })
          this.filterList = this.offerList
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
    }
  },
  mounted () {
    this.getList(this.department)
    const element = document.getElementsByClassName('section-container')[0];
    const height = element.offsetHeight;
    this.imgBoxHeight = height * 0.45
}
}
</script>

<style scoped lang="scss">
.members-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: black;
    padding-right: 115px;
    padding-left: 30px;
    max-height: 880px;
    overflow-y: scroll;
    .member-ele {
        align-items: center;
        font-size: 16px;
        padding: 20px 0 20px 40px;
        width: 100%;
        position: relative;
        cursor: pointer;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        .member-name {
            margin-top: 20px;
            margin-bottom: 13px;
            text-align: left;
            margin-left: 8px;
        }
        .member-title {
            font-weight: normal;
        }
        .landing-page {
          margin-bottom: 14px;
            img {
                width: 100%;
                object-fit: cover;
            }
        }
        .side-hint {
            position: absolute;
            background-color: red;
            color: white;
            line-height: 1.5;
            text-align: justify;
            vertical-align: middle;
            writing-mode: tb-rl;
            top: 60px;
            left: 28px;
            font-weight: 700;
            font-size: 16px;
            padding: 10px 0;
            border-radius: 6px;
        }
    }
}
</style>
