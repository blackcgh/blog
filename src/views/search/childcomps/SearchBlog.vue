<template>
  <div class="search-blog">
    <!-- 搜索结果排序、分类 -->
    <div class="search-filter" v-if="list.length">
      <!-- 排序 -->
      <ul class="clearfix">
        <li v-for="(item,index) of sort"
            :key="index"
            :class="{current:sortIndex==index}"
            @click="sortClick(index)">
          {{item}}
        </li>
      </ul>

      <!-- 分类 -->
      <ul class="clearfix second">
        <li v-for="(item,index) of category"
            :key="index"
            :class="{current:categoryIndex==index}"
            @click="categoryClick(index)">{{item}}</li>
      </ul>

      <!-- 数据展示 -->
      <recommend v-for="item of getSort" :key="item['_id']" :item="item" :showTime="false">
      </recommend>
      <div class="none" v-if="getSort.length==0">没有相关数据</div>
    </div>
    <div class="none" v-else>
      <div class="load" v-show="isShow"><i class="iconfont icon-jiazai"></i>loading...</div>
      <div v-show="!isShow">没有相关数据</div>
    </div>
  </div>
</template>

<script>
  import Recommend from 'components/content/maincontent/Recommend'

  export default {
    name: 'SearchBlog',
    data() {
      return {
        // 排序选项
        sort: ['默认排序', '最新发布', '最多阅读', '最多喜欢', '最多评论'],
        // 分类选项
        category: ['全部专栏', '科技', '生活', '兴趣', '动画', '游戏', '影视', '轻小说'],
        // 当前排序位置
        sortIndex: 0,
        // 当前分类位置
        categoryIndex: 0
      }
    },
    props: ['list', 'isShow'],
    computed: {
      // 获取指定排序
      getSort() {
        let temp;
        const arr = [];
        arr.push(...this.list);
        if(this.sortIndex == 1) { // 最新发布
          arr.reverse();
        } else if(this.sortIndex == 2) { // 最多阅读
          for(let i = 0; i < arr.length - 1; i++) {
            for(let j = i + 1; j < arr.length; j++) {
              if(arr[i].readNum < arr[j].readNum) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        } else if(this.sortIndex == 3) { // 最多喜欢
          for(let i = 0; i < arr.length - 1; i++) {
            for(let j = i + 1; j < arr.length; j++) {
              const first = arr[i].likeNum + arr[i].starNum * 5;
              const second = arr[j].likeNum + arr[j].starNum * 5;
              if(first < second) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        } else if(this.sortIndex == 4) { // 最多评论
          for(let i = 0; i < arr.length - 1; i++) {
            for(let j = i + 1; j < arr.length; j++) {
              if(arr[i].commentInfo < arr[j].commentInfo) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        }
        return this.filte(arr)
      }
    },
    components: {
      Recommend
    },
    methods: {
      // 排序的点击事件
      sortClick(index) {
        this.sortIndex = index
      },
      // 分类的点击事件
      categoryClick(index) {
        this.categoryIndex = index
      },
      // 分类筛选
      filte(arr) {
        if(this.categoryIndex == 0) { // 全部专栏不用筛选，显示全部
          return arr
        }
        for(let i = 0; i < arr.length; i++) {
          if(arr[i].category != this.category[this.categoryIndex]) {
            arr.splice(i--, 1)
          }
        }
        return arr
      }
    }
  }
</script>

<style scoped>
  ul {
    margin-bottom: 10px;
  }

  .second {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
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

  .none {
    padding-top: 200px;
    font-size: 24px;
    color: #777;
    text-align: center;
  }

  .load {
    font-size: 16px;
  }

  .none i {
    font-size: 14px;
    margin-right: 5px;
  }
</style>
