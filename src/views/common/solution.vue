<template>
  <ZGPager class="solution">
    <ZGHeader theme="white" />
    <div class="item">
      <h3 class="q">收不到验证码</h3>
      <p class="a">1、请检查您的验证码短信是否被拦截</p>
      <p class="a">2、请检查您的网络环境是否良好</p>
      <p class="a">3、请检查您的收件箱是否已满</p>
    </div>
    <div class="item">
      <h3 class="q">旧手机号不再使用</h3>
      <p class="a">
        如果您的账号绑定的手机已不再使用，请拨打中广资本客服电话
        <a @click="callPhone()" class="btn">了解更多</a>
      </p>
    </div>
    <div class="item">
      <h3 class="q">忘记密码</h3>
      <p class="a">如果您的账号绑定过手机号，可以使用手机验证码登录</p>
      <p class="a">
        如果未能解决您的问题，请拨打中广资本客服电话
        <a @click="callPhone()" class="btn">了解更多</a>
      </p>
    </div>
  </ZGPager>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import tools from "/@utils/tools";
import Dict from "/@const";
const backHome = () => {
  router.push("/");
};
const callPhone = () => {
  tools.callPhone(Dict.CALL_C_TEL);
};
</script>
<style lang="less" scoped>
.solution {
  background: #ffffff;
  .item {
    margin: 30px 28px 0 28px;
    .q {
      font-size: 20px;
      color: #333;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .a {
      font-size: 14px;
      color: #333;
      line-height: 1.8;
      a {
        color: #fa6029;
      }
    }
  }
}
</style>
