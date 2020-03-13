<template>
  <div id="update-blog">
    <div>
      <div class="context">
        <textarea id="update-title" placeholder="博客标题（30字以内）" v-model="blog.title"></textarea>
        <div id="update-content" contenteditable="true" @input="input">{{blog.content}}</div>

        <div class="editor"></div>

        <div class="category clearfix">
          <div><em>请选择专栏</em>（若不选择，则默认进入生活专栏）：</div>
          <span v-for="(item,index) of categoryName" :key="item" :class="{selected: currentIndex===index}"
                @click="select(item,index)">
            {{item}}
          </span>
        </div>
        <div class="tag">
          <div><em>请添加标签</em>（可选，还可以添加7个标签）：</div>
          <ul class="clearfix">
            <li v-for="(item,index) of tag" :key="index">
              {{item}}
              <span @click="remove(index)"><b class="iconfont">&#xe63d;</b></span>
            </li>
          </ul>
          <input type="text" maxlength="20" @keyup.enter="push">
          <span class="tip">按回车Enter创建标签</span>
        </div>
        <div class="update" @click="update">更 新</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getDetail,
    updateBlog
  } from 'network/blog'

  export default {
    name: 'UpdateBlog',
    data() {
      return {
        categoryName: ['生活', '学习', '代码'],
        currentIndex: 0,
        blog: {
          title: '',
          content: '',
          category: '',
        },
        tag: []
      }
    },
    methods: {
      input(e) {
        this.blog.content = e.target.textContent;
      },
      select(item, index) {
        this.blog.category = item;
        this.currentIndex = index;
      },
      remove(index) {
        this.tag.splice(index, 1);
      },
      push(e) {
        this.tag.push(e.target.value);
        e.target.value = '';
      },
      update() {
        const blogs = {}
        blogs['_id'] = this.$route.params.bid;
        blogs.title = this.blog.title;
        blogs.content = this.blog.content;
        blogs.category = this.blog.category;
        updateBlog(blogs,this.tag).then(result => {
          if (result.errno === 0) {
            this.$router.replace('/' + this.$store.state.id + '/blog');
          } else {
            alert('error');
            this.$router.replace('/' + this.$store.state.id + '/blog');
          }
        })
      }
    },
    created() {
      getDetail(this.$route.params.bid).then(result => {
        if(result.errno === 0) {
          this.blog = result.data[0];
          this.currentIndex = this.categoryName.indexOf(this.blog.category);
          this.blog.tagInfo.forEach(item => {
            this.tag.push(item.content);
          });
        } else {
          alert('error');
        }
      })
    }
  }

</script>

<style scoped>
  #update-blog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 100;
  }

  #update-blog>div {
    height: 605px;
    padding: 15px 0;
    overflow: auto;
  }

  .context {
    position: relative;
    width: 85%;
    margin: 0 auto;
    padding: 0 20px 20px;
    border: 1px solid #e5e9ef;
    border-radius: 5px;
  }

  #update-title {
    width: 100%;
    height: 64px;
    margin-bottom: 37px;
    font-size: 28px;
    line-height: 64px;
    font-weight: 700;
  }

  #update-content {
    width: 100%;
    min-height: 300px;
    padding: 10px 0 69px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e5e9ef;
    font-size: 16px;
    color: #999;
  }

  #update-content:empty::before {
    content: '博客正文'
  }

  #update-content:focus {
    color: #000;
  }

  #update-content:focus::before {
    content: '';
  }

  .editor {
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    height: 42px;
    background-color: #f1f3f7;
  }

  .category,
  .tag {
    margin-bottom: 30px;
  }

  .category div,
  .tag div {
    margin-bottom: 10px;
    font-size: 12px;
    color: #969696;
  }

  ul {
    margin-bottom: 10px;
  }

  .tag li {
    float: left;
    position: relative;
    height: 30px;
    padding: 0 15px;
    margin-right: 20px;
    background-color: #00a1d6;
    text-align: cneter;
    color: #fff;
    font-size: 12px;
    line-height: 30px;
    border-radius: 15px;
  }

  .tag li span {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #969696;
  }

  .tag li b {
    position: absolute;
    top: -7px;
    left: 0;
    color: #fff;
    font-size: 15px;
  }

  .category em,
  .tag em {
    color: #222;
    font-size: 14px;
  }

  .tag span {
    color: #969696;
    font-size: 12px;
  }

  .category span {
    float: left;
    height: 30px;
    margin-right: 10px;
    padding: 0 10px;
    border: 1px solid #ccc;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
  }

  .category span:hover {
    background-color: #00a1d6;
    color: #fff;
  }

  input {
    width: 100px;
    height: 28px;
    padding: 0 15px;
    margin-right: 10px;
    border: 1px solid #ccd0d7;
    border-radius: 20px;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #00a1d6;
  }

  .tip {
    font-size: 14px;
    color: #969696;
  }


  .update {
    width: 100px;
    height: 30px;
    margin: 20px auto 0;
    background-color: #00a1d6;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 15px;
  }

  .update:hover {
    background-color: #2081bd;
  }

  .selected {
    background-color: #00a1d6;
    color: #fff;
  }

</style>
