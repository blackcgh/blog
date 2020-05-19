<template>
  <div id="update-blog">
    <div>
      <div class="context">
        <!-- 标题 -->
        <textarea placeholder="博客标题（30字以内）" :class="{title:blog.title}" v-model="blog.title">
        </textarea>

        <!-- 编辑器 -->
        <div class="editor">
          <quill-editor ref="editor" :options="editorOption" v-model="blog.content" :config="editorOption">
          </quill-editor>
        </div>

        <!-- 字数 -->
        <div class="thread">已输入 {{blog.content.length}} 字</div>

        <!-- 专栏 -->
        <div class="category clearfix">
          <div><em>请选择专栏</em>（若不选择，则默认进入生活专栏）：</div>
          <span v-for="(item,index) of categoryName" :key="item" :class="{selected: currentIndex===index}"
                @click="selectColumn(item,index)">
            {{item}}
          </span>
        </div>

        <!-- 标签 -->
        <div class="tag">
          <div><em>请添加标签</em>（可选，还可以添加7个标签）：</div>
          <!-- 横向显示 -->
          <ul class="clearfix">
            <li v-for="(item,index) of tag" :key="index">
              {{item}}
              <span class="iconfont icon-shanchu del" @click="removeTag(index)"></span>
            </li>
          </ul>
          <input type="text" maxlength="20" @keyup.enter="addTag">
          <b class="tip">按回车Enter创建标签</b>
        </div>
        <div class="update" @click="update">更 新</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { updateDetail, updateBlog, uploadBlogImg } from 'network/blog'

  import { titleConfig } from './quill-config'

  export default {
    name: 'UpdateBlog',
    data() {
      return {
        editorOption: {
          placeholder: '博客正文',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{
                  'header': 1
                }, {
                  'header': 2
                }],
                [{
                  'list': 'ordered'
                }, {
                  'list': 'bullet'
                }],
                [{
                  'script': 'sub'
                }, {
                  'script': 'super'
                }],
                [{
                  'indent': '-1'
                }, {
                  'indent': '+1'
                }],
                [{
                  'direction': 'rtl'
                }],
                [{
                  'size': ['small', false, 'large', 'huge']
                }],
                [{
                  'header': [1, 2, 3, 4, 5, 6, false]
                }],
                [{
                  'color': []
                }, {
                  'background': []
                }],
                [{
                  'font': []
                }],
                [{
                  'align': []
                }],
                ['clean'],
                ['link', 'image', 'video']
              ],
              handlers: {
                image() {
                  const self = this;
                  let fileInput = this.container.querySelector('input.ql-image[type=file]');
                  if (fileInput === null) {
                    fileInput = document.createElement('input');
                    fileInput.setAttribute('type', 'file');
                    // 设置图片参数名
                    fileInput.setAttribute('name', 'blogImg');
                    // 可设置上传图片的格式
                    fileInput.setAttribute('accept', 'image/*');
                    fileInput.classList.add('ql-image');
                    // 监听选择文件
                    fileInput.addEventListener('change', () => {
                      // 创建formData
                      const formData = new FormData();
                      formData.append('blogImg', fileInput.files[0]);
                      formData.append('object', 'product');
                      // 图片上传
                      uploadBlogImg(formData).then(res => {
                        console.log(res);

                        const length = self.quill.getSelection(true).index;
                        self.quill.insertEmbed(length, 'image', res.message);
                        self.quill.setSelection(length + 1);
                        fileInput.value = '';
                      })
                    });
                    this.container.appendChild(fileInput);
                  }
                  fileInput.click();
                }
              }
            }
          }
        },
        // 专栏类型
       categoryName: ['生活', '科技', '兴趣', '动画', '游戏', '影视', '轻小说'],
        // 专栏序号
        currentIndex: 0,
        // 博客
        blog: {
          title: '',
          content: '',
          category: '',
        },
        // 标签
        tag: []
      }
    },
    methods: {
      // 输入正文内容
      inputContent(e) {
        this.blog.content = e.target.textContent;
      },
      // 选择专栏
      selectColumn(item, index) {
        this.blog.category = item;
        this.currentIndex = index;
      },
      // 移除标签
      removeTag(index) {
        this.tag.splice(index, 1);
      },
      // 添加标签
      addTag(e) {
        this.tag.push(e.target.value);
        e.target.value = '';
      },
      // 更新博客
      update() {
        this.$load.show();
        const blogs = {
          '_id': this.$route.params.bid,
          title: this.blog.title,
          content: this.blog.content,
          category: this.blog.category,
        }
        updateBlog(blogs, this.tag).then(result => {
          this.$load.hidden();
          if (result.errno === 0) {
            this.$router.replace('/' + this.$store.state.id + '/blog');
            this.$tip.show('#f0f9eb', '修改成功', 0, '#91c287');
          } else {
            alert('error');
            this.$router.replace('/' + this.$store.state.id + '/blog');
            this.$tip.show('#fef0f0', '修改失败', 3, '#f56c6c');
          }
        })
      }
    },
    created() {
      document.title = '博客编辑 - blackblog';
      this.$load.show();
      updateDetail(this.$route.params.bid).then(result => {
        this.$load.hidden();
        if(result.errno === 0) {
          this.blog = result.data[0];
          this.currentIndex = this.categoryName.indexOf(this.blog.category);
          this.blog.tagInfo.forEach(item => {
            this.tag.push(item.content);
          });
        } else {
          this.$tip.show('#fef0f0', '获取内容发生错误', 3, '#f56c6c');
          this.$router.back();
        }
      })
    },
    mounted() {
      autotip: {
        document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
        for (let item of titleConfig) {
          let tip = document.querySelector('.quill-editor ' + item.Choice)
          if (!tip) continue
          tip.setAttribute('title', item.title)
        }
      }
    }
  }

