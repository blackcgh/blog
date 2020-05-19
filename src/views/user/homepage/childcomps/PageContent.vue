<template>
  <div class="page-content">
    <!-- 博客 -->
    <div v-if="showItem(0)">
      <main-content>
        <span>{{getText}}的博客</span>
        <template v-slot:mc>
          <div v-if="sliceList.length">
            <recommend
              v-for="(item,index) of sliceList"
              :key="index"
              :item="item"
              :showAuthor="false">
            </recommend>
            <div class="more" v-if="num>3" @click="showMore" title="更多">...</div>
          </div>
          <div class="none" v-else>
            <div v-if="isShow">loading...</div>
            <div v-else>
              <div v-if="getFlag"> 你还没有写过博客呢~<em @click="writeBlog">立即去写</em> </div>
              <div v-else>TA还没有写过博客呢~</div>
            </div>
          </div>
        </template>
      </main-content>
    </div>
    <div class="forbid" v-if="show">TA设置了访问权限~</div>
  </div>
</template>

<script>
  import MainContent from 'components/content/maincontent/MainContent'
  import Recommend from 'components/content/maincontent/Recommend'

  export default {
    name: 'PageContent',
    data() {
      return {
        isMore: false, // 是否显示更多
        num: 0, // 博客数目
        isEnd: false, // 是否到尽头
      }
    },
    props: ['blogList', 'isShow'],
    computed: {
      // 确认是本人还是他人
      getFlag() {
        return this.$route.path.indexOf(this.$store.state.id) != -1 && this.$store.state.id != ''
      },
      showItem() {
        return function(index) {
         if(this.getFlag) return true;
         if(this.$store.state.userData.userSet) {
           return this.$store.state.userData.userSet.homeList[index].status
         }
         return true
        }
      },
      getText() {
        if(this.getFlag) return '我';
        return 'TA'
      },
      show() {
        if(this.getFlag) return false;
        const userSet = this.$store.state.userData.userSet;
        if (userSet) {
          for (let i of userSet.homeList) {
            if (i.status) return false
          }
          return true
        }
        return false
      },
      sliceList() {
        if (this.isMore) {
          this.num = 0;
          return this.blogList;
        }
        this.num = this.blogList.length;
        return this.blogList.slice(0, 3);
      }
    },
    components: {
      MainContent,
      Recommend
    },
    methods: {
      // 显示更多
      showMore() {
        this.isMore = true;
      },
      // 前往写博客页面
      writeBlog() {
        this.$router.push('/' + this.$store.state.id + '/blog/new')
      }
    }
  }

</script>

<style scoped>
  .page-content {
    float: left;
    width: 756px;
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

  .none {
    padding: 100px 0;
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

  .forbid {
    min-height: 500px;
    padding: 100px 0;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    color: #969696;
    border-radius: 5px;
  }

  em {
    margin-left: 10px;
    color: #00a1d6;
    cursor: pointer;
  }

  em:hover {
    color: #f25d8e;
  }

</style>
