<template>
  <div class="system-mes">
    <div v-if="systemList.length!=0">
      <div class="message-item" v-for="(item,index) of systemList" :key="index">
        <span>{{item.title}}</span>
        <em>{{format(item.time, true)}}</em>
        <div>
          {{item.content}}
          <!-- <b>点击查看</b> -->
          </div>
      </div>
    </div>
    <div class="none" v-else>
      <div v-show="isShow"><i class="iconfont icon-jiazai"></i>loading...</div>
      <div v-show="!isShow">这里还是空的呢~</div>
    </div>
  </div>
</template>

<script>
  import { getSystem } from 'network/message'
  import { formatTime } from 'common/utils'

  export default {
    name: 'SystemMes',
    data() {
      return {
        systemList: [],
        isShow: true
      }
    },
    computed: {
      format() {
        return formatTime
      }
    },
    created() {
      const total = this.$store.state.system.total;
      getSystem(this.$store.state.id, total).then(res => {
        this.isShow = false;
        this.systemList = res.data.system;
        this.$store.commit('updateMes', 'system')
      })
    }
  }

</script>

<style scoped>
  .system-mes {
    margin-top: 50px;
    height: calc(100vh - 155px);
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .system-mes::-webkit-scrollbar {
    width: 8px;
    background-color: #ecf2f5;
  }

  .system-mes::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
  }

  .message-item {
    padding: 25px 15px;
    margin-bottom: 10px;
    background-color: #fff;
    line-height: 24px;
    border-radius: 5px;
  }

  .message-item:last-child {
    margin-bottom: 0;
  }

  span {
    font-size: 14px;
    color: #333;
    font-weight: 700;
  }

  em {
    position: relative;
    top: -2px;
    margin-left: 15px;
    font-size: 12px;
    color: #999;
  }

  .message-item div {
    padding-left: 10px;
    color: #666;
    font-size: 12px;
  }

  b {
    color: #1389bf;
    cursor: pointer;
  }

  b:hover {
    color: #19aaee;
  }

  .none {
    padding-top: 100px;
    text-align: center;
    font-size: 16px;
    color: #999;
  }

  .none i {
    margin-right: 5px;
    font-size: 14px;
  }

</style>
