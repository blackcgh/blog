<template>
  <div class="reply-mes">
    <div v-if="replyList.length!=0">
      <div class="reply-item" v-for="(item,index) of replyList" :key="index">
        <img :src="getAvatar(item.replyComment.avatar)" @click="goPerson(index)" />
        <!-- 回复项 -->
        <div class="reply-content">
          <!-- 回复评论 -->
          <h3><em @click="goPerson(index)">{{item.replyComment.sender}}</em></h3>
          <p class="reply">{{item.replyComment.content}}</p>
          <!-- 我的评论 -->
          <p class="comment" v-if="item.userComment">我：{{item.userComment.content}}</p>
          <!-- 时间、回复、删除 -->
          <div class="other">
            <span>{{format(item.replyComment.createTime, true)}}</span>
            <span @click="reply(index)">
              <b class="iconfont icon-jurassic_message"></b>
              回复
            </span>
            <span @click="remove(index)"><b class="iconfont icon-shanchu"></b>删除</span>
          </div>

          <!-- 顶级评论 -->
          <div class="parent" @click="goDetail(index)">{{item.parentComment.content}}</div>

          <!-- 评论编辑框 -->
          <div class="edit" v-if="currentIndex==index">
            <div><img :src="$store.state.avatar" /></div>
            <div>
              <textarea placeholder="评论一下..." v-model="comment.content" @click.stop>
              </textarea>
            </div>
            <div @click="send(index)">发表评论</div>
          </div>
        </div>
      </div>
    </div>
    <div class="none" v-else>
      <div v-show="isShow"><i class="iconfont icon-jiazai"></i>loading...</div>
      <div v-show="!isShow">这里还是空的呢~</div>
    </div>
  </div>
</template>

<script>
  import { getReply, delReply } from 'network/message'
  import { formatTime } from 'common/utils'
  import { newComment } from 'network/comment'

  export default {
    name: 'ReplyMes',
    data() {
      return {
        replyList: [],
        isShow: true,
        // 只显示一个编辑框
        currentIndex: -1,
        comment: {
          content: '',
          likeNum: 0,
          sender: this.$store.state.username,
          avatar: this.$store.state.avatar,
          uid: this.$store.state.id,
        }
      }
    },
    computed: {
      format() {
        return formatTime
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    methods: {
      // 前往用户个人主页
      goPerson(index) {
        this.$router.push('/' + this.replyList[index].replyComment.uid + '/homepage')
      },
      // 前往博客详情页
      goDetail(index) {
        this.$router.push('/blog/' + this.replyList[index].replyComment.bid)
      },
      // 回复评论，显示编辑框
      reply(index) {
        if (this.currentIndex != index) {
          this.currentIndex = index
        } else {
          this.currentIndex = -1
        }
      },
      // 删除评论
      remove(index) {
        delReply(this.$store.state.id, this.replyList[index].replyComment['_id']).then(res => {
          if(res.errno == 0) {
            this.replyList.splice(index, 1)
          } else {
            this.$tip.show('#fef0f0', '删除失败', 3, '#f56c6c')
          }
        })
      },
      // 发送评论
      send(index) {
        if (this.comment.content) {
          this.comment.parentId = this.replyList[index].parentComment['_id'];
          this.comment.receiver = this.replyList[index].replyComment.sender;
          this.comment.bid = this.replyList[index].replyComment.bid;
          this.comment.createTime = new Date();
          this.comment.rid = this.replyList[index].replyComment.uid;
          newComment(this.comment).then(res => {
            if (res.errno === 0) {
              this.comment.content = '';
              this.$tip.show('#f0f9eb', '发表成功', 0, '#91c287')
            } else {
              this.$tip.show('#fef0f0', '发表失败', 3, '#f56c6c')
            }
          })
        } else {
          this.$tip.show('#edf2fc', '评论内容不能为空', 1, '#909399')
        }
      }
    },
    created() {
      const total = this.$store.state.reply.total;
      if (total != 0) {
        getReply(this.$store.state.id, total).then(res => {
          this.isShow = false;
          this.replyList = res.data;
          this.$store.commit('updateMes', 'reply')
        })
      } else {
        this.isShow = false
      }
    }
  }

</script>

<style scoped>
  .reply-mes {
    margin-top: 50px;
    height: calc(100vh - 155px);
    padding: 0 15px;
    background-color: #fff;
    line-height: 24px;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .reply-mes::-webkit-scrollbar {
    width: 8px;
    background-color: #ecf2f5;
  }

  .reply-mes::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
  }

  .reply-item {
    position: relative;
    margin-top: 25px;
    overflow: hidden;
  }

  .reply-item>img {
    float: left;
    width: 46px;
    height: 46px;
    margin-right: 15px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  .reply-content {
    float: left;
    width: calc(100% - 61px);
    padding-bottom: 25px;
    border-bottom: 1px solid #e5e9ef;
    font-size: 14px;
    color: #222;
  }

  .reply-item:last-child .reply-content {
    border-bottom: 0;
  }

  h3 {
    margin: 5px 0 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
  }

  em {
    color: #6d757a;
    font-weight: 700;
    cursor: pointer;
  }

  em:hover {
    color: #23ade5;
  }

  p {
    width: 600px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .reply {
    line-height: 18px;
    margin-bottom: 10px;
  }

  .comment {
    margin-bottom: 10px;
    padding-left: 4px;
    border-left: 2px solid #e7e7e7;
    ;
    color: #999;
    font-size: 12px;
    line-height: 18px;
  }

  .edit {
    float: left;
    width: 100%;
    display: flex;
    height: 65px;
    margin-top: 20px;
  }

  .edit div:first-child {
    width: 46px;
    height: 46px;
    margin: 10px 15px 0 0;
  }

  .edit img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .edit div:nth-child(2) {
    flex: 1;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    border: 1px solid #e9eaec;
    background-color: #f4f5f7;
    font-size: 12px;
    color: #555;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .edit div:last-child {
    margin-left: 10px;
    width: 40px;
    height: 35px;
    padding: 15px;
    background-color: #00a1d6;
    font-size: 14px;
    line-height: 18px;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit div:last-child:hover {
    background-color: #05b9f5;
  }

  .other {
    line-height: 22px;
    color: #999;
    font-size: 12px;
  }

  span {
    margin-right: 15px;
  }

  span:nth-child(n+2):hover {
    color: #23ade5;
  }

  b {
    position: relative;
    top: 1px;
    margin-right: 3px;
    font-size: 14px;
  }

  .parent {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 15px;
    cursor: pointer;
  }

  .none {
    padding-top: 100px;
    text-align: center;
    font-size: 16px;
    color: #999;
  }

  .none i {
    margin-right: 5px;
    font-size: 14px;
  }

</style>
