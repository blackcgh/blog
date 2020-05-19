<template>
  <div class="column-label" @click.stop>
    <div :class="{active:show('technology')}" @click="go('technology')">
      <img src="~assets/img/column/technology.png" v-show="!show('technology')">
      <img src="~assets/img/column/technology-active.png" v-show="show('technology')">
      科技
    </div>
    <div :class="{active:show('life')}" @click="go('life')">
      <img src="~assets/img/column/life.png" v-show="!show('life')">
      <img src="~assets/img/column/life-active.png" v-show="show('life')">
      生活
    </div>
    <div :class="{active:show('interest')}" @click="go('interest')">
      <img src="~assets/img/column/interest.png" v-show="!show('interest')">
      <img src="~assets/img/column/interest-active.png" v-show="show('interest')">
      兴趣
    </div>
    <div :class="{active:show('animate')}" @click="go('animate')">
      <img src="~assets/img/column/animate.png" v-show="!show('animate')">
      <img src="~assets/img/column/animate-active.png" v-show="show('animate')">
      动画
    </div>
    <div :class="{active:show('game')}" @click="go('game')">
      <img src="~assets/img/column/game.png" v-show="!show('game')">
      <img src="~assets/img/column/game-active.png" v-show="show('game')">
      游戏
    </div>
    <div :class="{active:show('video')}" @click="go('video')">
      <img src="~assets/img/column/video.png" v-show="!show('video')">
      <img src="~assets/img/column/video-active.png" v-show="show('video')">
      影视
    </div>
    <div :class="{active:show('lightnovel')}" @click="go('lightnovel')">
      <img src="~assets/img/column/novel.png" v-show="!show('novel')">
      <img src="~assets/img/column/novel-active.png" v-show="show('novel')">
      轻小说
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ColumnLabel',
    computed: {
      show() {
        return function(path) {
          return this.$route.path.indexOf(path) != -1
        }
      }
    },
    methods: {
      go(path) {
        if (this.$route.path.indexOf(path) == -1) this.$router.push('/column/' + path);
      }
    }
  }

</script>

<style scoped>
  .column-label {
    position: absolute;
    top: 60px;
    left: -23px;
    width: 130px;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(100, 100, 100, .6);
    border-radius: 4px;
  }

  .column-label div {
    height: 40px;
    padding-left: 15px;
    font-size: 14px;
    color: #222;
    text-align: left;
    line-height: 40px;
  }

  .column-label div:hover {
    background-color: #eee;
    color: #00a1d6;
  }

  .column-label div.active {
    color: #00a1d6;
  }

  img {
    width: 20px;
    margin-right: 15px;
    vertical-align: middle;
  }

</style>
