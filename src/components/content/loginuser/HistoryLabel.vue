<template>
  <div class="history-label">
    <ul v-if="historyList.length">
      <li v-for="(item,index) of historyList.slice(0, 7)"
          :key="index"
          @click.stop="goDetail(item['_id'])">
        <!-- 博客图片 -->
        <img :src="getBlogImg(item.content)" alt="">
        <div>
          <h3>{{item.title}}</h3>
          <span>{{item.author}}</span>
          <span>{{format(index)}}</span>
        </div>
      </li>
      <li class="more" v-if="historyList.length>7" @click.stop="clickMore">查看更多 ></li>
    </ul>
    <div v-else>
      <div v-show="isShow"><em class="iconfont icon-jiazai"></em>loading...</div>
      <div v-show="!isShow">好像最近没有看过博客呢</div>
    </div>
  </div>
</template>

<script>
  import { formatTime, getBlogImg } from 'common/utils'
  import { getHistory } from 'network/blog'

  export default {
    name: 'HistoryLabel',
    data() {
      return {
        historyList: [],
        isShow: true
      }
    },
    computed: {
      // 格式化时间
      format() {
       return function(index) {
          if(this.historyList[index]) return formatTime(this.historyList[index].readTime, true);
          return 'error'
       }
      },
      getBlogImg() {
        return getBlogImg
      }
    },
    methods: {
      // 前往博客详情页
      goDetail(bid) {
        if(this.$route.path.indexOf(bid) == -1) {
          this.$router.push('/blog/' + bid);
        }
        this.$emit('shutHistory')
      },
      // 前往历史页面
      clickMore() {
        if(this.$route.path.indexOf('history') == -1) {
          this.$router.push('/history')
        }
        this.$emit('shutHistory')
      }
    },
    activated() {
      const history = this.$store.state.history;
      this.isShow = true;
      if(history.length == 0) {  // 清空历史
        this.isShow = false;
        this.historyList = []
      } else if(this.historyList.length != history.length) {
        const bids = history.map(el => el.bid);
        this.historyList = [];
        getHistory(bids).then(res => {
          this.isShow = false;
          this.historyList = res.data;
          for(let i in this.$store.state.history) {
            this.historyList[i].readTime = this.$store.state.history[i].readTime
          }
          this.historyList.reverse();
        })
      }
    }
  }
</script>

<style scoped>
  .history-label {
    position: absolute;
    top: 60px;
    left: -133px;
    width: 350px;
    height: 400px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(100, 100, 100, .6);
    border-radius: 4px;
    overflow-y: auto;
    z-index: 1;
  }

  .history-label li {
    height: 80px;
    padding: 10px 0 10px 20px;
    box-sizing: border-box;
  }

  .history-label .more {
    width: 300px;
    height: 30px;
    padding: 0;
    margin: 20px auto;
    background-color: #e5e9ef;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #222;
  }

  .history-label .more:hover {
    background-color: #e5e9ef;
    color: #00b5e5;
  }

  .history-label li:hover {
    background-color: #eee;
  }

  .history-label li img {
    float: left;
    width: 80px;
    height: 60px;
    margin-right: 15px;
    border-radius: 4px;
    object-fit: cover;
  }

  .history-label li div:last-child {
    float: left;
    width: 215px;
    height: 60px;
    line-height: 16px;
    text-align: left;
  }

  h3 {
    height: 40px;
    font-size: 14px;
    line-height: 20px;
    color: #222;
    overflow: hidden;
  }

  span {
    margin-right: 20px;
    font-size: 12px;
    color: #aaa;
  }

  .history-label>div {
    padding-top: 100px;
    font-size: 14px;
    color: #aaa;
    text-align: center;
  }

  em {
    font-size: 14px;
    margin-right: 5px;
  }
</style>
