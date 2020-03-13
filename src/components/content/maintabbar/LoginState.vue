<template>
  <div class="ls">
    <div id="login" @click="login" v-if="!$store.state.isShow">登录 <i>|</i> 注册</div>
    <div id="login-state" v-else>
      <span class="avatar"></span>
      <span class="uname">{{$store.state.username}}</span>
      <u-nav-menu></u-nav-menu>
    </div>
  </div>
</template>

<script>
  import UNavMenu from 'views/user/childcomps/UNavMenu'

  export default {
    name: 'LoginState',
    components: {
      UNavMenu
    },
    methods: {
      login() {
        this.$router.push('/user');
      }
    },
  }

</script>

<style scoped>
  .ls {
    position: absolute;
    top: 12px;
    right: 160px;
    bottom: 0;
    width: 100px;
    line-height: 36px;
    text-align: center;
    font-weight: 700;
    cursor: pointer;
  }

  #login {
    height: 36px;
    border: 1px solid #f1563b;
    border-radius: 18px;
    color: #f1563b;
    box-sizing: border-box;
  }

  #login:hover {
    background-color: #f1563b;
    color: #fff;
  }

  #login i {
    position: relative;
    top: -2px;
    left: 0;
  }

  #login-state {
    height: 36px;
    color: #fff;
  }

  #login-state .avatar {
    display: inline-block;
    width: 36px;
    height: 36px;
    background-color: #fff;
    border-radius: 50%;
    vertical-align: middle;
  }

  #login-state .uname {
    padding: 0 10px;
  }

  #login-state::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 5px;
    border: 5px solid transparent;
    border-top-color: #fff;
  }

  .ls:hover .u-nav-menu {
    display: block;
  }

</style>
