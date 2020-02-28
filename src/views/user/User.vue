<template>
  <div id="user">
    <div class="main">
      <router-link to="/user/login" :class="{current: isCurrent}">登录</router-link>
      <b>.</b>
      <router-link to="/user/register" :class="{current: !isCurrent}">注册</router-link>
      <router-view></router-view>
      <i @click="goBack">*</i>
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
      goBack() {
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
    background-color: #f1f1f1;
    z-index: 1;
  }

  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 50px;
    text-align: center;
    font-size: 18px;
    box-shadow: 0 0 7px 3px rgba(100, 100, 100, .2)
  }

  a {
    display: inline-block;
    width: 56px;
    height: 42px;
    padding: 10px;
    border-bottom: 2px solid transparent;
    color: #969696;
    cursor: pointer;
    box-sizing: border-box;
    margin-bottom: 50px;
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
    top: -25px;
    right: -25px;
    width: 50px;
    height: 50px;
    line-height: 95px;
    background-color: #fff;
    border-radius: 50%;
    font-size: 100px;
  }

</style>
