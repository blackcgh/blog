<template>
  <div id="dynamic">
    <dynamic-con :dynamicList="dynamicList" :isShow="isShow"></dynamic-con>
    <dynamic-aside :dynamicNum="getDynamic"></dynamic-aside>
  </div>
</template>

<script>
  import DynamicCon from './childcomps/DynamicCon'
  import DynamicAside from './childcomps/DynamicAside'

  import { getDynamic } from 'network/blog'

  export default {
    name: 'Dynamic',
    data() {
      return {
        dynamicList: [],
        isShow: true
      }
    },
    computed: {
      getDynamic() {
        let n = 0;
        for(let i of this.dynamicList) {
          if(i.author == this.$store.state.username) n++;
        }
        return n
      }
    },
    components: {
      DynamicCon,
      DynamicAside
    },
    created() {
      document.title = '动态首页 - blackblog';
      const uids = [this.$store.state.id];
      for(let i of this.$store.state.follow) {
        uids.push(...i.group)
      }
      getDynamic(uids).then(res => {
        this.isShow = false;
        if (res.errno === 0) {
          this.dynamicList = res.data
        } else if (res.errno === -1) {
          this.$tip.show('#fef0f0', '获取失败', 3, '#f56c6c')
        }
      })
    }
  }

</script>

<style scoped>
  #mydynamic {
    overflow: hidden;
    border-radius: 5px;
  }

</style>
