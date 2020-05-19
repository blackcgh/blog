<template>
  <div id="myblog">
    <!-- 博客列表 -->
    <div v-if="sliceList.length">
      <!-- 博客项 -->
      <recommend
        v-for="(item,index) of sliceList"
        :key="index['_id']"
        :item="item"
        :showAuthor="false"
        :showOption="true">
        <!-- 选项 -->
        <ul>
          <li @click.stop="updateBlog(item['_id'])">编辑</li>
          <li @click.stop="delBlog(item.title,item['_id'],index)">删除</li>
        </ul>
      </recommend>
      <div class="more" v-if="num>3" @click="showMore" title="更多">...</div>
    </div>

    <!-- 博客为空 -->
    <div class="empty" v-else>
      <div v-if="isLoad">loading...</div>
      <div v-else>你还没有写过博客呢~<em @click="writeBlog">立即去写</em></div>
    </div>

    <!-- 删除提示 -->
    <message :show="isShow" :showData="showData" @success="success"></message>
  </div>
</template>

<script>
  import Recommend from 'components/content/maincontent/Recommend'
  import Message from 'components/common/toast/Message'

  import { getList } from 'network/blog'

  export default {
    name: 'Myblog',
    data() {
      return {
        blogList: [],
        num: 0, // 博客数目
        isMore: false, // 是否显示更多
        isShow: false, // 传给message，是否显示
        showData: {    // 传给message的数据
          title:'',
          bid: '',
          index: -1,
          confirm: 'blog'
        },
        // 显示加载图标
        isLoad: true
      }
    },
    computed: {
      // 一开始只显示3个博客
      sliceList() {
        // const list = this.$store.state.blogList;
        if (this.isMore) {
          this.num = 0;
          return this.blogList;
        }
        this.num = this.blogList.length;
        return this.blogList.slice(0, 3);
      }
    },
    components: {
      Recommend,
      Message
    },
    methods: {
      // 修改博客
      updateBlog(bid) {
        this.$router.push({
          path: '/' + this.$store.state.id + '/blog/update/' + bid,
          bid
        });
      },
      // 删除博客，显示删除提示框
      delBlog(title, bid, index) {
        this.showData.title = title;
        this.showData.bid = bid;
        this.showData.index = index;
        this.isShow = Math.random()   // 随机数，确定每次都触发监视器
      },
      // 确认删除博客
      success() {
        this.blogList.splice(this.showData.index, 1)
      },
      // 显示更多
      showMore() {
        this.isMore = true;
      },
      // 写博客
      writeBlog() {
        this.$router.push('/' + this.$store.state.id + '/blog/new')
      }
    },
    // 获取自己的博客列表
    created() {
      getList(this.$store.state.id).then(res => {
        this.isLoad = false;
        if (res.errno === 0) {
          this.blogList = res.data
        } else if (res.errno === -1) {
          this.$tip.show('#fef0f0', '获取失败', 3, '#f56c6c')
        }
      })
    }
  }

</script>

<style scoped>
  .more {
    width: 100px;
    height: 30px;
    margin: 0 auto;
    background-color: #ecf1f5;
    font-size: 33px;
    color: #f1563b;
    text-align: center;
    line-height: 15px;
    border-radius: 15px;
  }

  .more:hover {
    background-color: #f1563b;
    color: #fff;
  }

  .empty {
    padding: 50px 0;
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

  em {
    margin-left: 10px;
    color: #00a1d6;
    cursor: pointer;
  }

  em:hover {
    color: #f25d8e;
  }

</style>
