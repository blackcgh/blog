<template>
  <div id="blog-list">
    <blog-content></blog-content>
    <blog-aside></blog-aside>
  </div>
</template>

<script>
  import BlogContent from './category/BlogContent'
  import BlogAside from './category/BlogAside'

  export default {
    name: 'BlogList',
    components: {
      BlogContent,
      BlogAside
    }
  }

</script>

<style scoped>
  #blog-list {
    overflow: hidden;
  }

</style>
