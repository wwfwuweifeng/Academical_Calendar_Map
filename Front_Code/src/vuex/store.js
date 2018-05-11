import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {userid: ""}

const mutations = {setUserId: (state, paras) => {
    state.userid = paras.userid
  },
  delUserId: (state) => {
    state.userid = ""
  }
}

export default new Vuex.Store({
  state,
  mutations,
})
