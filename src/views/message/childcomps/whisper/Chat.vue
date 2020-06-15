<template>
  <div class="message-chat">
    <!-- 用户名称 -->
    <h4>
      {{user.username}}
      <i class="iconfont icon-gengduo" @click="set"></i>
    </h4>

    <!-- 设置列表 -->
    <div class="set" v-show="isShow">
      <div @click="top">置顶聊天</div>
      <div @click="silenced">开启免打扰</div>
    </div>

    <!-- 消息内容 -->
    <div class="message-list">
      <ul v-if="whisperList.length">
        <li v-for="(item,index) of whisperList" :key="index">
          <div class="time">{{format(item.time, true)}}</div>
          <!-- 对方 -->
          <div class="chat" v-if="show(index)">
            <img :src="getAvatar(user.avatar)" @click="goPerson(user['_id'])" />
            <div class="chat-content">{{item.content}}</div>
          </div>
          <!-- 我 -->
          <div class="chat-me" v-else>
            <img :src="$store.state.avatar" @click="goPerson($store.state.id)" />
            <div class="chat-content-me">{{item.content}}</div>
          </div>
        </li>
      </ul>
      <div v-else>
        <div v-show="isLoad"><em class="iconfont icon-jiazai"></em>loading...</div>
        <div v-show="!isLoad">没有更多消息了~</div>
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="send-box">
      <div class="img">
        <input type="file" title="图片" @change="selectImg" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <img src="~assets/img/selectimg.png" v-if="!isActive">
        <img src="~assets/img/activeimg.png" v-else>
      </div>
      <div class="input">
        <textarea placeholder="回复一下吧~" v-model="content"></textarea>
      </div>
      <div class="send">
        <div class="send-btn" :class="{active:content.length!=0}" @click="send">发送</div>
        <div>{{content.length}}/500</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { newWhisper } from 'network/whisper'
  import { formatTime } from 'common/utils'

  export default {
    name: 'Chat',
    data() {
      return {
        // 是否显示设置列表
        isShow: false,
        // 切换图片
        isActive: false,
        // 编辑的内容
        content: ''
      }
    },
    props: ['whisperList', 'user', 'isLoad'],
    computed: {
      format() {
        return formatTime
      },
      // 以我或对方显示聊天
      show() {
        return function (index) {
          return this.whisperList[index].sid != this.$store.state.id
        }
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    methods: {
      // 设置
      set() {
        this.isShow = !this.isShow
      },
      // 置顶聊天
      top() {
        this.isShow = false
      },
      // 开启免打扰
      silenced() {
        this.isShow = false
      },
      // 经过图片按钮
      mouseenter() {
        this.isActive = true
      },
      // 离开图片按钮
      mouseleave() {
        this.isActive = false
      },
      // 前往个人主页
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage')
      },
      // 选择图片
      selectImg() {},
      // 发送消息
      send() {
        if (this.content.length != 0 && this.content.length <= 500) {
          const whisper = {
            sid: this.$store.state.id,
            rid: this.user['_id'],
            time: new Date(),
            content: this.content
          }
          newWhisper(whisper).then(res => {
            if(res.errno == 0) {
              this.content = '';
              this.whisperList.push(whisper);
              this.$emit('top')
            } else if(res.errno == -1) {
              this.$tip.show('#fef0f0', '发送失败', 3, '#f56c6c')
            }
          })
        } else if (this.content.length > 500) {
          this.$tip.show('#edf2fc', '消息长度不能超过500', 1, '#909399')
        }
      }
    }
  }

</script>

<style scoped>
  .message-chat {
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  h4 {
    position: relative;
    height: 35px;
    border-bottom: 1px solid #e9eaec;
    background-color: #fff;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
    color: #333;
  }

  h4 i {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 36px;
    font-size: 18px;
    line-height: 36px;
    text-align: center;
    color: #999;
    cursor: pointer;
  }

  .set {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 6px 12px 0 rgba(106, 115, 133, 0.22);
    cursor: pointer;
  }

  .set::before {
    content: '';
    position: absolute;
    top: -14px;
    right: 9px;
    border: 7px solid transparent;
    border-bottom-color: #fff;
  }

  .set div {
    width: 104px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    color: #333;
    text-align: center;
  }

  .set div:hover {
    background: #e5e9ef;
    color: #2faee3;
  }

  .message-list {
    height: 300px;
    font-size: 12px;
    line-height: 20px;
    color: #666;
    text-align: center;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .message-list::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(1, 1, 1, 0);
  }

  .message-list::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
  }

  li {
    padding: 15px;
    overflow-y: hidden;
  }

  .time {
    height: 20px;
    padding-bottom: 15px;
    color: #999;
  }

  .chat {
    float: left;
    overflow-y: hidden;
  }

  .chat-me {
    float: right;
    overflow-y: hidden;
  }

  li img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
  }

  .chat img {
    float: left;
    margin-right: 10px;
  }

  .chat-me img {
    float: right;
    margin-left: 10px;
  }

  .chat-content {
    float: left;
    background-color: #fff;
    color: #333;
    border-radius: 0 16px 16px 16px;
  }

  .chat-content-me {
    float: right;
    background-color: #80b9f2;
    color: #fff;
    border-radius: 16px 0 16px 16px;
  }

  .chat-content,
  .chat-content-me {
    padding: 8px 16px;
    font-size: 14px;
    overflow-y: hidden;
  }

  .send-box {
    display: flex;
    padding: 0 15px;
    border-top: 1px solid #d8d8d8;
    flex-direction: column;
    flex: 1;
  }

  .img {
    position: relative;
    width: 22px;
    height: 21px;
    margin: 10px 0;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 22px;
    height: 21px;
    cursor: pointer;
    opacity: 0;
    z-index: 1;
  }

  .input {
    flex: 1
  }

  .input textarea {
    min-width: 100%;
    min-height: 100%;
    background-color: transparent;
    font-size: 14px;
    color: #333;
    overflow-y: auto;
  }

  .send {
    height: 30px;
    margin: 7px 0 3px;
    line-height: 30px;
    font-size: 12px;
    color: #c0c0c0;
  }

  .send div {
    float: right;
  }

  .send-btn {
    width: 88px;
    height: 30px;
    margin-left: 15px;
    border: 1px solid #e7e7e7;
    background-color: #fff;
    font-size: 14px;
    text-align: center;
    color: #222;
    cursor: pointer;
    border-radius: 4px;
  }

  .active {
    background-color: #1389bf;
    border-color: #1389bf;
    color: #fff;
  }

  .active:hover {
    background-color: #18aaee;
  }

  em {
    font-size: 14px;
    margin-right: 5px;
  }

</style>
