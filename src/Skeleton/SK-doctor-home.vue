<template>
  <view class="skeleton-view">
    <view class="sk-home-top">
      <view class="skeleton-global sk-home-img"></view>
      <view class="sk-hone-name">
        <text class="skeleton-global"></text>
        <text class="skeleton-global"></text>
      </view>
    </view>
    <view class="sk-home-title skeleton-global"></view>
    <view class="sk-home-title skeleton-global"></view>
    <view class="sk-home-time">
      <text class="skeleton-global" v-for="item in TIME" :key="item"></text>
    </view>
    <view class="sk-home-title skeleton-global"></view>
    <view class="sk-home-title skeleton-global"></view>
    <view class="sk-home-title skeleton-global"></view>
    <view class="sk-home-title skeleton-global"></view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let TIME = ref(['','','','','','','','','','','','','','',''])
</script>

<style scoped>
.sk-home-top{
  display: flex;
  align-items: center;
  margin: 20rpx;
}
.sk-home-img{
  height: 115rpx;
  width: 115rpx;
}
.sk-hone-name{
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
}
.sk-hone-name text{
  margin: 10rpx 0;
}
.sk-hone-name text:nth-child(1){
  height: 50rpx;
  width: 300rpx;
}
.sk-hone-name text:nth-child(2){
  height: 50rpx;
  width: 500rpx;
}
.sk-home-title{
  height: 60rpx;
  margin: 20rpx;
}
.sk-home-time{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
	margin: 10rpx 0;
}
.sk-home-time text{
  width: calc(20% - 20rpx*2);
	margin: 20rpx;
  height: 100rpx;
}
</style>