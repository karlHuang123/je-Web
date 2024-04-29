<template>
  <div class="works-list-container">
    <div class="works-title">
      <span>项目一览</span>
      <img src="../../static/icon/right-bottom-arrow.svg" alt="">
    </div>
    <div class="works-container">
      <div class="works-ele" ref="ele" v-for="(item, index) in worksEleList" v-bind:key="index">
        <div 
          class="image" 
          v-bind:style="{height: `${height}px`}"
          @click="goToDetail(item.category, index)">
          <img v-if="height" :src="item.images[0].url" alt="">
        </div>
        <!-- <div class="ele-title">{{ item.title_cn }}</div>
        <div class="ele-sub-title">{{ item.title_en }}, {{ item.created_at }}</div>
        <div class="ele-description" v-if="item.paragraphs">{{ item.paragraphs[0] }}</div>
        <div class="go-to-button" @click="goToDetail(item.category, index)"><img src="../../static/icon/header-icon.png" alt=""></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'je-works-list',
  props: {
    worksEleList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      worksList: null,
      imageWidth: 0,
      height: null
    }
  },
  methods: {
    goToDetail (key, index) {
      this.$emit('detailKey', {key: key, index: index})
    },
    formtPara(string) {
      while (string.indexOf("\\n") >= 0) { 
        var str2 = string.replace("\\n", " \n ")
        return str2
      }
    },
    splitPara() {
      this.worksEleList.forEach(element => {
        if (element.body) {
          const paragraphs = element.body.split('\n')
          element.paragraphs = paragraphs
        }
        if (element.project_info) {
          const paraInfo = element.project_info.split('\n')
          element.paraInfo = paraInfo
        }
      });
      console.log(this.worksEleList)
    },
    getHeight() {
      this.imageWidth = this.$refs.ele ? this.$refs.ele[0].offsetWidth : 0
      this.height = this.imageWidth
    }
  },
  watch: {
    worksEleList: {
      handler(newVal) {
        if (newVal) {
          this.splitPara()
        }
      }
    }
  },
  mounted () {
    this.getHeight()
    setTimeout(() => {
      window.addEventListener('resize', this.getHeight());
    }, 1000);
  },
  beforeMount() {
    window.addEventListener('resize', this.getHeight, true)
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.getHeight,true)
  }
}
</script>

<style scoped lang="scss">
.works-list-container {
  padding: 0 60px;
  height: 100%;
  overflow-y: scroll;
  .works-title {
    font-size: 24px;
    font-weight: bolder;
    padding-bottom: 18px;
    border-bottom: 5px solid black;
    display: flex;
    align-items: center;
    margin-bottom: 46px;
    img {
      margin-left: auto;
      width: 16px;
      height: 16px;
    }
  }
  .works-container {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .works-ele {
      padding: 0 3px;
      margin-bottom: 2px;
      .image {
        width: 100%;
        margin-bottom: 3px;
        cursor: pointer;
        img {
          width: 100%;
          filter: grayscale(100%);
          height: 100%;
          object-fit: cover;
        }
        img:hover {
          filter: grayscale(0);
        }
      }
      .ele-title {
        font-size: 22px;
        font-weight: bolder;
        margin-bottom: 6px;
      }
      .ele-sub-title {
        font-size: 16px;
        font-family: "Montserrat";
      }
      .ele-description {
        color: rgba(0, 0, 0, 0.67);
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
}
.go-to-button {
  width: 22px;
  height: 22px;
  margin-top: 30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 105%;
    border-radius: 50%;
  }
}
</style>
