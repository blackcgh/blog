import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    status: false, // 显示头像、菜单栏、好友栏
    username: '', // 显示用户名
    id: '', // 用户_id
    blogCount: 1, // 记录首页获取了几次数据
    currentIndex: '', // 只显示一个评论编辑框
    userTag: [], // 获取用户的所有标签
  },
  mutations: {
    // 登录时显示头像、菜单栏、好友栏
    show(state) {
      state.status = !state.status;
    },
    // 登录时记录用户名
    login(state, username) {
      if (!state.username) {
        state.username = username;
      } else {
        state.username = '';
      }
    },
    // 登录时记录用户id
    updateId(state, id) {
      if (!state.id) {
        state.id = id;
      } else {
        state.id = '';
      }
    },
    // 点击更多，每次添加5条数据
    increment(state, flag) {
      if (flag) {
        state.blogCount++;
        return;
      }
      state.blogCount = 1; // 点击首页，永远显示最新5条数据
    },
    // 显示当前评论编辑框
    modify(state, index) {
      if(state.currentIndex !== index) {
        state.currentIndex = index;
      } else {
        state.currentIndex = -1;
      }
    },
    // 更新用户的标签
    updateTag(state, list=[]) {
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
