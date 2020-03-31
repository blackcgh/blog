<template>
  <div>
    <transition name="fade" @scroll.stop>
      <div id="user" v-if="show"></div>
    </transition>
    <transition name="slide">
      <div class="main" v-if="show">
        <span @click="login" :class="{current: isCurrent}">登录</span>
        <span @click="register" :class="{current: !isCurrent}">注册</span>
        <component :is="type"></component>
        <i @click="back"><em>+</em></i>
      </div>
    </transition>
  </div>
</template>

<script>
  import Login from 'components/common/login/Login'
  import Register from 'components/common/login/Register'

  export default {
    name: 'User',
    data() {
      return {
        show: false,
        type: ''
      }
    },
    computed: {
      isLogin() {
        return true;
      },
      isCurrent() {
        if (this.$route.path === '/register') {
          this.type = 'Register';
          return false;
        }
        this.type = 'Login';
        return true;
      }
    },
    components: {
      Login,
      Register
    },
    methods: {
      login() {
        if (this.$route.path !== '/login') {
          this.type = 'Login';
          this.$router.push('/login');
        }
      },
      register() {
        if (this.$route.path !== '/register') {
          this.type = 'Register',
          this.$router.push('/register');
        }
      },
      back() {
        this.show = false;
        setTimeout(() => {
          this.$router.replace('/');
        }, 300);
      }
    },
    mounted() {
      this.show = true;
    }
  }

</script>

<style scoped>
  #user {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .8);
    z-index: 1000;
  }

  .main {
    position: fixed;
    top: 148px;
    left: 479px;
    width: 330px;
    height: 340px;
    padding: 30px;
    background-color: #fff;
    font-size: 18px;
    border-radius: 5px;
    z-index: 1001;
  }

  span {
    display: inline-block;
    width: 60px;
    height: 36px;
    padding: 0 20px;
    margin-bottom: 30px;
    color: #969696;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    border-radius: 18px;
    transition: all .3s;
  }

  span:first-child {
    margin-left: 65px;
  }

  span:hover {
    color: #00a1d6;
  }

  span.current {
    background-color: #00a1d6;
    color: #fff;
  }

  i {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 26px;
    height: 25px;
  }

  em {
    position: absolute;
    top: -4px;
    left: 4px;
    font-size: 30px;
    color: #000;
    transform: rotate(135deg);
  }

  em:hover {
    color: #f1563b;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all .2s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

</style>
