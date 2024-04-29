<template>
  <div class="recur-container">
      <div class="recur-title">各校招生简章</div>
      <div class="recur-sub-container">
          <div class="recur-component" v-for="(key, val, index) in recurList" v-bind:key="index">
              <div class="recur-component-title">{{ val }}</div>
              <div class="recur-sub-component">
                <div class="recur-sub-component-ele" v-for="(ele, index) in key" v-bind:key="index" @click="goTo(ele.link)">
                    <div><img :src="'http://www.group-je.com/file/' + ele.image_url" alt=""></div>
                    <div>{{ ele.college_name }}</div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { allTempData } from '../../../../static/constant/temp-data.js'
import { fetchGet } from '../../../axios-instance'
export default {
  name: 'recur',
  components: {
  },
  props: ['department'],
  data () {
    return {
        recurList: allTempData.recurList
    }
  },
  watch: {
    department: {
        handler(newVal) {
            if (newVal) {
                this.getRaise(newVal)
            }
        }
    }
  },
  methods: {
    getRaise(department) {
        fetchGet(`/college/database/raise/list?department=${department}`).then(res => {
            this.recurList = res.data.data
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
    this.getRaise(this.department)
  }
}
</script>

<style scoped lang="scss">
.recur-container {
    text-align: left;
    color: black;
    padding: 0 64px 0 154px;
    font-family: 'HYQiHei';
    max-height: 880px;
    overflow-y: scroll;
    .recur-title {
        font-size: 24px;
        margin-bottom: 20px;
    }
    .recur-sub-container {
        .recur-component {
            margin-bottom: 46px;
            .recur-component-title {
                font-size: 18px;
                margin-bottom: 18px;
            }
            .recur-sub-component {
                display: flex;
                flex-wrap: wrap;
                .recur-sub-component-ele {
                    margin-right: 90px;
                    text-align: center;
                    margin-bottom: 60px;
                    cursor: pointer;
                }
                img {
                    width: 94px;
                    height: 94px;
                    margin-bottom: 13px;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>
