<template>
  <div class="nav-menu-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'NavMenuItem',
  }

</script>

<style scoped>
  .nav-menu-item {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    font-size: 14px;
    color: #6f7172;
  }
</style>
