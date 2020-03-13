<template>
  <div id="category">
    专栏
  </div>
</template>

<script>
  export default {
    name: 'Category',
    created() {
      window.scrollTo(0, 0);
    }
  }

</script>

<style scoped>
  #category {
    height: calc(100vh - 90px);
    background-color: rgb(175, 80, 192);
  }

</style>
