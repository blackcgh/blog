<template>
  <div id="nav-bar" class="w">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
  }

</script>

<style scoped>
  #nav-bar {
    height: 58px;
  }

</style>
