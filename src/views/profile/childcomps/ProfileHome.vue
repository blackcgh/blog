<template>
  <div class="profile-home">
    <h2>首页</h2>
    <!-- 图片区域 -->
    <div class="bgimg">
      <!-- 背景图 -->
      <img :src="$store.state.bgImg">
      <!-- 头像区域 -->
      <div class="avatar">
        <img :src="$store.state.avatar">
      </div>
      <!-- 信息区域 -->
      <div class="info">
        <ul>
          <li>
            <span>用户名：</span>{{$store.state.username}}
            <i @click="edit">修改资料</i>
            <i @click="go">个人空间</i>
          </li>
          <li>
            <span>我的签名：</span>
            <p>{{$store.state.sign}}</p>
          </li>
          <li>
            <span>性别：</span>{{$store.state.sex}}
          </li>
          <li>
            <span>出生日期：</span>{{$store.state.birthday}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileHome',
    methods: {
      // 前往我的信息视图
      edit() {
        this.$emit('goInfo')
      },
      // 前往个人主页
      go() {
        this.$router.push('/' + this.$store.state.id + '/homepage');
      }
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

  .bgimg {
    position: relative;
    height: 200px;
  }

  .bgimg>img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
    object-fit: cover;
  }

  .avatar {
    position: absolute;
    bottom: 15px;
    left: 15px;
    width: 80px;
    height: 80px;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .info {
    margin-top: 50px;
  }

  li {
    position: relative;
    margin-bottom: 20px;
    font-size: 14px;
  }

  span {
    display: inline-block;
    width: 95px;
    margin-right: 20px;
    color: #717171;
    text-align: right;
    vertical-align: top;
  }

  i {
    position: absolute;
    top: -3px;
    left: 160px;
    width: 70px;
    height: 22px;
    margin-right: 5px;
    border: 1px solid #ced3db;
    color: #6d757a;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    line-height: 24px;
    border-radius: 4px;
  }

  i:last-child {
    left: 250px;
  }

  i:last-child:after {
    content: '';
    display: inline-block;
    position: relative;
    top: -2px;
    margin-left: 3px;
    width: 5px;
    height: 5px;
    border-right: 1px solid #6d757a;
    border-bottom: 1px solid #6d757a;
    transform: rotate(-45deg);
  }

  i:hover {
    border-color: #00a1d6;
    color: #00a1d6 !important;
  }

  p {
    display: inline-block;
    width: 634px;
  }

</style>
