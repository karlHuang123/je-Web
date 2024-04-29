<template>
  <div class="members-container">
      <div class="member-ele" v-for="(offer, index) in filterList" v-bind:key="index">
          <div><img :src="offer.image_url" alt=""></div>
          <div class="member-name">
              <div style="font-weight: 900;">{{ offer.college }}</div>
              <div>合格人数：{{ offer.people_count }}人</div>
          </div>
      </div>
  </div>
</template>

<script>
import { fetchGet } from '../../../axios-instance'
export default {
  name: 'je-offer',
  components: {
  },
  props: {
    department: {
      type: String,
      default: () => {
        return null
      }
    },
    year: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      offerList: null,
      filterList: null,
      allList: null
    }
  },
  watch: {
    department: {
      handler(newVal) {
        this.getList(newVal)
      }
    },
    year: {
      handler(newVal) {
        if (newVal === '历年合格总览') {
          this.filterList = this.allList
        } else {
          this.filterList = this.offerList.filter(item => {
            return item.year === newVal
          })
        }
      }
    }
  },
  methods: {
    getList(department) {
      fetchGet(`/college/intro/qualified-score/list?department=${department}`).then(res => {
        if (res.data.data && typeof res.data.data.length === 'number') {
          this.offerList = JSON.parse(JSON.stringify(res.data.data))
          this.offerList.forEach(ele => {
            const descs = ele.description ? ele.description.split('\n') : ''
            ele.descs = descs
          })
          this.combineList(res.data.data)
          this.filterList = this.allList
        }
      })
    },
    combineList(list) {
      let schoolList = []
      let finalList = []
      list.forEach(item => {
        if (schoolList.indexOf(item.college) === -1) {
          schoolList.push(item.college)
          finalList.push(item)
        } else {
          finalList.forEach(ele => {
            if (ele.college === item.college) {
              ele.people_count += item.people_count
            }
          })
        }
      })
      this.allList = finalList
    }
  },
  mounted () {
    this.getList(this.department)
  }
}
</script>

<style scoped lang="scss">
.members-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    color: black;
    padding-right: 115px;
    padding-left: 30px;
    max-height: 880px;
    overflow-y: scroll;
    .member-ele {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 20px 0 20px 40px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        .member-name {
            margin-top: 20px;
            margin-bottom: 13px;
            text-align: left;
            margin-left: 8px;
        }
        .member-title {
            font-weight: normal;
        }
        img {
          width: 145px;
          height: 145px;
          border-radius: 50%;
          object-fit: cover;
        }
    }
}
</style>
