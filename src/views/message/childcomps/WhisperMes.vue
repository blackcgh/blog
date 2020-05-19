<template>
  <div class="whisper-mes">
    <!-- 用户区域 -->
    <div class="w-user">
      <h4>近期消息<b v-if="isAwait">（同步中，请稍后）</b></h4>
      <ul>
        <li v-for="(item,index) of userList" :key="index" :class="{current:currentIndex==index}"
            @click="toggleChat(index,item['_id'])">
          <em class="iconfont icon-guanbi" @click.stop="close(index)"></em>
          <img :src="getAvatar(item.avatar)" />
          <div class="user">{{item.username}}
            <!-- <span>{{item.username}}</span>
            <p>{{item.username}}</p> -->
          </div>
        </li>
      </ul>
    </div>

    <!-- 聊天区域 -->
    <div class="w-chat">
      <router-view
        v-if="userList.length"
        :whisperList="whisperList"
        :user="userList[currentIndex]"
        :isLoad="isLoad"
        @top="top" />
      <div class="none" v-else>没有新的未读消息呢，快找小伙伴聊天吧。</div>
    </div>
  </div>
</template>

<script>
  import { getWhisperUser, delWhisperUser } from 'network/message'
  import { getWhisper } from 'network/whisper'

  export default {
    name: 'WhisperMes',
    data() {
      return {
        // 同步提示
        isAwait: true,
        // 当前索引
        currentIndex: 0,
        // 用户列表
        userList: [],
        // 聊天记录
        whisperList: [],
        // 显示加载或空
        isLoad: true
      }
    },
    computed: {
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    methods: {
      // 获取用户列表
      getWhisper(index) {
        this.whisperList = [];
        this.isLoad = true;
        getWhisper(this.$store.state.id, this.userList[index]['_id']).then(res => {
          this.isLoad = false;
          this.whisperList = res.data
        })

      },
      // 切换到其他聊天
      toggleChat(index) {
        if (this.currentIndex != index) {
          this.currentIndex = index;
          this.$router.push('/message/whisper/' + this.userList[index]['_id']);
          this.getWhisper(index)
        }
      },
      // 关闭用户聊天
      close(index) {
        delWhisperUser(this.$store.state.id, this.userList[index]['_id']).then(res => {
          if (res.errno == 0) {
            this.userList.splice(index, 1);
            if (this.currentIndex >= index) {
              if (this.currentIndex == index) {
                this.currentIndex = 0
              } else {
                this.currentIndex--
              }
              if (this.userList.length) {
                const cid = this.userList[this.currentIndex]['_id'];
                if (this.$route.params.uid != cid) {
                  this.$router.replace('/message/whisper/' + cid);
                  this.getWhisper(this.currentIndex)
                }
              }
            }
          } else if (res.errno == -1) {
            this.$tip.show('#fef0f0', '发生错误', 3, '#f56c6c')
          }
        })
      },
      // 接受子组件的事件，将该用户置顶
      top() {
        const user = this.userList[this.currentIndex]
        this.userList.splice(this.currentIndex, 1);
        this.userList.unshift(user);
        this.currentIndex = 0
      }
    },
    created() {
      const uid = this.$route.params.uid;
      const total = this.$store.state.whisper.total;
      getWhisperUser(this.$store.state.id, uid, total).then(res => {
        this.isAwait = false;
        this.isLoad = false;
        this.userList = res.data.userList;
        this.whisperList = res.data.whisperList;
        if (!uid && this.userList.length) {
          this.$router.replace('/message/whisper/' + this.userList[0]['_id']);
        }
        if (uid) {
          for (let i in this.userList) {
            if (this.userList[i]['_id'] == uid) {
              this.currentIndex = i;
              return
            }
          }
        }
        this.$store.commit('updateMes', 'whisper')
      })
    }
  }

</script>

<style scoped>
  .whisper-mes {
    display: flex;
    margin-top: 50px;
    height: calc(100vh - 155px);
    border-radius: 5px;
    overflow: hidden;
  }

  .w-user {
    display: flex;
    width: 240px;
    height: calc(100vh - 155px);
    border-right: 1px solid #e9eaec;
    background-color: #fff;
    flex-direction: column;
  }

  .w-chat {
    height: calc(100vh - 155px);
    background-color: #f4f5f7;
    flex: 1;
    overflow: hidden;
  }

  h4 {
    height: 35px;
    border-bottom: 1px solid #e9eaec;
    background-color: #fff;
    line-height: 35px;
    padding-left: 25px;
    font-size: 12px;
    color: #666;
  }

  b {
    font-weight: 400;
  }

  ul {
    flex: 1;
    overflow: hidden;
  }

  ul:hover {
    overflow-y: auto;
  }

  ul::-webkit-scrollbar {
    width: 6px;
    background-color: rgba(1, 1, 1, 0);
  }

  ul::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 6px;
  }

  li {
    position: relative;
    display: flex;
    height: 80px;
    padding-right: 6px;
    padding: 20px 25px;
    box-sizing: border-box;
    cursor: pointer;
  }

  ul:hover li {
    padding-right: 0;
  }

  li:hover {
    background-color: #eee;
  }

  ul em {
    position: absolute;
    top: 0;
    left: -25px;
    width: 25px;
    height: 80px;
    font-size: 16px;
    line-height: 85px;
    text-align: center;
    color: #999;
    transition: left .5s
  }

  li:hover em {
    left: 0;
  }

  img {
    width: 42px;
    height: 42px;
    margin-right: 8px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user {
    flex: 1;
    font-size: 14px;
    line-height: 40px;
    color: #333;
  }

  /* span {
    font-size: 14px;
    color: #333;
  }

  p {
    width: 140px;
    height: 16px;
    padding-top: 8px;
    font-size: 12px;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  } */

  .none {
    height: 100%;
    padding-top: 150px;
    background-color: #fff;
    color: #8896b8;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
  }

  .current {
    background-color: #eee;
  }

</style>
