<template>
  <div class="detail-content" v-if="blogData">
    <!-- 内容区 -->
    <div class="d-content">
      <!-- 头图 -->
      <div class="head-img" v-if="blogData.headImg">
        <img :src="blogData.headImg" alt="">
      </div>

      <!-- 博客标题 -->
      <h2>{{blogData.title}}</h2>

      <!-- 博客信息 -->
      <div class="detail-clue">
        <!-- 博客分类 -->
        <em>{{blogData.category}}</em>
        <!-- 阅读数 -->
        <em>{{blogData.readNum}}阅读</em>
        <!-- 点赞数 -->
        <em>{{blogData.likeNum}}点赞</em>
        <!-- 评论数 -->
        <em>{{blogData.commentInfo.length}}评论</em>
        <!-- 创建时间 -->
        <em>{{format}}</em>
      </div>

      <!-- 博客 -->
      <div class="blog-content">
        <!-- 博客内容 -->
        <div class="ql-container ql-snow">
          <div class="ql-editor">
            <div v-html="blogData.content"></div>
          </div>
        </div>

        <!-- <div class="content" v-html="blogData.content"></div> -->
        <!-- 点赞、收藏 -->
        <div class="blog-action">
          <!-- 点赞 -->
          <span title="点赞该博客" :class="{like: blogData.isLike}" @click="like">
            <em class="iconfont">&#xec43;</em> {{blogData.likeNum}}
          </span>
          <!-- 收藏 -->
          <span title="收藏该博客" :class="{like: blogData.isStar}" @click="collect">
            <em class="iconfont">&#xe604;</em> {{blogData.starNum}}
          </span>

          <!-- 收藏框 -->
          <add-star
            v-show="isShow"
            :bid="bid"
            :select="getSelect"
            @cancel="cancel"
            @success="success">
          </add-star>
        </div>
      </div>
    </div>

    <!-- 评论区 -->
    <comment
      :isShow="pComment.length == 0"
      :commentNum="blogData.commentInfo.length"
      @addComment="addComment">
      <comment-item
        v-for="item of pComment"
        :key="item['_id']" :comment="item"
        :mark="item['_id']">
      </comment-item>
    </comment>
  </div>
</template>

<script>
  import Comment from 'components/common/comment/Comment'
  import CommentItem from 'components/common/comment/CommentItem'
  import AddStar from 'components/content/addstar/AddStar'

  import { likeBlog, starBlog } from 'network/blog'
  import { formatTime } from 'common/utils'

  export default {
    name: 'DetailContent',
    data() {
      return {
        // 博客数据
        blogData: this.blog,
        // 评论数据
        pComment: [],
        // 是否显示收藏框
        isShow: false,
        // 收藏博客
        bid: this.$route.path.split('/')[2]
      }
    },
    props: ['blog'],
    computed: {
      // 格式化时间，精确到分钟
      format() {
        return formatTime(this.blogData.createTime, true);
      },
      // 获取收藏在哪个收藏夹中
      getSelect() {
        const bid = this.$route.path.split('/')[2];
        for(let i in this.$store.state.star) {
          for(let j of this.$store.state.star[i].favorite) {
            if(j == bid) return i
          }
        }
        return -1
      },
      // 验证是否收藏
      getStatus() {
        const bid = this.$route.path.split('/')[2];
        for(let i of this.$store.state.star) {
          for(let j of i.favorite) {
            if(j == bid) return true
          }
        }
        return false
      }
    },
    watch: {
      blog(val) {
        const parentComment = [];
        const sonComment = [];
        this.blogData = val;
        for (let i of this.blogData.commentInfo) {
          if (i.parentId == this.blogData['_id']) {
            // reply是自定义的，不存在于数据库
            i.reply = [];
            parentComment.push(i)
          } else {
            sonComment.push(i)
          }
        }

        for (let i of parentComment) {
          for (let j = 0; j < sonComment.length; j++) {
            if (i['_id'] == sonComment[j].parentId) {
              i.reply.push(sonComment[j]);
              sonComment.splice(j--, 1);
            }
          }
        }
        this.pComment = parentComment
      }
    },
    components: {
      Comment,
      CommentItem,
      AddStar
    },
    methods: {
      // 点赞
      like() {
        if (this.$store.state.id) {
          this.blogData.isLike = !this.blogData.isLike;
          if (this.blogData.isLike) {
            this.blogData.likeNum++;
          } else {
            this.blogData.likeNum--;
          }
          // 发送点赞请求
          const {
            '_id': bid,
            likeNum
          } = this.blogData
          likeBlog(bid, likeNum, this.$store.state.id).then(res => {
            if (res.errno === -1) {
              this.$tip.show('#fef0f0', '点赞失败', 3, '#f56c6c');
              this.blogData.isLike = !this.blogData.isLike;
              if (this.blogData.isLike) {
                this.blogData.likeNum++;
              } else {
               this.blogData.likeNum--;
              }
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能点赞哦', 1, '#909399');
        }
      },
      // 显示收藏框
      collect() {
        if (this.$store.state.id) {
          this.isShow = true;
        } else {
          this.$tip.show('#edf2fc', '只有登录才能收藏哦', 1, '#909399');
        }
      },
      // 隐藏收藏框组件
      cancel() {
        this.isShow = false
      },
      // 添加、取消收藏
      success() {
        this.blogData.isStar = this.getStatus;
        if(this.blogData.isStar) {
          this.blogData.starNum++
        } else {
          this.blogData.starNum--
        }
        const {
          '_id': bid,
          starNum
        } = this.blogData;
        starBlog(bid, starNum, this.$store.state.id)
      },
      // 发表评论
      addComment(comment) {
        comment.reply = []
        this.pComment.unshift(comment);
      }
    }
  }

</script>

<style>
  .detail-content {
    float: left;
    width: 751px;
  }

  .d-content {
    padding: 25px;
    padding-top: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
  }

  .head-img {
    margin-bottom: 40px;
    overflow: hidden;
    border-radius: 4px;
  }

  .head-img img {
    width: 100%;
    /* object-fit: cover; */
  }

  .d-content h2 {
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

  .content {
    line-height: 26px;
    white-space: pre-line;
  }

  .ql-container {
    border: 0!important;
    font-size: 16px;
  }

  .ql-container p {
    padding-bottom: 10px;
  }

  .ql-container em {
    font-style: italic !important;
  }

  .ql-container s {
    text-decoration: line-through;
  }

  /* .ql-editor {
    min-height: 0;
  } */

  .blog-action {
    margin-top: 100px;
    padding: 30px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    color: #757575;
    text-align: center;
  }

  .blog-action span {
    display: inline-block;
    width: 60px;
    margin: 0 30px;
    text-align: left;
    cursor: pointer;
  }

  .blog-action span:hover {
    color: #00a1d6;
  }

  .blog-action em {
    position: relative;
    top: 2px;
    left: 0;
  }

  .blog-action span:first-child em {
    top: 4px;
    font-size: 32px;
  }

  .like {
    color: #00a1d6;
  }

</style>
