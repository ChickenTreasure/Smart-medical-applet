<template>
    <view class="video-view" v-for="(item,index) in video_data" :key="index">
      <view class="video-area">
        <video
        :src="item.video_url"
        :id="item._id"
        :controls="item.controls"
        :show-center-play-btn="false"
        object-fit="cover"
        :title="item.video_title"
        >
        </video>
        <text class="video-title">{{item.video_title}}</text>
        <image @click="startPlay(index,item._id)" mode="widthFix" v-if="item.play_but" src="/static/other/video-bofang.png"></image>
      </view>
      <view class="video-name">
        <image mode="widthFix" :src="item.avatar"></image>
        <text>{{item.name}}</text>
      </view>
    </view>
    <!-- 加载图标 -->
    <view class="Loading">
      <image v-if="loading" mode="widthFix" src="/static/other/loading.svg"></image>
    </view>
    <view>

    </view>
  </template>
  
  <script setup lang="ts">
  import {ref,onMounted} from 'vue'
  import { onReachBottom,onShow } from '@dcloudio/uni-app';
  import { RequestApi } from '@/public/request';
  import {Videotype} from '@/public/decl-type'

  // 请求数据
  onMounted(()=>{
    retriData(0)
  })
  interface Resdata{
    data:{data:Videotype[]}
  }
  let video_data = ref<Videotype[]>([])
  async function retriData(page:number){
    const res = await RequestApi.VideoList({page}) as Resdata
    video_data.value = [...video_data.value,...res.data.data]
  }
  //上拉加载
  let loading = ref(false)
  let page_value = ref(0)
  onReachBottom(async()=>{
    loading.value = true
    page_value.value++
    await retriData(page_value.value)
    loading.value = false
  })

  // 点击自定义播放按钮播放视频
  function startPlay(index:number,vieo_id:string){
    video_data.value[index].controls = true
    video_data.value[index].play_but = false
    dealWith(vieo_id,index)
  }
  //处理视频暂停或播放 
  // 存储视频id
  let videoId = ref('')
  // 存储视频下标
  let videoIndex = ref(-1)
  function dealWith(video_id:string,index:number){
    if(videoId.value == ''){ //初次播放
      videoId.value = video_id
      videoIndex.value = index
      uni.createVideoContext(video_id).play()
    }else{ //已有视频播放,让上一个视频暂停,当前视频播放
      if(videoId.value != video_id){
        pauseFun(videoIndex.value)
      }
      setTimeout(()=>{
        videoId.value = video_id
        videoIndex.value = index
        uni.createVideoContext(video_id).play() 
      },500)
    }
  }
  // 暂停时触发
  function pauseFun(index:number){
    uni.createVideoContext(videoId.value).pause()
    video_data.value[index].controls = false
    video_data.value[index].play_but = true
  }
  // 离开之后进入页面暂停播放视频
  onShow(()=>{
    uni.createVideoContext(videoId.value).pause()
  })

  </script>
  
<style>
page{
  background: #f5f5f5;
}
.video-view{
  background-color: #ffffff;
  margin-bottom: 30rpx;
}
.video-area{
  height: 400rpx;
  position: relative;
}
.video-area video{
  height: 400rpx;
  width: 100%;
  display: block;
}
.video-area image{
  width: 100rpx;
  height: 100rpx;
  display: block;
  position: absolute;
	bottom: 0;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
}
.video-title{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  right: 20rpx;
  z-index: 99;
  color: #ffffff;
  font-size: 35rpx;
  font-weight: bold;
}
.video-name{
  display: flex;
  align-items: center;
  padding: 20rpx;
}
.video-name image{
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin-right: 20rpx;
  border-radius: 50%;
}
/* loading */
.Loading{
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Loading image{
  display: block;
  width: 70rpx;
  height: 70rpx;
  animation: myfirst 1s infinite linear;
}
@keyframes myfirst
{
from {transform: rotate(0deg);}
to {transform: rotate(359deg);}
}
</style>
