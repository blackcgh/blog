<template>
  <div class="history-item">
    <div class="h-thread">
      <i></i>
      <span>{{format}}</span>
    </div>
    <div class="h-info">
      <!-- 头图 -->
      <img :src="getBlogImg(history.content)" @click="goDetail" />
      <div>
        <!-- 标题 -->
        <h2 @click="goDetail">{{history.title}}</h2>
        <!-- 内容概述 -->
        <div class="content" v-html="history.content"></div>
        <!-- 头像、作者、分类 -->
        <div class="info">
          <img :src="getAvatar(history.avatar)" @click="goPerson" />
          <span @click="goPerson">{{history.author}}</span>
          <span>{{history.category}}</span>
        </div>
      </div>
      <em class="iconfont icon-shanchu" @click="delHistory"></em>
    </div>
  </div>
</template>

<script>
  import { formatTime, getBlogImg } from 'common/utils'
  import { delHistory } from 'network/user'

  export default {
    name: 'HistoryItem',
    props: ['history'],
    computed: {
      // 格式化时间
      format() {
        return formatTime(this.history.readTime, true);
      },
      getBlogImg() {
        return getBlogImg
      },
      getAvatar() {
        return function(avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    methods: {
      // 前往博客详情页
      goDetail() {
        this.$router.push('/blog/' + this.history['_id']);
      },
      // 前往个人主页
      goPerson() {
        this.$router.push('/' + this.history.uid + '/homepage')
      },
      // 删除某条历史记录
      delHistory() {
        delHistory(this.$store.state.id, this.history['_id']).then(res => {
          this.$emit('delHistory');
          this.$store.commit('delHistory', this.history['_id']);
          this.$tip.show('#f0f9eb', '删除成功', 0, '#91c287')
        })
      }
    }
  }
</script>

<style scoped>
  .history-item {
    display: flex;
    height: 123px;
  }

  .h-thread {
    position: relative;
    width: 150px;
    height: 100%;
    padding-left: 20px;
    margin-left: 85px;
    border-left: 1px solid #e5e9ef;
  }

  .h-thread i {
    position: absolute;
    top: 50%;
    left: 0;
    border: 5px solid transparent;
    border-left-color: #e5e9ef;
    transform: translateY(-50%);
  }

  .h-thread span {
    color: #99a2aa;
    font-size: 14px;
    line-height: 123px;
  }

  .h-info {
    position: relative;
    display: flex;
    padding: 10px 0;
    margin-right: 50px;
    flex: 1;
  }

  .h-info>img {
    width: 160px;
    height: 100px;
    margin-right: 30px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    object-fit: cover;
  }

  .h-info>div:last-of-type {
    flex: 1;
    height: 100px;
    border-bottom: 1px solid #e5e9ef;
  }

  h2 {
    width: 400px;
    padding: 5px 0 10px;
    font-size: 14px;
    color: #222;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  h2:hover {
    color: #00b5e5;
  }

  .content {
    width: 500px;
    height: 18px;
    margin-bottom: 18px;
    font-size: 12px;
    line-height: 18px;
    color: #6d757a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info {
    height: 20px;
  }

  .info img {
    float: left;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover
  }

  .info span {
    float: left;
    margin-top: 4px;
    font-size: 12px;
    color: #6d757a;
  }

  .info span:first-of-type {
    cursor: pointer;
  }

  .info span:first-of-type:hover {
    color: #00b5e5;
  }

  .info span:last-child {
    margin-left: 15px;
    padding-left: 15px;
    border-left: 1px solid #e5e9ef;
  }

  em {
    position: absolute;
    top: 30%;
    right: 0;
    font-size: 20px;
    font-weight: 400;
    color: #99a2aa;
    cursor: pointer;
  }

  em:hover {
    color: #00b5e5;
  }

</style>
