<template>
  <div class="app-container">
    <div class="swiper">
      <el-carousel type="card" height="350px" :autoplay="false" arrow="always">
        <el-carousel-item v-for="(item, index) in list" :key="index">
          <img class="card-image" :src="item.image_url" alt="">
          <div class="life-description">{{ item.description }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { fetchGet } from '../../../axios-instance'
export default {
  name: 'life',
  props: ['department'],
  data () {
    return {
      list: []
    }
  },
  watch: {
    department: {
      handler(newVal) {
        this.getLiftImg(newVal)
      }
    }
  },
  components: {
  },
  methods: {
    getLiftImg(department) {
      fetchGet(`/college/intro/life/list?department=${department}`).then(res => {
        this.list = res.data.data
      })
    }
  },
  mounted() {
    this.getLiftImg(this.department)
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  .swiper{
    width: 90%;
    padding-left: 30px;
    padding-right: 66px;
    margin-left: 25px;
  }
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.life-description {
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
}
</style>
