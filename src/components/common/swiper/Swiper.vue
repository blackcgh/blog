<template>
  <div class="swiper" ref="swiper" @mouseover="mouseover" @mouseout="mouseout">
    <!-- 图片列表 -->
    <div class="swiper-content" ref="swiperCon" @transitionend="transitionEnd">
      <slot></slot>
    </div>

    <!-- 圆圈 -->
    <ul>
      <li v-for="(item,index) of elNum-1" :key="index" @click="circleClick(index)">
        <img src="~assets/img/circle.png" alt="" v-show="circle==index">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Swiper',
    data() {
      return {
        swiperWidth: 0, // 轮播图宽度
        timer: null,    // 定时器
        image: 0,       // 图片标识
        circle: 0,      // 圆圈标识
      }
    },
    props: ['elNum'],
    methods: {
      // 鼠标经过轮播图，停止定时器
      mouseover() {
        clearInterval(this.timer)
      },
      // 鼠标离开轮播图，开启定时器
      mouseout() {
        this.startTimer()
      },
      // 点击圆圈
      circleClick(index) {
        this.image = index;
        this.circle = index;
        const distance = -index * this.swiperWidth;
        this.$refs.swiperCon.style.transition = 'all .3s';
        this.$refs.swiperCon.style.transform = 'translateX(' + distance + 'px)'
      },
      // 轮播图过渡完成事件
      transitionEnd() {
        if(this.image == this.elNum - 1) {
          this.image = 0;
          this.$refs.swiperCon.style.transition = 'none';
          this.$refs.swiperCon.style.transform = 'translateX(0)'
        }
      },
      // 启动定时器
      startTimer() {
        this.timer = setInterval(() => {
          ++this.circle;
          if(this.circle == this.elNum - 1) this.circle = 0;
          const distance = -(++this.image) * this.swiperWidth;
          this.$refs.swiperCon.style.transition = 'all .3s';
          this.$refs.swiperCon.style.transform = 'translateX(' + distance + 'px)'
        }, 3500);
      }
    },
    mounted() {
      this.swiperWidth = this.$refs.swiper.offsetWidth;
      this.$refs.swiperCon.style.width = this.elNum * this.swiperWidth + 'px';
      this.startTimer()
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  .swiper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
  }

  .swiper-content {
    display: flex;
    height: 100%;
    transition: all .3s;
  }

  ul {
    position: absolute;
    bottom: 10px;
    right: 25px;
    height: 10px;
  }

  li {
    position: relative;
    float: left;
    width: 8px;
    height: 8px;
    margin-left: 13px;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
  }

  li:hover {
    background-color: #00a1d6;
  }

  li img {
    position: absolute;
    top: -6px;
    left: -6px;
  }

</style>
