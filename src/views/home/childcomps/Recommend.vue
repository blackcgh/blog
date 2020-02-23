<template>
<div id="recommend">
  <module-recommend>
    <template>热门文章</template>
    <template v-slot:content>
      <ul>
        <li>
          今天天气真好
        </li>
        <li>
          今天天气真好
        </li>
        <li>
          今天天气真好
        </li>
        <li>
          今天天气真好
        </li>
        <li>
          今天天气真好
        </li>
      </ul>
    </template>
  </module-recommend>
</div>

</template>

<script>
import ModuleRecommend from './ModuleRecommend'
export default {
  name: 'Recommend',
  components: {
    ModuleRecommend
  }
}
</script>

<style scoped>
#recommend {
  width: 280px;
  height: 100%;
  color: #58666e;
}

li {
  font-size: 14px;
  margin: 20px 0;
}
</style>
