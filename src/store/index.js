import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    // 通过mutation改变转态
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
