<template>
  <div class="main-nav-menu">
    <nav-menu>
      <nav-menu-item>
        <div><span class="iconfont">&#xe653;</span>个人中心</div>
      </nav-menu-item>
      <nav-menu-item>
        <div><span class="iconfont">&#xe63a;</span>新手引导</div>
      </nav-menu-item>
      <nav-menu-item>
        <div><span class="iconfont">&#xe68f;</span>问题反馈</div>
      </nav-menu-item>
      <nav-menu-item>
        <div @click="btnLogout"><span class="iconfont">&#xe61e;</span>退出</div>
      </nav-menu-item>
    </nav-menu>
  </div>
</template>

<script>
  import NavMenu from 'components/common/navmenu/NavMenu'
  import NavMenuItem from 'components/common/navmenu/NavMenuItem'

  import { logout } from 'network/user'

  export default {
    name: 'MainNavMenu',
    components: {
      NavMenu,
      NavMenuItem
    },
    methods: {
      btnLogout() {
        this.$load.show('sign out...');
        logout().then(result => {
          this.$load.hidden();
          if (result.errno === 0) {
            if(this.$route.path !== '/') {
              this.$router.replace('/');
            }
            this.$store.commit('show');
            this.$store.commit('login');
            this.$store.commit('updateId');

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
    top: 48px;
    left: 0;
    background-color: #fff;
    font-weight: normal;
    text-align: left;
  }

</style>
