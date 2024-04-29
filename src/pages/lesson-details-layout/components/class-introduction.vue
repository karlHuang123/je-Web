<template>
  <div class="class-container" v-if="classIntro">
      <div class="intro-image">
          <img :src="classIntro.image_url" alt="">
      </div>
      <div>
        <div class="intro-text" v-for="(item, index) in stringArray" v-bind:key="index">
          {{ item }}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'class-introduction',
  components: {
  },
  props: ['classIntro'],
  data () {
    return {
        stringArray: null
    }
  },
  watch: {
    classIntro: {
        handler(newVal) {
            if (newVal) {
              this.formatString(newVal.description)
            }
        }
    }
  },
  methods: {
    formatString(str) {
      this.stringArray = str.split('\n')
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.class-container {
    padding: 0 108px;
    display: flex;
    .intro-image {
        width: 350px;
        text-align: right;
        img {
            width: 268px;
        }
        margin-right: 70px;
    }
    .intro-text {
        text-align: left;
        font-size: 18px;
        flex: 1;
        color: black;
    }
}
</style>
