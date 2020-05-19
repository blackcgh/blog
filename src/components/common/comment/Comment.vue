<template>
  <div class="comment">
    <!-- 评论条数 -->
    <div class="c-count">{{commentNum}} 评论</div>

    <!-- 编辑、发表评论 -->
    <div class="send clearfix">
      <img :src="$store.state.avatar">
      <textarea placeholder="评论一下..." v-model="comment.content"></textarea>
      <span :class="{logout:getStatus}" @click="submit">发表评论</span>

      <!-- 隔板，未登录时显示 -->
      <div class="baffle" v-if="getStatus">
        请先<b @click="login">登录</b>后发表评论 (・ω・)
      </div>
    </div>

    <!-- 评论项 -->
    <slot></slot>

    <div v-if="isShow" class="no">还没有评论呢~</div>

    <!-- 页按钮 -->
    <!-- <div>
      <div class="line"></div>
      <div class="page">
        <ul class="clearfix">
          <li>上一页</li>
          <li v-for="item of num" :key="item">{{item}}</li>
          <li>下一页</li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
  import { newComment } from 'network/comment'

  export default {
    name: 'Comment',
    data() {
      return {
        num: 5, // 页按钮个数
        comment: { // 添加评论信息
          content: '',
          likeNum: 0,
          // parentId: this.$route.params.bid, // 博客id
          // // sender: this.$store.state.username,
          // // avatar: this.$store.state.avatar,
          // uid: this.$store.state.id,
          // bid: this.$route.params.bid
        }
      }
    },
    props: {
      isShow: false, // 是否显示页按钮
      commentNum: 0 // 显示当前评论条数
    },
    computed: {
      // 是否登录
      getStatus() {
        return this.$store.state.id == ''
      }
    },
    methods: {
      // 登录
      login() {
        this.$store.commit('show', 'Login')
      },
      // 发表评论
      submit() {
        if (this.$store.state.id) {
          if (this.comment.content) {
            this.comment.parentId = this.$route.params.bid;
            this.comment.createTime = new Date();
            this.comment.uid = this.$store.state.id;
            this.comment.bid = this.$route.params.bid;
            newComment(this.comment).then(res => {
              res.data.avatar = this.$store.state.avatar;
              res.data.sender = this.$store.state.username;
              if (res.errno === 0) {
                this.$emit('addComment', res.data);
                this.comment.content = '';
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
    }
  }

</script>

<style scoped>
  .comment {
    padding: 25px;
    padding-top: 0;
    background-color: #fff;
    border-radius: 5px;
  }

  .c-count {
    margin-bottom: 20px;
    font-size: 20px;
    color: #222
  }

  .send {
    position: relative;
    padding-bottom: 50px;
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
    width: 527px;
    height: 64px;
    padding: 5px 10px;
    margin: 0 15px 0 30px;
    border: 1px solid #ccc;
    background-color: #f4f5f7;
    font-size: 12px;
    color: #555;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .send textarea:hover {
    border-color: #00a1d6;
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
    cursor: pointer;
  }

  .send span:hover {
    background-color: #0793b9;
  }

  .baffle {
    position: absolute;
    top: 0;
    left: 78px;
    width: 527px;
    height: 64px;
    background-color: #e5e9ef;
    font-size: 12px;
    line-height: 64px;
    text-align: center;
    color: #777;
    border-radius: 4px;
  }

  .baffle b {
    display: inline-block;
    padding: 4px 9px;
    margin: 0 3px;
    color: #fff;
    line-height: 12px;
    font-weight: 400;
    background-color: #00a1d6;
    border-radius: 4px;
    cursor: pointer;
  }

  b:hover {
    background-color: #05b8f3;
  }

  .line {
    margin: 0 0 20px 78px;
    border-top: 1px solid #ccc;
  }

  ul {
    margin-left: 180px;
  }

  li {
    float: left;
    min-width: 36px;
    height: 36px;
    padding: 0 5px;
    margin-right: 5px;
    border: 1px solid #ccc;
    line-height: 36px;
    text-align: center;
    border-radius: 5px;
  }

  li:hover {
    background-color: #00a1d6;
    color: #fff;
  }

  .no {
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

  .logout {
    background-color: #e5e9ef!important;
    color: #b8c0cc!important;
    cursor: default!important;
  }

</style>
