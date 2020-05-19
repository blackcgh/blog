<template>
  <div id="search" class="clearfix">
    <!-- 导航菜单 -->
    <div class="search-aside">
      <ul>
        <li v-for="(item,index) of navList"
            :key="item.name"
            :class="{current: currentIndex==index}"
            @click="itemClick(index,item.view)">
            <!-- 菜单项 -->
          <h3>{{item.name}}</h3>
          <!-- 发表数目 -->
          <span :style="{color: (currentIndex==index?'#fff':'')}">{{getLength(index)}}</span>
        </li>
      </ul>
    </div>

    <!-- 视图组件 -->
    <component class="comp" :is="component" :list="getList" :isShow="isShow"></component>
  </div>
</template>

<script>
  import SearchBlog from './childcomps/SearchBlog'
  import SearchUser from './childcomps/SearchUser'

  import { search } from 'network/blog'

  export default {
    name: 'Search',
    data() {
      return {
        // 导航菜单
        navList: [
          {
            name: '博客',
            view: 'SearchBlog',
          },
          {
            name: '用户',
            view: 'SearchUser',
          }
        ],
        // 视图组件
        component: 'SearchBlog',
        // 当前视图
        currentIndex: 0,
        // 搜索结果
        list: {
          blogList: [],
          userList: []
        },
        // 显示加载图标
        isShow: true
      }
    },
    computed: {
      // 获取不同组件的数据
      getList() {
        if(this.currentIndex == 0) {
          return this.list.blogList
        } else {
          return this.list.userList
        }
      },
      // 获取数据长度
      getLength() {
        return function(index) {
          if(index == 0) {
            return this.list.blogList.length
          } else {
            return this.list.userList.length
          }
        }
      }
    },
    watch: {
      '$route.query.keyword': function() {
        this.search()
      }
    },
    components: {
      SearchBlog,
      SearchUser
    },
    methods: {
      // 导航菜单点击事件
      itemClick(index, view) {
        this.currentIndex = index;
        this.component = view
      },
      // 搜索博客、用户数据
      search(keyword) {
        this.list.blogList = [];
        this.list.userList = [];
        this.isShow = true;
        search(keyword).then(res => {
          this.isShow = false;
          this.list = res.data;
          for(let i in this.list.userList) {
            if(this.list.userList[i]['_id'] == this.$store.state.id) {
              this.list.userList.splice(i, 1)
            }
          }
        })
      }
    },
    created() {
      const keyword = this.$route.query.keyword;
      document.title = keyword + ' - 搜索结果 - blackblog'
      this.search(keyword)
    },
  }
</script>

<style scoped>
  #search {
    background-color: #fff;
    border-radius: 5px;
  }

  .search-aside {
    float: left;
    width: 231px;
    height: 100%;
  }

  li {
    height: 50px;
    padding: 0 30px;
    line-height: 50px;
    cursor: pointer;
  }

  h3 {
    float: left;
  }

  span {
    float: right;
    font-size: 14px;
    color: #99a2aa;
  }

  li:hover {
    background-color: #f4f5f7;
    color: #00a1d6;
  }

  li.current {
    background-color: #00a1d6;
    color: #fff;
  }

  .comp {
    float: right;
    width: 802px;
    min-height: calc(100vh - 105px);
    padding: 15px 15px 15px 27px;
    border-left: 1px solid #eee;
    box-sizing: border-box;
  }
</style>
