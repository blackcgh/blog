<template>
  <div id="friend">
    <option-nav>
      <option-item>
        <template v-slot:item-iconfont>头像</template>
        <template v-slot:item-text>好友1</template>
      </option-item>
      <option-item>
        <template v-slot:item-iconfont>头像</template>
        <template v-slot:item-text>好友2</template>
      </option-item>
      <option-item>
        <template v-slot:item-iconfont>头像</template>
        <template v-slot:item-text>好友3</template>
      </option-item>
      <option-item>
        <template v-slot:item-iconfont>头像</template>
        <template v-slot:item-text>好友4</template>
      </option-item>
      <option-item>
        <template v-slot:item-iconfont>头像</template>
        <template v-slot:item-text>好友5</template>
      </option-item>
    </option-nav>
  </div>
</template>

<script>
  import OptionNav from 'components/common/option/OptionNav'
  import OptionItem from 'components/common/option/OptionItem'

  export default {
    name: 'Friend',
    components: {
      OptionNav,
      OptionItem
    }
  }

</script>

<style scoped>
  #friend {
    position: fixed;
    top: 60px;
    right: -80px;
    padding-top: 10px;
    background-color: #fff;
    transition: all .8s;
  }

</style>
