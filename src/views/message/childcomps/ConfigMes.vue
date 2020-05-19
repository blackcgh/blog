<template>
  <div class="config-mes">
    <div class="config-item" v-for="(item,index) of setList" :key="index">
      <div>{{item.name}}<em>{{item.remark}}</em></div>
      <div class="message">
        <span @click="start(index)">
          <b :class="{bactive:item.status}">
            <i :class="{iactive:item.status}"></i>
          </b>
          开启
        </span>
        <span @click="stop(index)">
          <b :class="{bactive:!item.status}">
            <i :class="{iactive:!item.status}"></i>
          </b>
          关闭
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { saveMessage } from 'network/message'

  export default {
    name: 'ConfigMes',
    data() {
      return {
        setList: [
          {
            name: '消息提醒',
            remark: '（关闭后，消息将不再进行提醒）',
            status: this.$store.state.messageSet[0]
          },
          {
            name: '回复我的消息提醒',
            remark: '（关闭后，别人回复你将不再进行提醒）',
            status: this.$store.state.messageSet[1]
          },
          {
            name: '收藏的赞消息提醒',
            remark: '（关闭后，别人给你点赞将不再进行提醒）',
            status: this.$store.state.messageSet[2]
          },
          {
            name: '系统通知消息提醒',
            remark: '（关闭后，系统通知将不再进行提醒）',
            status: this.$store.state.messageSet[3]
          },
          {
            name: '我的消息提醒',
            remark: '（关闭后，别人给你发消息将不再进行提醒）',
            status: this.$store.state.messageSet[4]
          },
        ]
      }
    },
    methods: {
      start(index) {
        this.setList[index].status = true
      },
      stop(index) {
        this.setList[index].status = false
      }
    },
    deactivated() {
      const messageSet = this.setList.map(el => el.status);
      saveMessage(this.$store.state.id, messageSet).then(res => {
        this.$store.commit('saveMessage', messageSet)
      })
    }
  }

</script>

<style scoped>
  .config-mes {
    margin-top: 50px;
    height: calc(100vh - 155px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .config-item {
    padding: 25px 15px;
    margin-bottom: 10px;
    background-color: #fff;
    font-size: 14px;
    line-height: 24px;
    color: #333;
    border-radius: 5px;
  }

  .config-item:last-child {
    margin-bottom: 0;
  }

  .config-item>div:first-child {
    margin-bottom: 20px;
  }

  em {
    color: #999;
  }

  span {
    margin-right: 40px;
    cursor: pointer;
  }

  b {
    position: relative;
    display: inline-block;
    top: 7px;
    width: 22px;
    height: 22px;
    margin-right: 7px;
    border: 1px solid #d3d9df;
    background-color: #f7f8f9;
    border-radius: 50%;
  }

  i {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 11px;
    height: 11px;
    background-color: #23ade5;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .iactive {
    display: block;
  }

  .bactive {
    border-color: #23ade5;
  }

</style>
