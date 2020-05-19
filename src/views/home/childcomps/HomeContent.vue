<template>
  <div class="home-content">
    <!-- 轮播图 -->
    <home-swiper v-if="showSwiper" :headImgs="headImgs"></home-swiper>

    <!-- 博客推荐 -->
    <main-content>
      <span v-if="$route.path=='/'">推荐博客</span>
      <!-- 排序 -->
      <ul class="clearfix" v-else>
        <li v-for="(item,index) of sort" :key="index" :class="{current:sortIndex==index}" @click="sortClick(index)">
          {{item}}
        </li>
      </ul>
      <template v-slot:mc>
        <recommend v-for="(item,index) of getSort" :key="index" :item="item" :showTime="false">
        </recommend>
        <div class="end" v-if="isEnd">已经到尽头了~</div>
        <div v-else>
          <div class="more" @click="showMore" v-if="!isLoad">...</div>
          <div class="load" v-else><em class="iconfont icon-jiazai"></em>loading...</div>
        </div>
      </template>
    </main-content>
  </div>
</template>

<script>
  import HomeSwiper from 'components/content/homeswiper/HomeSwiper'
  import MainContent from 'components/content/maincontent/MainContent'
  import Recommend from 'components/content/maincontent/Recommend'

  import { getAll } from 'network/blog'

  export default {
    name: 'HomeContent',
    data() {
      return {
        // 第几次请求数据
        page: 1,
        isEnd: this.end,
        // 排序选项
        sort: ['默认排序', '最新发布', '最多阅读', '最多喜欢', '最多评论'],
        // 当前排序位置
        sortIndex: 0,
        // 显示加载图标
        isLoad: false
      }
    },
    props: ['category', 'headImgs', 'blogList', 'end'],
    computed: {
      showSwiper() {
        return this.$route.path == '/' && this.headImgs.length
      },
      // 获取指定排序
      getSort() {
        let temp;
        const arr = [];
        arr.push(...this.blogList);
        if (this.sortIndex == 1) { // 最新发布
          // arr.reverse();
        } else if (this.sortIndex == 2) { // 最多阅读
          for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
              if (arr[i].readNum < arr[j].readNum) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        } else if (this.sortIndex == 3) { // 最多喜欢
          for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
              const first = arr[i].likeNum + arr[i].starNum * 5;
              const second = arr[j].likeNum + arr[j].starNum * 5;
              if (first < second) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        } else if (this.sortIndex == 4) { // 最多评论
          for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
              if (arr[i].commentInfo < arr[j].commentInfo) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        }
        return arr
      }
    },
    watch: {
      end(val) {
        this.isEnd = val
      }
    },
    components: {
      HomeSwiper,
      MainContent,
      Recommend
    },
    methods: {
      // 排序的点击事件
      sortClick(index) {
        this.sortIndex = index
      },
      // 显示更多
      showMore() {
        this.isLoad = true;
        getAll(this.page++, this.category).then(res => {
          this.isLoad = false;
          this.blogList.push(...(res.data.data));
          this.isEnd = res.data.isEnd;
        })
      }
    }
  }

</script>

<style scoped>
  .home-content {
    float: left;
    width: 756px;
    box-sizing: border-box;
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

  .end,
  .load {
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

  em {
    margin-right: 5px;
    font-size: 14px;
  }

  ul {
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e9ef;
  }

  li {
    float: left;
    padding: 0 8px;
    margin-right: 15px;
    font-size: 12px;
    line-height: 20px;
    color: #222;
    cursor: pointer;
    border-radius: 4px;
  }

  li:hover {
    color: #00a1d6;
  }

  li.current {
    background-color: #00a1d6;
    color: #fff;
  }

</style>
