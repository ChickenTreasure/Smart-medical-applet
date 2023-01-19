<template>
  <view class="nucleic-top">
    <view class="nucleic-price">
        <image mode="aspectFill" src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/hesuanjiance.webp"></image>
        <view class="pay-price">
            <text>标准通用--核酸检测</text>
            <text>￥{{nuclei_cacid.data.price}}</text>
        </view>
    </view>
    <view class="nucleic-hint">
        <view v-for="(item,index) in nuclei_cacid.data.boon" :key="index">
            <icon class="icon-small" type="success" size="15"></icon>
            <text>{{item}}</text>
        </view>
    </view>
  </view>
  <!-- 地址 -->
  <view class="nucleic-address">
    <view>
        <text>河南省第一学生医院(永华医院)</text>
        <text class="text-color">濮阳市城关镇南街</text>
    </view>
    <view @click="makePhoneCall(17732204794)">
        <image mode="widthFix" src="/static/other/dianhua.svg"></image>
        <text class="text-color">电话</text>
    </view>
  </view>
  <!-- 表单 -->
  <view class="xinguan-view new-style">
    <view class="xinguan-flex">
        <text>真实姓名</text>
        <input placeholder="请输入真实姓名" v-model="submitData.name" placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
        <text>手机号</text>
        <input placeholder="请输入手机号" v-model="submitData.phone" type="number" placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
        <text>身份证</text>
        <input placeholder="请输入身份证" v-model="submitData.id_card" placeholder-class="input-style" />
    </view>
  </view>
  <!-- 预约时段 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">请选择预约时段</text>
    <scroll-view scroll-x="true" class="scroll-view_H">
        <view class="nucleic-time-flex">
            <view v-for="(item,index) in nuclei_cacid.data.date" :key="index"
            :class="index == timeIndex ? 'checkstyle' : ''"
            @click="timeIndex = index, submitData.time = item.date"
            >
                <text>{{item.date}}</text>
                <text>{{item.week}}</text>
            </view>
        </view>
    </scroll-view>
  </view>
  <!-- 采样方式 -->
  <view class="nucleic-time">
    <text class="sam-Title">咽拭子采样方式</text>
    <view class="sam-content" v-for="(item,index) in nuclei_cacid.data.style" :key="index">
      <label>{{item.title}}</label>
      <text v-for="(item_a,index_a) in item.desc" :key="index_a">{{item_a}}</text>
    </view>
  </view>
  <!-- 提交 -->
  <view style="height:300px"></view>
  <view class="Total-view">
    <text >检测费用:{{nuclei_cacid.data.price}}</text>
    <text @click="Submit">提交</text>
  </view>
</template>

<script setup lang="ts">
import {ref,reactive,onMounted} from 'vue'
import { RequestApi } from '@/public/request';
import {Nucleicacid} from '@/public/decl-type'

// 获取本页面需要的数据
let nuclei_cacid = reactive<{data:Nucleicacid}>({data:{
  address: '',
	hospital: '',
	logo: '',
	name: '',
	phone: '',
	price: 0,
	boon: [],
	date: [],
	style: []
}})
onMounted(async()=>{
  const res:any = await RequestApi.NuataGet()
  console.log(res);
  nuclei_cacid.data = res.data.data[0]
})
// 拨打电话
function makePhoneCall(phone:number){
  uni.makePhoneCall({
  phoneNumber: 'phone' //仅为示例，并非真实的电话号码
})
}
// 选择时间加上颜色
let timeIndex = ref(-1)
// 待提交的数据
let submitData = reactive({
  name:'',
  phone:'',
  id_card:'',
  time:'',
})

// 提交预约
async function Submit(){
  // console.log(submitData);
  const res:any = await RequestApi.ResNuata(submitData)
  if(res.statusCode == 200){
    uni.hideLoading()
    // 跳转订单页
    uni.navigateTo({
      url:'/pages/my-service/nucleic-acid/index'
    })
  }
}
</script>

<style>
  /* 表单提交 */
  @import url('../../common-style/form.css');
  @import url('../../common-style/nucleic-time.css');
  page {
    background-color: #fafafa;
  }
  .nucleic-top {
    background-color: #ffffff;
    padding: 20rpx;
  }
  .nucleic-price {
    display: flex;
    align-items: center;
  }
  .nucleic-price image {
    width: 100rpx;
    height: 100rpx;
    display: block;
  }
  .nucleic-price text {
    display: block;
    padding: 10rpx;
  }
  .pay-price text:nth-child(1) {
    font-size: 35rpx;
  }
  .pay-price text:nth-child(2) {
    font-weight: bold;
    color: #ff5f2c;
  }
  /* 提示 */
  .nucleic-hint {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20rpx;
    font-size: 24rpx;
  }
  .nucleic-hint view {
    display: flex;
    align-items: center;
  }
  .nucleic-hint text {
    padding-left: 10rpx;
  }
  /* 地址 */
  .nucleic-address{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 20rpx;
  }
  .nucleic-address text{
    display: block;
  }
  .nucleic-address image{
    width: 40rpx;
    height: 40rpx;
  }
  .nucleic-address view:nth-child(2){
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .text-color{
    font-size: 25rpx;
    padding-top: 20rpx;
  }
  /* 个人信息 */
  .new-style{
    margin: 20rpx;
    border-radius: 20rpx;
  }
  
  /* 采样 */
  .sam-Title{
    font-weight: bold;
  }
  .sam-content{
    margin-top: 20rpx;
  }
  .sam-content label{
    background-color: #0176ff;
    color: #ffffff;
    border-radius: 10rpx;
    padding: 5rpx 10rpx;
    font-size: 28rpx;
    display: inline-block;
  }
  .sam-content text{
    display: block;
    padding: 10rpx 0;
    line-height: 1.5;
    font-size: 28rpx;
  }
  /* 选中加上样式 */
  .checkstyle{
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
  </style>
  