<template>
  <div class="notice">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div class="mask" v-show="isShow"></div>
    </transition>

    <!-- 提示框 -->
    <transition name="slide">
      <div class="prompt" v-show="isShow">
        <p>{{text}}</p>
        <div @click="confirm">确定</div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Notice',
    data() {
      return {
        isShow: false,
        text: '该页面已经不存在了！！'
      }
    },
    methods: {
      confirm() {
        this.isShow = false;
      },
      show(msg) {
        if(msg) this.text = msg;
        this.isShow = true
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
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
    z-index: 101;
    cursor: default;
    transform: translate(-50%, -50%);
  }

  p {
    padding: 40px 0;
    color: #222;
  }

  .prompt div {
    width: 60px;
    height: 25px;
    margin: 0 auto 20px;
    color: #fff;
    line-height: 25px;
    border-radius: 4px;
    background-color: #00a1d6;
    cursor: pointer;
  }

  .prompt div:hover {
    background-color: #07b9f5;
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

</style>
