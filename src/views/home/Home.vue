<template>
  <div id="home" class="clearfix">
    <home-content></home-content>
    <home-aside></home-aside>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeContent from './childcomps/HomeContent'
  import HomeAside from './childcomps/HomeAside'

  export default {
    name: 'Home',
    components: {
      HomeContent,
      HomeAside
    },
    created() {
      window.scrollTo(0, 0);
    }
  }

</script>

<style scoped>
</style>
