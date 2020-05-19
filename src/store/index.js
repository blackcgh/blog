import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    status: false,    // 用于显示登陆后的功能按钮
    username: '',     // 用户名
    id: '',           // 用户_id
    avatar: 'http://localhost/images/default.png', // 用户头像
    bgImg: '',        // 用户背景图
    sign: '',         // 用户签名
    sex: '',          // 用户性别
    birthday: '',     // 用户出生日期
    star: [],         // 用户收藏
    follow: [],       // 用户关注
    fan: [],          // 用户粉丝
    blog: 0,          // 用户博客数目
    dynamic: 0,       // 用户动态数目
    history: [],      // 用户历史记录
    userSet: null,    // 用户设置
    notice: '',       // 用户公告
    reply: null,      // 回复我的
    like: null,       // 收到的赞
    system: null,     // 系统通知
    whisper: null,    // 我的消息
    messageSet: [],   // 消息设置
    chatList: [],     // 聊天列表
    userData: {       // 他人用户信息
      username: '',
      id: '',
      avatar: '',
      bgImg: '',
      sign: '',
      star: [],
      follow: [],
      fan: [],
      userSet: null,
      notice: ''
    },
    likeData: null,   // 消息点赞列表
    currentMark: '', // 只显示一个评论编辑框
    loginText: '',       // 是否显示登录框
  },
  mutations: {
    // 登录时记录各种状态
    login(state, user) {
      state.status = true;
      state.username = user.username;
      state.id = user['_id'];
      state.avatar = user.avatar;
      state.bgImg = user.bgImg;
      state.sign = user.sign;
      state.sex = user.sex;
      state.birthday = user.birthday;
      state.star = user.star;
      state.follow = user.follow;
      state.fan = user.fan;
      state.blog = user.blog;
      state.dynamic = user.dynamic;
      state.history = user.history;
      state.userSet = user.userSet;
      state.notice = user.notice;
      state.reply = user.reply;
      state.like = user.like;
      state.system = user.system;
      state.whisper = user.whisper;
      state.messageSet = user.messageSet
    },
    // 退出时改变各种状态
    logout(state) {
      state.status = false;
      state.username = '';
      state.id = '';
      state.avatar = 'http://localhost/images/default.png';
      state.bgImg = '';
      state.sign = '';
      state.sex = '';
      state.birthday = '';
      state.star = [];
      state.follow = [];
      state.fan = [];
      state.blog = 0;
      state.dynamic = 0;
      state.history = [];
      state.userSet = null;
      state.notice = '';
      state.userData = {
        username: '',
        id: '',
        avatar: '',
        bgImg: '',
        sign: '',
        star: [],
        follow: [],
        fan: [],
        userSet: null,
        notice: ''
      };
      state.currentMark = '';
      state.loginText = ''
    },
    // 显示当前评论编辑框
    updateMark(state, mark) {
      if(state.currentMark !== mark) {
        state.currentMark = mark;
      } else {
        state.currentMark = '';
      }
    },
    // 添加收藏夹
    addFavorite(state, favorite) {
      state.star.push(favorite)
    },
    // 删除收藏夹
    delFavorite(state, fid) {
      for(let i in state.star) {
        if(state.star[i]['_id'] == fid) {
          state.star.splice(i, 1);
          return
        }
      }
    },
    // 修改收藏夹名称、公开状态
    updateFavorite(state, data) {
      for(let i of state.star) {
        if(i['_id'] == data.fid) {
          i.name = data.newFavorite.name;
          i.public = data.newFavorite.p
        }
      }
    },
    // 添加收藏
    addStar(state, { selected, select, bid }) {
      state.star[selected].favorite.unshift(bid);
      if(select != -1) {
        const favorite = state.star[select].favorite;
        for(let i in favorite) {
          if(bid == favorite[i]) {
            favorite.splice(i, 1);
            return
          }
        }
      }
    },
    // 删除收藏
    delStar(state, { select, bid }) {
      const favorite = state.star[select].favorite;
      for(let i in favorite) {
        if(bid == favorite[i]) {
        favorite.splice(i, 1);
        return
        }
      }
    },
    // 添加关注
    addFollow(state, { hid, i }) {
      state.follow[i].group.unshift(hid)
    },
    // 改变关注分组
    changeFollow(state, { fid, status }) {
      let s;    // status是添加，s是删除
      status == 0 ? s = 1 : s = 0;
      const index = state.follow[s].group.indexOf(fid);
      state.follow[s].group.splice(index, 1)
      state.follow[status].group.unshift(fid)
    },
    //取消关注
    cancelFollow(state, { hid, i }) {
      const index = state.follow[i].group.indexOf(hid);
      state.follow[i].group.splice(index, 1)
    },
    // 增加、减少博客数目
    updateBlogNum(state, b) {
      b ? state.blog++ : state.blog--
    },
    // 增加、减少动态数目
    updateDynamic(state, b) {
      b ? state.dynamic++ : state.dynamic--
    },
    // 显示登录框
    show(state, val) {
      state.loginText = val
    },
    // 关闭登录框
    hidden(state) {
      state.loginText = ''
    },
    // 添加、更新历史记录
    updateHistory(state, bid) {
      for(let i in state.history) {
        if(state.history[i].bid == bid) {
          state.history.splice(i, 1);
          break
        }
      }
      state.history.push({
        bid,
        readTime: new Date()
      })
    },
    // 清空历史记录
    emptyHistory(state) {
      state.history = []
    },
    // 更新签名
    updateSign(state, sign) {
      state.sign = sign
    },
    // 删除历史记录
    delHistory(state, bid) {
      for(let i in state.history) {
        if(state.history[i].bid == bid) {
          state.history.splice(i, 1);
          return
        }
      }
    },
    // 修改设置
    updateSet(state, userSet) {
      state.userSet = userSet
    },
    // 添加个性标签
    addTag(state, tag) {
      state.userSet.tagList.push(tag)
    },
    // 删除个性标签
    delTag(state, index) {
      state.userSet.tagList.splice(index, 1)
    },
    // 更新公告
    updateNotice(state, notice) {
      state.notice = notice
    },
    // 保存他人用户信息
    saveUserData(state, userData) {
      state.userData = userData
      state.userData.id = state.userData['_id'];
      delete state.userData['_id']
    },
    // 保存用户个人信息
    saveUserInfo(state, userInfo) {
      state.username = userInfo.username;
      state.sign = userInfo.sign;
      state.sex = userInfo.sex;
      state.birthday = userInfo.birthday
    },
    // 更新头像
    updateAvatar(state, avatar) {
      state.avatar = avatar
    },
    // 更新背景图
    updateBgImg(state, bgImg) {
      state.bgImg = bgImg
    },
    // 保存消息点赞列表
    saveLike(state, like) {
      state.likeData = like
    },
    // 保存聊天列表
    saveChatList(state, chatList) {
      state.chatList = chatList
    },
    // 如果不存在，就添加到聊天列表
    addChat(state, chat) {
      state.chatList.unshift(chat)
    },
    // 更新message
    updateMes(state, type) {
      state[type].read = state[type].total
    },
    // 保存消息设置
    saveMessage(state, messageSet) {
      state.messageSet = messageSet
    }
  }
})

export default store
