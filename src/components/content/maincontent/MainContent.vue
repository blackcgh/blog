<template>
  <div class="main-content">
    <h2><slot></slot></h2>
    <slot name="mc"></slot>
  </div>
</template>

<script>
  export default {
    name: 'MainContent',
  }

</script>

<style scoped>
  .main-content {
    position: relative;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 5px;
  }

  .main-content:last-child {
    margin-bottom: 0;
  }

  .main-content h2 {
    padding-bottom: 5px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e9ef;
    font-size: 22px;
    line-height: 25px;
    color: #222;
  }

</style>
