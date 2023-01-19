<template>
  <view class="xinguan-view" v-for="(item, index) in order" :key="index">
    <text class="name">{{item.phy_name}}</text>
    <view class="xinguan-order">
      <text>检测人:</text>
      <text>{{item.name}}</text>
    </view>
    <view class="xinguan-order">
      <text>检测地点:</text>
      <text>{{item.address}}</text>
    </view>
    <view class="xinguan-order">
      <text>检测时间:</text>
      <text>{{item.phy_time}}</text>
    </view>
    <view class="xinguan-order">
      <text>订单编号:</text>
      <text>{{item.order_number}}</text>
    </view>
    <view class="reg-price"><text>¥{{item.price}}</text></view>
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
import {Nuatauserorder} from '@/public/decl-type'
// 提示组件
import point from '@/com-components/point.vue'

// 获取订单数据
let order = ref<Nuatauserorder[]>([])
let show = ref(false)
onShow(async()=>{
  const res = await RequestApi.NuatauserOrder() as {data:{data:[]}}
  order.value = res.data.data
  if(res.data.data.length == 0){
    show.value = true
  }
})
// 取消预约
async function Cancel(id:string,index:number){
  const res = await RequestApi.NuataCancel({_id:id}) as {statusCode:number}
  if(res.statusCode == 200){
    order.value[index].cancel = false
  }
}

</script>

<style>
  @import url('../../../common-style/vaccine.css');
</style>