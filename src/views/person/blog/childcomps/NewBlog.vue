<template>
  <div id="new-blog">
    <div>
      <div class="context">
        <textarea id="title" placeholder="博客标题（30字以内）" v-model="blog.title"></textarea>
        <div id="content" contenteditable="true" @input="input"></div>

        <div class="editor"></div>

        <div class="category clearfix">
          <div><em>请选择专栏</em>（若不选择，则默认进入生活专栏）：</div>
          <span v-for="(item,index) of categoryName"
          :key="item"
          :class="{selected: currentIndex===index}"
          @click="select(item,index)">
            {{item}}
          </span>
        </div>
        <div class="tag">
          <div><em>请添加标签</em>（可选，还可以添加7个标签）：</div>
          <ul class="clearfix">
            <li v-for="(item,index) of tag" :key="item">
              {{item}}
              <span class="del-icon" @click="remove(index)">+</span>
            </li>
          </ul>
          <input type="text" maxlength="20" @keyup.enter="push">
          <span class="tip">按回车Enter创建标签</span>
        </div>
        <div class="submit" @click="createBlog">提 交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { newBlog } from 'network/blog'

  export default {
    name: 'NewBlog',
    data() {
      return {
        categoryName: ['生活', '学习', '代码'],
        currentIndex: 0,
        blog: {
          title: '',
          content: '',
          author: this.$store.state.username,
          createTime: new Date(),
          category: '生活',
          readNum: 0,
          likeNum: 0,
          uid: this.$store.state.id,
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
      createBlog() {
        this.$load.show();

        newBlog(this.blog, this.tag).then(result => {
          this.$load.hidden();

          if (result.errno === 0) {
            this.$router.replace('/' + this.$store.state.id + '/blog');

            this.$tip.show('#f0f9eb', '投稿成功', 0, '#91c287');
          } else {
            this.$router.replace('/' + this.$store.state.id + '/blog');

            this.$tip.show('#fef0f0', '投稿失败', 3, '#f56c6c');
          }
        })
      }
    }
  }

</script>

<style scoped>
  #new-blog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 100;
  }

  #new-blog>div {
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

  #title {
    width: 100%;
    height: 64px;
    margin-bottom: 37px;
    font-size: 28px;
    line-height: 64px;
    font-weight: 700;
  }

  #content {
    width: 100%;
    min-height: 300px;
    padding: 10px 0 69px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e5e9ef;
    font-size: 16px;
    color: #999;
  }

  #content:empty::before {
    content: '博客正文'
  }

  #content:focus {
    color: #000;
  }

  #content:focus::before {
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
    position: relative;
    float: left;
    padding: 0 5px 5px 10px;
    margin-right: 20px;
    background-color: #00a1d6;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 15px;
  }

  .tag li span {
    display: inline-block;
    width: 15px;
    height: 15px;
    font-size: 20px;
    color: #fff;
    border-radius: 50%;
    transform: translateY(3px) rotate(45deg);
  }

  .tag li span:hover {
    color: #000;
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


  .submit {
    width: 100px;
    height: 30px;
    margin: 20px auto 0;
    background-color: #00a1d6;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 15px;
  }

  .submit:hover {
    background-color: #2081bd;
  }

  .selected {
    background-color: #00a1d6;
    color: #fff;
  }

</style>
