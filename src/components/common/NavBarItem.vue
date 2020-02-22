<template>
<div class="nav-bar-item fl">
  <slot name="function"></slot>
  <slot name="spread"></slot>
</div>
</template>

<script>
export default {
  name: 'NavBarItem',
}
</script>

<style scoped>
.nav-bar-item {
  padding: 0 20px;
}
</style>
