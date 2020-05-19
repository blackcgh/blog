<template>
  <div class="profile-avatar">
    <h2>我的头像</h2>
    <div class="avatar">
      <div class="avatar-select">
        <input type="file" accept="image/*" @change="changeAvatar">
        <i class="iconfont icon-tianjiatupian"></i>
        <span>选择图片</span>
      </div>
      <div class="avatar-current">
        <div>
          <img :src="$store.state.avatar" ref="img">
        </div>
        <span>{{dest}}</span>
      </div>
      <p>请选择图片上传：大小180 * 180像素，支持JPG、PNG等格式，图片需小于2M</p>
    </div>
    <div class="update" :class="{unlock:getStatus}" @click="update">更新</div>
  </div>
</template>

<script>
  import { updateAvatar } from 'network/user'

  export default {
    name: 'ProfileAvatar',
    data() {
      return {
        dest: '当前头像',
        file: null
      }
    },
    computed: {
      // 获取更新按钮样式
      getStatus() {
        return this.dest == '预览头像'
      }
    },
    methods: {
      // 更换头像
      changeAvatar(e) {
        const maxSize = 1024 * 1024 * 2;
        if(e.target.files[0].size < maxSize) {
          const url = URL.createObjectURL(e.target.files[0]);
          this.$refs.img.src = url;
          this.file = e.target.files[0];
          this.dest = '预览头像'
        } else {
          this.$tip.show('#edf2fc', '图片大小不能超过2MB', 1, '#909399')
        }
      },
      // 确定更新
      update() {
        const formData = new FormData();
        formData.append(this.$store.state.id, this.file);
        updateAvatar(formData).then(res => {
          if(res.errno == 0) {
            this.$store.commit('updateAvatar', URL.createObjectURL(this.file));
            this.$tip.show('#f0f9eb', '更新成功', 0, '#91c287')
          } else if(res.errno == -1) {
            this.$tip.show('#fef0f0', '更新失败', 3, '#f56c6c')
          }
        })
      }
    }
  }
</script>

<style scoped>
  h2 {
    padding: 2px 0 2px 8px;;
    margin-bottom: 20px;
    border-left: 4px solid #00a1d6;
    color: #00a1d6;
  }

  .avatar {
    width: 420px;
    height: 290px;
    margin: 0 auto;
    text-align: center;
  }

  .avatar>div {
    float: left;
  }

  .avatar-select {
    position: relative;
    width: 180px;
    height: 130px;
    margin-right: 40px;
    padding-top: 50px;
    border: 1px solid #e5e9ef;
    background-color: #f1f2f5;
    color: #6d757a;
    overflow: hidden;
    border-radius: 4px;
  }

  .avatar-select:hover {
    background-color: #d5d9dd;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }

  img {
    width: 96px;
    height: 96px;
    object-fit: cover;
  }

  /* .avatar-select img {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  } */

  i {
    font-size: 40px;
  }

  .avatar-select span {
    display: block;
    margin-top: 10px;
    padding: 0 12px;
    font-size: 16px;
    line-height: 20px;
  }

  .avatar-current {
    height: 182px;
    padding-left: 40px;
    border-left: 1px solid #e5e9ef;
  }

  .avatar-current div {
    width: 96px;
    height: 96px;
    margin: 42px 0 20px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #e6eaf0;
  }

  .avatar-current span {
    font-size: 14px;
    color: #99a2aa;
  }

  p {
    float: left;
    margin-top: 50px;
    font-size: 12px;
    line-height: 16px;
    color: #99a2aa;
  }

  .update {
    width: 140px;
    height: 40px;
    margin: 0 auto;
    background-color: #f4f5f7;;
    color: #ccd0d7;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
  }

  .unlock {
    background-color: #00a1d6;
    color: #fff;
    cursor: pointer;
  }

  .unlock:hover {
    background-color: #02b7f3;
  }

</style>
