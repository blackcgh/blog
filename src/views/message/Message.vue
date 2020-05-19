<template>
  <div id="message">
    <!-- 侧边栏 -->
    <div class="m-aside">
      <h3><i class="iconfont icon-xiaoxi"></i>消息中心</h3>
      <ul>
        <li v-for="(item,index) of messageType" :key="index" :class="{current:currentIndex==index}"
            @click="toggleView(item.type,index)">
          <i :class="'iconfont '+getClass(index)"></i>
          {{item.name}}
          <em v-if="index!=4 && showNum(index)">{{getNum(index)}}</em>
        </li>
      </ul>
    </div>

    <!-- 消息区域 -->
    <div class="m-content">
      <!-- 标题 -->
      <div class="title">
        <ins :class="{detail:$route.params.cid}" @click="goLike">
          {{messageType[currentIndex].name}}
        </ins>
        <b v-if="$route.params.cid"> > 点赞详情</b>
      </div>
      <!-- 聊天 -->
      <div class="chat">
        <keep-alive exclude="LikeDetail">
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        messageType: [
          {
            name: '回复我的',
            type: 'reply'
          },
          {
            name: '收到的赞',
            type: 'like'
          },
          {
            name: '系统通知',
            type: 'system'
          },
          {
            name: '我的消息',
            type: 'whisper'
          },
          {
            name: '消息设置',
            type: 'config'
          }
        ],
        // 当前视图索引
        currentIndex: 0
      }
    },
    computed: {
      getClass() {
        return function (index) {
          if (index != 4) {
            return 'icon-yuandian'
          }
          return 'icon-shezhi1'
        }
      },
      // 获取各项消息个数
      getNum() {
        return function(index) {
          const type = this.messageType[index].type
          const { read, total } = this.$store.state[type];
          return total - read
        }
      },
      // 是否显示消息
      showNum() {
        return function(index) {
          const messageSet = this.$store.state.messageSet;
          return messageSet[0] && messageSet[index + 1] && this.getNum(index)!=0
        }
      }
    },
    watch: {
      '$route.path': function (val) {
        for (let i in this.messageType) {
          if (val.indexOf(this.messageType[i].type) != -1) {
            this.currentIndex = i;
            return
          }
        }
      }
    },
    methods: {
      // 切换视图
      toggleView(type, index) {
        this.currentIndex = index;
        const path = this.$route.path.split('/');
        if (path[2] != type || path.length > 3) {
          this.$router.push('/message/' + type)
        }
      },
      // 返回点赞页面
      goLike() {
        this.$router.back()
      }
    },
    created() {
      document.title = '消息中心 - blackblog';
      for (let i in this.messageType) {
        if (this.$route.path.indexOf(this.messageType[i].type) != -1) {
          this.currentIndex = i;
          return
        }
      }
    }
  }

</script>

<style scoped>
  #message {
    display: flex;
    font-size: 14px;
  }

  .m-aside {
    width: 140px;
    height: calc(100vh - 105px);
    margin-right: 10px;
    background-color: #fff;
    border-radius: 5px;
  }

  .m-aside h3 {
    height: 40px;
    line-height: 40px;
    font-weight: 700;
    text-align: center;
    color: #222;
  }

  h3 i {
    position: relative;
    top: 1px;
    margin-right: 10px;
    font-size: 18px;
    color: #333;
  }

  li i {
    margin-right: 5px;
    font-size: 12px;
    color: #6b757b;
  }

  .m-aside li {
    position: relative;
    line-height: 40px;
    text-align: center;
    color: #6b757b;
    cursor: pointer;
  }

  .m-aside li:hover {
    color: #2faee3;
  }

  .m-aside li.current {
    color: #2faee3;
  }

  em {
    position: absolute;
    top: 12px;
    right: 10px;
    padding: 0 5px;
    background-color: #FA5A57;
    line-height: 16px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    border-radius: 8px;
  }

  .m-content {
    flex: 1;
  }

  .title {
    float: left;
    width: 100%;
    padding-left: 15px;
    background-color: #fff;
    line-height: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    box-sizing: border-box;
  }

  .detail {
    cursor: pointer;
  }

  .detail:hover {
    color: #2faee3;
  }

  b {
    font-weight: 400;
  }

</style>
