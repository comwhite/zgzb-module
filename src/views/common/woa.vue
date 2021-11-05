<template>
  <div class="updatePage">
    <h1 class="con-center">
      <p class="err-description">
        页面加载中
        <span class="shadow_dot"></span>
      </p>
    </h1>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
// 公众号强制跳转处理 ps: 微信公众号域名绑定有限所以只能二次跳转处理
onMounted(() => {
  let reg = new RegExp("path=" + route.query.path + "&?", "g");
  location.href = `https://wx${
    location.host.split(".")[0] !== "dcdnm"
      ? "-" + location.host.split(".")[0]
      : ""
  }.zgjys.com/${route.query.path}${location.search}`.replace(reg, "");
});
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
