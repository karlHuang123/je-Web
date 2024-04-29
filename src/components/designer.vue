<template>
  <div class="designers-container">
    <div class="title">
      <div class="">Designers of</div>
      <div class="">Je Atelier.</div>
      <img src="../../static/image/red-line.png" alt="">
    </div>
    <div class="member-container">
      <div class="member" v-for="(item, index) in designers" v-bind:key="index">
        <div class="desinger-avator"><img :src="item.avatar" alt=""></div>
        <div class="desinger-name">{{ item.name }}</div>
        <div class="desinger-title">{{ item.title }}</div>
        <div class="desinger-description">{{ item.description }}</div>
      </div>
    </div>
    <div class="reward-list-container">
      <div class="reward-list-header">获奖情况</div>
      <div class="reward-list-box">
        <div v-for="(item, index) in rewardList" :key="index" class="mb-16">
          <span>{{ item.time }}</span>
          <span class="ml-30">{{ item.tag }}</span>
          <span class="ml-20">{{ item.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGet } from '../axios-instance'
export default {
  name: 'je-designers',
  props: {
  },
  data () {
    return {
      designers: [],
      rewardList: []
    }
  },
  methods: {
    getDesignerList() {
      fetchGet('/studio/designer/list').then(res => {
        this.designers = res.data.data
      })
    },
    getRewardlist() {
      fetchGet('/studio/award/list').then(res => {
        this.rewardList = res.data.data
      })
    }
  },
  mounted () {
    this.getDesignerList()
    this.getRewardlist()
  }
}
</script>

<style scoped lang="scss">
.designers-container {
  background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 50%, #F7A9A9 70%, #EC3939 100%);
  padding-top: 88px;
  color: black;
  .title {
    position: relative;
    text-align: left;
    font-family: "Britannic Bold";
    font-size: 80px;
    font-weight: bold;
    line-height: .9;
    margin-bottom: 157px;
    padding: 0 80px;
    img {
      position: absolute;
      width: 352px;
      height: 23px;
      left: 82px;
      top: 34px;
    }
  }
  .member-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 50px;
    .member {
      padding: 0 30px;
      margin-bottom: 120px;
      .desinger-avator {
        width: 100%;
        img {
          width: 215px;
          height: 215px;
          margin: 0 auto;
          border-radius: 50%;
        }
      }
      .desinger-name {
        margin-top: 30px;
        font-size: 22px;
        font-weight: 700;
      }
      .desinger-title {
        font-size: 16px;
        margin-top: 13px;
        font-family: "Montserrat"
      }
      .desinger-description {
        font-size: 16px;
        margin-top: 25px;
        color: rgba(0, 0, 0, 0.67);
        text-align: left;
      }
    }
  }
  .reward-list-container {
    margin-top: 20px;
    text-align: left;
    padding: 0 80px;
    .reward-list-header {
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 24px;
    }
    .reward-list-box {
      font-size: 18px;
    }
  }
}
.ml-30 {
  margin-left: 30px;
}
.ml-20 {
  margin-left: 20px;
}
.mb-16 {
  margin-top: 16px;
}
</style>
