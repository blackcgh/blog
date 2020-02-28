import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isShow: false,
    username: ''
  },
  mutations: {
    showState(state) {
      state.isShow = true;
    },
    loginState(state,username) {
      state.username = username;
    }
  }
})

export default store
