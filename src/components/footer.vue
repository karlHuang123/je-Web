<template>
  <div class="footer-container" :style="{background : '#' + bgColor}">
    <div class="title">
      Contact Us
    </div>
    <div class="line"></div>
    <div class="icon-section">
      <a-tooltip placement="top" title="120350509@qq.com">
        <img src="../../static/icon/email-icon.png" alt="">
      </a-tooltip>
      <a-tooltip placement="top" title="https://weibo.com/u/3892332190">
        <img src="../../static/icon/weibo-icon.png" alt="">
      </a-tooltip>
      <a-tooltip placement="top" title="LYAYCTR（建筑）；zzq2683626（艺术）；hjflyhh（合作）；kaku_saru（理工）">
        <img src="../../static/icon/wechat-icon.png" alt="">
      </a-tooltip>
      <a-tooltip placement="top" title="https://space.bilibili.com/608784776?spm_id_from=333.337.search-card.all.click">
        <img src="../../static/icon/bilibili-icon.png" alt="">
      </a-tooltip>
      <a-tooltip placement="top" title="小红书号：9475173054（堺塾）；629081943（堺塾理工）">
        <img src="../../static/icon/red-book.svg" alt="">
      </a-tooltip>
    </div>
    <div class="website">
      ©  2016 www.group-je.com
    </div>
  </div>
</template>

<script>
// import getUpContract from '../util/getUpContract'
export default {
  name: 'je-footer',
  props: ['bgColor'],
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {}
}
</script>

<style scoped lang="scss">
.footer-container {
  color: black;
  // background-color: #EC3939;
  padding: 120px 60px 0;
  border-bottom: 10px solid black;
  .title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 45px;
    font-family: 'Britannic Bold';
  }
  .line {
    border: 2px solid black;
  }
  .icon-section {
    padding-top: 56px;
    padding-bottom: 33px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .website {
    font-size: 12px;
    text-align: center;
    padding-bottom: 66px;
  }
}
</style>
