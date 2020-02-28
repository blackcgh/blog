<template>
  <div class="tab-bar-item fl" @click="click">
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
        if (this.$route.path === '/') {
          let path = '/home';
          return this.path.indexOf(path) !== -1;
        }
        return this.path.indexOf(this.$route.path) !== -1;
      }
    },
    methods: {
      click() {
        if (!this.isActive) {
          this.$router.push(this.path)
        }

      }
    }
  }

</script>

<style scoped>
  .tab-bar-item {
    position: relative;
    color: #fff;
    cursor: pointer;
  }

  .function {
    padding: 0 25px;
  }

  .tab-bar-item:hover .function {
    color: #f1563b;
    /* background-color: #ecf1f5; */
  }

  .current {
    color: #f1563b;
  }

</style>
