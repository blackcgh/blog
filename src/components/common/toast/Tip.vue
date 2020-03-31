<template>
  <div class="info-tip" :class="{active: slide}" :style="{backgroundColor:bgColor}">
    <span class="iconfont" :class="iconClass[index]"></span>
    <em :style="{color:color}">{{message}}</em>
  </div>
</template>

<script>
  export default {
    name: 'Tip',
    data() {
      return {
        slide: false,
        bgColor: '#fff', // 背景颜色
        message: '',      // 提示信息
        index: 0,
        color: '#91c287',
        iconClass: [
          'success icon-dui',  // 成功
          'message icon-xiaoxitishi',  // 提示
          'alarm icon-wuuiconsuotanhao', // 警告
          'error icon-shibai'  // 错误
        ]
      }
    },
    methods: {
      show(bgColor, message, index, color) {
        this.bgColor = bgColor;
        this.message = message;
        this.index = index;
        this.color = color;
        this.slide = true;

        setTimeout(() => {
          this.slide = false;
        }, 2000);
      }
    }
  }

</script>

<style scoped>
  .info-tip {
    position: fixed;
    top: -36px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    height: 22px;
    padding: 7px 0;
    text-align: center;
    transition: all .5s;
    z-index: 1002;
  }

  span {
    margin-right: 15px;
    font-size: 22px;
  }

  em {
    position: relative;
    top: -3px;
    font-size: 14px;
  }

  .success {
    color: #66d137;
  }

  .message {
    color: #368afe;
  }

  .alarm {
    color: #ff9900;
  }

  .error {
    color: #e53932;
  }

  .active {
    top: 48px;
  }

</style>
