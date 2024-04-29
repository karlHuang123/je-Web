<template>
  <div class="header-container">
    <div class="header-logo" @click="goHome">
      <img src="../../static/icon/logo.svg" alt="">
    </div>
    <div class="router-container">
      <a-dropdown :trigger="['click']" @visibleChange="handleVisible" v-for="item in componentRouterList" v-bind:key="item.routerLink">
        <div
          class="dropdown-view router-ele"
          @click="goTo(item)"
          v-bind:class="[item.isActive ? item.activeClass : '', item.routerLink || item.routerName === '联系我们' ? 'black' : '']">
          <div class="dropdown-box">
            <span>{{ item.routerName }}</span>
            <div class="active-box" v-if="item.activeClass === 'activeRed'">
              <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink">
              <img src="../../static/icon/header-icon.png" alt="" v-bind:class="[item.isActive ? 'rotate' : '']" v-else-if="item.routerLink">
              <div class="" v-else>
                <img src="../../static/icon/red-arrow-down.svg" alt="">
              </div>
            </div>
            <div class="active-box" v-if="item.activeClass === 'activeBlue'">
              <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink">
              <img src="../../static/icon/header-icon.png" alt="" v-bind:class="[item.isActive ? 'rotate' : '']" v-else-if="item.routerLink">
              <div class="" v-else>
                <img src="../../static/icon/blue-arrow-down.svg" alt="">
              </div>
            </div>
            <div class="active-box" v-if="item.activeClass === 'activePink'">
              <img src="../../static/icon/header-icon.png" alt="" v-if="!item.isActive && !item.routerLink">
              <img src="../../static/icon/header-icon.png" alt="" v-bind:class="[item.isActive ? 'rotate' : '']" v-else-if="item.routerLink">
              <div class="" v-else>
                <img src="../../static/icon/pink-down-arrow.svg" alt="">
              </div>
            </div>
          </div>
        </div>
        <template #overlay v-if="item.routerName !== '联系我们'">
          <a-menu style="position: absolute; top: -6px;" v-bind:class="[item.isActive ? item.borderClass : '']">
            <a-menu-item
              v-for="(ele, index) in componentDropdownList"
              v-bind:key="index"
              @click="menuItemClick(item.component, ele.path)">
              <div>{{ ele.title }}</div>
            </a-menu-item>
            </a-menu>
        </template>
      </a-dropdown>
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
    dropdownList: {
      type: Array,
      default: () => {
        return []
      }
    },
    department: {
      type: String
    }
  },
  data () {
    return {
      componentRouterList: null,
      componentDropdownList: null,
      tempCategory: '',
      categoryMap: {
        engineering: '理工大类',
        art: '艺术大类',
        architecture: '建筑大类'
      }
    }
  },
  methods: {
    goTo (item) {
      console.log('hey', item)
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
      this.tempCategory = item.routerName
    },
    menuItemClick (id, path) {
      this.$router.push({
        path: `/${path}`,
        query: {
          id: id
        }
      })
      setTimeout(() => {
        this.$store.dispatch('setCategory', this.tempCategory)
      }, 10);
      this.$emit('itemClick', id)
    },
    handleVisible(visible) {
      if(!visible) {
        this.componentRouterList.forEach((ele) => {
          ele.isActive = false
        })
        let selectRoute = this.componentRouterList.find((ele) => {
          return ele.routerName === this.$store.state.category
        })
        selectRoute.isActive = true
      }
    },
    goHome () {
      sessionStorage.removeItem('ateliterComponent')
      const currentRoute = this.$route.path
      if (currentRoute === '/home') {
        location.reload()
      } else {
        this.$router.push({ path: '/home' })
      }
    },
    popstate() { //监听浏览器回退和前进，控制tab颜色显示
      const fullUrl = window.location.href
      const url = fullUrl.split('#')[1].split('?')[0]
      const id = fullUrl.split('#')[1].split('?')[1].split('=')[1]
      this.componentRouterList.forEach((ele) => {
        ele.isActive = false
      })
      let selectRoute = this.componentRouterList.find((ele) => {
        return ele.routerName === this.categoryMap[id]
      })
      selectRoute.isActive = true
      this.tempCategory = this.categoryMap[id]
      setTimeout(() => {
        this.$store.dispatch('setCategory', this.categoryMap[id])
      }, 10);
      this.$emit('itemClick', id)
      this.$router.push({
        path: url,
        query: {
          id: id
        }
      })
	  } 
  },
  mounted () {
    this.componentRouterList = JSON.parse(JSON.stringify(this.routerList))
    this.componentRouterList.forEach((item) => {
      if (item.component === this.department) {
        item.isActive = true
      }
    })
    console.log(this.componentRouterList)
    this.componentDropdownList = JSON.parse(JSON.stringify(this.dropdownList))
  },
  created() { // 创建vm实例后执行
    // 浏览器控制按钮前进后退触发函数
    window.addEventListener('popstate', this.popstate, false);
  },
  destroyed() { // 销毁vm组件
  // 避免堆栈溢出，多次创建、多次触发
    window.removeEventListener('popstate', this.popstate, false);
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
.red-border {
  border: 4px solid #EC3939;
}
.red-border .ant-dropdown-menu-item div:hover {
  border-bottom: 4px solid #EC3939;
  color: #EC3939;
}
.blue-border {
  border: 4px solid #5482A3;
}
.blue-border .ant-dropdown-menu-item div:hover {
  border-bottom: 4px solid #5482A3;
  color: #5482A3;
}
.pink-border {
  border: 4px solid #E83468;
}
.pink-border .ant-dropdown-menu-item div:hover {
  border-bottom: 4px solid #E83468;
  color: #E83468;
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
.dropdown-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.ant-dropdown-placement-bottomLeft {
  width: 105px !important;
  top: 78px !important;
}
.ant-dropdown-menu {
  width: 105px;
  text-align: center;
}
.ant-dropdown-menu-item {
  font-family: "Britannic Bold";
  color: black !important;
  margin: 10px auto;
}
.ant-dropdown-menu-item:hover {
  background-color: white;
}
// .black {
//   background-color: black !important;
//   border-color: black !important;
//   color: white !important;
// }
.bg-white {
  background-color: white !important;
}
.rotate {
  transform: rotate(90deg);
}
</style>
