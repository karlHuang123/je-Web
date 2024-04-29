<template>
  <div class="apply-container" v-if="inputData">
    <div class="class-title">
        <div>{{inputData.courseName}}</div>
        <img src="../../../../static/icon/circle-arrow.png" alt="">
    </div>
    <div class="apply-ele-des">
        <div class="triangle-right"></div>
        <div>课程设置：{{ inputData.courseSet }}</div>
    </div>
    <div class="apply-ele-des">
        <div class="triangle-right"></div>
        <div>主讲人：</div>
    </div>
    <div class="mentor">
        <div class="avatar"><img style="object-fit: cover;" :src="inputData.presenter_image" alt=""></div>
        <div class="mentor-info">
            <div class="mentor-name">{{ inputData.presenter }}:</div>
            <div class="mentor-description" v-for="(item, index) in formatString(inputData.presenter_intro)" v-bind:key="index">
                {{ item }}
            </div>
        </div>
    </div>
    <div class="apply-ele-des">
        <div class="triangle-right"></div>
        <div>教材</div>
    </div>
    <div class="textbook">
        <div class="textbook-ele" v-for="(ele, index) in inputData.textbook" v-bind:key="index">
            <div class="cover"><img style="object-fit: cover;" :src="ele.image_url" alt=""></div>
            <div class="comment">{{ ele.comment }}</div>
        </div>
    </div>
    <div class="apply-ele-des">
        <div class="triangle-right"></div>
        <div>参考教材</div>
    </div>
    <div class="textbook">
        <div class="textbook-ele" v-for="(ele, index) in inputData.references" v-bind:key="index">
            <div class="cover"><img style="object-fit: cover;" :src="ele.image_url" alt=""></div>
            <div class="comment">{{ ele.comment }}</div>
        </div>
    </div>
    <div class="apply-ele-des">
        <div class="triangle-right"></div>
        <div>课程简介</div>
    </div>
    <div class="course-intro">
        <div class="mentor-description" v-for="(item, index) in formatString(inputData.courseIntro)" v-bind:key="index">
            {{ item }}
        </div>
    </div>
    <div class="apply-ele-des">
        <div class="triangle-right"></div>
        <div>课程安排</div>
    </div>
    <div class="calendar">
        <div class="calendar-ele" v-for="(item, index) in inputData.courseCalendar" v-bind:key="index">
            <div class="first">第 {{ index + 1}} 回</div>
            <div v-for="(ele, index) in formatString(item.item)" v-bind:key="index">
                {{ ele }}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'examComponent',
  components: {
  },
  props: ['inputData'],
  data () {
    return {
        mentorIntro: null
    }
  },
  methods: {
      formatString(str) {
        let temp = []
        if (str) temp = str.split('\n')
        return temp
      }
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
.apply-container {
    color: black;
    padding: 0 200px 0 0;
    text-align: left;
    .class-title {
        position: relative;
        font-size: 28px;
        margin-top: 50px;
        display: inline-block;
        img {
            position: absolute;
            width: 17px;
            height: 17px;
            top: 23px;
            right: -10px;
        }
    }
    .apply-ele-des {
        font-size: 20px;
        margin-top: 36px;
        font-weight: 500;
        display: flex;
        position: relative;
        .triangle-right {
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-left: 8px solid black;
            border-bottom: 5px solid transparent;
            position: relative;
            top: 11px;
            margin-right: 8px;
        }
    }
    .mentor {
        display: flex;
        padding-left: 40px;
        margin-top: 37px;
        .avatar {
            margin-right: 32px;
            img {
                width: 133px;
                height: 133px;
                border-radius: 50%;
            }
        }
        .mentor-name {
            font-size: 20px;
            font-weight: 500;
        }
    }
    .textbook {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 30px;
        .textbook-ele {
            padding: 0 51px;
            margin-bottom: 20px;
            .cover {
                img {
                    width: 196px;
                    height: 255px;
                }
            }
            .comment {
                margin-top: 4px;
                width: 196px;
                text-align: center;
            }
        }
    }
    .course-intro {
        margin-top: 16px;
        padding-left: 51px;
        padding-bottom: 20px;
        font-family: Arial, Helvetica, sans-serif;
    }
    .calendar {
       padding-left: 51px; 
       margin-top: 16px;
       .calendar-ele {
           font-family: Arial, Helvetica, sans-serif;
           margin-bottom: 20px;
           .first {
               font-size: 16px;
               font-weight: bolder;
           }
       }
    }
}
</style>
