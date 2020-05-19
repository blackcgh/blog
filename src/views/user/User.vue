<template>
  <div id="user">
    <!-- 图片区域 -->
    <div class="bgimg" @click="changeBg">
      <!-- 背景图 -->
      <img :src="getUserData.bgImg" />

      <!-- 头像 -->
      <div class="hp-avatar" @click.stop>
        <div>
          <img :src="getUserData.avatar" />
          <!-- 遮罩层 -->
          <div class="mask" v-if="getFlag" @click="changeAvatar">更换头像</div>
        </div>
        <div>{{getUserData.username}}</div>
        <!-- 个性签名 -->
        <input type="text" placeholder="编辑个性签名" v-model="sign" v-if="getFlag" @blur="updateSign" />
        <p class="sign" v-else>{{getUserData.sign}}</p>
      </div>

      <!-- 关注、发消息按钮 -->
      <div class="action" v-if="!getFlag">
        <b :class="{followed:getText.length>2}" @click="follow(getUserData.id)">{{getText}}</b>
        <b @click="send(getUserData.id)">发消息</b>
      </div>
    </div>

    <!-- 功能按钮区域 -->
    <div class="fn">
      <ul>
        <li v-for="(item,index) of fn" :key="index" @mouseenter="enter(index)" @mouseleave="leave"
            @click="itemClick(index)" :class="{current:currentNth==index}">
          {{item.name}}
          <span>{{getNum(index)}}</span>
        </li>
      </ul>
      <!-- 底线 -->
      <div class="underline">
        <div :style="{marginLeft:getDistance(nth)}"></div>
      </div>
    </div>

    <!-- 显示区域 -->
    <router-view></router-view>
  </div>

</template>

