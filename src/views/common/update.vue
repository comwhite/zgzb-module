<template>
  <div class="updatePage">
    <h1 class="con-center">
      <p class="err-tit">维护中</p>
      <p class="err-description">
        当前页面维护中
        <span class="shadow_dot"></span>
      </p>
      <p class="err-goback" @click="backHome">返回</p>
    </h1>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const backHome = () => {
  router.go(-1);
};
</script>
<style lang="less" scoped>
.updatePage {
  .con-center {
    .err-tit {
      color: #666;
      font-weight: bold;
    }
    .err-goback {
      color: #666;
    }
  }
}
</style>
