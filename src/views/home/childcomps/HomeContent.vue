<template>
  <div class="home-content">
    <main-content>
      <div class="article">
        <h2>文章推荐</h2>
        <recommend></recommend>
        <recommend></recommend>
        <recommend></recommend>
      </div>
      <div class="article">
        <h2>图片推荐</h2>
        <recommend></recommend>
        <recommend></recommend>
      </div>
      <div class="article">
        <h2>音频推荐</h2>
        <recommend></recommend>
        <recommend></recommend>
      </div>
      <div class="article">
        <h2>视频推荐</h2>
        <recommend></recommend>
        <recommend></recommend>
      </div>
    </main-content>
  </div>
</template>

<script>
  import MainContent from 'components/content/maincontent/MainContent'
  import Recommend from 'components/content/maincontent/Recommend'

  export default {
    name: 'HomeContent',
    components: {
      MainContent,
      Recommend
    }
  }

</script>

<style scoped>
  .home-content {
    float: left;
    width: 740px;
    box-sizing: border-box;
  }

  .article {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
  }

  .article h2 {
    height: 36px;
    border-bottom: 4px solid #f1563b;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
  }

  .recommend:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

</style>
