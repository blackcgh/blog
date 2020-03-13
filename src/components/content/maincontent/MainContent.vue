<template>
  <div class="main-content">
    <h2 class="mc-title"><slot></slot></h2>
    <div class="operation"><slot name="operation"></slot></div>
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
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
  }

  .main-content h2 {
    height: 36px;
    border-bottom: 4px solid #f1563b;
    margin-bottom: 20px;
    font-size: 22px;
  }

  .operation {
    position: absolute;
    top: 20px;
    right: 15px;
    width: 185px;
    height: 25px;
  }

</style>
