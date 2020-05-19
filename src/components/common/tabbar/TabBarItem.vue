<template>
  <div class="tab-bar-item fl" @click="itemClick">
    <div class="function" :class="{current: isActive}">
      <slot name="function"></slot>
    </div>
    <slot name="spread"></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: {
        type: String,
      }
    },
    computed: {
      isActive() {
        if(this.path == '/column' && this.$route.path.indexOf('column') != -1) return true
        return this.path == this.$route.path;
      }
    },
    methods: {
      itemClick() {
        if (!this.isActive) {
          if(this.path != '/column') this.$router.push(this.path)
        }
      }
    }
  }

</script>

<style scoped>
  .tab-bar-item {
    position: relative;
    width: 85px;
    height: 60px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

  .tab-bar-item:hover .function {
    color: #00a1d6;
  }

  .current {
    color: #00a1d6;
  }

</style>
