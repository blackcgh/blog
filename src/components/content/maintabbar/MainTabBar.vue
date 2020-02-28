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
          <c-nav-menu></c-nav-menu>
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
      <input type="search" placeholder="输入关键字搜索...">
      <button type="button"><span class="iconfont">&#xe61c;</span></button>
    </div>
    <login-state></login-state>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  import CNavMenu from 'views/category/childcomps/CNavMenu'

    import LoginState from './LoginState'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem,
      CNavMenu,
      LoginState
    }
  }

</script>

<style scoped>
  #main-tab-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #3f4257;
    font-size: 17px;
    line-height: 60px;
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
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
    transition: all .3s;
  }

  .tab-bar-item:hover em {
    transform: rotate(-225deg)
  }

  .tab-bar-item:hover .c-nav-menu {
    display: block;
  }

  .search {
    position: absolute;
    top: 0;
    left: 700px;
  }

  input,
  button {
    height: 36px;
    background-color: #f0f0f0;
    line-height: 36px;
    font-size: 14px;
    vertical-align: middle;
  }

  input[type="search"] {
    width: 150px;
    padding-left: 18px;
    border-radius: 18px 0 0 18px;
    box-sizing: border-box;
    transition: width .4s;
  }

  input[type="search"]:focus {
    width: 250px;
  }

  button {
    width: 35px;
    border-radius: 0 18px 18px 0;
  }

  button span {
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 30px;
  }

  input[type="search"]:focus + button span {
    background-color: #969696;
  }

</style>
