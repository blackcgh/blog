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
    width: 80px;
    height: calc(100vh - 60px);
  }

</style>
