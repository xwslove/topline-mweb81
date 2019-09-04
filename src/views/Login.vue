<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" />
    <!-- 文本框输入 -->
    <van-cell-group>
      <van-field v-model="user.mobile" left-icon="phone-o" placeholder="请输入手机号码" />
      <van-field v-model="user.code" left-icon="star-o" placeholder="请输入验证码">
        <van-button slot="button" type="default" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
        <van-button round type="danger" color='#3e9df8' @click='handleLogin' class="btn">圆形按钮</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '../api/user'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 点击按钮，处理登录
    async handleLogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .login-btn{
        padding: 20px;
        .btn{
            width: 100%;

        }
    }
</style>
