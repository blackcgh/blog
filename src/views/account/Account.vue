<template>
  <div id="account">
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'Account',
    created() {
      window.scrollTo(0, 0);
    }
  }

</script>

<style scoped>
</style>
