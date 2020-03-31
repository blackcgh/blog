<template>
  <div class="ls">
    <div v-if="!$store.state.status">
      <span id="login" @click="login">登录</span>
      <span id="register" @click="register">注册</span>
    </div>
    <div id="myself" v-else>
      <span class="avatar"></span>
      <span class="uname">{{$store.state.username}}</span>
      <main-nav-menu></main-nav-menu>
    </div>
  </div>
</template>

<script>
  import MainNavMenu from 'components/content/user/MainNavMenu'

  export default {
    name: 'LoginState',
    components: {
      MainNavMenu
    },
    methods: {
      login() {
        if (this.$route.path !== '/login') {
          this.$router.push('/login');
        }
      },
      register() {
        if (this.$route.path !== '/register') {
          this.$router.push('/register');
        }
      }
    }
  }

</script>

<style scoped>
  .ls {
    position: absolute;
    top: 12px;
    right: 160px;
    bottom: 0;
    width: 128px;
    line-height: 36px;
    text-align: center;
    font-weight: 700;
    cursor: pointer;
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
    height: 36px;
    color: #fff;
  }

  .avatar {
    display: inline-block;
    width: 36px;
    height: 36px;
    background-color: #fff;
    border-radius: 50%;
    vertical-align: middle;
  }

  .uname {
    padding: 0 10px;
  }

  #myself::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    border: 5px solid transparent;
    border-top-color: #fff;
  }

  .ls:hover .main-nav-menu {
    display: block;
  }

</style>
