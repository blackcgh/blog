<template>
  <div class="like-mes">
    <div v-if="likeList.length!=0">
      <div class="like-item" v-for="(item,index) of likeList" :key="index" @click="spread(item)">
        <!-- 头像 -->
        <div class="avatar">
          <!-- 一个用户点赞 -->
          <img :src="getNewAvatar(item.user.avatar)"
                v-if="!item.more"
                @click.stop="goPerson(item.user['_id'])" />
          <!-- 多个用户点赞 -->
          <div class="more" v-else>
            <img :src="getAvatar(item.more,1)" @click.stop="goPerson(getUid(item.more,1))" />
            <img :src="getAvatar(item.more,0)" @click.stop="goPerson(getUid(item.more,0))" />
          </div>
        </div>

        <!-- 内容 -->
        <div>
          <div class="user" v-if="!item.more">
            <ins @click.stop="goPerson(item.user['_id'])">{{item.user.username}}</ins>
            <b>赞了我的评论</b>
          </div>
          <div class="user" v-else>
            <ins @click.stop="goPerson(getUid(item.more,0))">{{getUsername(item.more,0)}}</ins>、
            <ins @click.stop="goPerson(getUid(item.more,1))">{{getUsername(item.more,1)}}</ins>
            <b v-if="item.more.length>2">等总计 {{item.more.length}} 人</b>
            <b>赞了我的评论</b>
          </div>
          <span v-if="!item.more">{{format(item.time, true)}}</span>
          <span v-else>{{format(item.more[0].time, true)}}</span>
          <div class="top" @click.stop="goDetail(item.comment.bid)">
            {{item.comment.content}}
          </div>
        </div>
      </div>
    </div>
    <div class="none" v-else>
      <div v-show="isShow"><i class="iconfont icon-jiazai"></i>loading...</div>
      <div v-show="!isShow">这里还是空的呢~</div>
    </div>
  </div>
</template>

<script>
  import { getLike } from 'network/message'
  import { formatTime } from 'common/utils'

  export default {
    name: 'LikeMes',
    data() {
      return {
        likeList: [],
        isShow: true
      }
    },
    computed: {
      getAvatar() {
        return function (more, n) {
          return this.getNewAvatar(more[n].user.avatar)
        }
      },
      getUid() {
        return function (more, n) {
          return more[n].user['_id']
        }
      },
      getUsername() {
        return function (more, n) {
          return more[n].user.username
        }
      },
      format() {
        return formatTime
      },
      getNewAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    methods: {
      spread(like) {
        this.$store.commit('saveLike', like);
        this.$router.push('/message/like/' + like.cid)
      },
      // 前往个人主页
      goPerson(uid) {
        this.$router.push('/' + uid + '/homepage')
      },
      // 前往博客详情页
      goDetail(bid) {
        this.$router.push('/blog/' + bid)
      }
    },
    created() {
      const total = this.$store.state.like.total;
      if (total != 0) {
        getLike(this.$store.state.id, total).then(res => {
          this.isShow = false;
          // 格式化点赞列表
          let obj = {}
          let like = res.data.reduce((arr, next) => {
            if (obj[next.cid]) {
              for (let i in arr) {
                if (arr[i].cid == next.cid) {
                  if (arr[i].more) {
                    arr[i].more.unshift({
                      time: next.time,
                      user: next.user
                    })
                    arr.push(arr[i])
                  } else {
                    arr.push({
                      more: [{
                          time: next.time,
                          user: next.user
                        },
                        {
                          time: arr[i].time,
                          user: arr[i].user
                        }
                      ],
                      cid: arr[i].cid,
                      comment: arr[i].comment
                    })
                  }
                  arr.splice(i, 1);
                  break
                }
              }
            } else {
              obj[next.cid] = true;
              arr.push(next);
            }
            return arr
          }, [])
          this.likeList = like.reverse();
          this.$store.commit('updateMes', 'like')
        })
      } else {
        this.isShow = false
      }
    }
  }

</script>

<style scoped>
  .like-mes {
    margin-top: 50px;
    height: calc(100vh - 155px);
    padding: 0 15px;
    background-color: #fff;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .like-mes::-webkit-scrollbar {
    width: 8px;
    background-color: #ecf2f5;
  }

  .like-mes::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
  }

  .like-item {
    position: relative;
    margin-top: 25px;
    cursor: pointer;
    overflow: hidden;
  }

  .like-item:last-child div:last-child {
    border-bottom: 0;
  }

  .avatar {
    float: left;
    width: 46px;
    height: 46px;
    margin-right: 15px;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
  }

  .avatar>img {
    width: 100%;
    height: 100%;
  }

  .avatar>div:last-child {
    position: relative;
  }

  .more img:first-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
  }

  .more img:last-child {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
  }

  .like-item>div:nth-child(2) {
    float: left;
    width: calc(100% - 61px);
    padding-bottom: 25px;
    border-bottom: 1px solid #e5e9ef;
    font-size: 14px;
    color: #222;
  }

  .user {
    margin: 5px 0 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
  }

  ins:hover {
    color: #23ade5;
  }

  b {
    margin-left: 8px;
    font-weight: 400;
    color: #505050;
  }

  span {
    color: #999;
    font-size: 12px;
    line-height: 18px;
  }

  .top {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 15px;
  }

  .none {
    padding-top: 100px;
    text-align: center;
    font-size: 16px;
    color: #999;
  }

  .none i {
    margin-right: 5px;
    font-size: 14px;
  }

</style>
