<template>
  <div id="main-tab-bar">
    <h1>blackblog</h1>
    <Tab-bar>
      <Tab-bar-item path="/home">
        <template v-slot:function>首页</template>
      </Tab-bar-item>
      <Tab-bar-item path="/category">
        <template v-slot:function>分类</template>
        <template v-slot:spread>
          <em></em>
          <main-nav-menu></main-nav-menu>
        </template>
      </Tab-bar-item>
      <Tab-bar-item path="/update">
        <template v-slot:function>动态</template>
        <template v-slot:spread></template>
      </Tab-bar-item>
      <Tab-bar-item path="/picture">
        <template v-slot:function>图片</template>
        <template v-slot:spread></template>
      </Tab-bar-item>
      <Tab-bar-item path="/audio">
        <template v-slot:function>音频</template>
        <template v-slot:spread></template>
      </Tab-bar-item>
      <Tab-bar-item path="/video">
        <template v-slot:function>视频</template>
        <template v-slot:spread></template>
      </Tab-bar-item>
    </Tab-bar>
    <div class="search">
      <input type="search" placeholder="输入关键字搜索..." @focus="changeLength" @blur="recover">
      <input type="button" value="搜索">
    </div>
    <div id="login" @click="login">登录 / 注册</div>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  import MainNavMenu from 'components/content/mainnavmenu/MainNavMenu'

  export default {
    name: 'MainTabBar',
    methods: {
      changeLength() {
        document.querySelector('input[type=search]').style.width = 300 + 'px';
      },
      recover() {
        document.querySelector('input[type=search]').style.width = 200 + 'px';
      },
      login() {
        this.$router.replace('/user');

      }
    },
    components: {
      TabBar,
      TabBarItem,
      MainNavMenu
    }
  }

</script>

<style scoped>
  #main-tab-bar {
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

  em {
    position: absolute;
    top: 25px;
    right: 10px;
    width: 5px;
    height: 5px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    transform: rotate(-45deg);
    transition: all .4s;
  }

  .tab-bar-item:hover em {
    transform: rotate(-225deg)
  }

  .tab-bar-item:hover .main-nav-menu {
    display: block;
  }

  .search {
    position: absolute;
    top: 0;
    left: 700px;
  }

  input {
    height: 36px;
    background-color: #f0f0f0;
    line-height: 36px;
    font-size: 14px;
  }

  input[type="search"] {
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
    top: 12px;
    right: 0;
    width: 100px;
    height: 36px;
    margin-right: 50px;
    border: 1px solid #f1563b;
    line-height: 36px;
    text-align: center;
    border-radius: 18px;
    color: #f1563b;
    font-weight: 700;
    cursor: pointer;
  }

  #login:hover {
    background-color: #f1563b;
    color: #fff;
  }

</style>
