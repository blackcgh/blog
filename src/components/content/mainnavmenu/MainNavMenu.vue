<template>
<div class="main-nav-menu">
  <nav-menu>
    <nav-menu-item>
      图标 生活
    </nav-menu-item>
    <nav-menu-item>
      图标 学习
    </nav-menu-item>
    <nav-menu-item>
      图标 代码
    </nav-menu-item>
  </nav-menu>
</div>
</template>

<script>
import NavMenu from 'components/common/navmenu/NavMenu'
import NavMenuItem from 'components/common/navmenu/NavMenuItem'

export default {
  name: 'MainNavMenu',
  components: {
    NavMenu,
    NavMenuItem
  }
}
</script>

<style scoped>
.main-nav-menu {
  position: absolute;
  display: none;
  top: 60px;
  left: 0;
  background-color: #fff;
}
</style>
