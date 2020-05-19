<template>
  <div class="dynamic-aside">
    <!-- 用户区域 -->
    <aside-content :show="false">
      <template v-slot:content>
        <!-- 登录状态 -->
        <div v-if="show">
          <div class="bg">
            <img :src="$store.state.bgImg">
            <div class="user">
              <img :src="$store.state.avatar" @click="goHomepage">
              <span @click="goHomepage">{{$store.state.username}}</span>
            </div>
          </div>
          <div class="sign">
            <b v-if="$store.state.sign.length">个性签名：</b>{{$store.state.sign}}
          </div>
          <div class="option">
            <ul>
              <li @click="goFollow">
                <p>{{getFollow}}</p>
                <p>关注</p>
              </li>
              <li @click="goFan">
                <p>{{getFan}}</p>
                <p>粉丝</p>
              </li>
              <li @click="goMyDynamic">
                <p>{{dynamicNum}}</p>
                <p>动态</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 未登录状态 -->
        <div v-else class="none">
          <h2>属于你的新世界</h2>
          <h4>赶快探索登录吧！</h4>
          <span @click="register">注册</span>
          <span @click="login">登录</span>
        </div>
      </template>
    </aside-content>

    <!-- 公告栏 -->
    <aside-content v-if="show">
      我的公告
      <template v-slot:content>
        <p>{{$store.state.notice}}</p>
      </template>
    </aside-content>
  </div>
</template>

<script>
  import AsideContent from 'components/content/asidecontent/AsideContent'

  export default {
    name: 'DynamicAside',
    props: ['dynamicNum'],
    computed: {
      show() {
        return this.$store.state.id.length > 0
      },
      getFollow() {
        let n = 0;
        for (let i of this.$store.state.follow) {
          n += i.group.length
        }
        return n
      },
      getFan() {
        return this.$store.state.fan.length
      }
    },
    components: {
      AsideContent
    },
    methods: {
      // 注册
      register() {
        this.$store.commit('show', 'Register')
      },
      // 登录
      login() {
        this.$store.commit('show', 'Login')
      },
      // 前往个人主页
      goHomepage() {
        this.go('/homepage', 0)
      },
      // 前往关注页面
      goFollow() {
        this.go('/follow')
      },
      // 前往粉丝页面
      goFan() {
        this.go('/fan')
      },
      // 前往我的动态页面
      goMyDynamic() {
        this.go('/dynamic')
      },
      go(path) {
        this.$router.push('/' + this.$store.state.id + path);
      }
    }
  }

</script>

<style scoped>
  .dynamic-aside {
    float: right;
    width: 267px;
    font-size: 14px;
    color: #6d757a;
  }

  .bg {
    position: absolute;
    top: -15px;
    left: -15px;
    width: 267px;
    height: 70px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user {
    position: absolute;
    bottom: -36px;
    left: 15px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    cursor: pointer;
  }

  .bg span {
    position: absolute;
    top: 30px;
    left: 64px;
    font-size: 16px;
    color: #222;
    white-space: nowrap;
  }

  .user img {
    border-radius: 50%;
  }

  .user:hover span {
    color: #00a1d6;
  }

  .sign {
    padding: 110px 0 20px;
    font-size: 14px;
    line-height: 22px;
    color: #222;
  }

  .sign b {
    color: #48576a;
  }


  ul {
    width: 192px;
    overflow: hidden;
    margin: 0 auto;
  }

  li {
    float: left;
    width: 64px;
    font-size: 12px;
    color: #99a2aa;
  }

  li p {
    font-weight: 700;
    text-align: center;
  }

  li p:first-child {
    font-size: 14px;
    color: #00a1d6;
  }

  li p:last-child {
    margin-top: 10px;
  }

  li:hover {
    color: #00a1d6;
  }

  .none h2 {
    font-size: 18px;
    color: #222;
    text-align: center;
  }

  .none h4 {
    margin: 5px 0 20px;
    color: #a1a9b1;
    font-size: 13px;
    text-align: center;
  }

  .none span {
    display: inline-block;
    width: 110px;
    border: 1px solid #00a1d6;
    background-color: #fff;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
  }

  .none span:last-child {
    margin-left: 5px;
    background-color: #00a1d6;
    color: #fff;
  }

</style>
