<template>
<div id="user-menu">
  <option-nav>
    <option-item path="/homepage">
      <template v-slot:item-iconfont><span class="iconfont">&#xe618;</span></template>
      <template v-slot:item-text>我的主页</template>
    </option-item>
    <option-item path="/blog">
      <template v-slot:item-iconfont><span class="iconfont">&#xe605;</span></template>
      <template v-slot:item-text>博客</template>
    </option-item>
    <option-item path="/follow">
      <template v-slot:item-iconfont><span class="iconfont">&#xe7dd;</span></template>
      <template v-slot:item-text>关注</template>
    </option-item>
    <option-item path="/star">
      <template v-slot:item-iconfont><span class="iconfont">&#xe615;</span></template>
      <template v-slot:item-text>收藏</template>
    </option-item>
    <option-item path="/message">
      <template v-slot:item-iconfont><span class="iconfont">&#xe637;</span></template>
      <template v-slot:item-text>留言板</template>
    </option-item>
    <option-item path="/block">
      <template v-slot:item-iconfont><span class="iconfont">&#xe616;</span></template>
      <template v-slot:item-text>黑名单</template>
    </option-item>
    <option-item path="/set">
      <template v-slot:item-iconfont><span class="iconfont">&#xe9a7;</span></template>
      <template v-slot:item-text>设置</template>
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
#user-menu {
  position: fixed;
  top: 60px;
  left: -80px;
  background-color: #fff;
  transition: all .8s;
}
</style>
