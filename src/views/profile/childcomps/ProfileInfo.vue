<template>
  <div class="profile-info">
    <h2>我的信息</h2>
    <ul>
      <li>
        <label>用户名：</label>
        <input type="text" placeholder="你的用户名" v-model="userInfo.username">
      </li>
      <li>
        <label>我的签名：</label>
        <textarea placeholder="设置您的签名- ( ゜- ゜)つロ" v-model="userInfo.sign"></textarea>
      </li>
      <li>
        <label>性别：</label>
        <span v-for="(item,index) of sex"
              :key="index"
              :class="{current: currentIndex==index}"
              @click="changeSex(index)">
          {{item}}
        </span>
      </li>
      <li class="last">
        <label>出生日期：</label>
        <input type="date" v-model="userInfo.birthday" />
        <em>{{date}}</em>
        <i class="iconfont icon-rili" v-show="date.length<5"></i>
      </li>
    </ul>
    <div class="save" @click="save">保存</div>
  </div>
</template>

<script>
  import { saveUserInfo } from 'network/user'

  export default {
    name: 'ProfileInfo',
    data() {
      return {
        userInfo: {
          uid: this.$store.state.id,
          username: this.$store.state.username,
          sign: this.$store.state.sign,
          sex: this.$store.state.sex,
          birthday: this.$store.state.birthday
        },
        sex: ['男', '女', '保密'],
        currentIndex: 2,
        date: '选择日期'
      }
    },
    watch: {
      'userInfo.birthday': function(val) {
        if(val == '') {
          this.date = '选择日期'
        } else {
          this.date = this.userInfo.birthday
        }

      }
    },
    methods: {
      // 修改性别
      changeSex(index) {
        this.currentIndex = index;
        this.userInfo.sex = this.sex[index]
      },
      // 保存用户信息
      save() {
        saveUserInfo(this.userInfo).then(res => {
            if (res.errno == 0) {
              this.$store.commit('saveUserInfo', this.userInfo);
              this.$tip.show('#f0f9eb', '保存成功', 0, '#91c287')
            } else if (res.errno == -1) {
              this.$tip.show('#fef0f0', '该名称已被使用', 3, '#f56c6c')
            }
          })

      }
    },
    created() {
      this.currentIndex = this.sex.indexOf(this.userInfo.sex);
      if(this.$store.state.birthday != '') this.date = this.$store.state.birthday
    }
  }

</script>

<style scoped>
  h2 {
    padding: 2px 0 2px 8px;
    margin-bottom: 20px;
    border-left: 4px solid #00a1d6;
    color: #00a1d6;
  }

  li {
    margin-bottom: 20px;
    font-size: 14px;
  }

  li.last {
    position: relative;
    border-bottom: 1px solid #e5e9ef;
    padding-bottom: 20px;
    margin-bottom: 40px;
    color: #b7b7b7;
  }

  label {
    display: inline-block;
    width: 95px;
    margin-right: 20px;
    color: #717171;
    text-align: right;
  }

  input[type=text] {
    width: 225px;
    height: 30px;
    margin-right: 40px;
    padding: 3px 10px;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=text]:hover {
    border-color: #8391a5;
  }

  input[type=text]:focus {
    border-color: #8391a5;
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
    border-color: #8391a5;
  }

  textarea:focus {
    border-color: #8391a5;
  }

  span {
    display: inline-block;
    margin-right: 20px;
    padding: 5px 8px;
    border: 1px solid #bfcbd9;
    background: #f4f4f4;
    color: #717171;
    border-radius: 5px;
    cursor: pointer;
  }

  span.current {
    border-color: #00a1d6;
    background-color: #00a1d6;
    color: #fff;
  }

  input[type=date] {
    position: relative;
    width: 193px;
    height: 30px;
    padding: 3px 35px 3px 10px;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=date]:hover {
    border-color: #8391a5;
  }

  /* 文字显示区域 */
  input[type=date]::-webkit-datetime-edit-fields-wrapper {
    display: none;
  }

  /* 去掉上下小三角 */
  input[type=date]::-webkit-inner-spin-button {
    visibility: hidden;
  }

  /* 叉叉 */
  input[type=date]::-webkit-clear-button {
    position: absolute;
    top: 7px;
    right: 10px;
    font-size: 20px;
    z-index: 2;
  }

  /* 下拉按钮 */
  input[type=date]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: text;
    opacity: 0;
    z-index: 1;
  }

  em {
    position: absolute;
    top: 7px;
    left: 125px;
    cursor: default;
  }

  i {
    position: absolute;
    top: 5px;
    left: 280px;
    font-size: 20px;
  }

  .save {
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

  .save:hover {
    background-color: #03b8f5;
  }

</style>
