<template>
    <view class="reg-view" v-for="(item,index) in order" :key="index">
      <view class="reg-doctor">
        <image :src="item.avatar" mode="aspectFill"></image>
        <view>
          <text>{{item.tre_doctor}}</text>
          <text>{{item.tre_place}}</text>
        </view>
      </view>
      <view class="reg-order">
        <text>预约流水号</text>
        <text>{{item.se_number}}</text>
      </view>
      <view class="reg-order">
        <text>就诊人</text>
        <text>{{item.patient_name}}</text>
      </view>
      <view class="reg-order">
        <text>就诊时间</text>
        <text>{{item.tre_time}} {{item.the_time}}</text>
      </view>
      <view class="reg-order">
        <text>科室</text>
        <text>{{item.dep_ment}}</text>
      </view>
      <view class="reg-order">
        <text>排队号</text>
        <text>{{item.que_number}}</text>
      </view>
      <view class="reg-order">
        <text>科室楼层</text>
        <text>{{item.remark}}</text>
      </view>
      <view class="reg-order">
        <text>挂号费用</text>
        <text>{{item.reg_cost}}</text>
      </view>
      <!-- 取消预约 -->
      <view class="reg-cancel">
        <text :class="item.cancel ? '' : 'prevent_style'" @click="Cancel(item._id, index)">{{item.cancel ? '取消预约' : '已取消预约'}}</text>
      </view>
    </view>
    <!-- 提示组件 -->
    <point :show="show" />
    <view style="height:200rpx"></view>
  </template>
  
  <script setup lang="ts">
  import {ref} from 'vue'
  import { onShow } from "@dcloudio/uni-app";
  import {RequestApi} from '@/public/request'
  import {Registratorder} from '@/public/decl-type'
  // 提示组件
  import point from '@/com-components/point.vue'
  
  // 获取订单数据
  let order = ref<Registratorder[]>([])
  let show = ref(false)
  onShow(async()=>{
    const res:any = await RequestApi.UserreGistrat() as {data:{data:any[]}}
    order.value = res.data.data
    if(res.data.data.length == 0){
      show.value = true
    }
  })
  // 取消预约
  async function Cancel(id:string,index:number){
    const res:any = await RequestApi.RegistCancel({_id:id}) as {statusCode:number}
    if(res.statusCode == 200){
      order.value[index].cancel = false
    }
  }
  </script>
  
  
  <style>
    page{
      background-color: #f6f6f6;
    }
    .reg-view{
      background-color: #ffffff;
      border-radius: 15rpx;
      margin: 20rpx;
      padding: 20rpx;
    }
    .reg-doctor image{
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .reg-doctor{
      display: flex;
      align-items: center;
      padding-bottom: 30rpx;
    }
    .reg-doctor view{
      display: flex;
      flex-direction: column;
    }
    .reg-doctor view text:nth-child(1){
      font-weight: bold;
    }
    .reg-doctor view text:nth-child(2){
      font-size: 27rpx;
      padding-top: 10rpx;
    }
    .reg-order{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
    }
    .reg-cancel{
      display: flex;
      justify-content: flex-end;
      padding-top: 20rpx;
    }
    .reg-cancel text{
      color: #0176ff;
      border: 1rpx solid #0176ff;
      padding: 15rpx 30rpx;
      display: inline-block;
      border-radius: 15rpx;
    }
    </style>