<template>
<div class="option-item">
  <div class="item-iconfont"><slot name="item-iconfont"></slot></div>
  <div><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
  name: 'OptionItem',
}
</script>

<style scoped>
.option-item {
  color: #6f7172;
  text-align: center;
  padding: 15px 0;
}

.item-iconfont {
  margin-bottom: 5px;
}
</style>
