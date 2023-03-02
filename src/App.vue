<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  // 获取胶囊按钮的坐标

  let get_Menu = uni.getStorageSync("MenuButton");
  if (!get_Menu) {
    const res = uni.getMenuButtonBoundingClientRect();
    uni.setStorageSync("MenuButton", res);
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
/* 骨架屏 */
.skeleton-view {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 999;
  overflow: hidden;
}
.skeleton-global {
  background: #f3f3f3;
  border-radius: 8rpx;
  animation: blink 1.2s ease-in-out infinite;
}
@keyframes blink {
  50% {
    opacity: 0.5;
  }
}
</style>
