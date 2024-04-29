<template>
  <div class="work-details-container" v-if="workDetailsComponent">
    <div class="works-title">
      <span>{{ workDetailsComponent.title_cn }} {{ workDetailsComponent.created_at }}</span>
      <img src="../../static/icon/right-bottom-arrow.svg" alt="">
    </div>
    <div class="works-bodies">
      <div class="bodies-ele" v-for="(item, index) in workDetailsComponent.paragraphs" v-bind:key="index">
        <div v-bind:class="[item ? '' : 'm-20']">{{ item }}</div>
      </div>
    </div>
    <div class="works-images" v-if="workDetailsComponent.images">
      <div class="bodies-ele" v-for="(ele, index) in workDetailsComponent.images" v-bind:key="index">
        <img :src="ele.url" alt="">
        <div class="image-comment">{{ ele.comment }}</div>
      </div>
    </div>
    <detail-footer :projectInfo="workDetailsComponent.paraInfo"></detail-footer>
  </div>
</template>

<script>
import DetailFooter from './details-footer.vue'
export default {
  name: 'je-work-details',
  props: {
    workDetails: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  components: { DetailFooter },
  data () {
    return {
      workDetailsComponent: null
    }
  },
  watch: {
    workDetails: {
      handler(newVal) {
        this.workDetailsComponent = JSON.parse(JSON.stringify(newVal))
        this.workDetailsComponent.images.shift()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.work-details-container {
  padding: 0 60px;
  height: 100%;
  font-family: 'HYQiHei';
  overflow-y: scroll;
  .works-title {
    font-size: 24px;
    font-weight: bolder;
    padding-bottom: 18px;
    border-bottom: 5px solid black;
    display: flex;
    align-items: center;
    margin-bottom: 46px;
    font-family: "HYQiHei Bold";
    img {
      margin-left: auto;
      width: 16px;
      height: 16px;
    }
  }
  .works-bodies {
    text-align: left;
    font-size: 22px;
  }
  .works-images {
    text-align: right;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.67);
    img {
      width: 100%;
      margin-top: 40px;
    }
    .image-comment {
      margin-top: 6px;
    }
  }
}
.m-20 {
  margin: 40px auto
}
</style>
