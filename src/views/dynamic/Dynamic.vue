<template>
  <div id="dynamic">
    动态
  </div>
</template>

<script>
  export default {
    name: 'Dynamic',
    created() {
      window.scrollTo(0, 0);
    }
  }

</script>

<style scoped>
  #dynamic {
    height: calc(100vh - 90px);
    background-color: rgb(62, 112, 228);
  }

</style>
