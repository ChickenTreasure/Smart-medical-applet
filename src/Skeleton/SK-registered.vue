<template>
<view class="skeleton-view">
  <view class="sk-regist-view">
    <!-- 左 -->
    <view>
      <text class="skeleton-global" v-for="item in LEFT" :key="item"></text>
    </view>
    <!-- 右 -->
    <view>
      <text class="skeleton-global" v-for="item in LEFT" :key="item"></text>
    </view>
  </view>
</view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let LEFT = ref(['','','','','','','','','','','','','','','','',''])
</script>

<style scoped>
.sk-regist-view{
  display: flex;
  justify-content: space-between;
}
.sk-regist-view view:nth-child(1){
  width: 35%;
}
.sk-regist-view view:nth-child(2){
  width: 65%;
}
.sk-regist-view text{
  display: block;
  height: 70rpx;
  margin: 20rpx;
}

</style>