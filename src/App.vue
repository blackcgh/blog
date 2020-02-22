<template>
  <div id="app" class="w">
    <main-nav-bar></main-nav-bar>
    <home></home>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/MainNavBar'
  import Home from 'views/home/Home'

  export default {
    name: 'App',
    components: {
      MainNavBar,
      Home,
    }
  }

</script>

<style>
  @import "./assets/css/base.css";

  #app {
    width: 100%;
    height: 100%;
  }

</style>
