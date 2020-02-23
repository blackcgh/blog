<template>
  <div id="tab-bar" class="w">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
  }

</script>

<style scoped>
  #tab-bar {
    height: 58px;
  }

</style>
