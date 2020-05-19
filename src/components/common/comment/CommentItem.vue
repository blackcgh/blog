<template>
  <div class="comment-item">
    <!-- 用户头像 -->
    <img :src="getAvatar(commentData.avatar)" @click="goPerson">
    <div>
      <!-- 用户名 -->
      <h4><b @click="goPerson">{{commentData.sender}}</b></h4>
      <!-- 评论内容 -->
      <p>{{commentData.content}}</p>
      <div class="info">
        <!-- 评论时间 -->
        <span>{{format}}</span>
        <!-- 点赞数 -->
        <span>
          <em class="iconfont" :class="{like: isLike}" @click="like">&#xe601;</em>
          {{likeNum}}
        </span>
        <span><em class="iconfont">&#xe602;</em> 54</span>
        <!-- 回复按钮 -->
        <span @click="reply">回复</span>
      </div>
      <!-- 点击回复按钮，显示评论编辑框 -->
      <div class="send clearfix" v-if="show">
        <img :src="$store.state.avatar">
        <textarea placeholder="说点什么..." v-model="replyComment.content"></textarea>
        <span @click="submit">发表评论</span>
      </div>
      <!-- 回复盒子 -->
      <reply>
        <!-- 回复项 -->
        <reply-item
          v-for="(item,index) of commentData.reply"
          :key="item['_id']"
          :reply="item"
          :commentId="commentData['_id']"
          :mark="item['_id']"
          @addReply="addReply">
        </reply-item>
      </reply>
    </div>
  </div>
</template>

<script>
  import Reply from './Reply'
  import ReplyItem from './ReplyItem'

  import { newComment, likeComment } from 'network/comment'
  import { formatTime } from 'common/utils'

  export default {
    name: 'CommentItem',
    data() {
      return {
        commentData: this.comment,
        isLike: false, // 记录是否已经点赞
        replyComment: { // 回复评论格式
          content: '',
          likeNum: 0,
          // parentId: this.comment['_id'], // 评论id
          // sender: this.$store.state.username,
          // avatar: this.$store.state.avatar,
          // uid: this.$store.state.id,
          // bid: this.$route.params.bid
        }
      }
    },
    props: {
      comment: {
        type: Object,
        default () {
          return {}
        }
      },
      mark: String
    },
    computed: {
      // 时间格式化
      format() {
        return formatTime(this.commentData.createTime, true);
      },
      // 点赞数
      likeNum() {
        if (this.commentData.likeNum === 0) {
          return '';
        }
        return this.commentData.likeNum;
      },
      // 只显示一个编辑框
      show() {
        return this.mark === this.$store.state.currentMark;
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    watch: {
      comment(val) {
        this.commentData = val
      }
    },
    components: {
      Reply,
      ReplyItem
    },
    methods: {
      // 前往该用户个人主页
      goPerson() {
        this.$router.push('/' + this.commentData.uid + '/homepage')
      },
      // 点赞
      like() {
        if (this.$store.state.id) {
          this.isLike = !this.isLike;
          if (this.isLike) {
            this.commentData.likeNum++;
          } else {
            this.commentData.likeNum--;
          }
          const { _id, likeNum } = this.commentData;
          likeComment(_id, likeNum, this.$store.state.id).then(result => {
            if (result.errno === -1) {
              this.$tip.show('#fef0f0', '点赞失败', 3, '#f56c6c');
              this.isLike = false;
              this.commentData.likeNum--;
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能点赞哦', 1, '#909399');
        }
      },
      // 点击回复按钮
      reply() {
        if (this.$store.state.id) {
          this.$store.commit('updateMark', this.mark);
        } else {
          this.$tip.show('#edf2fc', '只有登录才能回复别人哦', 1, '#909399');
        }
      },
      // 发表评论
      submit() {
        if (this.$store.state.id) {
          if (this.replyComment.content) {
            this.replyComment.createTime = new Date();
            this.replyComment.parentId = this.comment['_id'];
            this.replyComment.uid = this.$store.state.id;
            this.replyComment.bid = this.$route.params.bid;
            this.replyComment.rid = this.commentData.uid;
            newComment(this.replyComment).then(res => {
              res.data.avatar = this.$store.state.avatar;
              res.data.sender = this.$store.state.username;
              if (res.errno === 0) {
                this.commentData.reply.unshift(res.data);
                this.replyComment.content = '';
                this.$store.commit('updateMark', '');
                this.$tip.show('#f0f9eb', '发送成功', 0, '#91c287')
              } else {
                this.$tip.show('#fef0f0', '发送失败', 3, '#f56c6c')
              }
            })
          } else {
          this.$tip.show('#edf2fc', '评论内容不能为空', 1, '#909399')
          }
        } else {
          this.$tip.show('#edf2fc', '只有登录才能发表评论哦', 1, '#909399')
        }
      },
      addReply(reply) {
        this.commentData.reply.unshift(reply);
      }
    },
    created() {
      // 不显示编辑框
      this.$store.commit('updateMark', '');
      // 是否点过赞
      this.isLike = this.commentData.likeId.includes(this.$store.state.id)
    }
  }

</script>

<style scoped>
  .comment-item>img {
    float: left;
    width: 48px;
    height: 48px;
    margin-top: 15px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
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
    color: #6d757a;
  }

  b {
    cursor: pointer;
  }

  b:hover {
    color: #00a1d6;
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

  .info span:nth-child(n+2) {
    cursor: pointer;
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
    object-fit: cover;
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

  .like {
    color: #00a1d6;
  }

</style>
