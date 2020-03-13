<template>
<div class="option-item" @click="click" :class="{current: isActive}">
  <div class="item-iconfont"><slot name="item-iconfont"></slot></div>
  <div><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
  name: 'OptionItem',
  props: {
    path: String
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path, 4) !== -1;
    }
  },
  methods: {
    click() {
      if(!this.isActive) {
        this.$router.push('/' + this.$store.state.id + this.path);
      }

    }
  }
}
</script>

<style scoped>
.option-item {
  padding: 15px 0;
  font-size: 14px;
  color: #6f7172;
  text-align: center;
}

.option-item:hover {
  color: #f1563b
}

.item-iconfont {
  margin-bottom: 5px;
}

.current {
  color: #f1563b;
}
</style>
