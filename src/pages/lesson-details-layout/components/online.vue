<template>
  <div class="content-container">
      <div class="online">
          <div class="online-ele" v-for="(item, index) in onlineList" v-bind:key="index">
              <div class="cover"><img :src="item.image_url" alt=""></div>
              <div class="des">
                  {{ item.title }}
                  <img src="../../../../static/icon/header-icon.png" alt="" @click="goTo(item.link)">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { fetchGet } from '../../../axios-instance'

export default {
  name: 'lesson-content-layout',
  components: {

  },
  props: ['department', 'discipline'],
  data () {
    return {
        onlineList: []
    }
  },
  methods: {
      getOnlineList() {
          fetchGet(`/college/course-detail/online-experience/list?department=${this.department}&discipline=${this.discipline}`).then(res => {
            this.onlineList = res.data.data
          })
      },
      goTo(link) {
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
    this.getOnlineList()
  }
}
</script>

<style scoped lang="scss">
.content-container {
    max-height: 980px;
    overflow-y: scroll;
    padding: 10px 50px;
    .online {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        .online-ele {
            padding: 0 30px;
            .cover {
                img {
                    width: 300px;
                    height: 184px;
                    object-fit: cover;
                }
            }
            .des {
                margin: 0 auto 23px;
                width: 300px;
                text-align: right;
                img {
                    width: 13px;
                    height: 13px;
                    position: relative;
                    top: -1px;
                    margin-left: 10px;
                    cursor: pointer;
                }
            }
        }
    }
}
.active {
    color: black !important;
}
.bg-active {
    background-color: black !important;
}
</style>
