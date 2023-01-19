<template>
  <view class="hpv-img">
    <image src="https://qita-1252107261.cos.ap-chengdu.myqcloud.com/yiliao/gongjinai.jpg" mode="aspectFill"></image>
  </view>
  <!-- 筛选导航 -->
  <view class="tab-view">
    <view class="tab-toggle" v-for="(item,index) in hpv_select" :key="index" @click="toggle(item._id,index)">
        <text>{{item.name}}</text>
        <text :class="index == checked ? 'checked' : ''"></text>
    </view>
  </view>
  <!-- 疫苗列表 -->
  <view class="hpv-list" v-for="(item,index) in hpv_list" :key="index">
    <view>
        <view class="hpv-type">{{item.name}}</view>
        <view class="hpv-age">
          <text v-for="(item_a, index_a) in item.describe" :key="index_a">{{item_a}}</text>
        </view>
        <view class="hpv-price">¥{{item.price[0]}}-¥{{item.price[1]}}</view>
    </view>
        <view class="hpv-reserve" @click="toReserve(item._id, item.name, item.price, item.describe)">去预约</view>
  </view>
  <!-- 高度 -->
  <view style="height:300rpx"></view>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {RequestApi} from '@/public/request'
import {Hpvselect,Hpvlist} from '@/public/decl-type'

// 筛选的导航
let checked = ref(0)
let hpv_select = ref<Hpvselect[]>([])
// 疫苗列表
let hpv_list = ref<Hpvlist[]>([])
// 存储用于筛选的疫苗数据
let hpv_all = ref<Hpvlist[]>([])
onMounted(async ()=>{
    const res:any = await RequestApi.OtuHpv()
    // console.log(res);
    hpv_select.value = res.data.data[0].hpv_select
    hpv_list.value = res.data.data[0].hpv_list
    hpv_all.value = res.data.data[0].hpv_list
})
// 筛选疫苗列表
function toggle(id:string,index:number){
  let res = hpv_all.value.filter(item=>item.hpv_id == id)
  checked.value = index
  if(id == '26da8e4962dc565503df9629704f1700'){
    // 选中全部
    hpv_list.value = hpv_all.value
  }else{
    hpv_list.value = res
  }
}
// 跳转详情页
function toReserve(_id:string,name:string,price:string[],describe:string[]){
  let obj = JSON.stringify({_id,name,price,describe})
  uni.navigateTo({
    url:'/pages/hpv-vaccine/hpv-buy?value=' + obj
  })
}

</script>

<style>
page{
  background-color: #fafafa;
}
.hpv-img{
  height: 350rpx;
}
.hpv-img image{
  height: 350rpx;
  width: 100%;
  display: block;
}
/* tab切换 */
.tab-view{
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
}
.tab-toggle{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100rpx;
  justify-content: center;
  position: relative;
}
.checked{
  width: 50rpx;
  height: 8rpx;
  background-color: #0d7cff;
  position: absolute;
  bottom: 0;
}
/* 疫苗列表 */
.hpv-list{
  background-color: #ffffff;
  margin: 20rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  border-radius: 20rpx;
}
.hpv-type{
  font-size: 35rpx;
}
.hpv-age{
  display: flex;
  align-items: center;
}
.hpv-age text{
  background-color: #f4f6fa;
  padding: 7rpx;
  font-size: 25rpx;
  margin: 10rpx 10rpx 10rpx 0;
}
.hpv-price{
  font-weight: bold;
  color: #ff5f2c;
}
.hpv-reserve{
  align-self: flex-end;
  background-color: #0d7cff;
  padding: 15rpx 30rpx;
  border-radius: 40rpx;
  color: #ffffff;
}
</style>