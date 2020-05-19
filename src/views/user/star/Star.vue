<template>
  <div id="star" class="clearfix">
    <!-- 导航菜单 -->
    <div class="star-aside">
      <!-- 新建 -->
      <div>
        {{getText}}
        <!-- 新建收藏夹 -->
        <em class="new" @click.stop="add" title="新建收藏夹" v-if="getFlag"><i>+</i></em>
        <!-- 新建框 -->
        <div class="star-mask" v-show="isShow">
          <div class="star-new">
            <h2>收藏夹信息</h2>
            <label>收藏夹名称</label>
            <input type="text" placeholder="请输入名称" v-model="name">
            <b class="len">{{name.length}}/10</b>
            <div class="public" @click="change">
              <ins :class="{select: isPublic}"></ins>
              公开收藏夹
            </div>
            <div class="submit" @click="submit">提交</div>
            <!-- 取消 -->
            <div class="cancel" @click="cancel">+</div>
          </div>
        </div>
      </div>
      <!-- 菜单 -->
      <ul ref="ul">
        <li v-for="(item,index) of getFav"
            :key="item['_id']" class="clearfix"
            :class="{current: getCurrent(index)}"
            @click="itemClick(index)"
            @mouseover="enter(index)"
            @mouseout="leave(index)">
          <!-- 菜单项 -->
          <h3>{{item.name}}</h3>
          <!-- 收藏数目 -->
          <span :style="{color: (getCurrent(index)?'#fff':'')}" class="num" v-show="!getNow(index) || !getFlag">
            {{getFav[index].favorite.length}}
          </span>
          <!-- 选项操作 -->
          <span class="iconfont num star-operator" :style="{color: (getCurrent(index)?'#fff':'')}"
                v-show="getNow(index)" v-if="getFlag">
            &#xe6f8;
            <!-- 选项 -->
            <div class="star-option">
              <div @click.stop="edit(index)">编辑信息</div>
              <div v-if="index!=0" @click.stop="remove(item.name,index)">删除</div>
            </div>
          </span>
        </li>
      </ul>
    </div>

    <!-- 删除收藏夹提示 -->
    <message :show="show" :showData="showData" @success="success"></message>

    <!-- 视图组件 -->
    <div class="star-content">
      <div v-if="getFav.length">
        <h4 class="star-name">{{getFavName}}</h4>
        <div v-if="starBlog.length">
          <recommend
            v-for="(item,index) of starBlog"
            :key="index"
            :item="item"
            :showAuthor="false"
            :showOption="getFlag">
            <ul v-if="getFlag">
              <li @click="moveStar(index)">移动到</li>
              <li @click="delStar(index)">取消收藏</li>
            </ul>
          </recommend>
          <!-- 收藏框 -->
            <add-star
              v-if="showStar"
              :bid="getBid(moveIndex)"
              :select="currentIndex"
              @cancel="cancelStar"
              @success="finish(moveIndex)">
            </add-star>
        </div>
        <div v-else class="none">
          <div v-if="isLoad">loading...</div>
          <div v-else>该收藏夹还没有博客~</div>
        </div>
      </div>
      <div class="none" v-else>TA设置了访问权限~</div>
    </div>
  </div>
</template>

