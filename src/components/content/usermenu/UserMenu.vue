<template>
<div id="menu">
  <option-nav>
    <option-item>
      <template v-slot:item-iconfont>头像</template>
      <template v-slot:item-text>昵称</template>
    </option-item>
    <option-item>
      <template v-slot:item-iconfont>图标</template>
      <template v-slot:item-text>我的主页</template>
    </option-item>
    <option-item>
      <template v-slot:item-iconfont>图标</template>
      <template v-slot:item-text>文章</template>
    </option-item>
    <option-item>
      <template v-slot:item-iconfont>图标</template>
      <template v-slot:item-text>主题</template>
    </option-item>
    <option-item>
      <template v-slot:item-iconfont>图标</template>
      <template v-slot:item-text>关注</template>
    </option-item>
    <option-item>
      <template v-slot:item-iconfont>图标</template>
      <template v-slot:item-text>留言板</template>
    </option-item>
    <option-item>
      <template v-slot:item-iconfont>图标</template>
      <template v-slot:item-text>设置</template>
    </option-item>
    <option-item>
      <template v-slot:item-iconfont>图标</template>
      <template v-slot:item-text>退出</template>
    </option-item>
  </option-nav>
</div>
</template>

<script>
import OptionNav from 'components/common/option/OptionNav'
import OptionItem from 'components/common/option/OptionItem'
export default {
  name: 'UserMenu',
  components: {
    OptionNav,
    OptionItem
  }
}
</script>

<style scoped>
#menu {
  position: fixed;
  top: 60px;
  left: 0;
}
</style>
