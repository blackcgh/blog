<template>
<div class="option-item" @click="click">
  <div class="item-iconfont"  :class="{currenticon: isActive}"><slot name="item-iconfont"></slot></div>
  <div class="item-text" :class="{currenttext: isActive}"><slot name="item-text"></slot></div>
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
  width: 70px;
  height: 49px;
  padding: 15px 0;
  font-size: 14px;
  color: #6f7172;
  text-align: center;
}

.item-iconfont {
  margin-bottom: 5px;
  color: #00a1d6;
  transition: transform .3s;
  transform-origin: top center;
}

.option-item:hover .item-iconfont {
  color: #ff5c7c;
  transform: scale(1.5, 1.5);
}

.option-item:hover .item-text {
  display: none;
}

.currenticon {
  color: #ff5c7c;
  transform: scale(1.5, 1.5);
}

.currenttext {
  display: none;
}
</style>