<script>
  import { updateSign, getUserData, addFollow } from 'network/user'

  export default {
    name: 'User',
    data() {
      return {
        sign: this.$store.state.sign,
        // 功能列表
        fn: [],
        // 当前功能
        currentNth: 0,
        // 下划线移动位置
        nth: 0,
        // 用户信息
        userData: null
      }
    },
    computed: {
      // 获取关注按钮文字
      getText() {
        let arr = [];
        for(let i of this.$store.state.follow) {
          arr.push(...i.group)
        }
        if(arr.includes(this.getUserData.id)) return '已关注'
        return '关注'
      },
      // 获取数目
      getNum() {
        return function (index) {
          if (index > 1 && index < 6) {
            let n = 0;
            switch (this.fn[index].path) {
              case '/blog':
                if (this.getUserData.blog != 0) return this.getUserData.blog;
                break
              case '/follow':
                for (let i of this.getUserData.follow) {
                  n += i.group.length
                }
                if (n != 0) return n
                break
              case '/fan':
                if (this.getUserData.fan.length != 0) return this.getUserData.fan.length
                break
              case '/star':
                for (let i of this.getUserData.star) {
                  n += i.favorite.length
                }
                if (n != 0) return n
                break
            }
          }
          return ''
        }
      },
      // 获取底线的移动距离
      getDistance() {
        return function (nth) {
          const distance = 2 + nth * 147 + 38;
          return distance + 'px';
        }
      },
      // 确认是本人还是他人
      getFlag() {
        return this.$route.path.indexOf(this.$store.state.id) != -1 && this.$store.state.id != ''
      },
      // 确认用户信息
      getUserData() {
        if (this.getFlag) {
          const {
            username, id, avatar, bgImg, sign, star, follow, fan, blog, userSet, notice
          } = this.$store.state;
          return { username, id, avatar, bgImg, sign, star, follow, fan, blog, userSet,  notice }
        }
        return this.$store.state.userData
      }
    },
    watch: {
      '$route.path': function (val, oldVal) {
        // 在不同个人主页之间跳转，需要重新获取主页数据
        if(val.split('/')[1] != oldVal.split('/')[1]) {
          this.getUser()
        }

        // 同一个个人主页，不停功能按钮之间跳转
        if (val.indexOf('homepage') != -1) { // 顶部导航栏点击个人主页、进入他人个人主页
          this.update(0);
          return
        }
        if (this.getFlag) {
          if (val.indexOf('dynamic') != -1) { // 顶部导航栏点击动态
            this.update(1)
          } else if (val.indexOf('follow') != -1) { // 粉丝页面点击关注
            this.update(3)
          } else if (val.indexOf('fan') != -1) { // 关注页面点击粉丝
            this.update(4)
          } else if (val.indexOf('star') != -1) { // 顶部导航栏点击收藏
            this.update(5)
          }
        } else {
          if (val.indexOf('follow') != -1) {
            this.update(2)
          } else if (val.indexOf('fan') != -1) {
            this.update(3)
          }
        }
        this.$nextTick(() => {
          window.scrollTo(0, 0);
        })
      }
    },
    methods: {
      update(n) {
        this.currentNth = n;
        this.nth = n
      },
      // 进入
      enter(index) {
        this.nth = index
      },
      // 离开
      leave() {
        this.nth = this.currentNth
      },
      // 点击
      itemClick(index) {
        // 只有不处于该视图时，点击才跳转
        if (this.$route.path.indexOf(this.fn[index].path) == -1) {
          this.$router.push('/' + this.getUserData.id + this.fn[index].path);
          this.currentNth = index;
        }
      },
      // 更换背景图片
      changeBg() {
        if (this.getFlag) {
          this.$router.push('/profile/background')
        }
      },
      // 更换头像
      changeAvatar() {
        if (this.getFlag) {
          this.$router.push('/profile/avatar')
        }
      },
      // 更新签名
      updateSign() {
        if (this.sign.length > 0 && this.sign.length <= 150) {
          updateSign(this.$store.state.id, this.sign).then(res => {
            this.$store.commit('updateSign', this.sign)
          })
        } else if (this.sign.length > 150) {
          this.$tip.show('#edf2fc', '签名内容长度不能超过150', 1, '#909399')
        }
      },
      // 关注
      follow(uid) {
        if(this.$store.state.id) {
          if(this.$store.state.id != uid) {
            if(this.getText.length < 3) {
              const fid = this.$store.state.follow[0]['_id']; // 全部关注id
              addFollow(this.$store.state.id, fid, uid).then(res => {
                this.$store.commit('addFollow', {
                  hid: uid,
                  i: 0
                });
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
      // 发消息
      send(uid) {
        if(!this.$store.state.id) {
          this.$tip.show('#edf2fc', '请先登录', 1, '#909399');
          return
        }
        this.$router.push('/message/whisper/' + uid)
      },
      getUser() {
        this.$load.show();
        if (this.getFlag) { // 本人个人主页
        document.title = this.$store.state.username + '的个人空间 - blackblog'
          const path = this.$route.path.split('/')[2];
          switch (path) {
            case 'dynamic':
              this.update(1);
              break
            case 'follow':
              this.update(3);
              break
            case 'fan':
              this.update(4);
              break
            case 'star':
              this.update(5);
          }
          this.fn = [{
              name: '主页',
              path: '/homepage'
            },
            {
              name: '动态',
              path: '/dynamic'
            },
            {
              name: '博客',
              path: '/blog'
            },
            {
              name: '关注',
              path: '/follow'
            },
            {
              name: '粉丝',
              path: '/fan'
            },
            {
              name: '收藏',
              path: '/star'
            },
            {
              name: '设置',
              path: '/set'
            }
          ]
          this.$load.hidden()
        } else { // 他人个人主页
          getUserData(this.$route.path.split('/')[1]).then(res => {
            document.title = res.data.username + '的个人空间 - blackblog'
            const arr = [{
                name: '关注',
                path: '/follow'
              },
              {
                name: '粉丝',
                path: '/fan'
              },
              {
                name: '收藏',
                path: '/star'
              }
            ]
            this.fn = [{
                name: '主页',
                path: '/homepage'
              },
              {
                name: '动态',
                path: '/dynamic'
              }
            ]
            if (res.data.userSet.setList[0].status) this.fn.push(arr[0], arr[1]);
            if (res.data.userSet.setList[1].status) this.fn.push(arr[2]);
            this.$store.commit('saveUserData', res.data);
            this.$load.hidden()
          })
        }
      }
    },
    created() {
      this.getUser()
    },
    mounted() {
      window.scrollTo(0, 0);
    }
  }

</script>

<style scoped>
  .bgimg {
    position: relative;
    width: 100%;
    height: 250px;
  }

  .bgimg>img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
    object-fit: cover;
  }

  .hp-avatar {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 700px;
    z-index: 1;
  }

  .hp-avatar>div {
    float: left;
    border-radius: 50%;
    color: #fff;
  }

  .hp-avatar>div:first-child {
    position: relative;
    width: 90px;
    height: 90px;
    margin-right: 15px;
    border: 2px solid hsla(0,0%,100%,.4);
    box-sizing: border-box;
  }

  .hp-avatar>div:nth-child(2) {
    margin: 15px 0 5px;
    font-size: 22px;
    font-weight: 700;
  }

  input,
  .sign {
    float: left;
    width: 590px;
    height: 30px;
    margin-left: -5px;
    padding-left: 5px;
    border: 1px solid transparent;
    background-color: transparent;
    font-size: 14px;
    color: #d6dee4;
    border-radius: 4px;
  }

  input:hover {
    border-color: #d6dee4;
    background-color: #fff;
  }

  input:focus {
    border-color: #d6dee4;
    background-color: #fff;
    color: #222;
  }

  .hp-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    text-align: center;
    line-height: 90px;
    cursor: pointer;
    border-radius: 50%;
  }

  .hp-avatar>div:first-child:hover .mask {
    display: block;
  }

  .hp-avatar span {
    font-size: 20px;
    font-weight: 700px;
  }

  .fn {
    position: relative;
    height: 53px;
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 0 0 5px 5px;
  }

  ul {
    height: 50px;
    padding: 0 2px;
    background-color: #fff;
    text-align: center;
    line-height: 60px;
  }

  li {
    float: left;
    width: 147px;
    height: 50px;
    color: #888da8;
  }

  li:hover {
    color: #00a1d6;
  }

  span {
    position: relative;
    top: -1px;
    font-size: 12px;
    color: #99a2aa;
  }

  .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }

  .underline div {
    width: 70px;
    height: 3px;
    margin-left: 41px;
    background-color: #00a1d6;
    transition: margin .2s;
  }

  .current {
    color: #00a1d6;
  }

  .action {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 160px;
    height: 30px;
  }

  b {
    display: inline-block;
    width: 70px;
    height: 30px;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    color: #fff;
    font-weight: 400;
    box-sizing: border-box;
    cursor: pointer;
  }

  b:first-child {
    margin-right: 20px;
    background-color: #f25d8e;
    box-shadow: 0 0 0 2px #fff;
  }

  b.followed {
    background-color: rgba(0,0,0,.45)!important;
    box-shadow: 0 0 0 2px hsla(0,0%,100%,.3)!important;
  }

  b:first-child:hover {
    background-color: #f1769f;
  }

  b:last-child {
    background-color: rgba(0,0,0,.45);
    box-shadow: 0 0 0 2px hsla(0,0%,100%,.3);
  }

  b:last-child:hover {
    background-color: rgba(44, 43, 43, 0.45);
  }

</style>
