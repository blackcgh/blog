<template>
  <div class="blog-content">
    <main-content>
      <span>我的博客</span>
      <template v-slot:mc>
        <my-blog></my-blog>
      </template>
    </main-content>
  </div>
</template>

<script>
  import MainContent from 'components/content/maincontent/MainContent'
  import MyBlog from './operator/MyBlog'

  export default {
    name: 'BlogContent',
    data() {
      return {
        currentIndex: 0,
      }
    },
    components: {
      MainContent,
      MyBlog
    }
  }

</script>

<style scoped>
  /* span {
    display: inline-block;
    height: 36px;
    padding: 0 5px;
    background-color: #f1563b;
    line-height: 36px;
    color: #fff;
  } */

  p {
    width: 85px;
    height: 25px;
    background-color: #00a1d6;
    text-align: center;
    line-height: 25px;
    color: #fff;
    border-radius: 14px;
  }

  p:hover {
    background-color: #03bbf8;
  }

</style>
