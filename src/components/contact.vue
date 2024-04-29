<template>
  <div class="designers-container">
    <div class="top-bg">
      <img src="../../static/image/contact-bg.png" alt="">
    </div>
    <div class="contact-card">
      <div class="card-left">
        <div class="left-title">Contact Us</div>
        <div class="left-sub-title">
          <span>联系我们</span>
          <img src="../../static/icon/circle-arrow-right.png" alt="">
        </div>
        <div class="info-section">
          <div class="info-ele" v-for="(item, index) in contactData" v-bind:key="index">
            <div class="img-container"><img :src="item.icon" alt=""></div>
            <span>{{ item.context }}</span>
          </div>
        </div>
      </div>
      <div class="card-right">
        <baidu-map class='bm-view' @ready='init'></baidu-map>
      </div>
    </div>
    <div class="bottom-container">
      <div class="more-title">
        <span>了解更多</span>
        <img src="../../static/icon/right-bottom-arrow.svg" alt="">
      </div>
      <div class="static-info">
        <div>做最深刻的教育与实践的传播者.</div>
        <div>关注公众号.轻松获取日本（建筑大类/理工大类/艺术大类）留学最全最新资讯.</div>
        <div>关注知乎.浏览团队老师上千份关于升学/就职/科研等方面的专业解答. </div>
        <div>加入交流群.倾听学长学姐合格经验/与同学们共同奋进.</div>
      </div>
      <div class="qr-code-section">
        <div class="qr-ele" v-for="(item, index) in qrCodeData" v-bind:key="index">
          <img :src="item.imageUrl" alt="">
          <div>{{ item.context }}</div>
        </div>
      </div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<script>
import { allTempData } from '../../static/constant/temp-data.js'
export default {
  name: 'je-contact',
  props: {
  },
  data () {
    return {
      contactData: allTempData.contactData,
      qrCodeData: allTempData.qrCodeData,
      showMap: false,
      center: {lng: 15553315.6288569, lat: 4236674.014762913}
    }
  },
  methods: {
    init({BMap, map}){
      this.map = map
      var point = new BMap.Point(139.7118413, 35.7121352)  //设置城市经纬度坐标
      map.centerAndZoom(point, 15)    //
      var marker = new BMap.Marker(new BMap.Point(139.7118413, 35.7121352)) // 设置标点
      map.addOverlay(marker)
      map.setCurrentCity('东京')   // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true)    //鼠标滚动缩放
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.designers-container {
  color: black;
  text-align: left;
  position: absolute;
  width: 100%;
  top: 126px;
  background-color: #F4F4F4;
  .top-bg {
    img {
      width: 100%;
      position: absolute;
    }
  }
  .contact-card {
    width: 78%;
    margin: 445px auto 0;
    display: grid;
    z-index: 10;
    grid-template-columns: .45fr .55fr;
    background-color: white;
    border-radius: 10px;
    position: relative;
    z-index: 10;
    .card-left {
      padding: 70px 20px 70px 60px;
      .left-title {
        font-family: "Britannic Bold";
        font-size: 71px;
        font-weight: bold;
      }
      .left-sub-title {
        font-size: 32px;
        font-family: "Britannic Bold";
        display: flex;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          cursor: pointer;
          margin-left: 5px;
        }
      }
      .info-section {
        margin-top: 100px;
        .info-ele {
          margin: 12px auto;
          display: flex;
          // align-items: center;
          font-size: 20px;
          font-weight: bolder;
          .img-container {
            width: 37px;
            height: 32px;
            padding: 2px;
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .bottom-container {
    margin: 120px auto 0;
    width: 78%;
    .more-title {
      display: flex;
      font-size: 48px;
      font-weight: bolder;
      padding-bottom: 10px;
      border-bottom: 4px solid black;
      align-items: flex-end;
      line-height: 1;
      img {
        margin-left: auto;
        width: 24px;
        height: 24px;
      }
    }
    .static-info {
      margin-top: 70px;
      font-size: 24px;
      font-weight: bolder;
      div {
        margin: 2px auto;
      }
    }
    .qr-code-section {
      display: flex;
      margin: 70px 0 0;
      .qr-ele {
        margin-right: 74px;
        text-align: center;
        font-size: 20px;
        font-weight: bolder;
        img {
          width: 100px;
          height: 100px;
          margin-top: 10px;
        }
      }
    }
  }
  .bottom-line {
    background: linear-gradient(to bottom, #F4F4F4 0%, #F4F4F4 15.66%, #F7A9A9 78.66%, #EC3939 100%);
    width: 100%;
    height: 160px;
  }
}
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
