<template>
  <transition name="fade">
    <div class="load" :style="{backgroundColor:bgcolor}" v-show="isShow">
      <div>
        <div class="iconfont load-icon">&#xe674;</div>
        <div class="load-text">{{msg}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Load',
    data() {
      return {
        // 控制是否显示加载图标
        isShow: true,
        // 加载文字
        msg: 'loading...',
        // 设置背景颜色
        bgcolor: '#fd886e'
      }
    },
    methods: {
      show(msg, bgcolor) {
        if(msg) this.msg = msg;
        if(bgcolor) this.bgcolor = bgcolor;
        this.isShow = true;
      },
      hidden() {
        this.isShow = false;
        setTimeout(() => {
          this.bgcolor = '#fd886e';
          this.msg = 'loading...'
        }, 10);
      }
    }
  }

</script>

<style scoped>
  .load {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    /* background-color: #fd886e; */
    z-index: 2000;
  }

  .load>div {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    text-align: center;
    font-size: 16px;
    transform: translate(-50%, -50%);
  }

  .load-icon {
    font-size: 18px;
    animation: loading 2s linear infinite;
  }

  .load-text {
    margin-top: 5px;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
