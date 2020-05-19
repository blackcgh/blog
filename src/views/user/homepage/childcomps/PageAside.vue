<template>
  <div class="page-aside">
    <!-- 公告 -->
    <aside-content>
      公告
      <template v-slot:content>
        <div v-if="show">
          <textarea
            placeholder="编辑我的公告"
            v-model="notice"
            @blur="updateNotice">
          </textarea>
          <span class="num">{{$store.state.notice.length}} / 150</span>
        </div>
        <div class="notice" v-else>
          <p v-if="getUserData.notice.length">{{getUserData.notice}}</p>
          <div class="none" v-else>空空如也~</div>
        </div>
      </template>
    </aside-content>

    <!-- 个性标签 -->
    <aside-content>
      个性标签
      <template v-slot:content>
        <ul class="clearfix" v-if="getTag.length!=0">
          <li v-for="(item,index) of getTag" :key="index">{{item}}</li>
        </ul>
        <div class="tag-none" v-else>空空如也~</div>
      </template>
    </aside-content>
  </div>
</template>

<script>
  import AsideContent from 'components/content/asidecontent/AsideContent'

  import { updateNotice } from 'network/user'

  export default {
    name: 'PageAside',
    data() {
      return {
        notice: this.$store.state.notice
      }
    },
    computed: {
      show() {
        return this.$route.path.indexOf(this.$store.state.id) != -1 && this.$store.state.id != ''
      },
      // 确认用户信息
      getUserData() {
        if(this.show) {
          const { userSet, notice } = this.$store.state;
          return { userSet, notice }
        }
        return this.$store.state.userData
      },
      getTag() {
        if(this.getUserData.userSet) return this.getUserData.userSet.tagList;
        return []
      }
    },
    components: {
      AsideContent
    },
    methods: {
      // 更新公告
      updateNotice() {
        if(this.notice.length > 0 && this.notice.length <= 150) {
          updateNotice(this.$store.state.id, this.notice).then(res => {
            this.$store.commit('updateNotice', this.notice)
          })
        } else if(notice.length > 150) {
          this.$tip.show('#edf2fc', '公告内容长度不能超过150', 1, '#909399')
        }
      }
    }
  }

</script>

<style scoped>
  .page-aside {
    float: right;
    width: 267px;
    font-size: 12px;
    color: #6d757a;
  }

  textarea {
    width: 100%;
    height: 170px;
    padding: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
  }

  textarea:hover {
    border-color: #00a1d6;
  }

  textarea:focus {
    border-color: #00a1d6;
  }

  .notice p {
    height: 170px;
  }

  .none {
    text-align: center;
    color: #797878;
  }

  .num {
    display: none;
    position: absolute;
    bottom: 4px;
    right: 4px;
  }

  textarea:hover + .num {
    display: inline;
  }

  textarea:focus + .num {
    display: inline;
  }

  li {
    float: left;
    padding: 0 8px;
    margin: 0 10px 10px 0;
    border: 1px solid #00a1d6;
    border-radius: 10px;
    line-height: 20px;
    transition: border-radius .3s
  }

  li:hover {
    color: #222;
    border-radius: 0;
  }

  .tag-none {
    text-align: center;
  }

</style>
