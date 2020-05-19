<template>
  <div id="home" class="clearfix">
    <home-content
      :category="getCategory"
      :headImgs="headImgs"
      :blogList="blogList"
      :end="isEnd">
    </home-content>
    <home-aside :blog="blog" :user="user"></home-aside>
    <!-- 登录、注册窗口 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeContent from './childcomps/HomeContent'
  import HomeAside from './childcomps/HomeAside'

  import { getAll } from 'network/blog'

  export default {
    name: 'Home',
    data() {
      return {
        // 获取博客列表
        blogList: [],
        // 是否到尽头
        isEnd: false,
        // 头图推荐
        headImgs: [],
        // 推荐博客
        blog: [],
        // 推荐用户
        user: []
      }
    },
    computed: {
      getCategory() {
        switch(this.$route.params.path) {
          case 'technology':
            return '科技'
          case 'life':
            return '生活'
          case 'interest':
            return '兴趣'
          case 'animate':
            return '动画'
          case 'game':
            return '游戏'
          case 'video':
            return '影视'
          case 'lightnovel':
            return '轻小说'
          default:
            return ''
        }
      }
    },
    watch: {
      '$route.path': function() {
        this.getAll()
      }
    },
    components: {
      HomeContent,
      HomeAside
    },
    methods: {
      getAll() {
        this.$load.show();
        const category = this.getCategory;
        // 请求最新5条博客
        getAll(0, category, true, this.$store.state.id).then(res => {
          this.blogList = res.data.all.data;
          this.isEnd = res.data.all.isEnd;
          this.blog = res.data.blog;
          this.user = res.data.user;
          this.headImgs = [];
          if(res.data.headImg.length) this.headImgs.push(...res.data.headImg, res.data.headImg[0]);
          window.scrollTo(0, 0);
          // 隐藏加载组件
          this.$load.hidden();
        })
      }
    },
    created() {
      document.title = 'blackblog (゜-゜)つ - 用心创作';
      this.getAll()
    }
  }

</script>

<style scoped>
</style>
