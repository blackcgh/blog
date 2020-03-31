<template>
  <div class="blog-aside">
    <aside-content :show="false">
      <template v-slot:me>
        <div class="me clearfix">
          <img src="" alt="" title="看一下TA">
          <h2>{{$store.state.username}}</h2>
          <div class="info">
            关注：<span>7</span>
            粉丝：<span>77</span>
          </div>
          <div class="sign">
            i am black
          </div>
        </div>
      </template>
    </aside-content>
    <aside-content>
      博客热度
      <template v-slot:content>
        <ul>
          <li v-for="item of hot" :key="item">{{item}}</li>
        </ul>
      </template>
    </aside-content>
    <aside-content>
      我的标签
      <template v-slot:content>
        <ul class="tag clearfix" v-if="tag.length">
          <li v-for="item of tag" :key="item" v-rainbow>{{item}}</li>
        </ul>
        <div class="tag-tip" v-else>你还没有标签呢~</div>
      </template>
    </aside-content>
    <aside-content>
      公告
      <template v-slot:content>
        <ul>
          <li v-for="item of link" :key="item">{{item}}</li>
        </ul>
      </template>
    </aside-content>
  </div>
</template>

<script>
  import AsideContent from 'components/content/asidecontent/AsideContent'

  export default {
    name: 'BlogAside',
    data() {
      return {
        hot: [1, 2, 3],
        tag: this.$store.state.userTag,
        link: ['前端', '后端', '全栈开发', '架构']
      }
    },
    components: {
      AsideContent
    },
    watch: {
      tag() {
        this.$nextTick(function () {
          const blogAside = document.querySelector('.blog-aside');
          const distance = blogAside.offsetHeight + 90 - 635;
          if (distance < 0) {
            distance = 0;
          }
          window.addEventListener('scroll', function () {
            if (window.pageYOffset > distance) {
              blogAside.classList.add('fixed');
              blogAside.style.top = 90 - distance + 'px';
            } else {
              blogAside.classList.remove('fixed');
            }
          })
        })
      }
    }
  }

</script>

<style scoped>
  .blog-aside {
    float: right;
    width: 267px;
  }

  .me img {
    float: left;
    width: 64px;
    height: 64px;
    margin-right: 15px;
    background-color: skyblue;
    border-radius: 50%;
  }

  .me h2 {
    padding-top: 10px;
    font-size: 16px;
    color: #222;
    font-weight: 700;
  }

  h2:hover {
    color: #00b5e5;
  }

  div.info {
    margin-top: 10px;
    font-size: 12px;
    color: #99a2aa
  }

  .info span {
    margin-right: 12px;
    font-size: 14px;
    color: #66757a;
  }

  div.sign {
    position: relative;
    margin-top: 20px;
    padding-left: 70px;
    font-size: 14px;
    color: #66757a;
  }

  div.sign::before {
    content: '个性签名：';
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 700;
  }

  div.tag-tip {
    font-size: 12px;
    color: #969696;
    text-align: center;
  }

  ul li {
    margin-bottom: 20px;
    font-size: 15px;
  }

  li:last-child {
    margin-bottom: 0;
  }

  .tag li {
    float: left;
    height: 20px;
    padding: 0 10px;
    margin: 0 5px 5px 0;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    border-radius: 10px;
  }

  .fixed {
    position: fixed;
    right: 158px;
  }

</style>
