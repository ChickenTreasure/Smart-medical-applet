<template>
  <view class="skeleton-view">
    <view class="skeleton-global sk-hpv-top"></view>
    <view class="sk-hpv-nav">
      <text class="skeleton-global" v-for="item in NAV" :key="item"></text>
    </view>
    <view class="sk-hpv-list">
      <text class="skeleton-global" v-for="item in NAV" :key="item"></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let NAV = ref(['','','',''])
</script>

<style scoped>
.sk-hpv-top{
  margin: 20rpx;
  height: 300rpx;
}
.sk-hpv-nav{
  display: flex;
  justify-content: space-between;
}
.sk-hpv-nav text{
  width: 25%;
  height: 70rpx;
  margin: 20rpx;
}
.sk-hpv-list text{
  height: 200rpx;
  margin: 20rpx;
  display: block;
}
</style>