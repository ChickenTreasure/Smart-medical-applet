<!-- 公用的提示 -->
<template>
    <view class="point" v-if="show">
      <image src="/static/other/kongshuju.jpg" mode="widthFix"></image>
      <text>{{title}}</text>
    </view>
  </template>
  
  <script setup lang="ts">
  withDefaults(defineProps<{show:boolean,title?:string}>(),{
    show:false,
    title:'你还没有订单数据'
  })
  </script>
  
  
  <style scoped>
  .point{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 200rpx;
    color: #858585;
  }
  .point image{
    display: block;
    width: 230rpx;
    height: 230rpx;
  }
  </style>