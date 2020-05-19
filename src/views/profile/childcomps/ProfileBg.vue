<template>
  <div class="profile-bg">
    <h2>我的背景</h2>
    <p class="dest">{{dest}}</p>
    <div class="mybg">
      <img :src="$store.state.bgImg" ref="img" />
    </div>
    <!-- <p>图片选择要求：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M</p> -->
    <div class="bg-operator">
      <div>
        <input type="file" accept="image/*" @change="select">
        重新选择
      </div>
      <div :class="{unlock:getStatus}" @click="upload">确定更换</div>
    </div>
  </div>
</template>

<script>
  import { updateBgImg } from 'network/user'

  export default {
    name: 'ProfileBg',
    data() {
      return {
        dest: '当前背景',
        file: null
      }
    },
    computed: {
      getStatus() {
        return this.dest == '预览背景'
      }
    },
    methods: {
      // 重新选择背景
      select(e) {
        this.file = e.target.files[0];
        this.$refs.img.src = URL.createObjectURL(this.file);
        this.dest = '预览背景'
      },
      // 确定更换背景
      upload() {
        const formData = new FormData();
        formData.append(this.$store.state.id, this.file);
        updateBgImg(formData).then(res => {
          if(res.errno == 0) {
            this.dest = '当前背景';
            this.$store.commit('updateBgImg', URL.createObjectURL(this.file));
            this.$tip.show('#f0f9eb', '更换成功', 0, '#91c287')
          } else if(res.errno == -1) {
            this.$tip.show('#fef0f0', '更换失败', 3, '#f56c6c')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .profile-bg {
    text-align: center;
  }

  h2 {
    padding: 2px 0 2px 8px;;
    margin-bottom: 20px;
    border-left: 4px solid #00a1d6;
    color: #00a1d6;
    text-align: left;
  }

  p {
    margin-top: 20px;
    font-size: 12px;
    line-height: 16px;
    color: #99a2aa;
  }

  p.dest {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .mybg {
    width: 100%;
    height: 200px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bg-operator {
    width: 300px;
    height: 40px;
    margin: 50px auto 0;
  }

  .bg-operator div {
    float: left;
    width: 140px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    border-radius: 4px;
  }

  .bg-operator div:first-child {
    position: relative;
    margin-right: 20px;
    background-color: #00a1d6;
    color: #fff;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .bg-operator div:last-child {
    background-color: #f4f5f7;;
    color: #ccd0d7;
  }

  .bg-operator div:first-child:hover {
    background-color: #02b7f3;
  }

  .unlock {
    background-color: #00a1d6 !important;
    color: #fff !important;
    cursor: pointer;
  }

  .unlock:hover {
    background-color: #02b7f3 !important;
  }
</style>
