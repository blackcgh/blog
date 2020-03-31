<template>
  <div id="homepage">
    <!-- 图片区域 -->
    <div class="bgimg">
      <!-- 背景图 -->
      <!-- <img src="" alt="背景图"> -->
      <!-- 头像 -->
      <div class="hp-avatar">
        <!-- <img src="" alt="我的头像"> -->
        <div></div>
        <span>用户名</span>
        <!-- 个性签名 -->
        <p></p>
      </div>
    </div>

    <!-- 功能按钮区域 -->
    <div class="fn">
      <ul @click="changeView">
        <li v-for="(item,index) of fn"
            :key="index"
            @mouseenter="enter(index)"
            @mouseleave="leave"
            @click="itemClick(index)"
            :class="{current:nth===index}"
            :data-view="item.view">{{item.name}}
        </li>
      </ul>
      <!-- 底线 -->
      <div class="underline">
        <div ref="underline"></div>
      </div>
    </div>

    <!-- 显示区域 -->
    <component :is="currentView"></component>
  </div>
</template>

<script>
  import UserPage from './childcomps/UserPage'
  import UserDynamic from './childcomps/UserDynamic'
  import UserBlog from './childcomps/UserBlog'
  import UserMessage from './childcomps/UserMessage'
  import UserFollow from './childcomps/UserFollow'
  import UserFan from './childcomps/UserFan'
  import UserStar from './childcomps/UserStar'
  import UserSetting from './childcomps/UserSetting'
  export default {
    name: 'Homepage',
    data() {
      return {
        // 组件
        currentView: 'UserPage',
        // 功能
        fn: [{
            name: '主页',
            view: 'UserPage'
          },
          {
            name: '动态',
            view: 'UserDynamic'
          },
          {
            name: '博客',
            view: 'UserBlog'
          },
          {
            name: '留言',
            view: 'UserMessage'
          },
          {
            name: '',
            view: '' // 没意义
          },
          {
            name: '关注',
            view: 'UserFollow'
          },
          {
            name: '粉丝',
            view: 'UserFan'
          },
          {
            name: '收藏',
            view: 'UserStar'
          },
          {
            name: '设置',
            view: 'UserSetting'
          }
        ],
        // 移动位置
        nth: 0
      }
    },
    components: {
      UserPage,
      UserDynamic,
      UserBlog,
      UserMessage,
      UserFollow,
      UserFan,
      UserStar,
      UserSetting
    },
    methods: {
      // 进入
      enter(index) {
        const distance = 21 + index * 110 + 20;
        this.$refs.underline.style.marginLeft = distance + 'px';
      },
      // 离开
      leave() {
        const initial = 21 + this.nth * 110 + 20;
        this.$refs.underline.style.marginLeft = initial + 'px';
      },
      // 点击
      itemClick(index) {
        this.nth = index;
      },
      // 点击功能切换页面
      changeView(e) {
        const view = e.target.getAttribute('data-view');
        this.currentView = view
      }
    }
  }

</script>

<style scoped>
  #homepage {
    height: 1000px;
  }

  .bgimg {
    position: relative;
    width: 100%;
    height: 350px;
    background-color: pink;
  }

  .bgimg>img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
  }

  .hp-avatar {
    position: absolute;
    bottom: -71px;
    left: 50%;
    width: 145px;
    height: 192px;
    text-align: center;
    transform: translateX(-50%);
    z-index: 1;
  }

  .hp-avatar div {
    width: 145px;
    height: 145px;
    margin-bottom: 10px;
    background-color: skyblue;
    border-radius: 50%;
  }

  .hp-avatar span {
    font-size: 20px;
    font-weight: 700px;
  }

  .fn {
    position: relative;
    height: 70px;
    margin-bottom: 15px;
    overflow: hidden;
    border-radius: 0 0 10px 5px;
  }

  ul {
    display: flex;
    height: 50px;
    padding: 17px 21px 0 22px;
    background-color: #fff;
    text-align: center;
    line-height: 60px;
  }

  li {
    flex: 1;
    color: #888da8;
  }

  li:hover {
    color: #00a1d6;
  }

  .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }

  .underline div {
    width: 70px;
    height: 3px;
    margin-left: 41px;
    background-color: #00a1d6;
    transition: margin .2s;
  }

  .current {
    color: #00a1d6;
  }

</style>
