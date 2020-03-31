<template>
  <div class="home-content">
    <main-content>
      <span>博客推荐</span>
      <template v-slot:mc>
        <recommend v-for="(item,index) of blogList" :key="index" :item="item"></recommend>
        <div class="more" @click="showMore" v-if="!isEnd">...</div>
        <div class="end" v-else>已经到尽头了~</div>
      </template>
    </main-content>
    <main-content>
      <span>图片推荐</span>
      <template v-slot:mc>
        <div class="more">...</div>
      </template>
    </main-content>
    <main-content>
    <span>音频推荐</span>
      <template v-slot:mc>
        <div class="more">...</div>
      </template>
    </main-content>
    <main-content>
      <span>视频推荐</span>
      <template v-slot:mc>
        <div class="more">...</div>
      </template>
    </main-content>
  </div>
</template>

<script>
  import MainContent from 'components/content/maincontent/MainContent'
  import Recommend from 'components/content/maincontent/Recommend'

  import { getAll } from 'network/blog'

  export default {
    name: 'HomeContent',
    data() {
      return {
        blogList: [],
        isEnd: false, // 是否到尽头
      }
    },
    components: {
      MainContent,
      Recommend
    },
    created() {
      // 显示加载组件
      this.$load.show();

      // 不携带flag
      this.$store.commit('increment');
      getAll(this.$store.state.blogCount).then(result => {
        if(result.data.flag) {
          this.isEnd = true;
        }
        if(result.data.data) {
          // 数据反转、解构，再追加给blogList
          this.blogList.push(...(result.data.data.reverse()));
        }
        // 隐藏加载组件
        this.$load.hidden();
      })
    },
    methods: {
      showMore() {
        this.$load.show();

        // 携带flag
        this.$store.commit('increment', true);
        getAll(this.$store.state.blogCount).then(result => {
          if(result.data.flag) {
            this.isEnd = true;
          }
          this.blogList.push(...(result.data.data.reverse()));

          this.$load.hidden();
        })
      }
    }
  }

</script>

<style scoped>
  .home-content {
    float: left;
    width: 740px;
    box-sizing: border-box;
  }

  span {
    display: inline-block;
    height: 36px;
    padding: 0 5px;
    background-color: #f1563b;
    line-height: 36px;
    color: #fff;
  }

  .more {
    width: 100px;
    height: 30px;
    margin: 0 auto;
    background-color: #ecf1f5;
    font-size: 33px;
    color: #f1563b;
    text-align: center;
    line-height: 15px;
    border-radius: 15px;
  }

  .more:hover {
    background-color: #f1563b;
    color: #fff;
  }

  .end {
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

</style>
