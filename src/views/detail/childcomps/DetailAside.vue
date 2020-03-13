<template>
  <div class="detail-aside">
    <div class="host clearfix">
      <img src="" alt="" title="看一下TA">
      <h3>{{blog.author}}</h3>
      <div class="info">
        粉丝：<span>7</span>
        阅读：<span>{{readCount}}</span>
      </div>
      <div class="follow-btn">关注</div>
    </div>
    <div class="blog-user">
      <h4>TA的博客</h4>
      <ul>
        <li v-for="(item,index) of list" :key="index">
          <img src="" alt="">
          <h5>{{item.title}}</h5>
          <div>
            <em>{{format(item.createTime)}}</em>
            <em>{{item.readNum}}阅读</em>
          </div>
        </li>
      </ul>
      <div class="d-more" v-if="list.length>2">查看更多 >></div>
    </div>
    <div class="blog-tag">
      <h4>相关标签</h4>
      <ul class="clearfix" v-if="blog.tagInfo.length">
        <li v-for="item of blog.tagInfo" :key="item['_id']" v-rainbow>{{item.content}}</li>
      </ul>
      <div v-else>该博客没有定义标签~</div>
    </div>
    <div class="blog-list">
      <h4>博客推荐</h4>
      <ul>
        <li v-for="item of blogList" :key="item">{{item}}</li>
      </ul>
      <div class="d-more">查看更多 ></div>
    </div>
  </div>
</template>

<script>
  import AsideContent from 'components/content/asidecontent/AsideContent'

  import { getBlogList } from 'network/blog'
  import { formatTime } from 'common/utils'

  export default {
    name: 'DetailAside',
    data() {
      return {
        blogList: ['前端'],
        list: [],
        readCount: 0
      }
    },
    props: {
      blog: {}
    },
    computed: {
      format() {
        return formatTime;
      }
    },
    components: {
      AsideContent
    },
    watch: {
      list() {
        this.$nextTick(function () {
          const detailAside = document.querySelector('.detail-aside');
          const distance = detailAside.offsetHeight + 90 - 635;
          if (distance < 0) {
            distance = 0;
          }
          window.addEventListener('scroll', function () {
            if (window.pageYOffset > distance) {
              detailAside.classList.add('fixed');
              detailAside.style.top = 90 - distance + 'px';
            } else {
              detailAside.classList.remove('fixed');
            }
          })
        })
      }
    },
    created() {
      getBlogList(this.blog.uid).then(result => {
        if (result.errno === 0) {
          this.list = result.data.list.reverse();
          this.readCount = result.data.readCount;
        } else {
          alert('获取失败');
        }
      })
    },
  }

</script>

<style scoped>
  .detail-aside {
    float: right;
    width: 267px;
    box-sizing: border-box;
  }

  .detail-aside>div {
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
  }

  .host {
    position: relative;
  }

  .host img {
    float: left;
    width: 64px;
    height: 64px;
    margin-right: 15px;
    background-color: skyblue;
    border-radius: 50%;
  }

  .host h3 {
    padding-top: 10px;
    font-size: 16px;
    color: #222;
    font-weight: 700;
  }

  h3:hover {
    color: #00b5e5;
  }

  .info {
    margin-top: 10px;
    font-size: 12px;
    color: #99a2aa
  }

  .info span {
    margin-right: 12px;
    font-size: 14px;
    color: #66757a;
  }

  .follow-btn {
    width: 150px;
    height: 30px;
    border: 1px solid #00b5e5;
    margin: 30px auto 0;
    background-color: #00b5e5;
    color: #fff;
    text-align: center;
    line-height: 32px;
  }

  .follow-btn:hover {
    background-color: #0793b9;
  }

  h4 {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    color: #969696;
  }

  .blog-tag h4 {
    margin-bottom: 20px;
  }

  .blog-tag li {
    float: left;
    height: 20px;
    padding: 0 10px;
    margin: 0 5px 5px 0;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    border-radius: 10px;
  }

  .blog-tag div {
    font-size: 12px;
    color: #969696;
    text-align: center;
  }

  .blog-user li,
  .blog-list li {
    margin-top: 15px;
    height: 50px;
  }

  .blog-user li h5 {
    width: 160px;
    font-size: 12px;
    color: #222;
    padding: 5px 0;
  }

  .blog-user li:hover h5 {
    color: #00b5e5;
  }

  .blog-user li div {
    font-size: 12px;
    color: #99a2aa;
  }

  .blog-user li img {
    float: right;
    width: 68px;
    height: 50px;
    background-color: #00b5e5;
    border-radius: 5px;
  }

  .blog-user em:first-child {
    margin-right: 10px;
  }

  .d-more {
    height: 26px;
    margin-top: 15px;
    background-color: #e5e9ef;
    font-size: 12px;
    text-align: center;
    line-height: 26px;
    border-radius: 5px;
  }

  .d-more:hover {
    color: #00b5e5;
  }

  .fixed {
    position: fixed;
    right: 158px;
  }

</style>
