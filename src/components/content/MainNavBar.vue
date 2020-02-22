<template>
  <div id="main-nav-bar">
    <h1>blackblog</h1>
    <nav-bar>
      <nav-bar-item>
        <template v-slot:function>首页</template>
      </nav-bar-item>
      <nav-bar-item>
        <template v-slot:function>博客分类</template>
        <template v-slot:spread></template>
      </nav-bar-item>
      <nav-bar-item>
        <template v-slot:function>博客动态</template>
        <template v-slot:spread></template>
      </nav-bar-item>
      <nav-bar-item>
        <template v-slot:function>图片</template>
        <template v-slot:spread></template>
      </nav-bar-item>
      <nav-bar-item>
        <template v-slot:function>音频</template>
        <template v-slot:spread></template>
      </nav-bar-item>
      <nav-bar-item>
        <template v-slot:function>视频</template>
        <template v-slot:spread></template>
      </nav-bar-item>
      <nav-bar-item>
        <template v-slot:function>
          <input type="text" placeholder="输入关键字搜索...">
          <input type="button" value="搜索">
        </template>
      </nav-bar-item>
    </nav-bar>
    <div id="login">
      <span>登录</span>
      <span>注册</span>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/NavBar'
  import NavBarItem from 'components/common/NavBarItem'

  export default {
    name: 'MainNavBar',
    components: {
      NavBar,
      NavBarItem
    }
  }

</script>

<style scoped>
  #main-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 2px solid rgb(236, 224, 224);
    background-color: #fff;
    font-size: 17px;
    line-height: 58px;
  }

  h1 {
    position: absolute;
    top: 0;
    left: 20px;
    font-size: 20px;
    font-weight: 700;
  }

  input {
    height: 36px;
    background-color: #f0f0f0;
    line-height: 36px;
    font-size: 14px;
  }

  input[type="text"] {
    width: 200px;
    padding-left: 18px;
    border-radius: 18px 0 0 18px;
    box-sizing: border-box;
    transition: width .4s;
  }

  input[type="button"] {
    border-radius: 0 18px 18px 0;
  }

  #login {
    position: absolute;
    top: 0;
    right: 0;
  }

  #login span {
    padding-right: 20px;
  }

</style>
