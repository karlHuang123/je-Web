<template>
  <div class="structure-container" v-if="courseStructure">
      <div class="class-type" v-for="(item, index) in courseStructure" v-bind:key="index">
          <div class="class-type-title">
              {{ item.course_name }}
          </div>
          <div style="margin-bottom: 62px">
            <div class="class-type-lesson" v-for="(ele, index) in item.items" v-bind:key="index">
                {{ (index + 1) > 10 ? (index + 1) + ' ' + ele.majorCourse : '0' + (index + 1) + ' ' + ele.majorCourse }}
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'lesson-structure',
  components: {
  },
  props: ['courseStructure'],
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
.structure-container {
    color: black;
    font-family: 'Britannic Bold' !important;
    text-align: left;
    font-weight: bolder;
    .class-type { 
        margin-left: 175px;
        .class-type-title {
            font-weight: bold;
            font-size: 40px;
            margin-bottom: 30px;
        }
        .class-type-lesson {
            font-size: 24px;
            padding-left: 98px;
            margin: 9px auto;
        }
    }
}
</style>
