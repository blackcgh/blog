<template>
  <div id="follow" class="clearfix">
    <!-- 导航菜单 -->
    <div class="follow-aside">
      <div>{{getText}}的关注</div>
      <div class="my-fan">{{getText}}的粉丝</div>
      <ul>
        <li v-for="(item,index) of navList" :key="index" :class="{current:currentIndex==index}"
            @click="itemClick(index)">
          <span>{{item}}</span>
          <span :class="{currents:currentIndex==index}">{{getNum(index)}}</span>
        </li>
      </ul>
    </div>

    <!-- 视图组件 -->
    <div class="follow-content">
      <h3>{{navList[currentIndex]}}</h3>
      <!-- 关注、粉丝列表 -->
      <ul v-if="showList[currentIndex].list.length">
        <li class="follow-list" v-for="(item,index) of showList[currentIndex].list" :key="item['_id']">
          <!-- 头像 -->
          <img :src="getAvatar(item.avatar)" @click="goPerson(item['_id'])" />
          <!-- 用户 -->
          <div class="follow-user">
            <h4><b @click="goPerson(item['_id'])">{{item.username}}</b></h4>
            <p>{{getSign(item.sign)}}</p>
          </div>
          <!-- 操作 -->
          <div class="follow-action clearfix">
            <!-- 关注状态 -->
            <div>
              <span :class="{fanfollow:getStyle(index)}" @click="addFollow(index)">
                {{getStatus(index)}}
              </span>
              <ul class="follow-menu" v-if="getStatus(index).length>2">
                <li @click="changeFollow(index)" v-if="currentIndex!=2&&getFlag">
                  {{getBtnText}}
                </li>
                <li @click="cancelFollow(index)">取消关注</li>
              </ul>
            </div>
            <!-- 更多操作 -->
            <div v-if="$store.state.id!=''">
              <i class="iconfont" title="更多操作">&#xe6f8;</i>
              <ul class="follow-more">
                <li @click="send(item['_id'])">发消息</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="none">
        <div v-if="isLoad">loading...</div>
        <div v-else>该分组还没有用户~</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getFollow,
    changeFollow,
    addFollow,
    cancelFollow
  } from 'network/user'

  export default {
    name: 'Follow',
    data() {
      return {
        // 导航菜单
        navList: ['全部关注', '特别关注', '我的粉丝'],
        // 当前点击的index
        currentIndex: -1,
        // 显示列表
        showList: [{
            list: [] // 全部关注列表
          },
          {
            list: [] // 特别关注列表
          },
          {
            list: [] // 粉丝列表
          }
        ],
        // 显示加载图标
        isLoad: true
      }
    },
    computed: {
      // 获取用户签名
      getSign () {
        return function(sign) {
          if(sign) return sign;
          return '这个人没有填简介啊~~~'
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
            id,
            follow,
            fan
          } = this.$store.state;
          return {
            id,
            follow,
            fan
          }
        }
        return this.$store.state.userData
      },
      getText() {
        if (this.getFlag) return '我';
        return 'TA'
      },
      // 获取关注、粉丝数目
      getNum() {
        return function (index) {
          if (this.getUserData.follow[index]) {
            return this.getUserData.follow[index].group.length
          } else {
            return this.getUserData.fan.length
          }
        }
      },
      // 获取全部、特别分组的所有uid
      getUid() {
        const arr = [];
        for (let i of this.$store.state.follow) {
          arr.push(...i.group)
        }
        return arr
      },
      // 获取关注状态
      getStatus() {
        return function (index) {
          if (this.$store.state.id == '') return '关注'; // 未登录
          const uid = this.showList[this.currentIndex].list[index]['_id'];
          if (!this.getUid.includes(uid)) return '关注';
          if (this.getUid.includes(uid) && this.$store.state.fan.includes(uid)) return '已互粉';
          return '已关注'
        }
      },
      // 获取按钮显示的样式
      getStyle() {
        return function (index) {
          return this.getStatus(index).length < 3
        }
      },
      // 获取按钮文字
      getBtnText() {
        if (this.currentIndex == 0) {
          return '特别关注'
        } else if (this.currentIndex == 1) {
          return '全部关注'
        }
        return ''
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    watch: {
      '$route.path': function (val, oldVal) {
        // 本人个人主页点击顶部导航栏关注、粉丝按钮、点击关注页面的关注、粉丝按钮
        if (val.indexOf('follow') != -1 && this.currentIndex != 1) {
          this.currentIndex = 0;
        } else if (val.indexOf('fan') != -1) {
          this.currentIndex = 2
        }

        // 在不同个人主页之间跳转
        const arr1 = val.split('/');
        const arr2 = oldVal.split('/');
        if (arr1[1] != arr2[1] && arr1[2] == arr2[2]) {
          let hids;
          if (this.currentIndex == 0) {
            hids = this.getUserData.follow[0].group
          } else {
            hids = this.getUserData.fan
          }
          this.getFollow(hids)
        }
      },
      // currentIndex改变时，看是否需要发送请求
      currentIndex(val) {
        let hids;
        if (this.currentIndex != 2) {
          hids = this.getUserData.follow[this.currentIndex].group
        } else {
          hids = this.getUserData.fan
        }
        this.getFollow(hids)
      }
    },
    methods: {
      // 关注导航菜单点击事件
      itemClick(index) {
        this.currentIndex = index;
        if (index != 2) { // 点击关注按钮
          if (this.$route.path.indexOf('follow') == -1) { // 在 fan 情况下点击
            this.$router.push('/' + this.getUserData.id + '/follow');
          }
        } else { // 点击粉丝按钮
          if (this.$route.path.indexOf('fan') == -1) { // 在 follow 情况下点击
            this.$router.push('/' + this.getUserData.id + '/fan');
          }
        }
      },
      // 前往用户个人主页
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage');
      },
      // 改变关注分组
      changeFollow(index) {
        let status; // currentIndex是0，status是1；currentIndex是1，status是0
        this.currentIndex == 0 ? status = 1 : status = 0;
        const did = this.$store.state.follow[this.currentIndex]['_id']; // 要删除的分组id
        const aid = this.$store.state.follow[status]['_id']; // 要添加的分组id
        const fid = this.$store.state.follow[this.currentIndex].group[index]; // 要改变的关注用户id
        changeFollow(did, aid, fid).then(res => {
          this.$store.commit('changeFollow', {
            fid,
            status
          })
          const follow = this.showList[this.currentIndex].list[index]; // 要改变的关注用户信息
          this.showList[this.currentIndex].list.splice(index, 1);
          this.showList[status].list.unshift(follow)
        })
      },
      // 取消关注
      cancelFollow(index) {
        const mid = this.$store.state.id; // 我的id
        const hid = this.showList[this.currentIndex].list[index]['_id']; // 对方id
        let i = this.currentIndex;
        if (this.currentIndex == 2) {
          this.$store.state.follow[0].group.includes(hid) ? i = 0 : i = 1
        }
        const fid = this.$store.state.follow[i]['_id']; // 关注分组id
        cancelFollow(mid, fid, hid).then(res => {
          this.$store.commit('cancelFollow', {
            hid,
            i
          })
        })
      },
      // 发消息
      send(uid) {
        if(uid == this.$store.state.id) {
          this.$tip.show('#edf2fc', '不能给自己发送消息哦~', 1, '#909399');
          return
        }
        this.$router.push('/message/whisper/' + uid)
      },
      // 获取关注、粉丝列表
      getFollow(hids) {
        this.showList[this.currentIndex].list = [];
        this.isLoad = true;
        if (hids.length != 0) {
          getFollow(hids).then(res => {
            this.isLoad = false;
            this.showList[this.currentIndex].list.push(...(res.data));
          })
        } else {
          this.isLoad = false
        }
      },
      // 关注用户
      addFollow(index) {
        const mid = this.$store.state.id; // 我的id
        if (mid) {
          if (this.getStatus(index).length < 3) {
            const hid = this.showList[this.currentIndex].list[index]['_id']; // 对方id
            if(mid == hid) {
              this.$tip.show('#edf2fc', '不能关注自己', 1, '#909399');
              return
            }
            let i = this.currentIndex;
            if (this.currentIndex == 2) {
              i = 0;
              if (this.getFlag) {
                for (let j of this.showList[1].list) {
                  if (j['_id'] == hid) {
                    i = 1;
                    break
                  }
                }
              }
            }
            const fid = this.$store.state.follow[i]['_id']; // 关注分组id
            addFollow(mid, fid, hid).then(res => {
              if (this.currentIndex == 2) {
                let flag = true;
                const follow = this.showList[2].list[index];
                for (let j of this.showList[0].list) {
                  if (j['_id'] == follow['_id']) {
                    flag = false;
                    break
                  }
                }
                if (i == 1) flag = false;
                if (flag) this.showList[0].list.unshift(follow);
              }
              this.$store.commit('addFollow', {
                hid,
                i
              });
              this.$tip.show('#f0f9eb', '关注成功', 0, '#91c287')
            })
          }
        } else {
          this.$tip.show('#edf2fc', '请先登录', 1, '#909399')
        }
      }
    },
    created() {
      if (this.$route.path.indexOf('follow') != -1) {
        this.currentIndex = 0
      } else if (this.$route.path.indexOf('fan') != -1) {
        this.currentIndex = 2
      }
    }
  }

