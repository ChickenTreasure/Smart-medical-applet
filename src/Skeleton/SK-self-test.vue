<template>
  <view class="skeleton-view">
    <view class="sk-self-top">
      <text class="skeleton-global" v-for="item in [1,2,3]" :key="item"></text>
    </view>
    <text class="skeleton-global sk-self-title"></text>
    <view class="sk-self-flex">
      <text class="skeleton-global" v-for="item in [1,2,3,4,5]" :key="item"></text>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>

<style scoped>
.sk-self-top{
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
}
.sk-self-top text{
  height: 60rpx;
  width: 100rpx;
}
.sk-self-top text:nth-child(2){
  flex: 2;
  margin: 0 20rpx;
}
.sk-self-title{
  height: 60rpx;
  width: 250rpx;
  display: block;
  margin: 120rpx 0 10rpx 20rpx;
}
.sk-self-flex{
  display: flex;
  flex-direction: column;
}
.sk-self-flex text{
  height: 110rpx;
  margin: 20rpx;
}
</style>