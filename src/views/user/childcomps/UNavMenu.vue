<template>
  <div class="u-nav-menu">
    <nav-menu>
      <nav-menu-item>
        <span class="iconfont">&#xe653;</span>个人中心
      </nav-menu-item>
      <nav-menu-item>
        <span class="iconfont">&#xe63a;</span>新手引导
      </nav-menu-item>
      <nav-menu-item>
        <span class="iconfont">&#xe68f;</span>问题反馈
      </nav-menu-item>
      <nav-menu-item>
        <span class="iconfont">&#xe61e;</span>退出
      </nav-menu-item>
    </nav-menu>
  </div>
</template>

<script>
  import NavMenu from 'components/common/navmenu/NavMenu'
  import NavMenuItem from 'components/common/navmenu/NavMenuItem'

  export default {
    name: 'UNavMenu',
    components: {
      NavMenu,
      NavMenuItem
    }
  }

</script>

<style scoped>
  .u-nav-menu {
    position: absolute;
    display: none;
    top: 48px;
    left: 0;
    background-color: #fff;
    font-weight: normal;
    text-align: left;
  }

</style>
