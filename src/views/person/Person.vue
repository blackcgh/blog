<template>
  <div id="person">
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'Person',
    created() {
      window.scrollTo(0, 0);
    }
  }

</script>

<style scoped>
</style>
