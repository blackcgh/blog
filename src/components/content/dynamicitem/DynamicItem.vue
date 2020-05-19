<template>
  <div class="dynamic-item">
    <!-- 头像 -->
    <img :src="getAvatar(dynamic.avatar)" @click="goPerson" />
    <!-- 用户名、评论内容 -->
    <div class="dynamic-content">
      <p @click="goPerson">{{dynamic.author}}</p>
      <span>{{format}}</span>
      <!-- <div>{{dynamic}}</div> -->
    </div>
    <div class="dest">发表了博客</div>
    <!-- 相关博客 -->
    <div class="relative-blog">
      <recommend :item="dynamic" :showAuthor="false" :showTime="false"></recommend>
    </div>
  </div>
</template>

<script>
  import Recommend from 'components/content/maincontent/Recommend'

  import { formatTime } from 'common/utils'

  export default {
    name: 'DynamicItem',
    props: ['dynamic'],
    computed: {
      // 格式化时间
      format() {
        return formatTime(this.dynamic.createTime, true);
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    components: {
      Recommend
    },
    methods: {
      goPerson() {
        this.$router.push('/' + this.dynamic.uid + '/homepage')
      }
    }
  }

</script>

<style scoped>
  .dynamic-item {
    position: relative;
    padding: 15px;
    padding-left: 85px;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .dynamic-item:last-child {
    margin-bottom: 0;
  }

  img {
    position: absolute;
    top: 15px;
    left: 25px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  .dynamic-content p {
    padding: 5px 0 3px;
    font-size: 16px;
    color: #222;
    cursor: pointer;
  }

  .dynamic-content p:hover {
    color: #00a1d6;
  }

  .dynamic-content span {
    font-size: 12px;
    color: #99a2aa;
  }

  .dynamic-content div {
    padding: 18px 0;
    font-size: 14px;
  }

  .relative-blog {
    margin-top: 10px;
    padding: 8px 12px 0;
    background-color: #f4f5f7;
    border-radius: 4px;
  }

  .relative-blog .recommend {
    margin-bottom: 0;
    border-bottom: 0;
  }

  .dest {
    margin: 15px 0 5px;
    font-size: 14px;
    font-weight: 400;
  }

</style>
