<template>
<div id="home">
  <body-inner></body-inner>
</div>
</template>

<script>

import BodyInner from './childcomps/BodyInner'

export default {
  name: 'Home',
  components: {
    BodyInner
  }
}
</script>

<style scoped>
  #home {
    margin-top: 60px;
  }
</style>
