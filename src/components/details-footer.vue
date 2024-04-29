<template>
  <div class="details-footer-container" v-if="projectInfo">
      <div class="details-footer-title">项目信息</div>
      <div class="details-footer-info">
          <div class="details-footer-ele" v-for="(ele, index) in projectInfo" v-bind:key="index">
            {{ ele }}
          </div>
      </div>
  </div>
</template>

<script>
// import getUpContract from '../util/getUpContract'
export default {
  name: 'je-details-footer',
  props: ['projectInfo'],
  data () {
    return {
      
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.details-footer-container {
    text-align: right;
    padding: 0 60px 238px;
    .details-footer-title {
        width: 106px;
        padding: 1px 4px;
        background-color: black;
        color: white;
        font-size: 24px;
        font-weight: bolder;
        margin: 120px 0 36px auto;
    }
    .details-footer-info {
        .details-footer-ele {
            font-size: 22px;
            font-weight: bolder;
            margin: 8px auto;
            color:black;
        }
    }
}
</style>
