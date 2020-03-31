<template>
  <div class="comment">
    <!-- 评论条数 -->
    <div class="c-count">{{commentNum}} 评论</div>
    <!-- 编辑、发表评论 -->
    <div class="send clearfix">
      <img src="" alt="">
      <textarea placeholder="评论一下..." v-model="comment.content"></textarea>
      <span @click="submit">发表评论</span>
    </div>
    <!-- 评论项 -->
    <slot></slot>
    <!-- 页按钮 -->
    <div v-if="isShow">
      <div class="line"></div>
      <div class="page">
        <ul class="clearfix">
          <li>上一页</li>
          <li v-for="item of num" :key="item">{{item}}</li>
          <li>下一页</li>
        </ul>
      </div>
    </div>
    <div v-else class="no">还没有评论呢~</div>
  </div>
</template>

<script>
  import { newComment } from 'network/comment'

  export default {
    name: 'Comment',
    data() {
      return {
        num: 5,     // 页按钮个数
        comment: {  // 添加评论信息
          content: '',
          createTime: new Date(),
          likeNum: 0,
          parentId: this.$route.params.bid,
          uid: this.$store.state.id,
          bid: this.$route.params.bid
        }
      }
    },
    props: {
      isShow: false,  // 是否显示页按钮
      commentNum: 0   // 显示当前评论个数
    },
    methods: {
      // 发表评论
      submit() {
        if (this.$store.state.id) {
          this.$load.show();
          newComment(this.comment).then(result => {
            this.$load.hidden();

            if (result.errno === 0) {
              result.data.userInfo = [{
                username: this.$store.state.username
              }]
              result.data.replies = [];
              this.$emit('addComment', result.data);
              this.comment.content = '';

              this.$tip.show('#f0f9eb', '发表成功', 0, '#91c287');
            } else {
              this.$tip.show('#fef0f0', '发表失败', 3, '#f56c6c');
            }
          })
        } else {
          this.$tip.show('#edf2fc', '只有登录才能发表评论哦', 1, '#909399');
        }
      }
    }
  }

</script>

<style scoped>
  .comment {
    padding: 25px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
  }

  .c-count {
    margin-bottom: 20px;
    font-size: 20px;
    color: #222
  }

  .send {
    padding-bottom: 50px;
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
    width: 527px;
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
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

</style>
