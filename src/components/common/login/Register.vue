<template>
  <div id="register">
      <input type="text" placeholder="请输入用户名" v-model="data.username">
      <input type="password" placeholder="请输入密码" v-model="data.password">
      <button @click.prevent="btnRegister">注册</button>
  </div>
</template>

<script>
  import { register } from 'network/user'

  export default {
    name: 'Register',
    data() {
      return {
        data: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      btnRegister() {
        register(this.data).then(result => {
          if(result.errno === 0) {
            this.$router.replace('/');
            this.$store.commit('show');
            this.$store.commit('login', this.data.username);
            this.$store.commit('saveId', result.data.id)
          } else if(result.errno === -1) {
            alert('该用户已存在')
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

  button {
    width: 330px;
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
