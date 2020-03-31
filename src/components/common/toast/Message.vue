<template>
  <div class="message">
    <transition name="fade">
      <div class="mask" v-if="isShowMessage" @click.stop></div>
    </transition>
    <transition name="slide">
      <div class="prompt" v-if="isShowMessage" @click.stop>
        <h4>提示</h4>
        <p><slot></slot></p>
        <span><slot name="first"></slot></span>
        <span><slot name="second"></slot></span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      isShowMessage: {
        type: Boolean,
        default: false
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
  }

  .prompt {
    position: fixed;
    top: 240px;
    left: 467px;
    width: 350px;
    height: 120px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    text-align: right;
    box-sizing: border-box;
    z-index: 101;
  }

  h4 {
    margin-bottom: 10px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
  }

  .prompt p {
    margin-bottom: 20px;
    text-align: left;
    color: #999;
  }

  .prompt span {
    display: inline-block;
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #999;
    cursor: pointer;
  }

  .prompt span:last-child {
    margin-left: 20px;
    background-color: rgb(240, 63, 19);
    color: #fff;
    border-radius: 15px;
  }

  .prompt span:last-child:hover {
    background-color: #f00;
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
    transition: all .2s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

</style>
