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

  .nav-menu-item:hover {
    background-color: #f0f2f3;
  }

  .nav-menu-item span {
    position: relative;
    top: 2px;
    margin-right: 10px;
    font-size: 20px;
  }

</style>
