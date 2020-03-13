<template>
  <div id="login">
    <input type="text" placeholder="请输入用户名" v-model="data.username">
    <input type="password" placeholder="请输入密码" v-model="data.password">
    <input type="checkbox" id="remember"><label for="remember">记住我</label>
    <button @click.prevent="btnLogin">登录</button>
  </div>
</template>

<script>
  import { login } from 'network/user'

  export default {
    name: 'Login',
    data() {
      return {
        data: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      btnLogin() {
        login(this.data).then(result => {
          if (result.errno === 0) {
            this.$router.replace('/');
            this.$store.commit('show');
            this.$store.commit('login', this.data.username);
            this.$store.commit('saveId', result.data.id)
          } else if (result.errno === -1) {
            alert('登录失败')
          } else {
            alert('错误');
          }
        })
      }
    }
  }

</script>

<style scoped>
  input[type=text],
  input[type=password] {
    width: 330px;
    height: 40px;
    padding-left: 15px;
    margin-bottom: 20px;
    border: 1px solid #c6d8f2;
    font-size: 14px;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #6da4f1;
  }

  label {
    font-size: 15px;
    color: #757575;
  }

  button {
    width: 330px;
    height: 43px;
    margin-top: 30px;
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
