<template>
  <div id="myblog">
    <div v-if="sliceList.length">
      <recommend v-for="(item,index) of sliceList"
      :key="index['_id']"
      :item="item"
      :showAuthor="false"
      :class="{delete: deleteIndex === index}">
        <template>
          <div class="editor" :class="{isSelect: select}">
            <span @click.stop="updateBlog(item['_id'])">修改</span>
            <span @click.stop="delBlog(index)">删除</span>
          </div>
          <message :isShowMessage="currentIndex === index">
            <i class="iconfont icon-wuuiconsuotanhao alarm"></i>
            <b>此操作将永久删除博客《{{item.title}}》，是否继续？</b>
            <template v-slot:first><em @click.stop="cancel(index)">取消</em></template>
            <template v-slot:second><em @click.stop="confirm(item['_id'])">确定</em></template>
          </message>
        </template>
      </recommend>
      <div class="more" v-if="num>3" @click="showMore" title="more">...</div>
    </div>
    <div class="empty" v-else>空空如也~</div>
  </div>
</template>

<script>
  import Recommend from 'components/content/maincontent/Recommend'
  import Message from 'components/common/toast/Message'

  import { getList, delBlog } from 'network/blog'

  export default {
    name: 'Myblog',
    data() {
      return {
        list: [], // 博客列表
        num: 0, // 博客数目
        isMore: false, // 是否显示更多
        currentIndex: -1, // 删除提示
        deleteIndex: -1
      }
    },
    props: {
      select: false
    },
    computed: {
      sliceList() {
        if(this.isMore) {
          this.num = 0;
          return this.list;
        }
        this.num = this.list.length;
        return this.list.slice(0, 3);
      }
    },
    components: {
      Recommend,
      Message
    },
    methods: {
      updateBlog(bid) {
        this.$router.push('/' + this.$store.state.id + '/blog/update/' + bid);
      },
      delBlog(index) {
        this.currentIndex = index;
      },
      cancel(index) {
        this.currentIndex = -1;
      },
      confirm(bid) {
        this.$load.show();

        // 删除指定博客
        delBlog(bid).then(data => {
          this.currentIndex = -1;

          this.$load.hidden();

          if(data.errno === 0) {
            this.list.splice(this.currentIndex, 1);

            this.$tip.show('#f0f9eb', '删除成功', 0, '#91c287');
          } else if(data.errno === -1) {
            this.$tip.show('#fef0f0', '删除失败', 3, '#f56c6c');
          } else {
            this.$tip.show('#fef0f0', '删除发生错误', 3, '#f56c6c');
          }
        })
      },
      showMore() {
        this.isMore = true;
      }
    },
    created() {
      this.$load.show();

      // 获取自己的博客列表
      getList(this.$store.state.id).then(data => {
        this.$load.hidden();

        if(data.errno === 0) {
          this.list = data.data.reverse();
          this.$store.commit('updateTag', this.list);
        } else if(data.errno === -1) {
          alert('获取失败');
        }
      })
    },
    destroyed() {
      this.$store.commit('updateTag');
    }
  }

</script>

<style scoped>
  .editor {
    position: absolute;
    top: 0;
    right: -155px;
    width: 155px;
    height: 25px;
    transition: right .4s;
    text-align: center;
  }

  .editor>span {
    display: inline-block;
    width: 60px;
    height: 20px;
    margin: 5px 5px 0 10px;
    background-color: #f1ab3b;
    line-height: 22px;
    color: #fff;
    border-radius: 15px;
    transition: all .3s;
  }

  .editor>span:hover {
    transform: scale(1.2, 1.2);
  }

  i {
    position: relative;
    top: 3px;
    margin-right: 10px;
    font-size: 20px;
  }

  b {
    font-weight: normal;
    font-size: 14px;
  }

  em {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }

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
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

  .delete {
    display: none;
  }

  .show {
    z-index: 1000;
  }

  .drop {
    top: 0;
  }

  .isSelect {
    right: 0;
  }

  .alarm {
    color: #ff9900;
  }

</style>
