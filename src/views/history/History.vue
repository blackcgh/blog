<template>
  <div id="history">
    <div class="h-head">
      <h3>历史记录</h3>
      <span @click="empty">清空历史</span>
    </div>
    <div v-if="historyList.length">
      <history-item
        v-for="(item,index) of historyList"
        :key="item['_id']"
        :history="item"
        @delHistory="delHistory(index)">
      </history-item>
    </div>
    <div class="none" v-else>
      <div v-show="isShow">努力加载中...</div>
      <div v-show="!isShow">好像最近没有看过博客呢</div>
    </div>
  </div>
</template>

<script>
  import HistoryItem from './childcomps/HistoryItem'

  import { getHistory } from 'network/blog'
  import { emptyHistory } from 'network/user'

  export default {
    name: 'History',
    data() {
      return {
        // 获取后台历史数据
        historyList: [],
        isShow: true
      }
    },
    components: {
      HistoryItem
    },
    methods: {
      // 清空历史
      empty() {
        if(this.$store.state.history.length != 0) {
          emptyHistory(this.$store.state.id).then(res => {
            if(res.errno == 0) {
              this.historyList = [];
              this.isShow = false;
              this.$store.commit('emptyHistory');
              this.$tip.show('#f0f9eb', '已清空历史', 0, '#91c287')
            } else {
              this.$tip.show('#fef0f0', '发生未知错误，请稍后再试', 3, '#f56c6c')
            }
          })
        }
      },
      // 删除历史记录
      delHistory(index) {
        this.historyList.splice(index, 1)
      }
    },
    created() {
      document.title = '历史记录 - blackblog';
      const bids = this.$store.state.history.map(el => el.bid);
      if(bids.length != 0) {
        getHistory(bids).then(res => {
          this.isShow = false;
          this.historyList = res.data;
          for(let i in this.$store.state.history) {
            this.historyList[i].readTime = this.$store.state.history[i].readTime
          }
          this.historyList.reverse()
        })
      } else {
        this.isShow = false
      }
    }
  }
</script>

<style scoped>
  #history {
    min-height: 800px;
    background-color: #fff;
  }

  .h-head {
    height: 30px;
    padding: 20px 0 10px;
    margin: 0 50px 30px;
    border-bottom: 1px solid #e5e9ef;
  }

  .h-head h3 {
    float: left;
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
    color: #222;
  }

  .h-head span {
    float: right;
    border: 1px solid #00a1d6;
    text-align: center;
    padding: 5px 8px;
    font-size: 14px;
    color: #00a1d6;
    border-radius: 5px;
    cursor: pointer;
  }

  .h-head span:hover {
    background-color: #00a1d6;
    color: #fff;
  }

  .none {
    padding-top: 100px;
    font-size: 16px;
    color: #99a2aa;
    text-align: center;
  }

  .none div:first-child {
    font-size: 14px;
  }

</style>
