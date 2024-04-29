<template>
  <div id="app" class="container">
    <router-view class="router-container" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: "HYQiHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 1200px;
}
.nav {
  border-right: 1px solid #E5E5E5;
  ul {
    padding: 10px !important;
  }
  .logo {
    margin-top: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .logo-title {
      color: #0D0E61;
      font-size: 18px;
      font-weight: 800;
      margin-left: 10px;
    }
  }
}
#nav {
  transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  list-style: none;
  margin-top: 170px;
  li {
    padding: 16px;
    border-radius: 16px;
    .list-item {
      cursor: pointer;
      color: #777985;
      span {
        display: inline-block;
        width: 80%;
        text-align: left;
      }
    }
  }
  .active {
    background-color: #0D0E61;
    .list-item {
      color: white !important;
    }
  }
}
.container {
  display: flex;
}
.router-container {
  flex: 1
}
</style>
