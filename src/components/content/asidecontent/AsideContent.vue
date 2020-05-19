<template>
  <div class="aside-content">
    <slot name="me"></slot>
    <h3 v-if="show">
      <slot></slot>
    </h3>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AsideContent',
    props: {
      show: {
        type: Boolean,
        default: true
      }
    }
  }

</script>

<style scoped>
  .aside-content {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 5px;
  }

  .aside-content h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 10px;
    font-size: 18px;
    color: #222;
  }

  .aside-content>div {
    position: relative;
    color: #797878;
  }

</style>
