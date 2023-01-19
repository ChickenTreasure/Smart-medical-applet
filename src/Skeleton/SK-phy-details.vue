<template>
  <view class="skeleton-view">
    <view class="skeleton-global sk-det-top"></view>
    <view class="sk-det-price">
      <text class="skeleton-global"></text>
      <text class="skeleton-global"></text>
    </view>
    <view class="sk-det-time">
      <text class="skeleton-global" v-for="item in TIME" :key="item"></text>
    </view>
    <view class="sk-det-label">
      <text class="skeleton-global" v-for="item in TIME.slice(0,3)" :key="item"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let TIME = ref(['','','','',''])
</script>

<style scoped>
.sk-det-top{
  height: 400rpx;
  margin: 20rpx;
}
.sk-det-price{
  display: flex;
  justify-content: space-between;
}
.sk-det-price text{
  height: 50rpx;
  margin: 20rpx;
}
.sk-det-price text:nth-child(1){
  width: 60%;
}
.sk-det-price text:nth-child(2){
  width: 40%;
}
.sk-det-time{
  display: flex;
  justify-content: space-between;
}
.sk-det-time text{
  width: 25%;
  margin: 20rpx;
  height: 100rpx;
}
.sk-det-label{
  display: flex;
  justify-content: space-between;
}
.sk-det-label text{
  width: 33%;
  margin: 20rpx;
  height: 100rpx;
}
</style>