<template>
  <div id="login">
    <input type="text" placeholder="用户名" v-model="username">
    <br />
    <input type="password" placeholder="密码" v-model="password">
    <br />
    <input type="checkbox" id="remember"><label for="remember">记住我</label>
    <br />
    <button @click.prevent="btnLogin">登录</button>
  </div>
</template>

<script>
  import { login } from 'network/user'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      btnLogin() {
        const data = {};
        data.username = this.username;
        data.password = this.password;
        login(data).then(result => {
          if(result.errno === 0) {
            this.$router.replace('/home');
            this.$store.commit('showState');
            this.$store.commit('loginState', this.username);
          } else if(result.errno === -1) {
            alert('登录失败！')
          } else {
            alert('其他错误');

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

  input[type=checkbox] {
    margin: 20px 5px 20px -233px;
  }

  label {
    font-size: 15px;
    color: #757575;
  }

  button {
    width: 300px;
    height: 43px;
    background-color: #3194d0;
    color: #fff;
    font-size: 18px;
    line-height: 43px;
    border-radius: 25px;
  }

  button:hover {
    background-color: #0f6fac;
  }

</style>
