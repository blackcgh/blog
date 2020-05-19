<template>
  <div id="blog-list" class="clearfix">
    <!-- 导航菜单 -->
    <div class="blog-aside">
      <ul>
        <li v-for="(item,index) of navList"
            :key="item.name"
            :class="{current: currentIndex==index}"
            @click="itemClick(index,item.view)">
            <!-- 菜单项 -->
          <h3>{{item.name}}</h3>
          <!-- 发表数目 -->
          <span :style="{color: (currentIndex==index?'#fff':'')}">{{getNum(index)}}</span>
        </li>
      </ul>
    </div>

    <!-- 视图组件 -->
    <component class="comp" :is="component"></component>
  </div>
</template>

<script>
  import BlogContent from './list/BlogContent'
  import PicContent from './list/PicContent'
  import AudioContent from './list/AudioContent'
  import VideoContent from './list/VideoContent'

  export default {
    name: 'BlogList',
    data() {
      return {
        // 导航菜单
        navList: [
          {
            name: '博客',
            view: 'BlogContent'
          },
          {
            name: '相簿',
            view: 'PicContent'
          },
          {
            name: '音频',
            view: 'AudioContent'
          },
          {
            name: '视频',
            view: 'VideoContent'
          }
        ],
        // 视图组件
        component: 'BlogContent',
        // 当前视图
        currentIndex: 0
      }
    },
    computed: {
      getNum() {
        return function(index) {
          if(index == 0) return this.$store.state.blog
          return 0
        }
      }
    },
    components: {
      BlogContent,
      PicContent,
      AudioContent,
      VideoContent
    },
    methods: {
      // 导航菜单点击事件
      itemClick(index, view) {
        this.currentIndex = index;
        this.component = view
      }
    }
  }

</script>

<style scoped>
  #blog-list {
    background-color: #fff;
  }

  .blog-aside {
    float: left;
    width: 230px;
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
    width: 790px;
    min-height: 500px;
    padding-left: 12px;
    border-left: 1px solid #eee;
  }

</style>
