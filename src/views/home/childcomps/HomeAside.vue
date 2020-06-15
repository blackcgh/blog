<template>
  <div class="home-aside">
    <!-- 排行榜 -->
    <aside-content>
      排行榜
      <template v-slot:content>
        <ul class="rank">
          <li v-for="(item,index) of blog" :key="item['_id']" @click="goDetail(item['_id'])">
            <span>{{index+1}}</span>
            {{item.title}}
          </li>
        </ul>
      </template>
    </aside-content>

    <!-- 推荐作者 -->
    <aside-content>
      推荐作者
      <template v-slot:content>
        <ul class="author">
          <li v-for="item of user" :key="item['_id']">
            <!-- 头像 -->
            <div @click="goPerson(item['_id'])">
              <img :src="getAvatar(item.avatar)">
            </div>
            <!-- 用户 -->
            <div>
              <span @click="goPerson(item['_id'])">{{item.username}}</span>
              <span
                :class="{followed:getText(item['_id']).length>2}"
                @click="follow(item['_id'])">
                {{getText(item['_id'])}}
              </span>
              <p>{{getSign(item.sign)}}</p>
            </div>
          </li>
        </ul>
      </template>
    </aside-content>

    <!-- 公告栏 -->
    <aside-content>
      公告栏
      <template v-slot:content>
        <div class="notice">
          任何人不得发布任何不良内容，否则本站将会删除您的博客并视情况注销您的账号!!!
        </div>
      </template>
    </aside-content>
  </div>
</template>

<script>
  import AsideContent from 'components/content/asidecontent/AsideContent'

  import { addFollow } from 'network/user'

  export default {
    name: 'HomeAside',
    props: ['blog', 'user'],
    computed: {
      // 获取关注按钮文字
      getText() {
        return function(uid) {
          if(this.$store.state.id) {
            let arr = [];
            for(let i of this.$store.state.follow) {
              arr.push(...i.group)
            }
            if(arr.includes(uid)) return '已关注'
            return '关注'
          }
          return '关注'
        }
      },
      // 获取签名
      getSign() {
        return function(sign) {
          if(sign == '') return '这个人很懒，什么都没写~';
          return sign
        }
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    components: {
      AsideContent
    },
    watch: {
      user() {
        this.$nextTick(function () {
          const homeAside = document.querySelector('.home-aside');
          // 侧边栏高度
          const hoh = homeAside.offsetHeight;
          // 侧边栏距顶距离
          const hot = homeAside.offsetTop;
          // 网页窗口高度
          // const wh = window.innerHeight;
          // const distance = hoh + hot - wh;
          const distance = hoh + hot - 60;
          // if (distance < 0) {
          //   distance = 0;
          // }
          window.addEventListener('scroll', function () {
            if (window.pageYOffset >= distance) {
              homeAside.classList.add('fixed');
              // homeAside.style.top = hot - distance + 'px';
              homeAside.style.top = '60px';
            } else {
              homeAside.classList.remove('fixed');
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
      // 前往个人主页页面
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage')
      },
      // 关注用户
      follow(hid) {
        if(this.$store.state.id) {
          if ((this.$store.state.id != hid)) {
            if(this.getText(hid).length < 3) {
              const fid = this.$store.state.follow[0]['_id']; // 全部关注id
              addFollow(this.$store.state.id, fid, hid).then(res => {
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
      }
    }
  }

</script>

<style scoped>
  .home-aside {
    float: right;
    width: 267px;
  }

  div.tag-cloud-tip {
    font-size: 12px;
    color: #969696;
    text-align: center;
  }

  .rank li {
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    color: #222;
    cursor: pointer;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rank li:hover {
    color: #00a1d6;
  }

  .rank li:last-child {
    margin-bottom: 0;
  }

  .rank span {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 5px;
    background-color: #ccd0d7;
    text-align: center;
    line-height: 18px;
    color: #fff;
    vertical-align: middle;
    border-radius: 4px;
  }

  .rank li:nth-child(-n+3) span {
    background-color: #f25d8e;
  }

  .author li {
    display: flex;
    padding: 10px 0;

  }

  .author li div:first-child {
    width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .author li div:last-child {
    flex: 1;
    height: 48px;
  }

  .author span:first-child {
    float: left;
    width: 120px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    color: #222;
    cursor: pointer;
  }

  .author span:first-child:hover {
    color: #00a1d6;
  }

  .author span:nth-child(2) {
    float: right;
    width: 50px;
    height: 20px;
    border: 1px solid #00a1d6;
    font-size: 12px;
    line-height: 20px;
    color: #00a1d6;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }

  .author p {
    width: 179px;
    margin-top: 30px;
    font-size: 12px;
    color: #6d757a;
    cursor: text;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .author span.followed {
    border-color: #ecf2fa;
    background: #ecf2fa;
    color: #99a2aa;
  }

  .fixed {
    position: fixed;
    right: 158px;
  }

  .notice {
    font-size: 14px;
  }

</style>
