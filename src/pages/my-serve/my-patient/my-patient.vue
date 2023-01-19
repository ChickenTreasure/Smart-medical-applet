<template>
    <view class="patient-infor" v-for="(item, index) in patient" :key="index"
    @click="checkedData(item.name, item._id)"
    >
      <view class="patient-flex">
        <text class="patient-name">{{item.name}}</text>
        <text class="patient-text">{{item.relation}}</text>
      </view>
      <view class="patient-flex patient-sex">
        <text>{{item.sex}}</text>
        <text>{{item.age}}岁</text>
        <text>{{item.phone}}</text>
      </view>
    </view>
    <!-- 提交 -->
    <view class="submit">
      <text @click="canCel">取消</text>
      <text @click="addTo">添加就诊人</text>
    </view>
    <ponit :show="show" :title="title"/>
    <view style="height:300rpx"></view>
  </template>
  
  <script setup lang="ts">
  import {ref} from 'vue'
  import { onShow } from "@dcloudio/uni-app";
  import {RequestApi} from '@/public/request'
  import {Mypatient} from '@/public/decl-type'
  // 公用提示组件
  // import ponit from '@/com-components/point.vue'
  import {myData} from '@/store/index'
  
  let show = ref(false)
  let title = ref('你还没有就诊人')
  
  // 请求数据
  interface Resdata{
    data:{data:[]}
  }
  let patient = ref<Mypatient[]>([])
  onShow(async()=>{
    const res = await RequestApi.GetpaTient() as Resdata
    patient.value = res.data.data
    if(res.data.data.length == 0){
      show.value = true
    }
  })
  
  // 选择就诊人返回上一界面
  const store = myData()
  function checkedData(name:string,_id:string){
    store.addPatient({name,_id})
    uni.navigateBack({delta:1})
  }
  
  
  // 取消
  function canCel(){
    uni.navigateBack({delta:1})
  }
  // 添加就诊人
  function addTo(){
    uni.navigateTo({
      url:'/pages/my-serve/my-patient/add-patient'
    })
  }
  
  
  
  </script>
  
  
  <style>
  @import url('../../../common-style/form.css');
  page{
    background-color: #f6f6f6;
  }
  .patient-infor{
    background-color: #ffffff;
    margin: 20rpx;
    border-radius: 15rpx;
    font-size: 28rpx;
  }
  .patient-flex{
    display: flex;
    align-items: center;
    padding: 20rpx;
  }
  .patient-name{
    font-size: 35rpx;
    font-weight: bold;
  }
  .patient-flex text{
    margin-right: 15rpx;
  }
  .patient-text{
    background-color: #d6f3ff;
    color: #78beff;
    padding: 2rpx 15rpx;
  }
  .patient-sex{
    color: #7c96af;
  }
  </style>