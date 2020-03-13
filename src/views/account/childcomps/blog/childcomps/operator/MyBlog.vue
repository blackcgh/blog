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
          <div class="mask" :class="{show: currentIndex === index}">
            <div class="exit">
              <div class="prompt" :class="{drop: currentIndex === index}">
                <p>确定要删除博客《{{item.title}}》？</p>
                <span @click.stop="cancel(index)">取消</span>
                <span @click.stop="confirm(item['_id'])">确定</span>
              </div>
            </div>
          </div>
        </template>
      </recommend>
      <div class="more" v-if="num>3" @click="showMore" title="more">...</div>
    </div>
    <div class="empty" v-else>空空如也~</div>
  </div>
</template>

<script>
  import Recommend from 'components/content/maincontent/Recommend'

  import { getList, delBlog } from 'network/blog'

  export default {
    name: 'Myblog',
    data() {
      return {
        list: [], // 博客列表
        num: 0, // 博客数目
        isMore: false, // 是否显示更多
        currentIndex: -1, // 删除提示
        deleteIndex: -1,
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
      Recommend
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
        // 删除指定博客
        delBlog(bid).then(data => {
          if(data.errno === 0) {
            this.list.splice(this.currentIndex, 1);
            this.currentIndex = -1;
          } else if(data.errno === -1) {
            alert('删除失败');
          } else {
            alert('error');
          }
        })
      },
      showMore() {
        this.isMore = true;
      }
    },
    created() {
      // 获取自己的博客列表
      getList(this.$store.state.id).then(data => {
        if(data.errno === 0) {
          this.list = data.data.reverse();
          this.$store.commit('saveTag', this.list);
        } else if(data.errno === -1) {
          alert('获取失败');
        }
      })
    },
    destroyed() {
      this.$store.commit('saveTag');
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

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    z-index: -1;
    transition: all .3s;
  }

  .exit {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 150px;
    overflow: hidden;
    transform: translate(-50%, -50%);
    border-radius: 5px;
  }

  .prompt {
    position: absolute;
    top: -150px;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 40px 20px;
    background-color: #fff;
    text-align: center;
    box-sizing: border-box;
    transition: all .3s;
  }

  .prompt p {
    margin-bottom: 30px;
    color: #999;
  }

  .prompt span {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    color: #999;
    cursor: pointer;
  }

  .prompt span:last-child {
    margin-left: 20px;
    background-color: rgb(240, 94, 57);
    color: #fff;
    border-radius: 15px;
  }

  .prompt span:last-child:hover {
    background-color: #f00;
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



</style>
