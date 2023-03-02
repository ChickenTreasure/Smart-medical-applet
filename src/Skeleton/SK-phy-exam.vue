<template>
  <view class="skeleton-view">
    <view style="margin:20rpx" v-for="item in LIST" :key="item">
      <view class="sk-phy-title skeleton-global"></view>
      <view class="sk-phy-flex">
        <view class="skeleton-global sk-phy-left"></view>
        <view class="sk-phy-right">
            <text class="skeleton-global"></text>
            <text class="skeleton-global"></text>
            <text class="skeleton-global"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let LIST = ref(['','','',''])
</script>

<style scoped>
.sk-phy-flex{
  display: flex;
}
.sk-phy-left{
  width: 200rpx;
  height: 200rpx;
}
.sk-phy-title{
  height: 60rpx;
  width: 300rpx;
  margin-bottom: 20rpx;
}
.sk-phy-right{
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20rpx;
}
.sk-phy-right text{
  margin: 10rpx 0;
  display: block;
  height: 50rpx;
}
.sk-phy-right text:nth-child(1){
  width: 200rpx;
}

</style>