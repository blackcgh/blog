<template>
  <div class="back-top iconfont" :class="{showState: !isShowBackTop}" @click="backTop">
    &#xe64e;
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    props: {
      isShowBackTop: Boolean
    },
    methods: {
      // 回到顶部
      backTop() {
        this.$emit('backTop');
      }
    }
  }

</script>

<style scoped>
  .back-top {
    position: fixed;
    top: 570px;
    right: 100px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    font-size: 30px;
    color: #f6345b;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
  }

  .showState {
    display: none;
  }

</style>
