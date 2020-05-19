<template>
  <div id="set">
    <!-- 隐私设置 -->
    <div class="set">
      <h3 class="set-title">隐私设置</h3>
      <ul>
        <li v-for="(item,index) of $store.state.userSet.setList" :key="index">
          <span>{{item.name}}</span>
          <div>
            <input type="checkbox" v-model="item.status">
            <!-- 开关 -->
            <div :class="{checkdiv:item.status}">
              <i :class="{checki:item.status}"></i>
            </div>
            <!-- 显示文字 -->
            <span>{{getSetStatus(index)}}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 主页设置 -->
    <div class="set">
      <h3 class="set-title">主页设置</h3>
      <ul>
        <li v-for="(item,index) of $store.state.userSet.homeList" :key="index">
          <span>{{item.name}}</span>
          <div>
            <input type="checkbox" v-model="item.status">
            <!-- 开关 -->
            <div :class="{checkdiv:item.status}">
              <i :class="{checki:item.status}"></i>
            </div>
            <!-- 显示文字 -->
            <span>{{getHomeStatus(index)}}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 个人标签 -->
    <div class="set-tag">
      <h3 class="set-title">我的个人标签</h3>
      <ul class="clearfix">
        <li v-for="(item,index) of $store.state.userSet.tagList" :key="index">
          {{item}}
          <span class="iconfont icon-shanchu del" @click="delTag(index)"></span>
        </li>
      </ul>
      <!-- 新增框 -->
      <div class="add-tag">
        <input type="text" v-model="tag">
        <span @click="addTag">新增</span>
      </div>
    </div>

    <!-- 确认 -->
    <!-- <div class="submit" @click="submit">提交</div> -->
  </div>
</template>

<script>
  import { updateSet } from 'network/user'

  export default {
    name: 'Set',
    data() {
      return {
        tag: ''
      }
    },
    computed: {
      // 获取隐私设置某项要显示的文字
      getSetStatus() {
        return function (index) {
          if (this.$store.state.userSet.setList[index].status) return '公开'
          else return '隐藏'
        }
      },
      // 获取主页设置某项要显示的文字
      getHomeStatus() {
        return function (index) {
          if (this.$store.state.userSet.homeList[index].status) return '公开'
          else return '隐藏'
        }
      }
    },
    methods: {
      // 新增个人标签
      addTag() {
        if (this.tag.length == 0) {
          this.$tip.show('#edf2fc', '不能添加空标签', 1, '#909399');
          return
        }
        this.$store.commit('addTag', this.tag);
        this.tag = ''
      },
      // 删除个人标签
      delTag(index) {
        this.$store.commit('delTag', index)
      }
    },
    async destroyed() {
      await updateSet(this.$store.state.id, this.$store.state.userSet)
    }
  }

</script>

<style scoped>
  #set {
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
  }

  .set {
    position: relative;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .set-title {
    padding: 0 0 15px;
    color: #000;
    font-size: 20px;
    font-weight: 400;
    line-height: 33px;
  }

  .set li {
    height: 20px;
    margin: 15px 0;
  }

  .set li>span {
    display: inline-block;
    width: 140px;
    font-size: 14px;
    color: #222;
    vertical-align: middle;
  }

  .set li>div {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 20px;
  }

  input[type=checkbox] {
    position: absolute;
    top: 0;
    left: 0;
    width: 65px;
    height: 20px;
    opacity: 0;
    z-index: 2;
    vertical-align: middle;
    cursor: pointer;
  }

  .set li div div {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 16px;
    border-radius: 10px;
    background-color: #ccd0d7;
    vertical-align: middle;
    transition: background-color .2s;
  }

  .set li div div i {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background: #fff;
    transition: left .2s;
  }

  .set li div span {
    margin-left: 5px;
    font-size: 12px;
    color: #99a2aa;
  }

  .checkdiv {
    background-color: #00a1d6 !important;
  }

  .checki {
    left: 17px !important;
  }

  /* .set-tag {
    padding-bottom: 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  } */

  .set-tag li {
    float: left;
    padding: 0 8px;
    margin-right: 10px;
    background: #f6f9fa;
    border: 1px solid #ccd0d7;
    border-radius: 4px;
    line-height: 28px;
    font-size: 12px;
  }

  .set-tag li:hover {
    color: #00a1d6;
  }

  .set-tag li span {
    margin-left: 8px;
  }

  .del {
    font-size: 13px;
    cursor: pointer;
  }

  .add-tag {
    height: 30px;
    margin-top: 10px;
  }

  .add-tag span {
    display: inline-block;
    width: 55px;
    height: 30px;
    padding: 0 15px;
    border: 1px solid #ccd0d7;
    border-left: 0;
    background-color: #f7f9fa;
    text-align: center;
    color: #00a1d6;
    font-size: 12px;
    line-height: 30px;
    vertical-align: middle;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    box-sizing: border-box;
  }

  .add-tag input {
    width: 150px;
    height: 30px;
    padding: 0 10px;
    border: 1px solid #ccd0d7;
    border-radius: 4px 0 0 4px;
    vertical-align: middle;
    box-sizing: border-box;
  }

  .add-tag input:focus {
    border-color: #00a1d6;
  }

  .add-tag input:focus+span {
    border-color: #00a1d6;
  }

  /* .submit {
    width: 100px;
    height: 40px;
    margin: 0 auto;
    background-color: #00a1d6;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  .submit:hover {
    background-color: #05bdfa;
  } */

</style>
