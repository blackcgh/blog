<template>
  <div class="detail-content">
    <div class="d-content">
      <h2>{{blog.title}}</h2>
      <div class="detail-clue">
        <em>{{blog.category}}</em>
        <em>{{blog.readNum}}阅读</em>
        <em>{{blog.likeNum}}点赞</em>
        <em>{{blog.commentInfo.length}}评论</em>
        <em>{{format}}</em>
      </div>
      <div class="blog-content">
        <p v-for="(item,index) of blog.content" :key="index">{{item}}</p>
        <div class="blog-action">
          <span :class="{isSelected: selected}" @click="like">
            <em class="iconfont">&#xec43;</em> {{blog.likeNum}}
          </span>
          <span @click="collect"><em class="iconfont">&#xe604;</em> 443</span>
        </div>
      </div>
    </div>
    <comment :isShow="list.length !== 0" :commentNum="blog.commentInfo.length" @addComment="addComment">
      <comment-item v-for="(item,index) of list" :key="item['_id']" :comment="item" :index="'0'+index">
      </comment-item>
    </comment>
  </div>
</template>

<script>
  import Comment from 'components/common/comment/Comment'
  import CommentItem from 'components/common/comment/CommentItem'

  import { likeBlog, validateBlog } from 'network/blog'
  import { formatTime } from 'common/utils'

  export default {
    name: 'DetailContent',
    data() {
      return {
        selected: false // 是否已经点过赞
      }
    },
    props: {
      blog: {           // 博客信息
        type: Object,
        default () {
          return {}
        }
      },
      list: {           // 存放多条评论信息
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      format() {        // 格式化时间，精确到分钟
        return formatTime(this.blog.createTime, true);
      }
    },
    components: {
      Comment,
      CommentItem
    },
    methods: {
      like() {          // 点赞
        if (this.$store.state.id) {
          this.selected = !this.selected;
          if (this.selected) {
            this.blog.likeNum++;
          } else {
            this.blog.likeNum--;
          }

          likeBlog(this.blog['_id'], this.blog.likeNum, this.$store.state.username)
          .then(result => {
            if (result.errno === -1) {
              this.$tip.show('#fef0f0', '点赞失败', 3, '#f56c6c');
              this.selected = false;
              this.blog.likeNum--;
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能点赞哦', 1, '#909399');
        }
      },
      collect() {       // 收藏
        if(this.$store.state.id) {

        } else {
          this.$tip.show('#edf2fc', '只有登录才能收藏哦', 1, '#909399');
        }
      },
      addComment(comment) { // 发表评论
        this.list.unshift(comment);
      }
    },
    created() {
      // 验证是否对该博客点过赞
      validateBlog(this.blog['_id'], this.$store.state.username).then(result => {
        if(result.errno === 0) {
          this.selected = true;
        }
      })
    }
  }

</script>

<style scoped>
  .detail-content {
    float: left;
    width: 740px;
  }

  .d-content {
    padding: 25px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
  }

  h2 {
    margin-bottom: 15px;
    font-size: 30px;
    color: #222;
    font-weight: 700;
    user-select: text;
  }

  .detail-clue {
    margin-bottom: 30px;
    font-size: 12px;
    color: #9b9b9b;
  }

  .detail-clue em {
    margin-right: 25px;
  }

  .blog-content p {
    line-height: 26px;
    white-space: pre-line;
  }

  .blog-action {
    margin-top: 100px;
    padding-top: 30px;
    border-top: 1px solid #ccc;
    color: #757575;
    text-align: center;
  }

  .blog-action span {
    margin: 0 30px;
  }

  .blog-action span:hover {
    color: #00a1d6;
  }

  .blog-action em {
    position: relative;
    top: 2px;
    left: 0;
  }

  span:first-child em {
    top: 4px;
    font-size: 32px;
  }

  .isSelected {
    color: #00a1d6;
  }

</style>
