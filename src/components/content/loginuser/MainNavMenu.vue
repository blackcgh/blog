<template>
  <div class="main-nav-menu" @click.stop>
    <!-- 用户名 -->
    <h2>{{$store.state.username}}</h2>

    <!-- 选项 -->
    <div class="user-option">
      <div @click="goFollow">
        <p>关注</p>
        <b>{{getFollow}}</b>
      </div>
      <div @click="goFan">
        <p>粉丝</p>
        <b>{{$store.state.fan.length}}</b>
      </div>
      <div @click="goDynamic">
        <p>动态</p>
        <b>{{$store.state.dynamic}}</b>
      </div>
    </div>

    <!-- 功能 -->
    <ul>
      <!-- 个人中心 -->
      <li @click.stop="goProfile">
        <span class="iconfont">&#xe653;</span>
        个人中心
      </li>
      <!-- 主题 -->
      <!-- <li class="topic"> -->
        <!-- <span class="iconfont">&#xe63a;</span>
        主题
        <ol class="topic">
          <li class="topic-color">主题颜色</li>
          <li class="bg" v-for="(item,index) of bgcList" :key="index">
            {{item}}
          </li>
          <li class="night" @click="selectNight">
            夜间模式
            <!-- 选中图标 -->
            <i :class="{selected:selected}"></i>
          <!-- </li>
        </ol> -->
      <!-- </li> -->
      <!-- 问题反馈 -->
      <li @click.stop="goQustion">
        <span class="iconfont">&#xe68f;</span>
        问题反馈
      </li>
      <!-- 退出 -->
      <li @click.stop="btnLogout">
        <span class="iconfont">&#xe61e;</span>
        退出
      </li>
    </ul>
  </div>
</template>

<script>
  import { logout } from 'network/user'

  export default {
    name: 'MainNavMenu',
    data() {
      return {
        // 背景颜色列表
        bgcList: ['蓝色', '粉色'],
        // 是否选中夜间模式
        selected: false
      }
    },
    computed: {
      getFollow() {
        let n = 0;
        for(let i of this.$store.state.follow) {
          n += i.group.length
        }
        return n
      }
    },
    methods: {
      // 前往关注页面
      goFollow() {
        if(this.$route.path.indexOf(this.$store.state.id + '/follow') == -1) {
          this.$router.push('/' + this.$store.state.id + '/follow');
        }
      },
      // 前往粉丝页面
      goFan() {
        if(this.$route.path.indexOf(this.$store.state.id + '/fan') == -1) {
          this.$router.push('/' + this.$store.state.id + '/fan');
        }
      },
      // 前往动态页面
      goDynamic() {
        if(this.$route.path.indexOf(this.$store.state.id + '/dynamic') == -1) {
          this.$router.push('/' + this.$store.state.id + '/dynamic');
        }
      },
      // 前往个人中心页面
      goProfile() {
        if (this.$route.path.indexOf('/profile/home') == -1) {
          this.$router.push('/profile/home')
        }
      },
      // 选择夜间模式
      selectNight() {
        this.selected = !this.selected
      },
      // 前往问题反馈视图
      goQustion() {
        if (this.$route.path.indexOf('qustion') == -1) {
          this.$router.push('/profile/qustion')
        }
      },
      // 退出
      btnLogout() {
        this.$load.show('sign out...');
        logout().then(result => {
          if (this.$route.path == '/') {
            this.$router.go(0)
          } else {
            this.$router.replace('/')
            // this.$load.hidden()
          }
          if (result.errno === 0) {
            this.$store.commit('logout');
            this.$tip.show('#f0f9eb', '退出成功', 0, '#91c287');
          } else if (result.errno === -1) {
            this.$tip.show('#fef0f0', '退出失败', 3, '#f56c6c');
          } else {
            this.$tip.show('#fef0f0', '退出发生错误', 3, '#f56c6c');
          }
        })
      }
    }
  }

</script>

<style scoped>
  .main-nav-menu {
    position: absolute;
    display: none;
    top: 60px;
    left: -93px;
    width: 270px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(100, 100, 100, .6);
    border-radius: 4px;
  }

  h2 {
    padding: 35px 0 10px;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    color: #000;
    font-weight: 700;
    cursor: default;
  }

  .user-option {
    display: flex;
    width: 100%;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    text-align: center;
  }

  .user-option div {
    padding: 8px 0;
    flex: 1;
    height: 50px;
    line-height: 16px;
  }

  .user-option p {
    font-size: 12px;
    line-height: 30px;
    color: #999;
  }

  .user-option b {
    font-size: 16px;
    color: #222;
  }

  .user-option div:hover p,
  .user-option div:hover b
  {
    color: #00a1d6;
  }

  ul>li {
    position: relative;
    height: 50px;
    padding-left: 15px;
    color: #222;
    text-align: left;
    line-height: 50px;
    font-size: 14px;
  }

  ul>li:hover {
    background-color: rgb(246, 245, 245);
  }

  li span {
    font-size: 16px;
    color: #ccc;
  }

  ol {
    display: none;
    position: absolute;
    top: 0;
    left: -100px;
    width: 100px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(100, 100, 100, .6);
  }

  .topic:hover ol {
    display: block;
  }

  ol li {
    position: relative;
    height: 35px;
    padding-left: 25px;
    font-size: 13px;
    line-height: 35px;
    color: #6f7172;
  }

  ol li:hover {
    background-color: #f0f2f3;
  }

  li.topic-color {
    height: 20px;
    padding: 3px 0;
    border-bottom: 1px solid #eee;
    line-height: 20px;
    font-size: 12px;
    color: #999;
  }

  .night {
    border-top: 1px solid #eee;
  }

  .night i {
    display: none;
    position: absolute;
    top: 16px;
    left: 8px;
    width: 10px;
    height: 5px;
    border-left: 1px solid #00a1d6;
    border-bottom: 1px solid #00a1d6;
    transform: rotate(-30deg);
  }

  i.selected {
    display: inline;
  }

</style>
