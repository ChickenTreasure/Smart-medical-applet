<template>
  <view class="progress-box">
    <text>测试进度</text>
    <progress  class="progress" duration="15" :active="true" active-mode="forwards" color="#cce3ff" activeColor="#2d8dfe" :percent="percent" border-radius="40" stroke-width="9" />
    <text>{{add_to_s}}/{{topic_length}}</text>
  </view>
  <!-- 题目 -->
  <view class="question">{{data.topic}}</view>
  <!-- 单选题 -->
  <view class="topic-view">
    <view class="topic-Title">
        <text></text>
        <text>单选题</text>
    </view>
    <view class="totic" hover-class="hover-style" hover-start-time="300"
    v-for="(item,index) in data.options" :key="index"
    @click="choose(item.son_id)"
    >
        {{item.title}}
    </view>
  </view>
</template>

<script setup lang="ts">
import {reactive,toRefs, ref} from 'vue'
import {onShow,onLoad} from '@dcloudio/uni-app'
import {RequestApi} from '@/public/request'
import {Topic} from '@/public/decl-type'
import func from 'vue-temp/vue-editor-bridge'


//用于判断请求哪个接口 '001'：抑郁症测评 '002':男性功能测评 '003':失眠程度测评
let judge_value = ref('')
// 获取上个页面带来的数据
onLoad((event:any)=>{
  let{type,name} = event
  judge_value.value = type
    uni.setNavigationBarTitle({
        title:name
    })
})

//存储所有题目
let topic_data = ref<Topic[]>([])
// 总的有多少题
let topic_length = ref(0)
// 存储每一题的数据
let each_question = reactive<{data:Topic}>({
    data:{
        topic:"",
        _id:"",
        options:[]
    }
})
let {data} = toRefs(each_question)
interface Resdata{
    data:{data:Topic[]}
}
onShow(async()=>{
  // 清空上一次的结果
  add_to.value = 0
  add_to_s.value = 1
  percent.value = 0
  topic_id.value = []
    if(judge_value.value=='001'){//抑郁症测评：
        var res = await RequestApi.DepressionTopics() as Resdata
        console.log(res);
    }else if(judge_value.value=='002'){//男性功能测评：
        var res = await RequestApi.PrematureTopics() as Resdata
        console.log(res);
    }else{//失眠程度测评
        var res = await RequestApi.InsomniaTopics() as Resdata
        console.log(res);
    }
    topic_data.value = res.data.data
    topic_length.value = res.data.data.length  
    each_question.data = res.data.data[0]
    percent.value = (100 / topic_length.value)
})

// 存储每一道题的下标：初次进入页面
let add_to = ref(0)
// 存储第几题
let add_to_s = ref(1)
// 进度条计算
let percent = ref(0)
// 存储每次点击的选项id
let topic_id = reactive<{value:string[]}>({
    value:[]
})
// 选择每一道题目触发
function choose(son_id:string){
    if(add_to_s.value < topic_length.value){
        add_to.value++
        add_to_s.value++
        // 进度条计算
        percent.value = (100 / topic_length.value) * add_to_s.value
        // 存储每次点击的选项id
        topic_id.value.push(son_id)
        each_question.data = topic_data.value[add_to.value]
    }else{
         // 存储最后一次点击的选项id
         topic_id.value.push(son_id)
        // console.log(topic_id.value);
        let OBJ = JSON.stringify({type:judge_value.value,topic_id:topic_id.value})
            uni.navigateTo({
                url:"/pages/self-test/result?value=" + OBJ
            })
    }
}
</script>

<style>
  page{
      background: linear-gradient(to bottom,#d6e8ff 30%,#f2f7fb 55%, #f0f5f9 90%);
  }
  .progress-box{
    display: flex;
    align-items: center;
    padding: 20rpx;
  }
  .progress{
    flex: 1;
    padding: 0 40rpx;
  }
  .question{
    padding: 30rpx 20rpx;
    margin: 40rpx 20rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
  }
  .topic-view{
    background-color: #f3f8ff;
    border-radius: 10rpx;
    padding: 20rpx;
    margin: 20rpx;
    box-shadow: #d6e8ff 0px 0px 23rpx 5rpx;
  }
  .topic-Title{
    display: flex;
    align-items: center;
  }
  .topic-Title text:nth-child(1){
    width: 8rpx;
    height:27rpx;
    background-color: #0d7cff;
    display: block;
    margin-right: 10rpx;
  }
  .totic{
    background: #ffffff;
    margin: 20rpx 0;
    padding: 40rpx 10rpx;
    border-radius: 10rpx;
  }
  .hover-style{
    background-color: #ebf4ff;
    color: #298cff;
  }
  </style>