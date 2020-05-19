<template>
  <div id="blog">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Blog',
  }

</script>

<style scoped>
  #blog {
    border-radius: 5px;
    overflow: hidden;
  }

</style>
