<template>
  <div class="header-container">
    <div class="header-logo" @click="goHome">
      <img src="../../static/icon/logo.svg" alt="">
    </div>
     <div class="router-container" v-if="componentRouterList.length === 3">
      <div
        class="router-ele"
        v-for="item in componentRouterList"
        v-bind:key="item.routerLink"
        @click="goTo(item)"
        v-bind:class="[item.isActive ? item.activeClass : '']">
        <span>{{ item.routerName }}</span>
        <div class="active-box" v-if="item.activeClass === 'activeRed'">
          <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive">
          <div class="" v-else>
            <img src="../../static/icon/red-arrow-down.svg" alt="">
          </div>
        </div>
        <div class="active-box" v-if="item.activeClass === 'activeBlue'" >
          <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive">
          <div class="" v-else>
            <img src="../../static/icon/blue-arrow-down.svg" alt="">
          </div>
        </div>
        <div class="active-box" v-if="item.activeClass === 'activePink'">
          <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive">
          <div class="" v-else>
            <img src="../../static/icon/pink-down-arrow.svg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="router-container" v-else>
      <!-- <div class="mid-layer" v-if="!isFromAteliter">
        <div
          class="router-ele"
          v-for="item in componentRouterList"
          v-bind:key="item.routerLink"
          @click="goTo(item)"
          v-bind:class="[item.isActive ? item.activeClass : '', item.routerLink || (item.routerName === '联系我们' && !isFromAteliter) ? 'black' : '']">
          <span>{{ item.routerName }}</span>
          <div class="active-box" v-if="item.activeClass === 'activeRed'">
            <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink && item.routerName !== '联系我们'">
            <img src="../../static/icon/header-icon-black.png" alt=""
              v-bind:class="[item.isActive ? 'rotate' : '']"
              v-else-if="item.routerLink || item.routerName === '联系我们'">
            <div class="" v-else>
              <img src="../../static/icon/red-arrow-down.svg" alt="">
            </div>
          </div>
          <div class="active-box" v-if="item.activeClass === 'activeBlue'" >
            <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink && item.routerName !== '联系我们'">
            <img src="../../static/icon/header-icon-black.png" alt=""
              v-bind:class="[item.isActive ? 'rotate' : '']"
              v-else-if="item.routerLink || item.routerName === '联系我们'">
            <div class="" v-else>
              <img src="../../static/icon/blue-arrow-down.svg" alt="">
            </div>
          </div>
          <div class="active-box" v-if="item.activeClass === 'activePink'">
            <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink && item.routerName !== '联系我们'">
            <img 
              src="../../static/icon/header-icon-black.png" 
              alt="" 
              v-else-if="item.routerLink || item.routerName === '联系我们'"
              v-bind:class="[item.isActive ? 'rotate' : '']">
            <div class="" v-else>
              <img src="../../static/icon/pink-down-arrow.svg" alt="">
            </div>
          </div>
        </div>
      </div> -->
      <div class="mid-layer">
        <div
          class="router-ele"
          v-for="item in componentRouterList"
          v-bind:key="item.routerLink"
          @click="goTo(item)"
          v-bind:class="[item.isActive ? item.activeClass : '']">
          <span>{{ item.routerName }}</span>
          <div class="active-box" v-if="item.activeClass === 'activeRed'">
            <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink">
            <div style="display: flex" class="" v-else>
              <img v-if="item.routerName === '堺工作室'" src="../../static/icon/header-icon.png" alt="">
              <img v-else style="margin-top: 4px" src="../../static/icon/red-arrow-down.svg" alt="">
            </div>
          </div>
          <div class="active-box" v-if="item.activeClass === 'activeBlue'" >
            <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink">
            <img v-else style="margin-top: 4px" src="../../static/icon/blue-arrow-down.svg" alt="">
          </div>
          <div class="active-box" v-if="item.activeClass === 'activePink'">
            <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink">
            <img v-else style="margin-top: 4px" src="../../static/icon/pink-down-arrow.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import getUpContract from '../util/getUpContract'
export default {
  name: 'je-header',
  props: {
    routerList: {
      type: Array,
      default: () => {
        return []
      }
    },
    showDropDown: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isFromAteliter: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      componentRouterList: []
    }
  },
  methods: {
    goTo (item) {
      if (item.routerLink) {
        this.$router.push({ path: item.routerLink })
      } else if (item.component) {
        this.$emit('switchComponent', item.component)
      }
      this.componentRouterList.forEach((ele) => {
        ele.isActive = false
      })
      let selectRoute = this.componentRouterList.find((ele) => {
        return ele.routerName === item.routerName
      })
      selectRoute.isActive = true
    },
    goHome () {
      sessionStorage.removeItem('ateliterComponent')
      const currentRoute = this.$route.path
      if (currentRoute === '/home') {
        location.reload()
      } else {
        this.$router.push({ path: '/home' })
      }
    }
  },
  mounted () {
    this.componentRouterList = JSON.parse(JSON.stringify(this.routerList))
    console.log(this.componentRouterList)
  }
}
</script>

<style scoped lang="scss">
.header-container {
  padding: 35px 90px 35px 60px;
  display: flex;
  .header-logo {
    width: 94px;
    height: 56px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .router-container {
    display: flex;
    justify-content: end;
    align-items: center;
    .router-ele {
      cursor: pointer;
      font-size: 16px;
      font-weight: bolder;
      border: 4px solid black;
      margin-left: 60px;
      padding: 0 4px;
      text-align: left;
      color: black;
      width: 105px;
      height: 30px;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
        margin-left: auto;
      }
    }
    .mid-layer {
      display: flex;
      justify-content: end;
      align-items: center;
      .router-ele {
        cursor: pointer;
        font-size: 16px;
        font-weight: bolder;
        border: 4px solid black;
        margin-left: 60px;
        padding: 0 4px;
        text-align: left;
        color: black;
        width: 105px;
        height: 30px;
        display: flex;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
          margin-left: auto;
        }
      }
    }
  }
}
.activeRed {
  color: white !important;
  border: 2px solid #EC3939 !important;
  background-color: #EC3939;
  .active-box {
    padding-bottom: 4px;
  }
}
.activeBlue {
  color: white !important;
  border: 2px solid #5482A3 !important;
  background-color: #5482A3;
  .active-box {
    padding-bottom: 4px;
  }
}
.activePink {
  color: white !important;
  border: 2px solid #E83468 !important;
  background-color: #E83468;
  .active-box {
    padding-bottom: 4px;
  }
}
.active-box {
  width: 16px;
  height: 16px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding-left: 2px;
}
// .black {
//   background-color: black;
//   border: 1px solid black !important;
//   color: white !important;
// }
.bg-white {
  background-color: white !important;
}
.rotate {
  transform: rotate(90deg);
}
</style>
