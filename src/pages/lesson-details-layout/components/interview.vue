<template>
  <div class="apply-container">
      <div class="apply-ele" v-for="(item, index) in applyTypeList" v-bind:key="index">
          <div class="apply-ele-title">
            {{ item.title }}
            <div class="apply-ele-img"><img src="../../../../static/icon/circle-arrow.png" alt=""></div>
          </div>
          <div class="apply-ele-des" v-for="(ele, index) in item.para" v-bind:key="index">
              <div class="triangle-right"></div>
              <div>{{ ele }}</div>
          </div>
      </div>
  </div>
</template>

<script>
import { fetchGet } from '../../../axios-instance'
export default {
  name: 'interview',
  components: {
  },
  props: ['department', 'discipline'],
  data () {
    return {
        applyTypeList: []
    }
  },
  methods: {
    getAllpyList() {
      fetchGet(`/college/course-detail/course-content/get?department=${this.department}&discipline=${this.discipline}&subject=面试辅导`).then(res => {
        this.applyTypeList = res.data.data
        this.applyTypeList.forEach(item => {
          const para = item.context.split('\n')
          item.para = para
        })
      })
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
    }
}
</style>
