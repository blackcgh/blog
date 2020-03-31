<template>
  <div class="reply-item">
    <img src="" alt="">
    <div>
      <h4>{{reply.userInfo[0].username}} {{formatOther}}</h4>
      <p>{{reply.content}}</p>
      <div class="info clearfix">
        <span>{{format}}</span>
        <span>
          <em class="iconfont" :class="{isSelected: selected}" @click="like">&#xe601;</em>
          {{likeItem}}
        </span>
        <span><em class="iconfont">&#xe602;</em> 54</span>
        <span @click="reponse">回复</span>
      </div>
      <div class="send clearfix" v-if="show">
        <img src="" alt="">
        <textarea :placeholder="formatSend" v-model="replyComment.content"></textarea>
        <span @click="submit">发表评论</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { newComment, likeComment, validateComment } from 'network/comment'
  import { formatTime } from 'common/utils'

  export default {
    name: 'ReplyItem',
    data() {
      return {
        selected: false,
        replyComment: {
          content: '',
          createTime: new Date(),
          likeNum: 0,
          parentId: this.commentId, // 上级id是评论id
          other: this.reply.userInfo[0].username,
          uid: this.$store.state.id,
          bid: this.$route.params.bid
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
      index: String
    },
    computed: {
      format() {
        return formatTime(this.reply.createTime, true);
      },
      likeItem() {
        if (this.reply.likeNum === 0) {
          return '';
        }
        return this.reply.likeNum;
      },
      show() {
        return this.index === this.$store.state.currentIndex;
      },
      formatOther() {
        if (!this.reply.other) {
          return '：';
        }
        return ' 回复 @' + this.reply.other + '：';
      },
      formatSend() {
        return ' 回复 @' + this.reply.userInfo[0].username + ':';
      }
    },
    methods: {
      like() {
        if (this.$store.state.id) {
          this.selected = !this.selected;
          if (this.selected) {
            this.reply.likeNum++;
          } else {
            this.reply.likeNum--;
          }

          likeComment(this.reply['_id'], this.reply.likeNum, this.$store.state.username)
          .then(result => {
            if (result.errno === -1) {
              this.$tip.show('#fef0f0', '点赞失败', 3, '#f56c6c');
              this.selected = false;
              this.reply.likeNum--;
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能点赞哦', 1, '#909399');
        }
      },
      reponse() {
        if (this.$store.state.id) {
          this.$store.commit('modify', this.index);
        } else {
          this.$tip.show('#edf2fc', '只有登录才能回复别人哦', 1, '#909399');
        }
      },
      submit() {
        this.$load.show();

        if (this.$store.state.id) {
          newComment(this.replyComment).then(result => {
            this.$load.hidden();

            if (result.errno === 0) {
              result.data.userInfo = [{
                username: this.$store.state.username
              }]
              this.$emit('addReply', result.data);
              this.replyComment.content = '';

              this.$tip.show('#f0f9eb', '发表成功', 0, '#91c287');
            } else {
              this.$tip.show('#fef0f0', '发表失败', 3, '#f56c6c');
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能发表评论哦', 1, '#909399');
        }
      }
    },
    created() {
      // 不显示编辑框
      this.$store.commit('modify', '');

      validateComment(this.reply['_id'], this.$store.state.username).then(result => {
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
    width: 24px;
    height: 24px;
    margin-top: 15px;
    border-radius: 50%;
    background-color: aqua;
  }

  .reply-item>div {
    margin-left: 50px;
    padding: 10px 0;
    overflow: hidden;
  }

  h4 {
    float: left;
    margin: 8px 5px 0 0;
    font-size: 12px;
    line-height: 18px;
    font-weight: 700;
    color: #6d757a
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

  .isSelected {
    color: #00a1d6;
  }

</style>
