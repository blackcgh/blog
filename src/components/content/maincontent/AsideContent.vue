<template>
  <div class="aside-content">
    <div class="hot">
      <h3>热度排行榜</h3>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
    <div class="author">
      <h3>推荐作者</h3>
      <ul>
        <li>black</li>
        <li>white</li>
        <li>ghost</li>
        <li>x</li>
        <li>z</li>
      </ul>
    </div>
    <div class="tag-cloud clearfix">
      <h3>标签云</h3>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>Vue</li>
      </ul>
    </div>
    <div class="friend-link">
      <h3>友情链接</h3>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>Vue</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AsideContent',
  }

</script>

<style scoped>
  .aside-content {
    float: right;
    width: 267px;
    box-sizing: border-box;
  }

  .aside-content>div {
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
  }

  .aside-content>div h3 {
    margin-bottom: 20px;
    font-size: 14px;
    color: #969696;
  }

  .aside-content>div ul li {
    margin-bottom: 20px;
    color: #797878;
  }

  .aside-content>div ul li:last-child {
    margin-bottom: 0;
  }

  .hot ul li {
    padding: 0 0 5px 20px;
    border-bottom: 1px solid #cccccc;
  }

  .author ul li {
    padding: 0 0 5px;
  }

  .aside-content .tag-cloud ul li {
    float: left;
    height: 15px;
    padding: 3px 5px;
    margin: 0;
    margin-right: 5px;
    background-color: #f00;
    font-size: 12px;
    line-height: 15px;
    color: #fff;
    border-radius: 13px;
  }

</style>
