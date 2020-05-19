<template>
  <div class="reply-item">
    <!-- 头像 -->
    <img :src="getAvatar(replyData.avatar)" @click="goPerson(replyData.uid)">
    <div>
      <!-- 用户名 -->
      <h4>
        <b @click="goPerson(replyData.uid)">{{replyData.sender}}</b>
        <ins v-if="replyData.receiver">回复
          <i @click="goPerson(replyData.rid)">@{{replyData.receiver}}</i>
        </ins> ：
      </h4>
      <!-- 评论内容 -->
      <p>{{replyData.content}}</p>
      <div class="info clearfix">
        <!-- 评论时间 -->
        <span>{{format}}</span>
        <!-- 点赞数 -->
        <span>
          <em class="iconfont" :class="{like: isLike}" @click="like">&#xe601;</em>
          {{likeNum}}
        </span>
        <span><em class="iconfont">&#xe602;</em> 54</span>
        <!-- 回复按钮 -->
        <span @click="response">回复</span>
      </div>
      <!-- 点击回复按钮，显示评论编辑框 -->
      <div class="send clearfix" v-if="show">
        <img :src="$store.state.avatar">
        <textarea :placeholder="showReply" v-model="replyComment.content"></textarea>
        <span @click="submit">发表评论</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { newComment, likeComment } from 'network/comment'
  import { formatTime } from 'common/utils'

  export default {
    name: 'ReplyItem',
    data() {
      return {
        isLike: false,
        replyData: this.reply,
        replyComment: {
          content: '',
          likeNum: 0,
          // parentId: this.commentId, // 上级id是评论id
          // receiver: this.reply.sender,
          // sender: this.$store.state.username,
          // avatar: this.$store.state.avatar,
          // uid: this.$store.state.id,
          // bid: this.$route.params.bid
        }
      }
    },
    props: {
      reply: {
        type: Object,
        default () {
          return {}
        }
      },
      commentId: String,
      mark: String
    },
    computed: {
      // 格式化时间
      format() {
        return formatTime(this.replyData.createTime, true);
      },
      // 点赞数
      likeNum() {
        if (this.replyData.likeNum === 0) {
          return '';
        }
        return this.replyData.likeNum;
      },
      // 只显示一个编辑框
      show() {
        return this.mark === this.$store.state.currentMark;
      },
      // 显示回复格式
      showReply() {
        return ' 回复 @' + this.replyData.sender + ':';
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    watch: {
      reply(val) {
        this.replyData = val
      }
    },
    methods: {
      // 前往该用户个人主页
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage')
      },
      // 点赞
      like() {
        if (this.$store.state.id) {
          this.isLike = !this.isLike;
          if (this.isLike) {
            this.replyData.likeNum++;
          } else {
            this.replyData.likeNum--;
          }
          const { _id, likeNum } = this.replyData;
          likeComment(_id, likeNum, this.$store.state.id).then(result => {
              if (result.errno === -1) {
                this.$tip.show('#fef0f0', '点赞失败', 3, '#f56c6c');
                this.isLike = false;
                this.replyData.likeNum--;
              }
            })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能点赞哦', 1, '#909399');
        }
      },
      // 点击回复按钮
      response() {
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
            this.replyComment.parentId = this.commentId;
            this.replyComment.uid = this.$store.state.id;
            this.replyComment.bid = this.$route.params.bid;
            this.replyComment.rid = this.replyData.uid;
            newComment(this.replyComment).then(res => {
              res.data.avatar = this.$store.state.avatar;
              res.data.sender = this.$store.state.username;
              res.data.receiver = this.reply.sender;
              if (res.errno === 0) {
                this.$emit('addReply', res.data);
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
      }
    },
    created() {
      // 不显示编辑框
      this.$store.commit('updateMark', '');
      // 是否点过赞
      this.isLike = this.replyData.likeId.includes(this.$store.state.id)
    }
  }

</script>

<style scoped>
  .reply-item>img {
    float: left;
    width: 24px;
    height: 24px;
    margin-top: 16px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  .reply-item>div {
    margin-left: 35px;
    padding: 10px 0;
    overflow: hidden;
  }

  h4 {
    float: left;
    margin-top: 8px;
    font-size: 14px;
    line-height: 18px;
    color: #000;
  }

  b {
    margin-right: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #6d757a;
    cursor: pointer;
  }

  b:hover {
    color: #00a1d6;
  }

  i {
    margin-left: 5px;
    font-size: 14px;
    color: #00a1d6;
    cursor: pointer;
  }

  i:hover {
    color: #f25d8e;
  }

  p {
    float: left;
    width: 300px;
    padding-top: 1px;
    font-size: 14px;
    line-height: 30px;
  }

  .info {
    float: left;
    width: 550px;
    margin-bottom: 10px;
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
    width: 399px;
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
