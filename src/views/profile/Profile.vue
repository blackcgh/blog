<template>
  <div id="profile" class="clearfix">
    <!-- 导航菜单 -->
    <div class="profile-aside">
      <h2>个人中心</h2>
      <ul>
        <li v-for="(item,index) of navList"
            :key="index"
            :class="{current: currentIndex==index}"
            @click="itemClick(index,item.view)">
            <!-- 菜单项 -->
          <h3 :class="{home:index==0}">{{item.name}}</h3>
        </li>
        <li class="person" @click="go">个人空间</li>
      </ul>
    </div>

    <!-- 视图组件 -->
    <component class="comp" :is="component" @goInfo="goInfo"></component>
  </div>
</template>

<script>
  import ProfileHome from './childcomps/ProfileHome'
  import ProfileInfo from './childcomps/ProfileInfo'
  import ProfileAvatar from './childcomps/ProfileAvatar'
  import ProfileBg from './childcomps/ProfileBg'
  import ProfileQn from './childcomps/ProfileQn'

  export default {
    name: 'Profile',
    data() {
      return {
        // 导航菜单
        navList: [
          {
            name: '首页',
            view: 'ProfileHome'
          },
          {
            name: '我的信息',
            view: 'ProfileInfo'
          },
          {
            name: '我的头像',
            view: 'ProfileAvatar'
          },
          {
            name: '我的背景',
            view: 'ProfileBg'
          },
          {
            name: '问题反馈',
            view: 'ProfileQn'
          }
        ],
        // 视图组件
        component: 'ProfileHome',
        // 当前视图
        currentIndex: 0
      }
    },
    watch: {
      '$route.params.name': function(val) {
        if(this.$route.params.name == 'home') {
          this.component = 'ProfileHome';
          this.currentIndex = 0
        }else if(this.$route.params.name == 'qustion') {
          this.component = 'ProfileQn';
          this.currentIndex = 4
        }
      }
    },
    components: {
      ProfileHome,
      ProfileInfo,
      ProfileAvatar,
      ProfileBg,
      ProfileQn
    },
    methods: {
      // 导航菜单点击事件
      itemClick(index, view) {
        this.currentIndex = index;
        this.component = view
      },
      // 监听子组件事件
      goInfo() {
        this.component = 'ProfileInfo';
        this.currentIndex = 1
      },
      // 前往个人主页
      go() {
        this.$router.push('/' + this.$store.state.id + '/homepage');
      }
    },
    created() {
      document.title = '个人中心 - blackblog';
      if(this.$route.params.name == 'avatar') {
        this.component = 'ProfileAvatar';
        this.currentIndex = 2
      } else if(this.$route.params.name == 'background') {
        this.component = 'ProfileBg';
        this.currentIndex = 3
      }else if(this.$route.params.name == 'qustion') {
        this.component = 'ProfileQn';
        this.currentIndex = 4
      }
    },
    mounted() {
      window.scrollTo(0, 0);
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #fff;
    border-radius: 5px;
  }

  .profile-aside {
    float: left;
    width: 201px;
    height: 100%;
  }

  h2 {
    text-indent: 1em;
    line-height: 50px;
    font-size: 18px;
    color: #99a2aa;
    border-bottom: 1px solid #e1e2e5;
  }

  li {
    height: 50px;
    padding: 0 30px;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }

  li:hover {
    background-color: #f4f5f7;
    color: #00a1d6;
  }

  li.current {
    background-color: #00a1d6;
    color: #fff;
  }

  .person {
    position: relative;
    border-top: 1px solid #e1e2e5;
    border-bottom: 1px solid #e1e2e5;
    font-size: 16px;
  }

  .person::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 8px;
    height: 8px;
    border-right: 2px solid #b5b6b8;
    border-bottom: 2px solid #b5b6b8;
    transform: rotate(-45deg);
  }

  .comp {
    float: right;
    width: 832px;
    height: 700px;
    padding: 15px 15px 15px 27px;
    border-left: 1px solid #eee;
    box-sizing: border-box;
  }

  .home {
    letter-spacing: 30px;
    text-indent: 30px;
  }
</style>
