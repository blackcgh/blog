<template>
  <div id="body-inner" class="w">
    <body-article class="fl"></body-article>
    <recommend class="fr"></recommend>
  </div>
</template>

<script>
  import BodyArticle from './BodyArticle'
  import Recommend from './Recommend'
  export default {
    name: 'BodyInner',
    components: {
      BodyArticle,
      Recommend
    }
  }

</script>

<style scoped>
  #body-inner {
    height: calc(100vh - 60px);
    background-color: pink;
  }

</style>
