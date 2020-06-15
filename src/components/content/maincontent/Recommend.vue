<template>
  <div class="recommend" @click="goDetail(item['_id'])">
    <!-- 图片 -->
    <div class="img"><img :src="getBlogImg(item.content)" alt=""></div>

    <!-- 博客标题 -->
    <h3>{{item.title}}</h3>

    <!-- 概述 -->
    <div class="abstract">
      <div class="content" v-html="item.content"></div>
      <!-- 提示 -->
      <div class="clue">
        <!-- 头像 -->
        <img :src="getAvatar(item.avatar)" v-if="showAuthor" />
        <!-- 作者 -->
        <span v-if="showAuthor">{{item.author}}</span>
        <!-- 分类 -->
        <i>{{item.category}}</i>
        <!-- 阅读数 -->
        <em class="iconfont">&#xe62f;</em><i>{{item.readNum}}</i>
        <!-- 点赞数 -->
        <em class="iconfont">&#xec43;</em><i>{{item.likeNum}}</i>
        <!-- 评论数 -->
        <em class="iconfont" v-if="showCom">&#xe66e;</em><i>{{getComNum(item)}}</i>
        <!-- 时间 -->
        <em class="iconfont" v-if="showTime">&#xe612;</em>
        <i class="last" v-if="showTime">{{format}}</i>
      </div>
    </div>

    <!-- 选项 -->
   <div class="option" v-if="showOption" @click.stop>
     <i class="iconfont" title="更多操作">&#xe6f8;</i>
     <slot></slot>
    </div>
  </div>
</template>

<script>
  import { formatTime, getBlogImg } from 'common/utils'

  export default {
    name: 'Recommend',
    props: {
      // 博客信息
      item: {
        type: Object,
        default () {
          return {}
        }
      },
      // 是否显示作者
      showAuthor: {
        type: Boolean,
        default: true
      },
      // 是否显示时间
      showTime: {
        type: Boolean,
        default: true
      },
      // 是否显示选项
      showOption: {
        type: Boolean,
        default: false
      },
      // 是否显示评论数
      showCom: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // 格式化时间
      format() {
        return formatTime(this.item.createTime);
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      },
      getBlogImg() {
        return getBlogImg
      },
      getComNum() {
        return function(item) {
          if(item.commentInfo) return item.commentInfo.length;
          return 0
        }
      }
    },
    methods: {
      // 前往博客详情页面
      goDetail(bid) {
        this.$router.push('/blog/' + bid);
      },
    }
  }

</script>

<style>
  .recommend {
    position: relative;
    height: 121px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 20px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .img {
    float: left;
    width: 140px;
    height: 100px;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 4px;
    transition: all .3s;
  }

  .img:hover {
    transform: scale(1.1, 1.1);
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .recommend h3 {
    float: left;
    width: calc(100% - 180px);
    height: 30px;
    font-size: 20px;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .recommend:hover h3 {
    color: #00a1d6;
  }

  .abstract {
    float: left;
    width: calc(100% - 180px);
    height: 90px;
  }

  .content  {
    height: 22px;
    font-size: 14px;
    line-height: 22px;
    color: #888;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .content p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .clue {
    height: 26px;
    margin-top: 22px;
    font-size: 12px;
    color: #9b9b9b;
    line-height: 24px;
  }

  .clue img {
    position: relative;
    top: -1px;
    width: 24px;
    height: 24px;
    margin-right: 5px;
    border-radius: 50%;
  }

  .clue span {
    padding-right: 25px;
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

  .clue i.last {
    margin-right: 0;
  }

  .option {
    position: relative;
    float: right;
    padding: 11px 0;
    cursor: pointer;
  }

  .option i {
    font-size: 18px;
    color: #999;
  }

  .option ul {
    display: none;
    position: absolute;
    top: 30px;
    right: -10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
    z-index: 1;
  }

  .option li {
    width: 60px;
    height: 45px;
    padding: 0 20px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #222;
  }

  .option:hover ul {
    display: block;
  }

  .option li:hover {
    background-color: #e5e9ef;
    color: #00a1d6;
  }

</style>
