<template>
  <div class="message">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div class="mask" v-show="isShow" @click.stop></div>
    </transition>

    <!-- 提示框 -->
    <transition name="slide">
      <div class="prompt" v-show="isShow" @click.stop>
        <h4>
          确认提示
          <i @click="cancel">+</i>
        </h4>
        <!-- 提示 -->
        <div class="tip">确定删除 {{showData.title}} 吗?</div>
        <!-- 删除、取消按钮 -->
        <div class="btn">
          <span v-if="getConfirm('blog')" @click="delBlog">确定</span>
          <span v-if="getConfirm('favorite')" @click="delFavorite">确定</span>
          <span @click="cancel">取消</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { delBlog } from 'network/blog'
  import { delFavorite } from 'network/user'

  export default {
    name: 'Message',
    data() {
      return {
        isShow: this.show
      }
    },
    props: ['show', 'showData'],
    computed: {
      getConfirm() {
        return function(confirm) {
          return this.showData.confirm == confirm
        }
      }
    },
    watch: {
      show(val) {
        this.isShow = true
      }
    },
    methods: {
      // 取消删除博客
      cancel() {
        this.isShow = false
      },
      // 删除博客
      delBlog() {
        this.$load.show();
        this.isShow = false;
        delBlog(this.showData.bid, this.$store.state.id).then(data => {
          this.$load.hidden();
          if (data.errno === 0) {
            this.$emit('success');
            this.$store.commit('updateBlogNum');
            this.$store.commit('updateDynamic');
            this.$tip.show('#f0f9eb', '删除成功', 0, '#91c287')
          } else if (data.errno === -1) {
            this.$tip.show('#fef0f0', '删除失败', 3, '#f56c6c')
          } else {
            this.$tip.show('#fef0f0', '删除发生错误', 3, '#f56c6c')
          }
        })
      },
      // 删除收藏夹
      delFavorite() {
        this.$load.show();
        this.isShow = false;
        const { id, star } = this.$store.state;
        const fid = star[this.showData.index]['_id'];
        delFavorite(id, fid).then(data => {
          this.$load.hidden();
          if (data.errno === 0) {
            this.$emit('success', this.showData.index)
            this.$store.commit('delFavorite', star[this.showData.index]['_id']);
            this.$tip.show('#f0f9eb', '删除成功', 0, '#91c287');
          } else if (data.errno === -1) {
            this.$tip.show('#fef0f0', '删除失败', 3, '#f56c6c')
          } else {
            this.$tip.show('#fef0f0', '删除发生错误', 3, '#f56c6c')
          }
        })
      }
    }
  }

</script>

<style scoped>
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 100;
    cursor: default;
  }

  .prompt {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    background-color: #fff;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
    z-index: 101;
    cursor: default;
    transform: translate(-50%, -50%);
  }

  h4 {
    height: 49px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    line-height: 49px;
    font-size: 16px;
    text-align: left;
  }

  i {
    float: right;
    color: #999;
    cursor: pointer;
    transform: rotate(45deg) scale(2, 2);
  }

  i:hover {
    color: #00a1d6;
  }

  .tip {
    padding: 30px 60px;
    font-size: 14px;
    line-height: 22px;
  }

  .btn {
    padding-bottom: 30px;
  }

  span {
    display: inline-block;
    width: 48px;
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    line-height: 30px;
    cursor: pointer;
  }

  span:first-child {
    background-color: #00a1d6;
    color: #fff;
  }

  span:first-child:hover {
    background-color: #04b9f5;
  }

  span:last-child {
    margin-left: 20px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    color: #666;
    border-radius: 4px;
  }

  span:last-child:hover {
    border-color: #00a1d6;
    color: #00a1d6;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s;
  }

  .slide-enter,
  .slide-leave-to {
    /* transform: translateY(-20px); */
    opacity: 0;
  }

  .alarm {
    color: #ff9900;
  }

</style>
