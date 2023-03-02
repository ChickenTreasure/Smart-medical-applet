<template>
<view class="skeleton-view">
  <view class="skeleton-global skeleton-top" ></view>
  <view class="skeleton-global skeleton-img"></view>
  <view class="vaccine">
    <text class="skeleton-global" v-for="item in YIMIAO" :key="item"></text>
  </view>
  <view class="vaccine phy">
    <text class="skeleton-global" v-for="item in YIMIAO.slice(0,2)" :key="item"></text>
  </view>
  <view class="vaccine regist">
    <text class="skeleton-global" v-for="item in GUAHAO" :key="item"></text>
  </view>
</view>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
// 取出胶囊按钮数据
let menu_top = ref('')
let menu_height = ref('')
let MenuButton = uni.getStorageSync('MenuButton')
// console.log(MenuButton)
menu_top.value = MenuButton.top + 'px'
menu_height.value = MenuButton.height + 'px'
// 遍历无数据
let YIMIAO = ref(['','','',''])
let GUAHAO = ref(['','','','','','','','',''])

</script>

<style scoped>
.skeleton-top{
  width: 400rpx;
  margin-left: 20rpx;
  height: v-bind('menu_height');
  margin-top: v-bind('menu_top');
}
.skeleton-img{
  height: 300rpx;
  margin: 20rpx;
}
.vaccine{
  display: flex;
  justify-content: space-between;
}
.vaccine text{
  width: 25%;
  margin: 20rpx;
  box-sizing: border-box;
  height: 100rpx;
}
.phy text{
  width: 50% !important;
  height: 200rpx;
}
.regist{
  flex-wrap: wrap;
}
.regist text{
  width: calc(33% - 20rpx*2);
  margin: 20rpx;
}
</style>