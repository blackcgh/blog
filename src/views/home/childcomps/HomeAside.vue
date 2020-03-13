<template>
  <div class="home-aside">
    <aside-content>
      热度排行榜
      <template v-slot:content>
        <ul>
          <li v-for="item of hots" :key="item">{{item}}</li>
        </ul>
      </template>
    </aside-content>
    <aside-content>
      作者推荐
      <template v-slot:content>
        <ul>
          <li v-for="item of authors" :key="item">{{item}}</li>
        </ul>
      </template>
    </aside-content>
    <aside-content>
      标签云
      <template v-slot:content>
        <ul class="tag clearfix" v-if="tag.length">
          <li v-for="item of tag" :key="item" v-rainbow>{{item}}</li>
        </ul>
        <div class="tag-cloud-tip" v-else>标签云还是空的呢~</div>
      </template>
    </aside-content>
    <aside-content>
      友情链接
      <template v-slot:content>
        <ul>
          <li v-for="item of links" :key="item">{{item}}</li>
        </ul>
      </template>
    </aside-content>
  </div>
</template>

<script>
  import AsideContent from 'components/content/asidecontent/AsideContent'

  import { getAll } from 'network/tag'

  export default {
    name: 'HomeAside',
    data() {
      return {
        isFixed: false,
        hots: [1, 2, 3, 4, 5, 6],
        authors: ['black', 'white', 'red', 'blue', 'pink'],
        tag: [],
        links: ['前端', '后端', '全栈开发', '架构']
      }
    },
    components: {
      AsideContent
    },
    watch: {
      tag() {
        this.$nextTick(function () {
          const homeAside = document.querySelector('.home-aside');
          const distance = homeAside.offsetHeight + 90 - 635;
          if (distance < 0) {
            distance = 0;
          }
          window.addEventListener('scroll', function () {
            if (window.pageYOffset > distance) {
              homeAside.classList.add('fixed');
              homeAside.style.top = 90 - distance + 'px';
            } else {
              homeAside.classList.remove('fixed');
            }
          })
        })
      }
    },
    created() {
      getAll().then(result => {
        result.data.forEach(item => {
          this.tag.push(item.content);
        });
      })
    }
  }

</script>

<style scoped>
  .home-aside {
    float: right;
    width: 267px;
  }

  div.tag-cloud-tip {
    font-size: 12px;
    color: #969696;
    text-align: center;
  }

  ul li {
    margin-bottom: 20px;
    font-size: 15px;
  }

  li:last-child {
    margin-bottom: 0;
  }

  .tag li {
    float: left;
    height: 20px;
    padding: 0 10px;
    margin: 0 5px 5px 0;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    border-radius: 10px;
  }

  .fixed {
    position: fixed;
    right: 158px;
  }

</style>
