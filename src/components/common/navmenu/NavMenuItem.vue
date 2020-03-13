<template>
  <div class="nav-menu-item" @click="go">
    <slot></slot>
  </div>
</template>

<script>
  import { logout } from 'network/user'

  export default {
    name: 'NavMenuItem',
    props: {
      path: {
        type: String,
        default: '/'
      },
      network: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      go() {
        if(this.network) {
          logout().then(result => {
            if(result.errno === 0) {
              this.$router.replace('/');
              this.$store.commit('show');
              this.$store.commit('login');
              this.$store.commit('saveId');
            } else if(result.errno === -1) {
              alert('退出失败')
            } else {
              alert('其他错误')
            }
          })
        }
      }
    }
  }

</script>

<style scoped>
  .nav-menu-item {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    font-size: 14px;
    color: #6f7172;
  }

  .nav-menu-item:hover {
    background-color: #f0f2f3;
  }

  .nav-menu-item span {
    position: relative;
    top: 2px;
    margin-right: 10px;
    font-size: 20px;
  }

</style>
