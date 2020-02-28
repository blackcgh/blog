<template>
  <div class="c-nav-menu">
    <nav-menu>
      <nav-menu-item>
        <span class="iconfont">&#xe625;</span>生活
      </nav-menu-item>
      <nav-menu-item>
        <span class="iconfont">&#xe61f;</span>学习
      </nav-menu-item>
      <nav-menu-item>
        <span class="iconfont">&#xe70b;</span>代码
      </nav-menu-item>
    </nav-menu>
  </div>
</template>

<script>
  import NavMenu from 'components/common/navmenu/NavMenu'
  import NavMenuItem from 'components/common/navmenu/NavMenuItem'

  export default {
    name: 'CNavMenu',
    components: {
      NavMenu,
      NavMenuItem
    }
  }

</script>

<style scoped>
  .c-nav-menu {
    position: absolute;
    display: none;
    top: 60px;
    left: -33px;
    background-color: #fff;
  }

</style>
