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
      <div v-if="isLoad">loading...</div>
      <div v-else>{{getText}}</div>
    </div>
  </div>
</template>

<script>
  import DynamicItem from 'components/content/dynamicitem/DynamicItem'

  export default {
    name: 'DynamicCon',
    props: ['dynamicList', 'isLoad'],
    computed: {
      getText() {
        if(this.$route.path.indexOf(this.$store.state.id) != -1 && this.$store.state.id != '') {
          return '你还没有动态呢~'
        }
        return 'TA还没有动态呢~'
      }
    },
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

</style>
