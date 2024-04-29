<template>
  <div class="question-container" v-if="questionAndAnswerListComponent">
      <div class="question-ele" v-for="(item, index) in questionAndAnswerListComponent" v-bind:key="index">
          <div class="question-ele-title">
            <div class="ask">Q</div>
            <div>{{ item.q }}</div>
          </div>
          <div class="question-ele-des">
              <div class="ask">A</div>
              <div>{{ item.a }}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'subject',
  components: {
  },
  props: {
    questionAndAnswerList: {
        type: Array,
        default: () => {
            return null
        }
    }
  },
  data () {
    return {
        questionAndAnswerListComponent: null
    }
  },
  watch: {
    questionAndAnswerList: {
      handler(newVal) {
        this.questionAndAnswerListComponent = JSON.parse(JSON.stringify(newVal))
      }
    }
  },
  methods: {
  },
  mounted () {
    this.questionAndAnswerListComponent = JSON.parse(JSON.stringify(this.questionAndAnswerList))
  }
}
</script>

<style scoped lang="scss">
.question-container {
    color: black;
    padding: 50px 173px 0;
    text-align: left;
    max-height: 880px;
    overflow-y: scroll;
    .question-ele {
        font-family: "Britannic Bold";
        font-weight: bold;
        .question-ele-title {
            position: relative;
            display: inline-block;
            font-size: 28px;
            display: flex;
            align-items: baseline;
        }
        .question-ele-des {
            font-size: 18px;
            margin-top: 24px;
            margin-bottom: 70px;
            display: flex;
            position: relative;
            align-items: baseline;
        }
    }
}
.ask {
    margin-right: 32px;
    // font-family: 'Montserrat';
    font-size: 28px;
}
</style>
