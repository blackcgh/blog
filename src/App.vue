<template>
  <div id="app" class="w">
    <!-- 选项卡 -->
    <main-tab-bar></main-tab-bar>
    <!-- 多页面 -->
    <router-view class="w"></router-view>
    <!-- 用户菜单 -->
    <user-menu></user-menu>
    <!-- 我的好友 -->
    <friend></friend>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'
  import UserMenu from 'components/content/usermenu/UserMenu'
  import Friend from 'components/content/friend/Friend'

  export default {
    name: 'App',
    components: {
      MainTabBar,
      UserMenu,
      Friend
    }
  }

</script>

<style>
  @import "./assets/css/base.css";

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }

</style>
