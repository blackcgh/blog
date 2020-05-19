<template>
  <div class="message-label">
    <div v-for="(item,index) of messageType" :key="index" @click.stop="goMessage(item.type)">
      {{item.name}}
      <em v-if="showNum(index)">{{getNum(index)}}</em>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageLabel',
    data() {
      return {
        messageType: [{
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
        }]
      }
    },
    computed: {
      // 获取各项消息个数
      getNum() {
        return function(index) {
          const type = this.messageType[index].type;
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
    methods: {
      goMessage(type) {
        if(this.$route.path.indexOf(type) == -1) {
          this.$router.push('/message/' + type)
        }
        this.$emit('shutMessage')
      }
    }
  }
</script>

<style scoped>
  .message-label {
    position: absolute;
    top: 60px;
    left: -23px;
    width: 130px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(100, 100, 100, .6);
    border-radius: 4px;
  }

  .message-label div {
    position: relative;
    height: 40px;
    padding-left: 15px;
    font-size: 14px;
    color: #222;
    text-align: left;
    line-height: 40px;
  }

  .message-label div:hover {
    background-color: #eee;
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
</style>
