<template>
  <div id="register">
      <input type="text" placeholder="用户名" v-model="username">
      <br />
      <input type="password" placeholder="密码" v-model="password">
      <br />
      <button @click.prevent="btnRegister">注册</button>
  </div>
</template>

<script>
  import { register } from 'network/user'

  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      btnRegister() {
        const data = {};
        data.username = this.username;
        data.password = this.password;
        register(data).then(result => {
          if(result.errno === 0) {
            this.$router.replace('/home');
            this.$store.commit('showState');
            this.$store.commit('loginState', this.username);
          } else if(result.errno === -1) {
            alert('该用户已存在！')
          } else {
            alert('其他错误')
          }

        })
      }
    }
  }
</script>

<style scoped>
  input[type=text],
  input[type=password] {
    width: 300px;
    height: 50px;
    padding: 4px 12px 4px 35px;
    border: 1px solid #c8c8c8;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
  }

  input[type=text] {
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
  }

  button {
    width: 300px;
    height: 43px;
    margin-top: 20px;
    background-color: #42c02e;
    color: #fff;
    font-size: 18px;
    line-height: 43px;
    border-radius: 25px;
  }

  button:hover {
    background-color: #23a50f;
  }
</style>
