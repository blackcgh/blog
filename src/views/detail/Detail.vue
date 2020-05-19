<template>
  <div id="detail" class="clearfix">
    <detail-content :blog="blog"></detail-content>
    <detail-aside :blog="blog"></detail-aside>
  </div>
</template>

<script>
  import DetailContent from './childcomps/DetailContent'
  import DetailAside from './childcomps/DetailAside'

  import { getDetail } from 'network/blog'
  export default {
    name: 'Detail',
    data() {
      return {
        blog: null, // 博客数据
      }
    },
    watch: {
      // 路径改变时重新发起请求
      '$route.path': function() {
        this.getDetail()
      }
    },
    components: {
      DetailContent,
      DetailAside
    },
    methods: {
      // 请求博客数据
      getDetail() {
        this.$load.show();
        getDetail(this.$route.params.bid, this.$store.state.id).then(res => {
          if(res.errno == 0) {
            document.title = res.data.title + ' - blackblog';
            this.blog = res.data;
            this.blog.commentInfo.reverse();
            window.scrollTo(0, 0);
            this.$store.commit('updateHistory', this.$route.params.bid)
          } else {
            this.$router.back();
            this.$notice.show('该博客已经不存在了！！')
          }
        })
      }
    },
    created() {
      this.getDetail()
    }
  }

</script>

<style scoped>
</style>
