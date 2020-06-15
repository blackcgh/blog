<template>
  <div id="new-blog">
    <div>
      <div class="context">
        <!-- 博客标题 -->
        <textarea placeholder="博客标题（30字以内）" :class="{title:blog.title}" v-model="blog.title">
        </textarea>

        <!-- 编辑器 -->
        <div class="editor">
          <quill-editor ref="editor" :options="editorOption" v-model="blog.content" :config="editorOption">
          </quill-editor>
        </div>

        <div class="thread">已输入 {{blog.content.length}} 字</div>

        <!-- 选择专栏 -->
        <div class="category clearfix">
          <div><em>请选择专栏</em>（若不选择，则默认进入生活专栏）：</div>
          <span v-for="(item,index) of categoryName" :key="item" :class="{selected: currentIndex===index}"
                @click="select(item,index)">
            {{item}}
          </span>
        </div>

        <!-- 选择标签 -->
        <div class="tag">
          <div><em>请添加标签</em>（可选）：</div>
          <ul class="clearfix">
            <li v-for="(item,index) of tag" :key="item">
              {{item}}
              <span class="iconfont icon-shanchu" @click="remove(index)"></span>
            </li>
          </ul>
          <input type="text" maxlength="20" @keyup.enter="push" />
          <span class="tip">按回车Enter创建标签</span>
        </div>

        <!-- 更多选项 -->
        <div class="more" ref="more">
          <div ref="option" @click="spread"><em>更多选项</em>（可选）</div>
          <!-- 头图 -->
          <div>
            <input type="file" accept="image/*" @change="selectImg">
            <img ref="img" v-show="formData">
            <i class="iconfont icon-tianjiatupian"></i>
            <span>请添加博客头图（选填）</span>
            <p>支持8MB内的JPG／JPEG／BMP／PNG格式的高清图片</p>
            <p>（建议大于960*540像素）</p>
          </div>
        </div>

        <!-- 确定创建 -->
        <div class="submit" @click="createBlog">提 交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import UpdateBlogVue from './UpdateBlog.vue'

  import { newBlog, uploadBlogImg } from 'network/blog'
  import { titleConfig } from './quill-config'

  export default {
    name: 'NewBlog',
    data() {
      return {
        categoryName: ['生活', '科技', '兴趣', '动画', '游戏', '影视', '轻小说'],
        currentIndex: 0,
        blog: {
          title: '',
          content: '',
          // author: this.$store.state.username,
          // avatar: this.$store.state.avatar,
          createTime: new Date(),
          category: '生活',
          readNum: 0,
          likeNum: 0,
          starNum: 0,
          uid: this.$store.state.id,
        },
        tag: [],
        formData: null, // 头图
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
                        const length = self.quill.getSelection(true).index;
                        self.quill.insertEmbed(length, 'image', res.message);
                        self.quill.setSelection(length + 1);
                        fileInput.value = ''
                      })
                    });
                    this.container.appendChild(fileInput);
                  }
                  fileInput.click();
                }
              }
            }
          }
        }
      }
    },
    computed: {
      getAvatar() {
        return function (avatar) {
          return avatar + '?t=' + Math.random()
        }
      }
    },
    methods: {
      // 选择专栏
      select(item, index) {
        this.blog.category = item;
        this.currentIndex = index;
      },
      // 删除标签
      remove(index) {
        this.tag.splice(index, 1);
      },
      // 添加标签
      push(e) {
        this.tag.push(e.target.value);
        e.target.value = '';
      },
      // 展开更多选项
      spread() {
        this.$refs.option.style.display = 'none';
        this.$refs.more.style.height = '240px'
      },
      // 选择头图
      selectImg(e) {
        if (!this.formData) this.formData = new FormData();
        this.formData.append('headimg', e.target.files[0]);
        this.$refs.img.src = URL.createObjectURL(e.target.files[0])
      },
      // 创建博客
      createBlog() {
        if (this.blog.title.length == 0) {
          this.$notice.show('博客标题不能为空！');
          return
        }
        if (this.blog.title.length > 30) {
          this.$notice.show('博客标题长度不能超过30！');
          return
        }
        if (this.blog.content.length == 0) {
          this.$notice.show('博客正文不能为空！');
          return
        }
        if (!this.formData) this.formData = new FormData();
        this.formData.set('blog', JSON.stringify(this.blog));
        this.formData.set('tag', JSON.stringify(this.tag));
        this.$load.show()
        newBlog(this.formData).then(result => {
          this.$load.hidden();
          this.$router.back();
          if (result.errno === 0) {
            this.$store.commit('updateBlogNum', true);
            this.$store.commit('updateDynamic', true);
            this.$tip.show('#f0f9eb', '发表成功', 0, '#91c287')
          } else {
            this.$tip.show('#fef0f0', '发表失败', 3, '#f56c6c')
          }
        })
      }
    },
    created() {
      document.title = '创作中心 - blackblog';
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
  #new-blog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
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

  .context textarea {
    width: 100%;
    height: 64px;
    font-size: 28px;
    line-height: 64px;
  }

  .context textarea.title {
    color: #222;
    font-weight: 700;
    overflow: hidden;
  }

  .ql-toolbar {
    width: calc(100% + 40px);
    height: 42px;
    margin-left: -20px;
    border: 0 !important;
    background-color: #f1f3f7;
  }

  .ql-toolbar>span {
    margin-right: 17px !important;
  }

  .ql-container {
    width: calc(100% + 20px);
    border: 0 !important;
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
  .tag,
  .more {
    margin-bottom: 30px;
  }

  .category {
    margin-top: 30px;
  }

  .category div,
  .tag div,
  .more div:first-child {
    margin-bottom: 10px;
    font-size: 12px;
    color: #969696;
  }

  .tag ul {
    margin-bottom: 10px;
  }

  .tag li {
    position: relative;
    float: left;
    padding: 0 8px;
    margin-right: 20px;
    background-color: #00a1d6;
    text-align: center;
    color: #fff!important;
    font-size: 14px;
    line-height: 28px;
    border-radius: 15px;
  }

  .tag li span {
    margin-left: 5px;
    color: #fff;
    cursor: pointer;
  }

  .tag li span:hover {
    color: rgb(224, 47, 91);
  }

  .category em,
  .tag em,
  .more em {
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
    font-size: 14px;
    line-height: 30px;
    color: #222;
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

  .more {
    height: 26px;
    overflow: hidden;
    transition: height .2s;
  }

  .more div:first-child {
    cursor: pointer;
  }

  .more div:first-child:after {
    content: '';
    display: inline-block;
    position: relative;
    top: -3px;
    left: 10px;
    width: 7px;
    height: 7px;
    border-right: 2px solid #b8c0cc;
    border-bottom: 2px solid #b8c0cc;
    transform: rotate(45deg);
  }

  .more div:last-child {
    position: relative;
    width: 700px;
    height: 240px;
    padding-top: 80px;
    margin: 30px auto;
    background-color: #f1f2f5;
    color: #99a2aa;
    text-align: center;
    overflow: hidden;
    box-sizing: border-box;
  }

  .more div:last-child:hover {
    background-color: #d5d9dd;
  }

  .more input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }

  .more img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .more i {
    font-size: 40px;
  }

  .more span {
    display: block;
    margin-top: 10px;
    padding: 0 12px;
    font-size: 16px;
    line-height: 20px;
  }

  .more p {
    font-size: 12px;
  }

  .more p:first-of-type {
    margin-top: 10px;
    line-height: 16px;
  }

  .submit {
    width: 140px;
    height: 40px;
    margin: 20px auto 0;
    background-color: #00a1d6;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 50px;
  }

  .submit:hover {
    background-color: #04b7f3;
  }

  .category span.selected {
    background-color: #00a1d6;
    color: #fff;
  }

</style>
