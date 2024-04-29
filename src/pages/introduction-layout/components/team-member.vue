<template>
  <div>
    <div class="filter-container" v-if="searchOptions && searchOptions.length !== 0">
      <div 
        class="filter-ele" 
        v-bind:class="[item.isActive ? 'active' : '']" 
        v-for="(item, index) in searchOptions" 
        @click="selectTag(item.value, index)"
        :key="index">
        {{ item.value }}
      </div>
    </div>
    <div class="members-container">
      <div class="member-ele" v-for="(member) in memberList" v-bind:key="member._id">
          <div><img :src="member.avatar" alt=""></div>
          <div class="member-name">{{ member.name }}</div>
          <div class="member-title">
            <div v-for="(desc, index) in member.descs" v-bind:key="index">
              {{ desc }}
            </div>
          </div>
          <div class="tag-list">
            <div 
              class="tag-ele" 
              :style="{visibility : item === 'convert' ? 'hidden': ''}" 
              v-for="(item, index) in member.tag" 
              :key="index">
              {{ item }}
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchGet, fetchPost } from '../../../axios-instance'
export default {
  name: 'je-team-mamber',
  components: {
  },
  props: {
    department: {
      type: String,
      default: () => {
        return null
      }
    },
    // searchOptions: {
    //   type: Object,
    //   default: () => {
    //     return null
    //   }
    // }
  },
  data () {
    return {
      memberList: null,
      searchOptions: [],
      searchBox: []
    }
  },
  watch: {
    department: {
      handler(newVal) {
        this.getList(newVal)
        this.getTagList(newVal)
      }
    }
  },
  methods: {
    getList(department, tags = []) {
      fetchPost(`/college/intro/member/list`, {
        department: department,
        tags: tags
      }).then(res => {
        if (res.data.data && typeof res.data.data.length === 'number') {
          this.memberList = res.data.data
          this.memberList.forEach(ele => {
            const descs = ele.description.split('\n')
            ele.descs = descs
            if (ele.tag && ele.tag.length > 3) {
              ele.tag = ele.tag.slice(0, 3)
            } else if (ele.tag && ele.tag.length === 2) {
              ele.tag.unshift('convert')
            } else if (ele.tag && ele.tag.length === 1) {
              ele.tag.unshift('convert')
              ele.tag.unshift('convert')
            }
          })
        }
      })
    },
    getTagList(department) {
      this.searchOptions = []
      fetchGet(`/college/intro/member/tag/list?department=${department}`).then(res => {
        if (res && res.data.code === 0) {
          res.data.data.forEach(item => {
            const ele = {
              isActive: false,
              value: item.name
            }
            this.searchOptions.push(ele)
          })
        }
        this.searchOptions.unshift({
          isActive: true,
          value: '全部'
        })
      })
    },
    selectTag(tag, index) {
      if (tag === '全部') { // 反选情况
        this.searchOptions.forEach(item => {
          item.isActive = false
        })
        this.searchBox = []
        this.searchOptions[0].isActive = true
        this.getList(this.department)
      } else {
        if (!this.searchOptions[index].isActive) {
          this.searchBox.push(tag)
        } else {
          this.searchBox = this.searchBox.filter(item => {
            return item !== tag
          })
        }
        this.searchOptions[index].isActive = !this.searchOptions[index].isActive
        if (this.searchBox.length !== 0) {
          this.searchOptions[0].isActive = false
        } else {
          this.searchOptions[0].isActive = true
        }
        this.getList(this.department, this.searchBox)
      }
    }
  },
  mounted () {
    this.getList(this.department)
    this.getTagList(this.department)
  }
}
</script>

<style scoped lang="scss">
.filter-container {
  display: flex;
  padding-left: 90px;
  padding-top: 30px;
  max-width: 1200px;
  flex-wrap: wrap;
  .filter-ele {
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px 8px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}
.members-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    color: black;
    padding-right: 115px;
    padding-left: 30px;
    max-height: 880px;
    overflow-y: scroll;
    .member-ele {
        text-align: center;
        position: relative;
        font-size: 14px;
        margin: 15px 66px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        .member-name {
            font-weight: 900;
            margin-top: 26px;
            margin-bottom: 13px;
            font-size: 18px;
        }
        .member-title {
          font-weight: normal;
        }
        .tag-list {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          position: absolute;
          justify-content: flex-end;
          top: 140px;
          width: 100%;
          .tag-ele {
            border: 1px solid black;
            background-color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            margin: 0 auto;
          }
        }
        img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          object-fit: cover;
        }
    }
}
.active {
  background-color: black;
  color: white;
}
</style>
