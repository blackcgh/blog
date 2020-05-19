<template>
  <div class="ls">
    <!-- 未登录状态 -->
    <div v-if="!$store.state.status">
      <span id="login" @click="login">登录</span>
      <span id="register" @click="register">注册</span>

      <!-- 登录框 -->
      <login-user></login-user>
    </div>

    <!-- 已登录状态 -->
    <div id="myself" v-else>
      <!-- 功能按钮 -->
      <ul>
        <!-- 用户 -->
        <li class="user-avatar" @click="goHomepage">
          <!-- 头像 -->
          <div class="avatar">
            <img :src="$store.state.avatar" alt="">
          </div>
          <!-- 用户选项 -->
          <main-nav-menu></main-nav-menu>
        </li>

        <!-- 消息 -->
        <li :class="{current:getCurrent('message')}"
            @click="goMessage"
            @mouseenter="enterMessage"
            @mouseleave="leaveMessage">
          消息
          <em v-if="showNum">{{getNum}}</em>
          <b v-show="isShow_m"></b>
          <message-label v-show="isShow_m" @shutMessage="shutMessage"></message-label>
        </li>

        <!-- 收藏 -->
        <li :class="{current:getCurrent($store.state.id+'/'+'star')}" @click="goStar">收藏</li>

        <!-- 历史 -->
        <li :class="{current:getCurrent('history')}"
            @mouseenter="enterHistory"
            @mouseleave="leaveHistory"
            @click="goHistory">
          历史
          <b v-show="isShow_h"></b>
          <keep-alive>
            <history-label v-if="isShow_h" @shutHistory="shutHistory"></history-label>
          </keep-alive>
        </li>
      </ul>
      <div class="write-blog" @click="writeBlog">写博客</div>
    </div>
  </div>
</template>

<script>
  import LoginUser from 'components/content/loginuser/LoginUser'
  import MainNavMenu from 'components/content/loginuser/MainNavMenu'
  import MessageLabel from 'components/content/loginuser/MessageLabel'
  import HistoryLabel from 'components/content/loginuser/HistoryLabel'

  export default {
    name: 'LoginState',
    data() {
      return {
        // 是否显示消息框
        isShow_m: false,
        // 是否显示历史记录
        isShow_h: false
      }
    },
    computed: {
      getCurrent() {
        return function(str) {
          return this.$route.path.indexOf(str) != -1
        }
      },
      // 获取消息个数
      getNum() {
        const { reply, like, system, whisper } = this.$store.state;
        return reply.total - reply.read + like.total - like.read + system.total - system.read + whisper.total - whisper.read
      },
      // 是否显示消息
      showNum() {
        return this.$store.state.messageSet[0] && this.getNum != 0
      }
    },
    components: {
      LoginUser,
      MainNavMenu,
      MessageLabel,
      HistoryLabel
    },
    methods: {
      // 前往登录页面
      login() {
        this.$store.commit('show', 'Login')
      },
      // 前往注册页面
      register() {
        this.$store.commit('show', 'Register')
      },
      // 前往个人主页
      goHomepage() {
        if(this.$route.path.indexOf(this.$store.state.id + '/homepage') == -1) {
          this.$router.push('/' + this.$store.state.id + '/homepage');
        }
      },
      // 经过消息按钮
      enterMessage() {
        this.isShow_m = true
      },
      // 离开消息按钮
      leaveMessage() {
        this.isShow_m = false
      },
      // 子组件关闭消息框
      shutMessage() {
        this.isShow_m = false
      },
      // 前往消息页面
      goMessage() {
        if(this.$route.path.indexOf('reply') == -1) {
          this.$router.push('/message/reply')
        }
      },
      // 前往收藏页面
      goStar() {
        if(this.$route.path.indexOf(this.$store.state.id + '/star') == -1) {
          this.$router.push('/' + this.$store.state.id + '/star');
        }
      },
      // 经过历史按钮显示历史记录
      enterHistory() {
        this.isShow_h = true
      },
      // 离开历史按钮隐藏历史记录
      leaveHistory() {
        this.isShow_h = false
      },
      // 子组件关闭历史框
      shutHistory() {
        this.isShow_h = false
      },
      // 前往历史页面
      goHistory() {
        if(this.$route.path.indexOf('history') == -1) {
          this.$router.push('/history')
        }
      },
      // 前往写博客页面
      writeBlog() {
        this.$router.push('/' + this.$store.state.id + '/blog/new');
      },
    }
  }

</script>

<style scoped>
  .ls {
    position: absolute;
    top: 0;
    right: 20px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
  }

  #login {
    height: 36px;
    margin-right: 20px;
    border-radius: 18px;
    color: #fff;
  }

  #login:hover {
    color: #00a1d6;
  }

  #register {
    height: 36px;
    padding: 5px 20px;
    border-radius: 18px;
    color: #fff;
    background-color: #00a1d6;
  }

  #register:hover {
    background-color: #0490be;
  }

  #myself {
    height: 60px;
  }

  ul {
    float: left;
    height: 60px;
  }

  li {
    position: relative;
    float: left;
    width: 84px;
    height: 100%;
    cursor: pointer;
  }

  li:hover {
    color: #00a1d6;
  }

  li em {
    position: absolute;
    top: 7px;
    right: 12px;
    padding: 0 5px;
    background-color: #FA5A57;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    border-radius: 8px;
  }

  .user-avatar {
    position: relative;
  }

  .avatar {
    position: relative;
    width: 36px;
    height: 36px;
    margin: 12px auto 0;
    vertical-align: middle;
    transition: all .1s;
    z-index: 2;
  }

  .avatar img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  /* .user-avatar::after {
    content: '';
    position: absolute;
    top: 28px;
    right: 8px;
    border: 5px solid transparent;
    border-top-color: #fff;
  } */

  .user-avatar:hover .avatar{
    width: 70px;
    height: 70px;
    margin-top: 24px;
  }

  .user-avatar:hover .main-nav-menu {
    display: block;
  }

  .write-blog {
    float: left;
    width: 100px;
    height: 36px;
    margin: 12px 0 0 25px;
    background-color: #00a1d6;
    line-height: 36px;
    border-radius: 5px;
    cursor: pointer;
  }

  .write-blog:hover {
    background-color: #03bbf8;
  }

  b {
    position: absolute;
    border: 7px solid transparent;
    border-bottom-color: #fff;
    bottom: 0;
    left: 35px;
    z-index: 1000;
  }

  .current {
    color: #00a1d6;
  }

</style>
