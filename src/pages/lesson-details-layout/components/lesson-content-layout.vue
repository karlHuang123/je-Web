<template>
  <div class="content-container">
      <div class="content-header">
          <div class="header-ele" v-for="item in headerList" v-bind:key="item.headerTag" @click="switchHeader(item.headerTag)">
              <div class="dot" :ref="item.lessonTag" v-bind:class="{'bg-active': initHeaderTag === item.headerTag}"></div>
              <div v-bind:class="{active : initHeaderTag === item.headerTag}">{{ item.context }}</div>
              <div class="cross-line" v-if="initHeaderTag === item.headerTag"></div>
          </div>
      </div>
      <div class="components">
          <apply-component v-if="initHeaderTag === 'apply'" :department="department" :discipline="discipline"></apply-component>
          <plan-component v-if="initHeaderTag === 'plan'" :department="department" :discipline="discipline"></plan-component>
          <interview-component v-if="initHeaderTag === 'iterview'" :department="department" :discipline="discipline"></interview-component>
          <subject-component v-if="initHeaderTag === 'subject'" :department="department" :discipline="discipline"></subject-component>
          <exam-component v-if="initHeaderTag === 'exam'" :department="department" :discipline="discipline"></exam-component>
          <essay v-if="initHeaderTag === 'essay'" :department="department" :discipline="discipline"></essay>
          <skills v-if="initHeaderTag === 'skills'" :department="department" :discipline="discipline"></skills>
          <article-component v-if="initHeaderTag === 'article'" :department="department" :discipline="discipline"></article-component>
      </div>
  </div>
</template>

<script>
import { allTempData } from '../../../../static/constant/temp-data.js'
import ApplyComponent from './apply.vue'
import PlanComponent from './plan.vue'
import InterviewComponent from './interview.vue'
import SubjectComponent from './subject.vue'
import ExamComponent from './exam.vue'
import Essay from './essay.vue'
import Skills from './skills.vue'
import ArticleComponent from './article.vue'

export default {
  name: 'lesson-content-layout',
  components: {
      ApplyComponent,
      PlanComponent,
      InterviewComponent,
      SubjectComponent,
      ExamComponent,
      Essay,
      Skills,
      ArticleComponent
  },
  props: ['department', 'discipline'],
  data () {
    return {
        structureList: allTempData.lessonStructure,
        initHeaderTag: 'exam',
        headerList: []
    }
  },
  methods: {
    switchHeader (tagName) {
        this.initHeaderTag = tagName
    }
  },
  mounted () {
    if (this.department === 'art') {
        this.headerList = [
            {
                context: '各类申请',
                headerTag: 'apply'
            },
            {
                context: '研究计划书',
                headerTag: 'plan'
            },
            {
                context: '作品集',
                headerTag: 'essay'
            },
            {
                context: '实技',
                headerTag: 'skills'
            },
            {
                context: '面试辅导',
                headerTag: 'iterview'
            },
            {
                context: '小论文',
                headerTag: 'article'
            },
            {
                context: '专项辅导',
                headerTag: 'subject'
            }
        ]
    } else {
      this.headerList = [
            {
                context: '笔试课程',
                headerTag: 'exam'
            },
            {
                context: '各类申请',
                headerTag: 'apply'
            },
            {
                context: '研究计划书',
                headerTag: 'plan'
            },
            {
                context: '面试辅导',
                headerTag: 'iterview'
            },
            {
                context: '专项辅导',
                headerTag: 'subject'
            }
        ]
    }
  }
}
</script>

<style scoped lang="scss">
.content-container {
    padding: 0 120px;
    .content-header {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        .header-ele {
            display: flex;
            align-items: center;
            font-size: 18px;
            margin-right: 70px;
            cursor: pointer;
            position: relative;
            color: rgba(0, 0, 0, 0.45);
            width: 113px;
            margin-bottom: 20px;
            .dot {
                background-color: rgba(0, 0, 0, 0.45);
                border-radius: 50%;
                width: 6px;
                height: 6px;
                margin-left: 7px;
                margin-right: 10px;
            }
            .cross-line {
              position: absolute;
              width: 159px;
              border: 1px solid #EC3939;
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
