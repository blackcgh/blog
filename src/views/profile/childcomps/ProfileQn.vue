<template>
  <div class="profile-qn">
    <h2>问题反馈</h2>
    <ul>
      <li>
        <span>用户：</span><i>{{this.$store.state.username}}</i>
      </li>
      <li>
        <label>问题阐述：</label>
        <textarea placeholder="填写你遇到的问题。" v-model="question"></textarea>
      </li>
      <li>
        <div class="submit" @click="submit">提交</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { sendQuestion } from 'network/question'

  export default {
    name: 'ProfileQn',
    data() {
      return {
        question: ''
      }
    },
    methods: {
      // 提交问题
      submit() {
        if(this.question != '') {
          const { username, id } = this.$store.state;
          sendQuestion(id, username, this.question).then(res => {
            if(res.errno == 0) {
              this.question = '';
              this.$tip.show('#f0f9eb', '提交成功', 0, '#91c287')
            } else if(res.errno == -1){
              this.$tip.show('#fef0f0', '提交失败', 3, '#f56c6c')
            }
          })
        }
      }
    }
  }

</script>

<style scoped>
  h2 {
    padding: 2px 0 2px 8px;;
    margin-bottom: 20px;
    border-left: 4px solid #00a1d6;
    color: #00a1d6;
  }

  li {
    margin-bottom: 20px;
    font-size: 14px;
  }

  span {
    display: inline-block;
    width: 95px;
    margin-right: 20px;
    color: #717171;
    text-align: right;
  }

  label {
    display: inline-block;
    width: 95px;
    margin-top: 6px;
    margin-right: 20px;
    color: #717171;
    text-align: right;
  }

  textarea {
    width: 618px;
    height: 88px;
    padding: 5px 7px;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    vertical-align: top;
  }

  textarea:hover {
    border-color: #00a1d6;
  }

  textarea:focus {
    border-color: #00a1d6;
  }

  .submit {
    width: 110px;
    height: 36px;
    margin: 0 auto;
    padding: 10px 15px;
    background-color: #00a1d6;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .submit:hover {
    background-color: #03b8f5;
  }

</style>
