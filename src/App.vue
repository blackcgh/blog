<template>
  <div id="app" class="w">
    <!-- 选项卡 -->
    <main-tab-bar></main-tab-bar>

    <!-- 多页面 -->
    <router-view class="w mt"></router-view>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }

</script>

<style>
  @import "./assets/css/base.css";

  #app {
    position: relative;
    min-width: 100%;
    /* height: 100%; */
    min-height: 100vh;
    padding-bottom: 15px;
    /* background-color: #ecf2f5; */
    /* background-color: #fff; */
    background-color: #f4f5f7;
    /* background-color: #69e0f0; */
    /* background-color: #fff; */
    /* background-image: url(./assets/img/bg.png); */
    overflow-y: auto;
    box-sizing: border-box;
  }

  .mt {
    margin-top: 90px;
  }

  #user-menu.showu {
    left: 0;
  }

  #friend.showf {
    right: 0;
  }

</style>
