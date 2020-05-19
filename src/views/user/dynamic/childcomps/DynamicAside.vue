<template>
  <div class="dynamic-aside">
    <!-- 公告 -->
    <aside-content>
      公告
      <template v-slot:content>
        <p v-if="getUserData.notice.length">{{getUserData.notice}}</p>
        <div class="none" v-else>空空如也~</div>
      </template>
    </aside-content>

    <!-- 个性标签 -->
    <aside-content>
      个性标签
      <template v-slot:content>
        <ul class="clearfix" v-if="getTag.length!=0">
          <li v-for="(item,index) of getTag" :key="index">{{item}}</li>
        </ul>
        <div class="tag-none" v-else>空空如也~</div>
      </template>
    </aside-content>
  </div>
</template>

<script>
  import AsideContent from 'components/content/asidecontent/AsideContent'

  export default {
    name: 'DynamicAside',
    computed: {
      getFlag() {
        return this.$route.path.indexOf(this.$store.state.id) != -1 && this.$store.state.id != ''
      },
      // 确认用户信息
      getUserData() {
        if(this.getFlag) {
          const { userSet, notice } = this.$store.state;
          return { userSet, notice }
        }
        return this.$store.state.userData
      },
      getTag() {
        if(this.getUserData.userSet) return this.getUserData.userSet.tagList;
        return []
      }
    },
    components: {
      AsideContent
    }
  }

</script>

<style scoped>
  .dynamic-aside {
    float: right;
    width: 267px;
    color: #6d757a;
  }

  p {
    font-size: 14px;
    color: #222;
  }

  li {
    float: left;
    padding: 0 8px;
    margin: 0 10px 10px 0;
    border: 1px solid #00a1d6;
    border-radius: 10px;
    line-height: 20px;
    font-size: 12px;
    transition: border-radius .3s;
  }

  li:hover {
    color: #222;
    border-radius: 0;
  }

  .tag-none {
    text-align: center;
    font-size: 12px;
  }

  .none {
    font-size: 12px;
    color: #797878;
    text-align: center;
  }

</style>
