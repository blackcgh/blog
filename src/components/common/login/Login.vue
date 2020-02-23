<template>
  <div id="login">
    <form action="" method="post">
      <input type="text" placeholder="用户名">
      <br />
      <input type="password" placeholder="密码">
      <br />
      <input type="checkbox" id="remember"><label for="remember">记住我</label>
      <br />
      <button>登录</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
  }

</script>

<style scoped>
  input[type=text],
  input[type=password] {
    width: 300px;
    height: 50px;
    padding: 4px 12px 4px 35px;
    border: 1px solid #c8c8c8;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
  }

  input[type=text] {
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
  }

  input[type=checkbox] {
    margin: 20px 5px 20px -233px;
  }

  label {
    font-size: 15px;
    color: #757575;
  }

  button {
    width: 300px;
    height: 43px;
    background-color: #3194d0;
    color: #fff;
    font-size: 18px;
    line-height: 43px;
    border-radius: 25px;
  }
</style>
