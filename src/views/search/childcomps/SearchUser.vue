<template>
  <div class="search-user">
    <!-- 搜索结果 -->
    <div class="search-filter" v-if="list.length">
      <!-- 排序 -->
      <ul class="clearfix">
        <li v-for="(item,index) of sort"
            :key="index"
            :class="{current:sortIndex==index}"
            @click="sortClick(index)">{{item}}</li>
      </ul>

      <!-- 数据展示 -->
      <ol>
        <li v-for="item of getSort" :key="item['_id']">
          <!-- 头像 -->
          <div class="avatar" :title="item.username" @click="goPerson(item['_id'])">
            <img :src="getAvatar(item.avatar)">
          </div>
          <!-- 用户信息 -->
          <div class="user">
            <div>
              <h3 :title="item.username" @click="goPerson(item['_id'])">{{item.username}}</h3>
              <span
                :class="{followed:getText(item['_id']).length>2}"
                @click="follow(item['_id'])">
                {{getText(item['_id'])}}
              </span>
            </div>
            <div>
              <em>稿件：{{item.blogInfo}}</em>
              <em>粉丝：{{item.fan}}</em>
            </div>
            <div>{{item.sign}}</div>
          </div>
        </li>
      </ol>
    </div>
    <div class="none" v-else>
      <div class="load" v-show="isShow"><i class="iconfont icon-jiazai"></i>loading...</div>
      <div v-show="!isShow">没有相关数据</div>
    </div>
  </div>
</template>

<script>
  import { addFollow } from 'network/user'

  export default {
    name: 'SearchUser',
    data() {
      return {
        // 排序选项
        sort: ['默认排序', '粉丝数由高到低', '粉丝数由低到高', '稿件数由高到低', '稿件数由低到高'],
        // 排序序号
        sortIndex: 0
      }
    },
    props: ['list', 'isShow'],
    computed: {
      // 获取指定排序
      getSort() {
        let temp;
        const arr = [];
        arr.push(...this.list);
        if(this.sortIndex == 1) { // 粉丝数由高到低
          for(let i = 0; i < arr.length - 1; i++) {
            for(let j = i + 1; j < arr.length; j++) {
              if(arr[i].fan < arr[j].fan) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        } else if(this.sortIndex == 2) { // 粉丝数由低到高
          for(let i = 0; i < arr.length - 1; i++) {
            for(let j = i + 1; j < arr.length; j++) {
              if(arr[i].fan > arr[j].fan) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        } else if(this.sortIndex == 3) { // 稿件数由高到低
          for(let i = 0; i < arr.length - 1; i++) {
            for(let j = i + 1; j < arr.length; j++) {
              if(arr[i].blogInfo < arr[j].blogInfo) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        } else if(this.sortIndex == 4) { // 稿件数由低到高
          for(let i = 0; i < arr.length - 1; i++) {
            for(let j = i + 1; j < arr.length; j++) {
              if(arr[i].blogInfo > arr[j].blogInfo) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
              }
            }
          }
        }
        return arr
      },
      // 获取关注按钮文字
      getText() {
        return function(hid) {
          if(this.$store.state.id) {
            const arr = [];
            for(let i of this.$store.state.follow) {
              arr.push(...i.group)
            }
            if(arr.includes(hid)) return '已关注'
            return '关注'
          }
          return '关注'
        }
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    methods: {
      // 排序的点击事件
      sortClick(index) {
        this.sortIndex = index
      },
      // 前往个人主页
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage');
      },
      // 关注用户
      follow(hid) {
        if(this.$store.state.id) {
          if(this.$store.state.id != hid) {
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
  ul {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  ul li {
    float: left;
    padding: 0 8px;
    margin-right: 15px;
    font-size: 12px;
    line-height: 20px;
    color: #222;
    cursor: pointer;
    border-radius: 4px;
  }

  ul li:hover {
    color: #00a1d6;
  }

  ul li.current {
    background-color: #00a1d6;
    color: #fff;
  }

  ol li {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #e5e9ef;
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    border-radius: 50%;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .user {
    flex: 1;
    font-size: 12px;
  }

  .user div:first-child {
    position: relative;
    height: 23px;
    margin: 5px 0 8px;
  }

  h3 {
    float: left;
    margin-right: 15px;
    font-size: 16px;
    line-height: 23px;
    color: #222;
    font-weight: 700;
    cursor: pointer;
  }

  h3:hover {
    color: #02b9f6;
  }

  span {
    float: left;
    width: 56px;
    height: 24px;
    background-color: #00a1d6;
    color: #fff;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    cursor: pointer;
  }

  span::before {
    content: '+';
    display: inline-block;
  }

  span:hover {
    background-color: #02b9f6;
  }

  .followed {
    background-color: #e5e9ef;
    color: #6d757a;
  }

  .followed::before {
    content: '';
  }

  .followed:hover {
    background-color: #e5e9ef;
  }

  em {
    margin-right: 15px;
    line-height: 12px;
    color: #6d757a;
  }

  .user div:last-child {
    margin-top: 10px;
    color: #6d757a;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .none {padding-top: 200px;
    font-size: 24px;
    color: #777;
    text-align: center;
  }

  .load {
    font-size: 16px;
  }

  .none i {
    font-size: 14px;
    margin-right: 5px;
  }
</style>