<script>
  import Recommend from 'components/content/maincontent/Recommend'
  import Message from 'components/common/toast/Message'
  import AddStar from 'components/content/addstar/AddStar'

  import { addFavorite, updateFavorite, delStar } from 'network/user'
  import { getStarBlog, starBlog, delAllStar } from 'network/blog'

  export default {
    name: 'Star',
    data() {
      return {
        // 菜单项点击后记录序号
        currentIndex: 0,
        // 经过、离开菜单项记录序号
        nowIndex: -1,
        // 是否显示新建框
        isShow: false,
        // 是否隐藏对应的span
        isHidden: false,
        // 新建收藏夹名称
        name: '',
        // 新建收藏夹是否公开，默认true
        isPublic: true,
        // 传给message，是否显示
        show: false,
        // 传给message的数据
        showData: {
          title: '',
          index: -1,
          confirm: 'favorite'
        },
        // 确定新建和修改
        status: 'add',
        // 修改收藏夹时记录序号
        index: -1,
        // 动态获取相应的博客
        starBlog: [],
        // 是否显示收藏框
        showStar: false,
        // 移动的博客序号
        moveIndex: -1,
        // 显示加载图标
        isLoad: true
      }
    },
    computed: {
      // 确认是本人还是他人
      getFlag() {
        return this.$route.path.indexOf(this.$store.state.id) != -1 && this.$store.state.id != ''
      },
      getText() {
        if (this.getFlag) return '我的收藏';
        return 'TA的收藏'
      },
      // 确认用户信息
      getUserData() {
        if (this.getFlag) {
          return {
            star: this.$store.state.star
          }
        }
        return this.$store.state.userData
      },
      // 获取收藏夹列表
      getFav() {
        if(this.getFlag) return this.getUserData.star;
        const publicFav = [];
        this.getUserData.star.forEach(el => {
          if(el.public) {
            publicFav.push(el)
          }
        })
        return publicFav
      },
      // 显示点击的收藏夹名称
      getFavName() {
        if (this.getFav[this.currentIndex]) return this.getFav[this.currentIndex].name;
        return ''
      },
      // 获取点击时菜单项序号
      getCurrent() {
        return function (index) {
          return this.currentIndex == index
        }
      },
      // 获取经过、离开时菜单项序号
      getNow() {
        return function (index) {
          return this.nowIndex == index
        }
      },
      // 获取收藏博客id
      getBid() {
        return function (index) {
          if(this.moveIndex == -1) return '';
          return this.starBlog[index]['_id']
        }
      },
    },
    watch: {
      '$route.params.userId': function () {
        this.getStarBlog(0)
      }
    },
    components: {
      Recommend,
      Message,
      AddStar
    },
    methods: {
      // 切换收藏夹
      itemClick(index) {
        this.currentIndex = index;
        this.getStarBlog(index)
      },
      // 经过菜单项
      enter(index) {
        this.nowIndex = index
      },
      // 离开菜单项
      leave(index) {
        this.nowIndex = -1
      },
      // 显示新建框
      add() {
        this.status = 'add';
        this.name = '';
        this.isPublic = true;
        this.isShow = true
      },
      // 编辑收藏夹信息
      edit(index) {
        this.status = 'update';
        this.index = index;
        this.name = this.$store.state.star[index].name;
        this.isPublic = this.$store.state.star[index].public;
        this.isShow = true
      },
      // 改变公开状态
      change() {
        this.isPublic = !this.isPublic
      },
      // 关闭新建框
      cancel() {
        this.isShow = false
      },
      // 显示删除框
      remove(title, index) {
        this.showData.title = title;
        this.showData.index = index;
        this.show = Math.random() // 随机数，确定每次都触发监视器
      },
      // 新建和修改收藏夹
      submit() {
        if (this.name == '') {
          this.$tip.show('#edf2fc', '收藏夹名称不能为空', 1, '#909399')
        } else if (this.name.length > 10) {
          this.$tip.show('#edf2fc', '收藏夹名称长度不能超过 10', 1, '#909399');
        } else {
          if (this.status == 'add') { // 新建收藏夹
            const newFavorite = {
              name: this.name,
              public: this.isPublic,
              favorite: []
            }
            addFavorite(this.$store.state.id, newFavorite).then(res => {
              if (res.errno == 0) {
                this.name = '';
                this.$tip.show('#f0f9eb', '添加成功', 0, '#91c287');
                this.$store.commit('addFavorite', res.data);
                this.isShow = false
              } else {
                this.$tip.show('#fef0f0', '添加失败', 3, '#f56c6c')
              }
            })
          } else if (this.status == 'update') { // 修改收藏夹
            const newFavorite = {
              name: this.name,
              p: this.isPublic
            }
            const fid = this.$store.state.star[this.index]['_id'];
            updateFavorite(fid, newFavorite).then(res => {
              if (res.errno == 0) {
                this.name = '';
                this.$tip.show('#f0f9eb', '修改成功', 0, '#91c287');
                this.$store.commit('updateFavorite', {
                  fid,
                  newFavorite
                });
                this.isShow = false
              } else {
                this.$tip.show('#fef0f0', '添加失败', 3, '#f56c6c')
              }
            })
          }
        }
      },
      // 删除收藏夹成功
      success(index) {
        if (this.currentIndex == index) { // 删除选中的
          this.currentIndex = 0;
          this.getStarBlog(0)
        } else if (this.currentIndex > index) { // 删除小于选中的
          this.currentIndex--
        }
        // 取消该收藏夹下的所有博客
        const bids = this.$store.state.star[index].favorite;
        if (bids.length != 0) {
          delAllStar(bids, this.$store.state.id)
        }
      },
      // 移动收藏
      moveStar(index) {
        this.moveIndex = index;
        this.showStar = true
      },
      // 取消收藏
      delStar(index) {
        const fid = this.$store.state.star[this.currentIndex]['_id'];
        const bid = this.starBlog[index]['_id'];
        delStar(fid, bid).then(res => {
          if (res.errno == 0) {
            this.$store.commit('delStar', {
              select: this.currentIndex,
              bid
            })
            this.finish(index);
            this.$tip.show('#f0f9eb', '取消成功', 0, '#91c287');
          } else {
            this.$tip.show('#fef0f0', '取消失败', 3, '#f56c6c')
          }
        })
      },
      // 隐藏收藏框组件
      cancelStar() {
        this.showStar = false
      },
      // 只有取消收藏
      finish(index) {
        this.starBlog[index].starNum--;
        const {
          '_id': bid,
          starNum
        } = this.starBlog[index];
        starBlog(bid, starNum, this.$store.state.id).then(res => {
          this.starBlog.splice(index, 1)
        })
      },
      // 获取收藏博客
      getStarBlog(index) {
        const bids = this.getFav[index].favorite;
        this.starBlog = [];
        this.isLoad = true;
        if (bids.length != 0) {
          getStarBlog(bids).then(res => {
            this.isLoad = false;
            this.starBlog = res.data
          })
        } else {
          this.isLoad = false
        }
      }
    },
    created() {
     if(this.getFav.length) this.getStarBlog(0);
    }
  }

