<template>
  <div class="detail-aside" v-if="blog">
    <!-- 用户介绍 -->
    <div class="host clearfix">
      <!-- 头像 -->
      <img :src="getAvatar(blog.avatar)" title="看一下TA" @click="goPerson(blog.uid)">
      <!-- 用户名 -->
      <h3><span @click="goPerson(blog.uid)">{{blog.author}}</span></h3>
      <!-- 其他信息 -->
      <div class="info">
        粉丝：<span>{{blog.fanNum}}</span>
        阅读：<span>{{readCount}}</span>
      </div>
      <div class="follow-btn"
           :class="{forbid:getFollow.length>2}"
           v-if="show"
           @click="addFollow">
           {{getFollow}}
      </div>
    </div>

    <!-- 用户其他博客 -->
    <div class="blog-user" v-if="blogList.user.length">
      <h4>TA的博客</h4>
      <ul>
        <li v-for="(item,index) of blogList.user" :key="index" @click="goDetail(item['_id'])">
          <img :src="getBlogImg(item.content)" alt="">
          <h5>{{item.title}}</h5>
          <div>
            <em>{{format(item.createTime)}}</em>
            <em>{{item.readNum}}阅读</em>
          </div>
        </li>
      </ul>
      <div class="d-more" v-if="blogList.user.length>2" @click="goPerson(blog.uid)">
        查看更多 >>
      </div>
    </div>

    <!-- 博客标签 -->
    <div class="blog-tag">
      <h4>相关标签</h4>
      <ol class="clearfix" v-if="blog.tagInfo.length">
        <li v-for="item of blog.tagInfo" :key="item['_id']" v-rainbow>{{item.content}}</li>
      </ol>
      <div v-else>该博客没有定义标签~</div>
    </div>

    <!-- 博客分类推荐 -->
    <div class="blog-category"  v-if="blogList.category.length">
      <h4>相关推荐</h4>
      <ul>
        <li v-for="item of blogList.category"
            :key="item['_id']"
            @click="goDetail(item['_id'])">
          <img :src="getBlogImg(item.content)" alt="">
          <h5>{{item.title}}</h5>
          <div>
            <em>{{format(item.createTime)}}</em>
            <em>{{item.readNum}}阅读</em>
          </div>
        </li>
      </ul>
      <div class="d-more" v-if="blogList.category.length>2" @click="goHome">查看更多 >></div>
    </div>
  </div>
</template>

<script>
  import { addFollow } from 'network/user'
  import { getBlogList } from 'network/blog'
  import { formatTime, getBlogImg } from 'common/utils'

  export default {
    name: 'DetailAside',
    data() {
      return {
        blogList: {
          // 用户的其他博客
          user: [],
          // 分类相关推荐
          category: []
        },
        // 阅读数
        readCount: 0
      }
    },
    props: ['blog'],
    computed: {
      // 格式化时间
      format() {
        return formatTime
      },
      getBlogImg() {
        return getBlogImg
      },
      // 是否显示关注按钮，博客作者与登录用户相同就不显示
      show() {
        return this.blog.author != this.$store.state.username
      },
      // 关注按钮要显示的字和样式
      getFollow() {
        for(let i of this.$store.state.follow) {
          for(let j of i.group) {
            if(this.blog.uid == j) {
              return '已关注'
            }
          }
        }
        return '关注'
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    watch: {
      blog() {
        this.getBlogList()
      },
      // 观察侧边栏滚动
      blogList() {
        this.$nextTick(function () {
          const detailAside = document.querySelector('.detail-aside');
          const doh = detailAside.offsetHeight;
          const dot = detailAside.offsetTop;
          const wh = window.innerHeight;
          let distance = doh + dot - wh;
          if (distance < 0) {
            distance = 0;
          }
          window.addEventListener('scroll', function () {
            if (window.pageYOffset > distance) {
              detailAside.classList.add('fixed');
              detailAside.style.top = dot - distance + 'px';
            } else {
              detailAside.classList.remove('fixed');
            }
          })
        })
      }
    },
    methods: {
      // 前往博客详情页
      goDetail(bid) {
        this.$router.push('/blog/' + bid);
      },
      // 前往用户个人主页
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage');
      },
      // 前往首页
      goHome() {
        this.$router.push('/')
      },
      // 关注用户
      addFollow() {
        if(this.$store.state.id) {
          const hid = this.blog.uid; // 对方id
          if(this.$store.state.id != hid) {
            if(this.getFollow.length < 3) {
              const fid = this.$store.state.follow[0]['_id']; // 全部关注id
              addFollow(this.$store.state.id, fid, hid).then(res => {
                this.follow = '已关注';
                this.$store.commit('addFollow', { hid, i: 0 });
                this.$tip.show('#f0f9eb', '关注成功', 0, '#91c287')
              })
            }
          } else {
            this.$tip.show('#edf2fc', '不能关注自己', 1, '#909399')
          }
        } else {
          this.$tip.show('#edf2fc', '请先登录', 1, '#909399')
        }
      },
      // 获取用户的其他博客
      getBlogList() {
        const { uid, category } = this.blog
        getBlogList(uid, category).then(res => {
          this.$load.hidden();
          if (res.errno === 0) {
            this.readCount = res.data.readCount;
            this.blogList.user = this.filte(res.data.user, this.blog['_id']);
            this.blogList.category = this.filte(res.data.category, this.blog['_id']);
          } else {
            this.$tip.show('#fef0f0', '获取该用户的其他博客失败', 3, '#f56c6c');
          }
        })
      },
      // 过滤与博客详情页相同的推荐博客
      filte(list, bid) {
        for(let i in list) {
          if(list[i]['_id'] == bid) {
            list.splice(i, 1)
          }
        }
        if(list.length > 3) {
          list.splice(list.length - 1)
        }
        return list
      }
    }
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

  .detail-aside>div:last-child {
    margin-bottom: 0;
  }

  .host {
    position: relative;
  }

  .host img {
    float: left;
    width: 64px;
    height: 64px;
    margin-right: 15px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
  }

  .host h3 {
    padding-top: 10px;
    font-size: 16px;
    color: #222;
    font-weight: 700;
  }

  .host h3 span {
    cursor: pointer;
  }

  .host h3 span:hover {
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
    margin: 30px auto 0;
    background-color: #00b5e5;
    color: #fff;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }

  .follow-btn:hover {
    background-color: #03c3f8;
  }

  .forbid {
    background: #e7e7e7 !important;
    color: #999;
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

  ol li {
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

  ul li {
    margin-top: 15px;
    height: 50px;
    cursor: pointer;
  }

  ul li h5 {
    width: 160px;
    height: 20px;
    padding: 5px 0;
    margin-bottom: 6px;
    font-size: 12px;
    color: #222;
    overflow: hidden;
  }

  ul li:hover h5 {
    color: #00b5e5;
  }

  ul li div {
    font-size: 12px;
    color: #99a2aa;
  }

  ul li img {
    float: right;
    width: 68px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
  }

  .blog-user em:first-child,
  .blog-category em:first-child {
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
