<template>
<div class="aside-content">
  <slot name="me"></slot>
  <h3 v-if="show"><slot></slot></h3>
  <div><slot name="content"></slot></div>
</div>
</template>

<script>
export default {
  name: 'AsideContent',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.aside-content {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 5px;
}

.aside-content h3 {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 19px;
  font-size: 14px;
  color: #969696;
}

.aside-content div {
  color: #797878;
}
</style>
