<template>
  <div id="login">
    <!-- 用户名 -->
    <input
      type="text"
      placeholder="请输入用户名"
      v-focus
      v-model="data.username"
      @blur="userBlur"
      :class="getUser" />
    <transition name="user-slide">
      <div class="user-error" v-show="isUser === -1">{{userMessage}}</div>
    </transition>

    <!-- 密码 -->
    <input
      type="password"
      placeholder="请输入密码"
      v-model="data.password"
      @blur="pwdBlur"
      :class="getPwd">
    <transition name="pwd-slide">
      <div class="pwd-error" v-show="isPwd === -1">{{pwdMessage}}</div>
    </transition>

    <!-- 操作按钮 -->
    <button @click.prevent="btnLogin">登录</button>
    <span @click="reset">重置</span>
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
        },
        userMessage: '请输入用户名',
        pwdMessage: '请输入密码',
        isUser: 0,  // 0是初始状态，-1是校验失败，1是校验成功
        isPwd: 0
      }
    },
    computed: {
      // 获取用户框的类名
      getUser() {
        return {
          error: this.isUser === -1,
          success: this.isUser === 1
        }
      },
      // 获取密码框的类名
      getPwd() {
        return {
          error: this.isPwd === -1,
          success: this.isPwd === 1
        }
      }
    },
    methods: {
      // 用户名校验
      userBlur() {
        const length = this.data.username.length;
        if (length === 0) {
          this.isUser = -1;
          this.userMessage = '请输入用户名';
        } else if (length < 2 || length > 6) {
          this.isUser = -1;
          this.userMessage = '长度在 2 到 6 个字符';
        } else {
          this.isUser = 1;
        }
      },
      pwdBlur() {
        // 密码校验
        const length = this.data.password.length;
        if (length === 0) {
          this.isPwd = -1;
          this.pwdMessage = '请输入密码';
        } else if (length < 2 || length > 15) {
          this.isPwd = -1;
          this.pwdMessage = '长度在 2 到 15 个字符';
        } else {
          this.isPwd = 1;
        }
      },
      // 重置输入框
      reset() {
        this.isUser = 0;
        this.isPwd = 0;
        this.data.username = '';
        this.data.password = '';
      },
      // 登录
      btnLogin() {
        if (this.isUser === 1 && this.isPwd === 1) {
          this.$load.show();
          login(this.data).then(res => {
            this.$load.hidden();
            if (res.errno === 0) {
              this.$store.commit('hidden');
              this.$tip.show('#f0f9eb','欢迎你，' + this.data.username, 0, '#91c287');
              this.$store.commit('login', res.data)
            } else if (res.errno === -1) {
              this.$tip.show('#edf2fc', '用户名或密码错误', 1, '#909399')
            } else {
              this.$tip.show('#fef0f0', '此次登录发生其他错误', 3, '#f56c6c')
            }
          })
        } else {
          this.isUser === 0 ? this.isUser = -1 : '';
          this.isPwd === 0 ? this.isPwd = -1 : ''
        }
      }
    }
  }

</script>

<style scoped>
  #login {
    position: relative;
    text-align: right;
  }

  input[type=text],
  input[type=password] {
    position: relative;
    width: 330px;
    height: 40px;
    padding-left: 15px;
    margin-bottom: 25px;
    border: 1px solid #c6d8f2;;
    font-size: 14px;
    box-sizing: border-box;
    z-index: 1;
  }

  #login div {
    position: absolute;
    left: 0;
    font-size: 12px;
    line-height: 12px;
    color: #f56c6c;
  }

  .user-error {
    top: 43px;
  }

  .pwd-error {
    top: 108px;
  }

  input[type]:focus {
    border-color: #409eff;
  }

  button {
    width: 330px;
    height: 43px;
    margin: 20px 0 ;
    background-color: #3194d0;
    color: #fff;
    font-size: 18px;
    line-height: 43px;
    border-radius: 25px;
  }

  button:hover {
    background-color: #0f6fac;
  }

  span {
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
  }

  span:hover {
    color: #3194d0;
  }

  input.error {
    border-color: #f15555;
  }

  input.success {
    border-color: #55f189;
  }

  .user-slide-enter-active,
  .user-slide-leave-active {
    transition: all .3s;
  }

  .user-slide-enter,
  .user-slide-leave-to {
    transform: translateY(-15px);
    opacity: 0;
  }

  .pwd-slide-enter-active,
  .pwd-slide-leave-active {
    transition: all .2s;
  }

  .pwd-slide-enter,
  .pwd-slide-leave-to {
    transform: translateY(-15px);
    opacity: 0;
  }

</style>
