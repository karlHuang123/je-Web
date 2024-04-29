<template>
  <div class="app-container">
      <div class="method-ele" v-for="(item, index) in list" v-bind:key="index">
          <div class="method-title">
            <div class="title-container" @click="goTo(item.link)">
                <div>{{ item.title }}</div>
                <div><img src="../../../../static/icon/header-icon.png" alt=""></div>
            </div>
            <div class="method-index">{{ index > 10 ? index + 1 : '0' + (index + 1) }}</div>
          </div>
          <div class="method-description">
            {{ item.description }}
          </div>
      </div>
      <div class="coming-soon">Coming soon...</div>
  </div>
</template>

<script>
export default {
  name: 'method-list',
  props: {
      list: {
          type: Array,
          default: () => {
              return []
          }
      }
  },
  data () {
    return {
      methodList: null
    }
  },
  methods: {
      goTo(link) {
        if (link && link !== '') {
          let tempLink = ''
          if (link.includes('https://') || link.includes('http://')) {
            tempLink = link
          } else {
            tempLink = 'https://' + link
          }
          window.open(tempLink)
        }
      }
  },
  mounted() {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.app-container{
    padding: 0 120px 0 150px;
    margin-top: 88px;
    text-align: left;
    overflow-y: scroll;
    max-height: 1000px;
    overflow-y: scroll;
    .method-ele {
        position: relative;
        margin-bottom: 120px;
        margin-top: 70px;
        .method-title {
            font-family: "Britannic Bold";
            text-decoration: underline;
            font-size: 24px;
            position: relative;
            z-index: 2;
            cursor: pointer;
            .title-container {
                display: flex;
                align-items: center;
                img {
                    width: 22px;
                    height: 22px;
                    margin-left: 10px;
                }
            }
            .method-index {
                position: absolute;
                top: -55px;
                left: -55px;
                font-size: 80px;
                z-index: -1;
                color: #E5E5E5;
                font-family: Arial, Helvetica, sans-serif;
            }
        }
        .method-description {
            font-size: 22px;
            margin-top: 22px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.5;
            position: relative;
            z-index: 2;
        }
    }
    .coming-soon {
        font-size: 24px;
    }
}
</style>
