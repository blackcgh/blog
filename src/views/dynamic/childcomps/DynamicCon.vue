<template>
  <div class="dynamic-con">
    <div v-if="dynamicList.length">
      <dynamic-item
        v-for="item of dynamicList"
        :key="item['_id']"
        :dynamic="item">
      </dynamic-item>
    </div>
    <div class="none" v-else>
      <div v-show="isShow"><em class="iconfont icon-jiazai"></em>loading...</div>
      <div v-show="!isShow">这里还没有动态~</div>
    </div>
  </div>
</template>

<script>
  import DynamicItem from 'components/content/dynamicitem/DynamicItem'
  export default {
    name: 'DynamicCon',
    props: ['dynamicList', 'isShow'],
    components: {
      DynamicItem
    }
  }

</script>

<style scoped>
  .dynamic-con {
    float: left;
    width: 756px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .none {
    min-height: 500px;
    padding: 100px 0;
    background-color: #fff;
    font-size: 14px;
    color: #969696;
    text-align: center;
    border-radius: 5px;
  }

  .none em {
    font-size: 14px;
    margin-right: 5px;
  }

</style>
