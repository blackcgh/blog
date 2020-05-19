<template>
  <div class="home-swiper">
    <swiper :elNum="headImgs.length">
      <swiper-item v-for="(item,index) of headImgs" :key="index" :headImg="item"></swiper-item>
    </swiper>
  </div>
</template>

<script>
  import Swiper from 'components/common/swiper/Swiper'
  import SwiperItem from 'components/common/swiper/SwiperItem'

  export default {
    name: 'HomeSwiper',
    props: {
      headImgs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .home-swiper {
    height: 235px;
    margin: 0 15px 20px;
  }

</style>
