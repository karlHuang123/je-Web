<template>
  <div class="apply-container">
      <div class="sub-header">
          <div class="header-ele" v-for="(item, index) in courseList" v-bind:key="index" @click="switchHeader(item.courseName, index)">
              <div class="dot" v-bind:class="{'bg-active': classTag === item.courseName}"></div>
              <div class="dot" v-bind:class="{'bg-active': classTag === item.courseName}"></div>
              <div class="header-name" v-bind:class="{active: classTag === item.courseName}">{{ item.courseName }}</div>
              <div class="cross-line" v-if="classTag === item.courseName"></div>
          </div>
      </div>
        <div class="class-container">
            <exam-component :inputData="inputData"></exam-component>
        </div>
  </div>
</template>

<script>
import { fetchGet } from '../../../axios-instance'
import ExamComponent from './exam-component.vue'
export default {
  name: 'exam',
  components: {
    ExamComponent
  },
  props: ['department', 'discipline'],
  data () {
    return {
        classTag: null,
        courseList: [],
        inputData: null
    }
  },
  methods: {
      switchHeader (courseName, index) {
        this.classTag = courseName
        this.inputData = this.courseList[index]
      },
      getCourseList() {
          fetchGet(`/college/course-detail/course-content/get?department=${this.department}&discipline=${this.discipline}&subject=笔试课程`).then(res => {
            this.courseList = res.data.data
            this.classTag = this.courseList[0].courseName
            this.inputData = this.courseList[0]
          })
      }
  },
  mounted () {
    this.getCourseList()
  }
}
</script>

<style scoped lang="scss">
.apply-container {
    color: black;
    padding: 44px 200px 0 0;
    text-align: left;
    .sub-header {
        display: flex;
        flex-wrap: wrap;
        .header-ele {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.45);
            cursor: pointer;
            position: relative;
            margin-right: 60px;
            .dot {
                background-color: rgba(0, 0, 0, 0.45);
                border-radius: 50%;
                width: 6px;
                height: 6px;
                margin-right: 3px;
            }
            .header-name {
                margin-left: 3px;
            }
            .cross-line {
              position: absolute;
              width: 120%;
              border: 1px solid #EC3939;
            }
        }
    }
    .class-container {
        .class-title {
            position: relative;
            font-size: 28px;
            margin-top: 50px;
            display: inline-block;
            img {
                position: absolute;
                width: 17px;
                height: 17px;
                top: 33px;
                right: -10px;
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
