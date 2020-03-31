<template>
  <div id="main-tab-bar">
    <h1>BlackBlog</h1>
    <tab-bar>
      <tab-bar-item path="/">
        <template v-slot:function>首页</template>
      </tab-bar-item>
      <tab-bar-item path="/column">
        <template v-slot:function>专栏</template>
        <template v-slot:spread>
          <em></em>
          <c-nav-menu></c-nav-menu>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/dynamic">
        <template v-slot:function>动态</template>
        <template v-slot:spread></template>
      </tab-bar-item>
    </tab-bar>
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

  import CNavMenu from 'views/column/childcomps/CNavMenu'

  import LoginState from './LoginState'

  import { validate } from 'network/user'

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
    },
    created() {
      validate().then(result => {
        if(result.errno === 0) {
          this.$store.commit('show');
          this.$store.commit('login', result.data.username);
          this.$store.commit('updateId', result.data.id);
        }
      })
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
    margin-top: 12px;
    line-height: 36px;
  }

  input[type="search"] {
    width: 250px;
    height: 36px;
    padding: 0 5px 0 20px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .search span {
    display: inline-block;
    width: 48px;
    height: 36px;
    background-color: #eaedf2;
    text-align: center;
    color: #222;
    vertical-align: middle;
    cursor: pointer;
  }

  .search span:hover {
    color: #00a1d6;
  }

</style>
