import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    setWorksEleList (state, worksEleList) {
      state.worksEleList = worksEleList
    },
    setCategory(state, category) {
      state.category = category
    }
  },
  actions: {
    setWorksEleListAct ({ commit }, worksEleList) {
      commit('setWorksEleList', worksEleList)
    },
    setCategory({ commit }, category) {
      commit('setCategory', category)
    }
  },
  getters: {
    worksEleList: (state) => state.worksEleList,
    category: (state) => state.category
  }
})
