<template>
  <div class="apply-container" v-if="skills">
      <div class="apply-ele">
          <div class="apply-ele-title">
            实技
            <div class="apply-ele-img"><img src="../../../../static/icon/circle-arrow.png" alt=""></div>
          </div>
          <div class="apply-ele-des" v-for="(ele, index) in formatString(skills.context)" v-bind:key="index">
              <div class="triangle-right"></div>
              <div>{{ ele }}</div>
          </div>
          <div class="image-container">
              <div class="images" v-for="(ele, index) in skills.images" v-bind:key="index">
                  <img :src="ele.image_url" alt="">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { fetchGet } from '../../../axios-instance'
export default {
  name: 'skills',
  components: {
  },
  props: ['department', 'discipline'],
  data () {
    return {
        skills: null
    }
  },
  methods: {
    getAllpyList() {
      fetchGet(`/college/course-detail/course-content/get?department=${this.department}&discipline=${this.discipline}&subject=实技`).then(res => {
        this.skills = res.data.data
      })
    },
    formatString(str) {
        let temp = []
        if (str) temp = str.split('\n')
        return temp
    }
  },
  mounted () {
    this.getAllpyList()
  }
}
</script>

<style scoped lang="scss">
.apply-container {
    color: black;
    padding: 44px 200px 0 0;
    text-align: left;
    .apply-ele {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        margin-bottom: 70px;
        .apply-ele-title {
            position: relative;
            display: inline-block;
            font-size: 28px;
            .apply-ele-img {
                img {
                    width: 17px;
                    height: 17px;
                    position: absolute;
                    right: -8px;
                    top: 22px;
                }
            }
        }
        .apply-ele-des {
            font-size: 18px;
            margin-top: 20px;
            display: flex;
            position: relative;
            padding-left: 30px;
            .triangle-right {
                width: 0;
                height: 0;
                border-top: 5px solid transparent;
                border-left: 8px solid black;
                border-bottom: 5px solid transparent;
                position: relative;
                top: 8px;
                margin-right: 8px;
            }
        }
        .image-container {
            margin-top: 56px;
            padding-left: 48px;
            .images {
                margin: 36px 0;
                img {
                    width: 663px;
                    height: 376px;
                }
            }
        }
    }
}
</style>
