<template>
  <div class="like-detail">
    <!-- 评论内容 -->
    <div class="comment" @click="goDetail($store.state.likeData.comment.bid)">
      评论：{{$store.state.likeData.comment.content}}
    </div>

    <!-- 点赞详情 -->
    <ul>
      <li v-for="(item,index) of getLike" :key="index">
        <img :src="getAvatar(item.user.avatar)" @click="goPerson(item.user['_id'])" />
        <div>
          <h3><em @click="goPerson(item.user['_id'])">{{item.user.username}}</em> 赞了我的评论</h3>
          <span>{{format(item.time, true)}}</span>
          <div
            class="follow"
            :class="{followed:getBtnText(item.user['_id']).length>2}"
            @click="follow(item.user['_id'])">
            {{getBtnText(item.user['_id'])}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { addFollow } from 'network/user'
  import { formatTime } from 'common/utils'

  export default {
    name: 'LikeDetail',
    computed: {
      getLike() {
        if(this.$store.state.likeData.time) {
          const { time, user } = this.$store.state.likeData;
          return [ { time, user } ]
        } else {
          return this.$store.state.likeData.more
        }
      },
      format() {
        return formatTime
      },
      getBtnText() {
        return function(uid) {
          let arr = [];
          for(let i of this.$store.state.follow) {
            arr.push(...i.group)
          }
          if(arr.includes(uid)) return '已关注'
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
      // 前往博客详情页
      goDetail(bid) {
        this.$router.push('/blog/' + bid)
      },
      // 前往个人主页
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage')
      },
      // 关注
      follow(uid) {
        if(this.$store.state.id != uid) {
          if(this.getBtnText(uid).length < 3) {
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
      }
    }
  }
</script>

<style scoped>
  .like-detail {
    margin-top: 50px;
    height: calc(100vh - 155px);
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .like-detail::-webkit-scrollbar {
    width: 8px;
    background-color: #ecf2f5;
  }

  .like-detail::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
  }

  .comment {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    font-size: 14px;
    line-height: 36px;
    color: #222;
    border-radius: 5px;
    cursor: pointer;
  }

  .comment:hover {
    color: #2faee3;
  }

  ul {
    padding: 0 15px;
    border-radius: 5px;
    background-color: #fff;
  }

  li{
    position: relative;
    padding-top: 25px;
    overflow: hidden;
  }

  img {
    float: left;
    width: 46px;
    height: 46px;
    margin-right: 15px;
    background-color: pink;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
  }

  li>div {
    float: left;
    width: calc(100% - 61px);
    padding-bottom: 25px;
    border-bottom: 1px solid #e5e9ef;
  }

  li:last-child>div {
    border: 0;
  }

  h3 {
    margin: 5px 0 10px;
    font-size: 14px;
    line-height: 16px;
    color: #505050;
  }

  h3 em {
    font-weight: 700;
    color: #000;
    cursor: pointer;
  }

  h3 em:hover {
    color: #2faee3;
  }

  span {
    color: #999;
    font-size: 12px;
    line-height: 18px;
  }

  .follow {
    position: absolute;
    top: 50%;
    right: 0;
    width: 72px;
    height: 24px;
    border: 1px solid #ccd0d7;
    color: #6d757a;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
  }

  .follow:hover {
    border-color: #2faee3;
    color: #2faee3;
  }

  .followed {
    border-color: #e5e9ef!important;
    background-color: #e5e9ef!important;
    color: #6d757a!important;
  }
</style>
