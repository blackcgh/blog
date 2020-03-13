<template>
  <div class="recommend" @click="goDetail(item['_id'])">
    <h3>{{item.title}}</h3>
    <div class="abstract">
      <p>{{omit}}</p>
      <div class="clue">
        <span v-if="showAuthor">{{item.author}}</span>
        <i>{{item.category}}</i>
        <em class="iconfont">&#xe62f;</em><i>{{item.readNum}}</i>
        <em class="iconfont">&#xec43;</em><i>{{item.likeNum}}</i>
        <em class="iconfont">&#xe66e;</em><i>{{item.commentInfo.length}}</i>
        <em class="iconfont">&#xe612;</em><i>{{format}}</i>
      </div>
    </div>
    <div class="img"><img src="" alt=""></div>
    <slot></slot>
  </div>
</template>

<script>
  import { omitCount, formatTime } from 'common/utils'

  export default {
    name: 'Recommend',
    props: {
      item: {
        type: Object,
        default () {
          return {}
        }
      },
      showAuthor: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      omit() {
        return omitCount(this.item.content);
      },
      format() {
        return formatTime(this.item.createTime);
      }
    },
    methods: {
      goDetail(bid) {
        this.$router.push({
          path: '/blog/' + bid,
          query: { blog: this.item }
        });
      },
    }
  }

</script>

<style scoped>
  .recommend {
    position: relative;
    height: 161px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .recommend:hover {
    cursor: pointer;
  }

  .recommend h3 {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: 400;
  }

  .recommend:hover h3 {
    color: #00a1d6;
  }

  .img,
  .abstract {
    float: left;
    height: 109px;
  }

  .img {
    width: 150px;
    margin-left: 20px;
    background-color: red;
    overflow: hidden;
    transition: all .3s;
  }

  .img:hover {
    transform: scale(1.1, 1.1);
  }

  .img img {
    width: 100%;
    height: 100%;
  }

  .abstract {
    width: 540px;
  }

  .abstract p {
    height: 84px;
    overflow: hidden;
    font-size: 14px;
    text-indent: 2em;
    color: #888;
    line-height: 20px;
  }

  .clue {
    height: 25px;
    font-size: 12px;
    color: #9b9b9b;
    line-height: 24px;
  }

  .clue span {
    margin-right: 20px;
  }

  .clue span::before {
    content: '';
    display: inline-block;
    position: relative;
    top: -3px;
    left: 0;
    width: 24px;
    height: 24px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: purple;
    vertical-align: middle;
  }

  .clue em {
    position: relative;
    top: 2px;
    left: 0;
    padding-right: 3px;
    font-size: 18px;
    font-weight: 400;
  }

  .clue em:first-of-type {
    position: relative;
    top: 3px;
    left: 0;
    font-size: 20px;
  }

  .clue i {
    margin-right: 25px;
  }

</style>
