<template>
  <div id="home" class="clearfix">
    <home-content></home-content>
    <aside-content></aside-content>
  </div>
</template>

<script>
  import HomeContent from './childcomps/HomeContent'
  import AsideContent from 'components/content/maincontent/AsideContent'

  export default {
    name: 'Home',
    components: {
      HomeContent,
      AsideContent,
    },
    created() {
    }
  }

</script>

<style scoped>
</style>
