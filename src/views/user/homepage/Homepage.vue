<template>
  <div id="homepage">
    <page-content :blogList="blogList" :isShow="isShow"></page-content>
    <page-aside></page-aside>
  </div>
</template>

<script>
  import PageContent from './childcomps/PageContent'
  import PageAside from './childcomps/PageAside'

  import { getList } from 'network/blog'

  export default {
    name: 'Homepage',
    data() {
      return {
        blogList: [],
        isShow: true
      }
    },
    watch: {
      '$route.params.userId': function () {
        this.getList()
      }
    },
    components: {
      PageContent,
      PageAside
    },
    methods: {
      getList() {
        this.blogList = [];
        this.isShow = true;
        getList(this.$route.path.split('/')[1]).then(res => {
          this.isShow = false;
          if (res.errno === 0) {
            this.blogList = res.data
          } else if (res.errno === -1) {
            this.$tip.show('#fef0f0', '获取失败', 3, '#f56c6c')
          }
        })
      }
    },
    // 获取用户的博客列表
    created() {
      this.getList()
    }
  }

</script>

<style scoped>
</style>