</script>

<style scoped>
  #star {
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
  }

  .star-aside {
    float: left;
    width: 230px;
    height: 100%;
  }

  .star-aside>div {
    position: relative;
    padding: 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #99a2aa;
  }

  .new {
    position: absolute;
    top: 14px;
    right: 10px;
    width: 20px;
    height: 20px;
    background-color: #b5bfc8;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
  }

  .new:hover {
    background-color: #99a2aa;
  }

  .new i {
    font-size: 20px;
    color: #fff;
  }

  li {
    position: relative;
    height: 50px;
    padding: 0 15px;
    line-height: 50px;
    cursor: pointer;
  }

  h3 {
    float: left;
  }

  .num {
    float: right;
    width: 15px;
    height: 50px;
    padding: 0 !important;
    font-size: 14px;
    color: #99a2aa;
    text-align: center;
    font-weight: 700;
  }

  li:hover {
    background-color: #f4f5f7;
    color: #00a1d6;
  }

  li.current {
    background-color: #00a1d6;
    color: #fff;
  }

  .star-content {
    float: right;
    width: 760px;
    min-height: 500px;
    padding: 15px;
    padding-left: 27px;
    border-left: 1px solid #eee;
  }

  div.star-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10;
  }

  .star-new {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 410px;
    padding: 20px;
    background-color: #fff;
    transform: translate(-50%, -50%)
  }

  h2 {
    height: 30px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    line-height: 30px;
    font-size: 16px;
    color: #000;
    text-align: center;
  }

  label {
    color: #222;
  }

  input {
    width: 410px;
    height: 30px;
    padding: 0 12px;
    margin-top: 8px;
    border: 1px solid #ccd0d7;
    font-size: 14px;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #00a1d6;
  }

  .len {
    position: absolute;
    top: 102px;
    right: 32px;
    font-weight: 400;
  }

  .public {
    width: 85px;
    height: 12px;
    margin-top: 10px;
    font-size: 12px;
    color: #6d757a;
    cursor: pointer;
  }

  .public ins {
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 4px;
    border: 1px solid #d4d8dd;
    vertical-align: top;
  }

  .public ins::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: 8px;
    height: 3px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(-45deg);
  }

  ins.select {
    border-color: #00a1d6;
    background-color: #00a1d6;
  }

  .submit {
    width: 65px;
    height: 32px;
    margin: 10px auto 0;
    background-color: #00a1d6;
    line-height: 32px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
  }

  .submit:hover {
    background-color: #03bbf8;
  }

  .cancel {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 26px;
    cursor: pointer;
    transform: rotate(45deg);
  }

  .cancel:hover {
    color: #f1563b;
  }

  .star-name {
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    font-size: 20px;
  }

  .star-option {
    display: none;
    position: absolute;
    top: 49px;
    right: 0;
    background-color: #fff;
    font-weight: 400;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .14);
    z-index: 1;
  }

  .star-option div {
    width: 60px;
    height: 45px;
    padding: 0 20px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #222;
  }

  .star-operator:hover .star-option {
    display: block;
  }

  .star-option div:hover {
    background-color: #e5e9ef;
    color: #00a1d6;
  }

  .none {
    padding: 50px 0;
    text-align: center;
    font-size: 14px;
    color: #969696;
  }

</style>
