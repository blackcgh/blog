<template>
  <div class="blog-content">
    <main-content>
      <span>我的博客</span>
      <template v-slot:operation>
        <p @click="newBlog" class="new">投 稿</p>
        <p @click="edit">{{editor}}</p>
      </template>
      <template v-slot:mc>
        <my-blog :select="editor.length>3"></my-blog>
      </template>
    </main-content>
  </div>
</template>

<script>
  import MainContent from 'components/content/maincontent/MainContent'
  import MyBlog from '../operator/MyBlog'

  export default {
    name: 'BlogContent',
    data() {
      return {
        currentIndex: 0,
        editor: '编 辑'
      }
    },
    components: {
      MainContent,
      MyBlog
    },
    methods: {
      newBlog() {
        this.$router.push('/' + this.$store.state.id + '/blog/new');
      },
      edit() {
        if(this.editor.length > 3) {
          this.editor = '编 辑';
        } else {
          this.editor = '取消编辑';
        }
      }
    }
  }

</script>

<style scoped>
  .blog-content {
    float: left;
    width: 740px;
    box-sizing: border-box;
  }

  span {
    display: inline-block;
    height: 36px;
    padding: 0 5px;
    background-color: #f1563b;
    line-height: 36px;
    color: #fff;
  }

  p {
    float: left;
    width: 85px;
    height: 25px;
    background-color: #3bb7f1;
    text-align: center;
    line-height: 25px;
    color: #fff;
    border-radius: 14px;
  }

  .new {
    margin-right: 15px;
  }

  p:hover {
    background-color: #f1563b;
  }

</style>
