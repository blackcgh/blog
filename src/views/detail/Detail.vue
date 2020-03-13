<template>
  <div id="detail" class="clearfix">
    <detail-content :blog="getBlog" :list="list"></detail-content>
    <detail-aside :blog="getBlog"></detail-aside>
  </div>
</template>

<script>
  import DetailContent from './childcomps/DetailContent'
  import DetailAside from './childcomps/DetailAside'

  import { getList } from 'network/comment'

  export default {
    name: 'Detail',
    data() {
      return {
        list: [] // 博客评论
      }
    },
    computed: {
      getBlog() {
        let blog = this.$route.query.blog;
        blog.content = blog.content.split(/\n|\r|\n\r/);
        blog.content = blog.content.map(item => {
          if (item === '') {
            return '\n';
          }
          return item;
        })
        return blog
      }
    },
    components: {
      DetailContent,
      DetailAside
    },
    created() {
      getList(this.getBlog['_id']).then(data => {
        if (data.errno === 0) {
          data.data.forEach(item => {
            if(item.parentId == this.$route.params.bid) {
              item.replies = [];
              this.list.push(item);
            } else {
              this.list.forEach(el => {
                if(item.parentId == el['_id']) {
                  el.replies.push(item);
                }
              })
            }
          });
          this.list = this.list.reverse();
        } else if (data.errno === -1) {
          alert('获取失败');
        }
        window.scrollTo(0, 0);
      })
    }
  }

</script>

<style scoped>
</style>
