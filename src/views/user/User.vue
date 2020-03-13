<template>
  <div id="user">
    <div class="main">
      <router-link to="/user/login" :class="{current: isCurrent}">登录</router-link>
      <router-link to="/user/register" :class="{current: !isCurrent}">注册</router-link>
      <router-view></router-view>
      <i @click="back"><em>+</em></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
    computed: {
      isCurrent() {
        if (this.$route.path === '/user/register') {
          return false;
        }
        return true;
      }
    },
    methods: {
      back() {
        this.$router.replace('/');
      }
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
    margin: 0;
    background-color: #ecf1f5;
    z-index: 100;
  }

  .main {
    position: relative;
    width: 330px;
    height: 340px;
    padding: 30px;
    margin: 100px auto 0;
    background-color: #fff;
    font-size: 18px;
    box-shadow: 0 0 7px 3px rgba(100, 100, 100, .2);
    border-radius: 5px;
  }

  a {
    display: inline-block;
    width: 60px;
    height: 42px;
    padding: 10px;
    border-bottom: 3px solid transparent;
    color: #969696;
    cursor: pointer;
    box-sizing: border-box;
    margin-bottom: 30px;
  }

  a:first-child {
    margin-left: 105px;
  }

  a:hover {
    border-bottom-color: #f1563b;
  }

  .main b {
    position: relative;
    top: -5px;
    padding: 15px;
    color: #969696;
  }

  .current {
    font-weight: 700;
    color: #f1563b;
    border-bottom-color: #f1563b;
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

</style>
