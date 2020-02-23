<template>
<div class="nav-menu">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'NavMenu',
}
</script>

<style scoped>
.nav-menu {
  width: 150px;
  box-shadow: 0 0 4px rgba(100, 100, 100, .6)
}
</style>