</script>

<style>
  #update-blog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
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

  .context textarea {
    width: 100%;
    height: 64px;
    font-size: 28px;
    line-height: 64px;
  }

  .context textarea.title {
    color: #222;
    font-weight: 700;
  }

  .ql-toolbar {
    width: calc(100% + 40px);
    height: 42px;
    margin-left: -20px;
    border: 0 !important;
    background-color: #f1f3f7;
  }

  .ql-toolbar>span {
    margin-right: 17px!important;
  }

  .ql-container {
    width: calc(100% + 20px);
    border: 0!important;
    font-size: 16px;
  }

  .ql-editor {
    min-height: 500px;
    padding: 15px 20px 0 0;
  }

  .ql-container p {
    padding-bottom: 10px;
  }

  .ql-container em {
    font-style: italic !important;
  }

  .ql-container s {
    text-decoration: line-through;
  }

  .thread {
    padding: 30px 0;
    border-bottom: 1px solid #f1f3f7;
    text-align: right;
    color: #99a2aa;
    font-size: 12px;
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

  .tag ul {
    margin-bottom: 10px;
  }

  .tag li {
    float: left;
    padding: 0 6px;
    margin-right: 10px;
    background: #f6f9fa;
    border: 1px solid #ccd0d7;
    line-height: 20px;
    font-size: 12px;
    border-radius: 4px;
  }

  .tag li:hover {
    color: #00a1d6;
  }

  .tag li span {
    margin-left: 5px;
  }

  .del {
    font-size: 13px;
    cursor: pointer;
  }

  .category em,
  .tag em {
    color: #222;
    font-size: 14px;
  }

  .tag b {
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

  .tag input {
    width: 100px;
    height: 28px;
    padding: 0 15px;
    margin-right: 10px;
    border: 1px solid #ccd0d7;
    border-radius: 20px;
    box-sizing: border-box;
  }

  .tag input:focus {
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
