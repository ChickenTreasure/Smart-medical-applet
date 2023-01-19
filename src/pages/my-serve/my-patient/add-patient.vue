<template>
  <view class="AI-card" @click="upload">
    <image src="/static/other/AI-shibie.svg" mode="widthFix"></image>
    <text>身份证智能识别</text>
  </view>
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input placeholder="请输入姓名" v-model="submitData.name" placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
      <text>性别</text>
      <picker mode="selector" :range="['男','女']" class="flex-left" @change="changeSex">
        <view>
          <text>{{submitData.sex == '' ? '请输入性别' : submitData.sex}}</text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date" class="flex-left" @change="changeDate">
        <view>
          <text>{{submitData.born == '' ? '请选择出生日期' : submitData.born}}</text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>成员关系</text>
      <picker mode="selector" @change="changeRelation" :range="['自己','父母','其他']" class="flex-left">
        <view>
          <text>{{submitData.relation == '' ? '请选择成员关系' : submitData.relation}}</text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input placeholder="请输入身份证" v-model="submitData.id_card" placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
      <text>手机号</text>
      <input placeholder="请输入手机号" v-model="submitData.phone" type="number" placeholder-class="input-style" />
    </view>
  </view>
  <view style="height:200rpx"></view>
  <view class="submit">
    <text @click="canCel">取消</text>
    <text @click="addMit">确认添加</text>
  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {uploadImage} from '@/public/misc'
import {AICARD,RequestApi} from '@/public/request'


// 身份证识别
async function upload(){
    const res:any = await uploadImage(AICARD,'识别中','识别失败')
    let data = JSON.parse(res.data)
    if(res.statusCode == 200){
    submitData.name = data.data.name
    submitData.sex = data.data.sex
    submitData.born = data.data.born
    submitData.id_card = data.data.id_card
  }else{
    uni.showToast({title: data.data,icon: 'none',duration: 1000});
  }
}
// 选择性别
function changeSex(event:{detail:{value:string}}){
  console.log(event.detail.value);
  submitData.sex = event.detail.value == '0' ? '男' : '女'
}
// 选择出生日期
function changeDate(event:{detail:{value:string}}){
  submitData.born = event.detail.value
}
// 成员关系
function changeRelation(event:{detail:{value:string}}){
  const res = event.detail.value
  submitData.relation = res == '0' ? '自己' : res == '1' ? '父母' : '其他'
}
// 待提交的数据
let submitData = reactive({
  name:'',
  sex:'',
  born:'',
  relation:'',
  id_card:'',
  phone:'',
})

  // 取消
  function canCel(){
    uni.navigateBack({delta:1})
  }
  // 确认添加
  async function addMit(){
    const res:any = await RequestApi.PatientRes(submitData)
    if(res.statusCode == 200){
      uni.navigateBack({delta:1})
    }
  }
</script>

<style>
  @import url('../../../common-style/form.css');
  page{
    background-color: #f6f6f6;
  }
  .AI-card{
    display: flex;
    align-items: center;
    background-color: #ffffff;
    font-size: 35rpx;
    border-radius: 15rpx;
    padding: 30rpx 20rpx;
    margin: 20rpx 20rpx 50rpx 20rpx;
  }
  .AI-card image{
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx;
    display: block;
  }
  </style>