<template>
  <div id="main-tab-bar">
    <h1>BlackBlog</h1>
    <tab-bar>
      <tab-bar-item path="/">
        <template v-slot:function>首页</template>
      </tab-bar-item>
      <tab-bar-item path="/column">
        <template v-slot:function>
          <div class="column" @mouseenter="enterColumn" @mouseleave="leaveColumn">
            专栏
            <column-label v-show="show_c" @shutColumn="shutColumn"></column-label>
          </div>
        </template>
        <template v-slot:spread>
          <em></em>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/dynamic">
        <template v-slot:function>动态</template>
        <!-- <template v-slot:spread><b>48</b></template> -->
      </tab-bar-item>
    </tab-bar>
    <div class="search">
      <input type="search" placeholder="输入关键字搜索..." v-model="keyword">
      <span class="iconfont" @click="search">&#xe61c;</span>
    </div>
    <login-state></login-state>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  import ColumnLabel from './childcomps/ColumnLabel'
  import LoginState from './LoginState'

  import { validate } from 'network/user'

  export default {
    name: 'MainTabBar',
    data() {
      return {
        // 是否显示专栏分类
        show_c: false,
        // 搜索关键词
        keyword: ''
      }
    },
    components: {
      TabBar,
      TabBarItem,
      ColumnLabel,
      LoginState
    },
    methods: {
      // 鼠标进入专栏
      enterColumn() {
        this.show_c = true
      },
      // 鼠标离开专栏
      leaveColumn() {
        this.show_c = false
      },
      // 关闭专栏
      shutColumn() {
        this.show_c = false
      },
      // 关键字搜索
      search() {
        if(this.keyword != '') {
          if(this.$route.query.keyword != this.keyword) {
            this.$router.push({
              path: '/search',
              query: { keyword: this.keyword }
            })
          }
        } else {
          this.$tip.show('#edf2fc', '搜索内容不能为空', 1, '#909399')
        }
      }
    },
    created() {
      validate().then(res => {
        if(res.errno === 0) {
          this.$store.commit('login', res.data);
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
    font-size: 16px;
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

  .column {
    width: 100%;
    height: 100%;
  }

  b {
    position: absolute;
    top: 7px;
    right: 12px;
    padding: 0 3px;
    background-color: #FA5A57;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    border-radius: 8px;
  }

  .search {
    position: absolute;
    top: 0;
    left: 500px;
    margin-top: 12px;
    line-height: 36px;
  }

  input[type="search"] {
    width: 280px;
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
