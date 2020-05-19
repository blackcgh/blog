<template>
  <div id="mydynamic">
    <dynamic-con :dynamicList="dynamicList" :isLoad="isLoad"></dynamic-con>
    <dynamic-aside></dynamic-aside>
  </div>
</template>

<script>
  import DynamicCon from './childcomps/DynamicCon'
  import DynamicAside from './childcomps/DynamicAside'

  import { getMyDynamic } from 'network/blog'

  export default {
    name: 'MyDynamic',
    data() {
      return {
        dynamicList: [],
        // 显示加载图标
        isLoad: true
      }
    },
    watch: {
      '$route.params.userId': function() {
        this.getMyDynamic()
      }
    },
    components: {
      DynamicCon,
      DynamicAside
    },
    methods: {
      getMyDynamic() {
        getMyDynamic(this.$route.path.split('/')[1]).then(res => {
          this.isLoad = false;
          if (res.errno === 0) {
            this.dynamicList = res.data
          } else if (res.errno === -1) {
            this.$tip.show('#fef0f0', '获取失败', 3, '#f56c6c')
          }
        })
      }
    },
    created() {
      this.getMyDynamic()
    }
  }

</script>

<style scoped>
  #mydynamic {
    overflow: hidden;
    border-radius: 5px;
  }

</style>
