<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" />
    <!-- 文本框输入 -->
    <van-cell-group>
      <van-field v-model="value" left-icon="phone-o" placeholder="请输入手机号码" />
      <van-field v-model="value" left-icon="star-o" placeholder="请输入验证码">
        <van-button slot="button" type="default" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
        <van-button round type="danger" color='#3e9df8' class="btn">圆形按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
    .login-btn{
        padding: 20px;
        .btn{
            width: 100%;

        }
    }
</style>
