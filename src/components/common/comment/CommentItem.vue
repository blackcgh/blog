<template>
  <div class="comment-item">
    <!-- 用户头像 -->
    <img src="" alt="">
    <div>
      <!-- 用户名 -->
      <h4>{{comment.userInfo[0].username}}</h4>
      <!-- 评论内容 -->
      <p>{{comment.content}}</p>
      <div class="info">
        <!-- 评论时间 -->
        <span>{{format}}</span>
        <!-- 点赞数 -->
        <span>
          <em class="iconfont" :class="{isSelected: selected}" @click="like">&#xe601;</em>
          {{likeItem}}
        </span>
        <span><em class="iconfont">&#xe602;</em> 54</span>
        <!-- 回复按钮 -->
        <span @click="reply">回复</span>
      </div>
      <!-- 点击回复按钮，显示评论编辑框 -->
      <div class="send clearfix" v-if="show">
        <img src="" alt="">
        <textarea placeholder="说点什么..." v-model="replyComment.content"></textarea>
        <span @click="submit">发表评论</span>
      </div>
      <!-- 回复盒子 -->
      <reply-box>
        <!-- 回复项 -->
        <reply-item v-for="(item,index) of reverseReplies" :key="item['_id']" :reply="item" :commentId="comment['_id']" :index="'1'+index" @addReply="addReply">
        </reply-item>
      </reply-box>
    </div>
  </div>
</template>

<script>
  import ReplyBox from './ReplyBox'
  import ReplyItem from './ReplyItem'

  import { newComment, likeComment, validateComment } from 'network/comment'
  import { formatTime } from 'common/utils'

  export default {
    name: 'CommentItem',
    data() {
      return {
        selected: false,  // 记录是否已经点赞
        replyComment: {   // 回复评论格式
          content: '',
          createTime: new Date(),
          likeNum: 0,
          parentId: this.comment['_id'], // 上级id是评论id
          uid: this.$store.state.id,
          bid: this.$route.params.bid
        }
      }
    },
    props: {
      comment: {  // 要回复的评论
        type: Object,
        default () {
          return {}
        }
      },
      index: String
    },
    computed: {
      format() {
        return formatTime(this.comment.createTime, true);
      },
      likeItem() {
        if (this.comment.likeNum === 0) {
          return '';
        }
        return this.comment.likeNum;
      },
      show() {
        return this.index === this.$store.state.currentIndex;
      },
      reverseReplies() {
        let arr = [...this.comment.replies]
        return arr.reverse();
      }
    },
    components: {
      ReplyBox,
      ReplyItem
    },
    methods: {
      like() {
        if (this.$store.state.id) {
          this.selected = !this.selected;
          if (this.selected) {
            this.comment.likeNum++;
          } else {
            this.comment.likeNum--;
          }

          likeComment(this.comment['_id'], this.comment.likeNum, this.$store.state.username)
          .then(result => {
            if (result.errno === -1) {
              this.$tip.show('#fef0f0', '点赞失败', 3, '#f56c6c');
              this.selected = false;
              this.comment.likeNum--;
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能点赞哦', 1, '#909399');
        }
      },
      reply() {
        if (this.$store.state.id) {
          this.$store.commit('modify', this.index);
        } else {
          this.$tip.show('#edf2fc', '只有登录才能回复别人哦', 1, '#909399');
        }
      },
      submit() {
        if (this.$store.state.id) {
          this.$load.show();

          newComment(this.replyComment).then(result => {
            this.$load.hidden();

            if (result.errno === 0) {
              result.data.userInfo = [{
                username: this.$store.state.username
              }]
              this.comment.replies.push(result.data);
              this.replyComment.content = '';

              this.$tip.show('#f0f9eb', '发表成功', 0, '#91c287');
            } else {
              this.$tip.show('#fef0f0', '发表失败', 3, '#f56c6c');
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能发表评论哦', 1, '#909399');
        }
      },
      addReply(reply) {
        this.comment.replies.push(reply);
      }
    },
    created() {
      // 不显示编辑框
      this.$store.commit('modify', '');

      validateComment(this.comment['_id'], this.$store.state.username).then(result => {
        if (result.errno === 0) {
          this.selected = true;
        }
      })
    }
  }

</script>

<style scoped>
  img {
    float: left;
    width: 48px;
    height: 48px;
    margin-top: 15px;
    border-radius: 50%;
    background-color: aqua;
  }

  .comment-item>div {
    margin-left: 78px;
    padding: 14px 0 20px 0;
    border-top: 1px solid #ccc;
  }

  h4 {
    font-size: 12px;
    line-height: 18px;
    font-weight: 700;
    color: #6d757a
  }

  p {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
  }

  .info {
    color: #99a2aa;
    font-size: 12px;
  }

  .info span {
    margin-right: 20px;
  }

  .info span:nth-child(n+2):hover {
    color: #00a1d6;
  }

  em {
    font-size: 14px;
  }

  .send {
    margin: 10px 0;
  }

  .send img {
    float: left;
    width: 48px;
    height: 48px;
    margin-top: 8px;
    border-radius: 50%;
    background-color: aqua;
  }

  .send textarea {
    float: left;
    width: 449px;
    height: 64px;
    padding: 5px 10px;
    margin: 0 15px 0 30px;
    border: 1px solid #ccc;
    background-color: #f4f5f7;
    font-size: 12px;
    color: #555;
    box-sizing: border-box;
  }

  .send textarea:focus {
    border-color: #00a1d6;
  }

  .send span {
    float: left;
    width: 70px;
    height: 64px;
    padding: 10px 15px;
    background-color: #00a1d6;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .send span:hover {
    background-color: #0793b9;
  }

  .isSelected {
    color: #00a1d6;
  }

</style>
