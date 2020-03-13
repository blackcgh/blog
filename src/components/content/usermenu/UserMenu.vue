<template>
<div id="user-menu">
  <option-nav>
    <option-item path="/profile">
      <template v-slot:item-iconfont><span class="iconfont">&#xe607;</span></template>
      <template v-slot:item-text>我的主页</template>
    </option-item>
    <option-item path="/blog">
      <template v-slot:item-iconfont><span class="iconfont">&#xe62e;</span></template>
      <template v-slot:item-text>博客</template>
    </option-item>
    <option-item path="/follow">
      <template v-slot:item-iconfont><span class="iconfont">&#xe680;</span></template>
      <template v-slot:item-text>关注</template>
    </option-item>
    <option-item path="/star">
      <template v-slot:item-iconfont><span class="iconfont">&#xe603;</span></template>
      <template v-slot:item-text>收藏</template>
    </option-item>
    <option-item path="/message">
      <template v-slot:item-iconfont><span class="iconfont">&#xe69d;</span></template>
      <template v-slot:item-text>留言板</template>
    </option-item>
    <option-item path="/block">
      <template v-slot:item-iconfont><span class="iconfont">&#xe611;</span></template>
      <template v-slot:item-text>黑名单</template>
    </option-item>
    <option-item path="/setting">
      <template v-slot:item-iconfont><span class="iconfont">&#xe627;</span></template>
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
