<template>
  <div class="add-star" @click="blur">
    <div class="collect">
      <h3>添加到收藏夹</h3>
      <!-- 收藏列表 -->
      <ul>
        <li
          v-for="(item,index) of $store.state.star"
          :key="item['_id']"
          @click="itemClick(index)">
          <!-- 图标 -->
          <i :class="{select: selected==index}"></i>
          <!-- 收藏夹名称 -->
          {{item.name}}
          <!-- 数目 -->
          <em>{{$store.state.star[index].favorite.length}}</em>
        </li>
      </ul>
      <!-- 新建框 -->
      <div class="add">
        <input type="text"
               placeholder="新建收藏夹"
               :class="{focus:isFocus}"
               v-model="name"
               @click.stop="focus"
               @keyup.enter="addFavorite" />
        <b>{{name.length}}/10</b>
        <div :class="{show: isFocus,close:isClose}">
          输入后点击回车创建
          <ins @click.stop="close">+</ins>
        </div>
      </div>
      <div class="submit" :class="{selected:getSelected}" @click="submit">确定</div>
      <!-- 关闭收藏框 -->
      <div class="cancel" @click="cancel">+</div>
    </div>
  </div>
</template>

<script>
  import { addFavorite, addStar, delStar } from 'network/user'

  export default {
    name: 'AddStar',
    data() {
      return {
        // 选中收藏夹
        selected: this.select,
        // 是否获得焦点
        isFocus: false,
        // 关闭提示
        isClose: false,
        // 新建收藏夹名称
        name: ''
      }
    },
    props: ['select', 'bid'],
    computed: {
      getSelected() {
        if(this.selected != -1 && this.selected != this.select) {    // 添加、移动收藏
          return 1
        } else if(this.selected == -1 && this.select != -1) {    // 取消收藏
          return -1
        } else {      // 没有变化
          return 0
        }
      }
    },
    methods: {
      // 记录点击的收藏夹
      itemClick(index){
        if(this.selected != index) {
          this.selected = index
        } else {
          this.selected = -1
        }
      },
      // 添加新的收藏夹
      addFavorite() {
        if(this.name == '') {
          this.$tip.show('#edf2fc', '收藏夹名称不能为空', 1, '#909399')
        } else if(this.name.length > 10) {
          this.$tip.show('#edf2fc', '收藏夹名称长度不能超过 10', 1, '#909399');
        } else {
          const newFavorite = {
            name: this.name,
            public: true,
            favorite: []
          };
          addFavorite(this.$store.state.id, newFavorite).then(res => {
            if(res.errno == 0) {
              this.name = '';
              this.$tip.show('#f0f9eb', '添加成功', 0, '#91c287');
              this.$store.commit('addFavorite', res.data)
            } else {
              this.$tip.show('#fef0f0', '添加失败', 3, '#f56c6c')
            }
          })
        }
      },
      // 确定、取消添加博客，改变存放收藏夹
      submit() {
        if(this.getSelected == 1) {           // 确定添加、移动
          const fid = this.$store.state.star[this.selected]['_id'];
          const ofid = this.select != -1 ? this.$store.state.star[this.select]['_id'] : '';
          addStar(fid, ofid, this.bid).then(res => {
            if(res.errno == 0) {
              this.$store.commit('addStar', {
                selected: this.selected,
                select: this.select,
                bid: this.bid
              })
              if(this.select == -1) {   // 改变存放位置时不用触发
                this.$emit('success');
              }
              this.$emit('cancel');
              this.$tip.show('#f0f9eb', '添加成功', 0, '#91c287')
            } else {
              this.$tip.show('#fef0f0', '添加失败', 3, '#f56c6c')
            }
          })
        } else if(this.getSelected == -1) {   // 取消添加
          const fid = this.$store.state.star[this.select]['_id'];
          delStar(fid, this.bid).then(res => {
            if(res.errno == 0) {
              this.$store.commit('delStar', {
                select: this.select,
                bid: this.bid
              })
              this.$emit('success');
              this.$emit('cancel');
              this.$tip.show('#f0f9eb', '取消成功', 0, '#91c287')
            } else {
              this.$tip.show('#fef0f0', '取消失败', 3, '#f56c6c')
            }
          })
        }
      },
      // 关闭收藏框
      cancel() {
        this.$emit('cancel')
      },
      // 输入框获取焦点
      focus() {
        this.isFocus = true
      },
      // 输入框失去焦点
      blur() {
        this.isFocus = false
      },
      // 关闭提示框
      close() {
        this.isClose = true
      }
    }
  }

</script>

<style scoped>
  .add-star {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10;
  }

  .collect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    height: 430px;
    background-color: #fff;
    font-size: 16px;
    transform: translate(-50%, -50%);
  }

  h3 {
    height: 50px;
    padding: 0 19px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 8px;
    line-height: 50px;
    text-align: center;
    color: #000;
  }

  .collect ul {
    height: 245px;
    padding: 0 36px;
    overflow: auto;
  }

  .collect li {
    position: relative;
    height: 45px;
    padding-left: 42px;
    font-size: 14px;
    line-height: 45px;
    color: #222;
    text-align: left;
    cursor: pointer;
  }

  .collect i {
    position: absolute;
    top: 11px;
    left: -1px;
    width: 20px;
    height: 20px;
    border: 1px solid #d4d8dd;
    border-radius: 3px;
    z-index: -1;
  }

  .collect i::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 2px;
    width: 13px;
    height: 5px;
    border-bottom: 3px solid #fff;
    border-left: 3px solid #fff;
    transform: rotate(-45deg);
  }

  li:hover {
    color: #00a1d6;
  }

  li:hover i {
    border-color: #00a1d6;
  }

  li i.select {
    border-color: #00a1d6;
    background-color: #00a1d6;
  }

  li em {
    float: right;
    color: #6d757a;
    font-size: 12px;
  }

  .add {
    position: relative;
    padding-bottom: 5px;
    border-bottom: 1px solid #e5e9ef;
    text-align: center;
    color: #757575;
  }

  .add::before {
    content: '+';
    position: absolute;
    top: 3px;
    left: 45px;
    font-size: 26px;
  }

  .add input {
    width: 278px;
    height: 34px;
    padding: 0 34px;
    border: 1px solid #d4d8dd;
    line-height: 34px;
    font-size: 12px;
    border-radius: 4px;
  }

  .add input:hover {
    border-color: #00a1d6;
  }

  input.focus {
    border-color: #00a1d6;
  }

  b {
    position: absolute;
    top: 14px;
    right: 45px;
    font-weight: 400;
    font-size: 12px;
  }

  .add div {
    display: none;
    position: absolute;
    top: -40px;
    left: 70px;
    padding: 10px 20px 10px 10px;
    background-color: #00a1d6;
    color: #fff;
    font-size: 12px;
    border-radius: 3px;
  }

  .add div::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 15px;
    border-bottom: 8px solid #00a1d6;
    border-left: 8px solid #00a1d6;
    transform: rotate(-45deg)
  }

  .add div ins {
    position: absolute;
    top: 6px;
    right: 5px;
    font-size: 18px;
    cursor: pointer;
    transform: rotate(45deg);
  }

  div.show {
    display: block;
  }

  div.close {
    display: none !important;
  }

  .submit {
    width: 160px;
    height: 40px;
    margin: 20px auto 0;
    background-color: #e5e9ef;
    color: #b8c0cc;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }

  .selected {
    background-color: #00a1d6;
    color: #fff;
  }

  .cancel {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 26px;
    cursor: pointer;
    transform: rotate(45deg);
  }

  .cancel:hover {
    color: #f1563b;
  }

</style>
