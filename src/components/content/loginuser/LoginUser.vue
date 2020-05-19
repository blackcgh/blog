<template>
  <div>
    <transition name="fade" @scroll.stop>
      <div id="login-user" v-if="$store.state.loginText.length"></div>
    </transition>
    <transition name="slide">
      <div class="main" v-if="$store.state.loginText.length">
        <span @click="login" :class="{active:getComponent=='Login'}">登录</span>
        <span @click="register" :class="{active:getComponent=='Register'}">注册</span>
        <component :is="getComponent"></component>
        <i @click="cancel"><em>+</em></i>
      </div>
    </transition>
  </div>
</template>

<script>
  import Login from 'components/common/login/Login'
  import Register from 'components/common/login/Register'

  export default {
    name: 'LoginUser',
    computed: {
      //获取组件
      getComponent() {
        return this.$store.state.loginText
      }
    },
    components: {
      Login,
      Register
    },
    methods: {
      // 登录
      login() {
        this.$store.commit('show', 'Login')
      },
      // 注册
      register() {
        this.$store.commit('show', 'Register')
      },
      // 取消登录框
      cancel() {
        this.$store.commit('hidden')
      }
    },
    created() {
      this.component = this.$store.state.loginText
    }
  }

</script>

<style scoped>
  #login-user {
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

  span:hover {
    color: #00a1d6;
  }

  span.active {
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
    top: -25px;
    left: 10px;
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