</script>

<style scoped>
  #follow {
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
  }

  .follow-aside {
    position: relative;
    float: left;
    width: 230px;
  }

  .follow-aside div {
    padding: 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #99a2aa;
  }

  .follow-aside .my-fan {
    position: absolute;
    top: 157px;
    left: 0;
    right: 0;
  }

  .follow-aside li {
    height: 50px;
    padding: 0 30px;
    line-height: 50px;
    cursor: pointer;
  }

  .follow-aside li:last-child {
    margin-top: 57px;
  }

  .follow-aside span:first-child {
    float: left;
  }

  .follow-aside span:last-child {
    float: right;
    font-size: 14px;
    color: #99a2aa;
  }

  .follow-aside li:hover {
    background-color: #f4f5f7;
    color: #00a1d6;
  }

  .follow-aside li.current {
    background-color: #00a1d6;
    color: #fff;
  }

  .follow-aside span.currents {
    color: #fff;
  }

  .follow-content {
    float: right;
    width: 760px;
    min-height: 500px;
    padding: 15px;
    padding-left: 27px;
    border-left: 1px solid #eee;
  }

  h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e9ef;
    font-size: 18px;
  }

  .follow-list {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #e5e9ef;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
  }

  b {
    cursor: pointer;
  }

  b:hover {
    color: #00a1d6;
  }

  .follow-user {
    flex: 1;
    margin-left: 20px;
  }

  h4 {
    padding: 10px 0;
  }

  .follow-user p {
    width: 460px;
    font-size: 12px;
    color: #6d757a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .follow-action {
    width: 100px;
    height: 60px;
    text-align: center;
  }

  .follow-action div {
    float: left;
    position: relative;
    padding-bottom: 15px;
    margin-top: 18px;
    cursor: pointer;
  }

  .follow-action div:last-child {
    float: right;
  }

  .follow-content span {
    display: inline-block;
    padding: 4px 10px;
    background-color: #e5e9ef;
    font-size: 12px;
    line-height: 16px;
    color: #6d757a;
    text-align: center;
    border-radius: 4px;
  }

  .follow-content span::after {
    content: '';
    position: relative;
    top: -3px;
    display: inline-block;
    padding: 3px;
    margin: 0 7px;
    border-right: 1px solid #899399;
    border-bottom: 1px solid #899399;
    transform: rotate(45deg);
  }

  span.fanfollow {
    background-color: #fff;
    width: 77px;
    height: 24px;
    border: 1px solid #ccd0d7;
    box-sizing: border-box;
  }

  span.fanfollow::after {
    content: '';
    margin: 0;
    padding: 0;
    border: 0;
  }

  span.fanfollow:hover {
    border-color: #00a1d6;
    color: #00a1d6;
  }

  .follow-content span:hover {
    color: #00a1d6;
  }

  .follow-content i {
    position: relative;
    top: 3px;
    left: 3px;
    font-size: 18px;
    color: #999;
  }

  .follow-action ul {
    display: none;
    position: absolute;
    top: 35px;
    left: -23px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .14);
    z-index: 1;
  }

  .follow-content ul.follow-more {
    left: -80px;
  }

  .follow-action div:hover .follow-menu {
    display: block;
  }

  .follow-action li {
    width: 60px;
    height: 45px;
    padding: 0 20px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #222;
  }

  .follow-action li:hover {
    background-color: #e5e9ef;
    color: #00a1d6;
  }

  .follow-action div:hover .follow-more {
    display: block;
  }

  .none {
    padding: 50px 0;
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

</style>
