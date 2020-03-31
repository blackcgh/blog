<template>
  <div class="option-nav">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'OptionNav',
  }

</script>

<style scoped>
  .option-nav {
    height: calc(100vh - 60px);
  }

</style>
