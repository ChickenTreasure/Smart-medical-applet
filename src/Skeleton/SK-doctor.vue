<template>
  <view class="skeleton-view">
    <view class="sk-doctor-top">
      <text class="skeleton-global" v-for="item in TOP" :key="item"></text>
    </view>
    <view class="sk-doctor-list" v-for="item in TOP" :key="item">
      <view class="skeleton-global"></view>
      <view class="sk-doctor-text">
        <text class="skeleton-global"></text>
        <text class="skeleton-global"></text>
        <text class="skeleton-global"></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let TOP = ref(['','','','',''])
</script>

<style scoped>
.sk-doctor-top{
  display: flex;
  justify-content: space-between;
}
.sk-doctor-top text{
  width: 20%;
  height: 100rpx;
  margin: 20rpx;
}
.sk-doctor-list{
  display: flex;
  align-items: center;
  margin: 20rpx;
}
.sk-doctor-list view:nth-child(1){
  width: 90rpx;
  height: 90rpx;
  border-radius: 50rpx !important;
}
.sk-doctor-text{
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 30rpx;
}
.sk-doctor-text text{
  height: 50rpx;
  margin: 10rpx 0;
}
.sk-doctor-text text:nth-child(1){
  width: 200rpx;
}
.sk-doctor-text text:nth-child(2){
  width: 300rpx;
}
</style>