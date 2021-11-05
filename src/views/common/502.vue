<template>
  <div class="not-found">
    <h1 class="con-center">
      <img :src="png404" class="img" />
      <!-- <p class="err-tit">404</p> -->
      <p class="err-description">服务器升级中，请稍后重试</p>
      <p class="err-goback" @click="backHome">返回</p>
    </h1>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import png404 from "/@assets/common/404.png";
const router = useRouter();
const backHome = () => {
  router.go(-1);
};
</script>
<style lang="less" scoped>
.not-found {
  .con-center {
    .img {
      width: 100%;
    }
    .err-tit {
      color: #666;
      font-weight: bold;
    }
    .err-description {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
    }
    .err-goback {
      text-align: center;
      color: #666;
    }
  }
}
</style>
