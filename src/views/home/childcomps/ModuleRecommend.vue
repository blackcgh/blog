<template>
<div class="module-recommend">
  <h3 class="title"><slot></slot></h3>
  <div class="content"><slot name="content"></slot></div>
</div>
</template>

<script>
export default {
  name: 'ModuleRecommend',
}
</script>

<style scoped>
.title {
  height: 40px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(129, 121, 121);
  line-height: 40px;
}
</style>
