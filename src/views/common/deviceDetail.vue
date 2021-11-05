<template>
  <div class="device">
    <template v-if="device.screen">
      <p class="device-head">
        <span>屏幕信息</span>
        <span class="all" @click="showAll('device')">more</span>
      </p>
      <van-cell-group>
        <van-cell
          title="屏幕宽度"
          :value="device.screen.width"
          :label="`可用宽度：${device.screen.availWidth}`"
        />
        <van-cell
          title="屏幕高度"
          :value="device.screen.height"
          :label="`可用宽度：${device.screen.availHeight}`"
        />
        <van-cell
          v-show="device.allScreen"
          title="颜色深度"
          :value="device.screen.colorDepth"
          :label="`24位或32位硬件彩色分辨率`"
        />
        <van-cell
          v-show="device.allScreen"
          title="像素深度"
          :value="device.screen.pixelDepth"
        />
      </van-cell-group>
    </template>
    <template v-if="device.Navigator">
      <p class="device-head">Navigator</p>
      <van-cell-group>
        <van-cell title="平台" :value="device.Navigator.platform" />
        <van-cell title="userAgent" :label="device.Navigator.userAgent" />
        <van-cell title="网络状态" :value="device.onLine ? '在线' : '离线'" />
      </van-cell-group>
    </template>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import utils from "/@utils";
const device = reactive({
  screen: null,
  allScreen: false,
  Navigator: null,
  onLine: true,
  allNavigator: false,
});
const showAll = (str) => {
  if (str === "device") device.allScreen = !device.allScreen;
};
onMounted(() => {
  device.screen = window.screen;
  device.Navigator = window.navigator;
  window.addEventListener("online", () => {
    console.log("online");
    device.onLine = window.navigator.onLine;
    device.Navigator = window.navigator;
  });
  window.addEventListener("offline", () => {
    console.log("offline");
    device.onLine = window.navigator.onLine;
    device.Navigator = window.navigator;
  });
});
</script>
<style lang="less" scoped>
.device {
  &-head {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    .all {
      margin-left: 10px;
      font-size: 12px;
      color: #ff6600;
    }
  }
}
</style>
