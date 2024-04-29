<template>
  <div class="works-container" v-bind:class="[showDetail ? 'bg-detail' : 'bg-list']">
    <div class="title">
      <div class="">Works of</div>
      <div class="">Je Atelier.</div>
      <img src="../../static/image/red-line.png" alt="">
    </div>
    <div class="main-section">
      <div class="works-nav">
        <div class="nav-ele"
          v-bind:class="{ active: item.isActive }"
          v-for="(item, index) in worksList"
          v-bind:key="item.key"
          @click="switchTab(item.key, index)">
          <span>{{ item.text }}</span>
          <img src="../../static/icon/right-bottom-arrow.svg" alt="" v-if="item.isActive">
          <img src="../../static/icon/right-bottom-arrow-grey.svg" alt="" v-else>
        </div>
      </div>
      <div class="section-container">
        <je-works-list :worksEleList="worksEleList" @detailKey="handleDetailClick" v-if="!showDetail"/>
        <je-work-details :workDetails="workDetails" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { allTempData } from '../../static/constant/temp-data.js'
import JeWorksList from '@/components/works-list'
import JeWorkDetails from '@/components/work-details'
import { fetchGet } from '../axios-instance'
export default {
  name: 'je-works',
  components: {
    JeWorksList,
    JeWorkDetails
  },
  props: {
  },
  data () {
    return {
      worksList: null,
      worksEleList: null,
      workDetails: null,
      showDetail: false
    }
  },
  methods: {
    switchTab (key, index) {
      this.worksList.forEach(item => {
        item.isActive = false
      })
      if (key === 'all') {
        this.worksEleList = JSON.parse(JSON.stringify(this.$store.state.worksEleList))
      } else {
        this.getWorksList(key)
      }
      this.worksList[index].isActive = true
      this.showDetail = false
      this.$emit('details', this.showDetail)
    },
    handleDetailClick (e) {
      this.workDetails = this.worksEleList[e.index]
      this.worksList.forEach(item => {
        item.isActive = false
        if (item.key === e.key) {
          item.isActive = true
        }
      })
      this.showDetail = true
      this.$emit('details', this.showDetail)
    },
    getWorksList(category) {
      fetchGet(`/studio/works/list?category=${category}`).then(res => {
        if (!category) this.$store.dispatch('setWorksEleListAct', res.data.data)
        this.worksEleList = res.data.data
      })
    }
  },
  mounted () {
    this.getWorksList('')
    this.worksList = JSON.parse(JSON.stringify(allTempData.worksList))
  }
}
</script>

<style scoped lang="scss">
.works-container {
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
      width: 219px;
      height: 23px;
      left: 82px;
      top: 34px;
    }
  }
  .main-section {
    display: flex;
    grid-template-columns: .4fr .6fr;
    height: 2600px;
    .works-nav {
      width: 500px;
      padding: 0 87px;
      font-size: 24px;
      font-weight: bolder;
      color: #9C9C9C;
      .nav-ele {
        padding-bottom: 18px;
        border-bottom: 5px solid #9C9C9C;
        display: flex;
        align-items: center;
        margin-bottom: 73px;
        cursor: pointer;
        img {
          margin-left: auto;
          width: 16px;
          height: 16px;
        }
      }
    }
    .section-container {
      flex: 1;
      width: 100%;
    }
  }
}
.active {
  color: black !important;
  border-bottom: 5px solid black !important;
}
.bg-list {
  background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 50%, #F7A9A9 70%, #EC3939 100%);
}
.bg-detail {
  background: linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 50%, #ffffff 95%, #EC3939 100%);
}
</style>
