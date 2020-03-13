import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isShow: false, // 显示头像、菜单栏、好友栏
    username: '', // 显示用户名
    id: '', // 用户_id
    blogCount: 1, // 记录首页获取了几次数据
    currentIndex: '', // 只显示一个评论编辑框
    userTag: []
  },
  mutations: {
    show(state) {
      state.isShow = !state.isShow;
    },
    login(state, username) {
      if (!state.username) {
        state.username = username;
      } else {
        state.username = '';
      }
    },
    saveId(state, id) {
      if (!state.id) {
        state.id = id;
      } else {
        state.id = '';
      }
    },
    increment(state, flag) {
      if (flag) { // 点击更多，每次添加5条数据
        state.blogCount++;
        return;
      }
      state.blogCount = 1; // 点击首页，永远显示最新5条数据
    },
    modify(state, index) {
      if(state.currentIndex !== index) {
        state.currentIndex = index;
      } else {
        state.currentIndex = -1;
      }
    },
    saveTag(state, list=[]) {
      if (state.userTag.length === 0) {
        list.forEach(item => {
          item.tagInfo.forEach(el => {
            state.userTag.push(el.content);
          })
        })
      } else {
        state.userTag = [];
      }
    }
  }
})

export default store
