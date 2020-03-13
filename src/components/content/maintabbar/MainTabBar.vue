<template>
  <div id="main-tab-bar">
    <h1>BlackBlog</h1>
    <Tab-bar>
      <Tab-bar-item path="/">
        <template v-slot:function>首页</template>
      </Tab-bar-item>
      <Tab-bar-item path="/category">
        <template v-slot:function>专栏</template>
        <template v-slot:spread>
          <em></em>
          <c-nav-menu></c-nav-menu>
        </template>
      </Tab-bar-item>
      <Tab-bar-item path="/dynamic">
        <template v-slot:function>动态</template>
        <template v-slot:spread></template>
      </Tab-bar-item>
    </Tab-bar>
    <div class="search">
      <input type="search" placeholder="输入关键字搜索...">
      <span class="iconfont" @click="search">&#xe61c;</span>
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
    },
    methods: {
      search() {}
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
    z-index: 10;
  }

  h1 {
    position: absolute;
    top: 0;
    left: 20px;
    font-size: 25px;
    color: #fff;
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
    left: 500px;
  }

  input[type="search"] {
    width: 190px;
    height: 36px;
    padding-left: 18px;
    line-height: 36px;
    font-size: 14px;
    vertical-align: middle;
    border-radius: 18px;
    box-sizing: border-box;
    transition: width .4s;
  }

  .search span {
    position: absolute;
    top: 15px;
    right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }

  input[type="search"]:focus {
    width: 250px;
  }

  input[type="search"]:focus + span {
    background-color: #969696;
    color: #fff;
  }

</style>
