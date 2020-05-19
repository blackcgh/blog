<template>
  <div class="swiper-item" @click="goDetail">
    <img :src="headImg.headImg" alt="">
    <h2>{{headImg.title}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'SwiperItem',
    props: ['headImg'],
    methods: {
      // 前往博客详情页面
      goDetail() {
        this.$router.push('/blog/' + this.headImg['_id']);
      }
    }
  }
</script>

<style scoped>
  .swiper-item {
    position: relative;
    flex: 1;
    height: 100%;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
  }

  h2 {
    position: absolute;
    bottom: 10px;
    left: 25px;
    font-size: 18px;
    color: #fff;
  }

</style>
