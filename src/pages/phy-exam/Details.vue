<template>
  <view class="details-Top" v-for="(item,index) in phy_detail" :key="index">
    <image :src="item.image" mode="aspectFill"></image>
    <view class="details-price">
      <text>{{ item.price }}</text>
      <text>已约{{ item.sales }}</text>
    </view>
    <text class="details-Title">{{ item.title }}</text>
  </view>
  <!-- 预约时段 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">体检时间选择</text>
    <scroll-view scroll-x="true" class="scroll-view_H">
      <view class="nucleic-time-flex">
        <block  v-for="(item,index) in phy_detail" :key="index">
          <view  v-for="(item_a,index_a) in item.date" :key="index_a"
          :class="index_a == timeIndex ? 'checkstyle' : ''"
          @click="timeIndex = index_a,S_Data.phy_time = item_a.date"
          >
            <text>{{item_a.date}}</text>
            <text>{{item_a.week}}</text>
          </view>
        </block>
        
      </view>
    </scroll-view>
  </view>
  <!-- 适用人群 -->
  <view class="nucleic-time">
    <text class="nucleic-Title">适用人群</text>
    <view class="nucleic-crowd">
      <block v-for="(item,index) in phy_detail" :key="index">
        <view v-for="(item_a,index_a) in item.crowd" :key="index_a">
          <image :src="item_a.image" mode="aspectFill"></image>
          <text>{{item_a.name}}</text>
        </view>
      </block>
    </view>
  </view>
  <!-- 套餐项目 -->
  <view class="nucleic-time">
    <view class="nucleic-Title">套餐项目</view>
    <view class="project-view" v-for="(item,index) in phy_detail" :key="index">
      <block v-for="(item_a,index_a) in item.project" :key="index_a">
        <text class="project-Title">{{item_a.title}}</text>
        <view class="project-card" v-for="(item_b,index_b) in item_a.content" :key="index_b">
          <view>{{ item_b.thing }}</view>
          <view>{{ item_b.details }}</view>
        </view>
      </block>
    </view>
  </view>
  <!-- 提交 -->
  <view style="height:300rpx"></view>
  <view class="Total-view">
    <text v-if="phy_detail.length>0">检测费用:{{ phy_detail[0].price }}</text>
    <text @click="memBar">选择成员</text>
  </view>
  <!-- 弹窗选择成员组件 -->
  <SemenMber ref="compNone"></SemenMber>
</template>

<script setup lang="ts">
import {onLoad} from '@dcloudio/uni-app';
import {reactive, ref} from 'vue'
import {RequestApi} from '@/public/request'
import {Phydetail} from '@/public/decl-type'
// 引入弹窗组件
import SemenMber,{Event} from '@/com-components/se-member.vue'


// 接受上个页面的路径参数
let phy_detail = ref<Phydetail[]>([])
type Resdata = {
    data:{data:[]}
}
onLoad(async (event:any)=>{
  console.log(event);
  const res  = await RequestApi.PhydaTeil({id:event.id}) as Resdata
  console.log(res.data.data);
  S_Data.phy_name = event.title
  phy_detail.value = res.data.data
})

// 选择时间加上颜色
let timeIndex = ref(-1)

// 存储传递给子组件的方法: 选择成员打开弹窗
let S_Data = reactive({
  phy_name:'',
  phy_time:'',
  show:true
})
// 调用子组件的方法:选择成员打开弹窗
let compNone = ref()
function memBar(){
  compNone.value.trigGer(S_Data)
}

</script>

<style>
  /* 表单提交 */
  @import url('../../common-style/form.css');
  /* 预约时间段 */
  @import url('../../common-style/nucleic-time.css');
  page{
    background-color: #fafafa;
  }
  /* 顶部 */
  .details-Top{
    background-color: #ffffff;
  }
  .details-Top image{
    width: 100%;
    height: 400rpx;
    display: block;
  }
  .details-price{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
  }
  .details-price text:nth-child(1){
    font-size: 35rpx;
    font-weight: bold;
    color: #ff5f2c;
  }
  .details-Title{
    padding: 0 0 20rpx 20rpx;
    display: block;
    font-weight: bold;
    font-size: 35rpx;
  }
  /* 适用人群 */
  .nucleic-crowd{
    display: flex;
    justify-content: space-between;
    padding-top: 20rpx;
  }
  .nucleic-crowd view{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nucleic-crowd image{
    width: 100rpx;
    height: 100rpx;
    display: block;
    margin-bottom: 10rpx;
    border-radius: 10rpx;
  }
  /* 套餐项目 */
  .project-Title{
    background-color: #f0f2f8;
    display: block;
    border-radius: 10rpx;
    font-weight: bold;
    text-align: center;
    padding: 20rpx 0;
    margin: 20rpx 0;
  }
  .project-card{
    display: flex;
    flex-wrap: wrap;
  }
  .project-card view{
    margin: 5rpx;
    background-color: #f0f2f8;
    border-radius: 10rpx;
    padding: 20rpx 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .project-card view:nth-child(1){
    width: 200rpx;
    margin-left: auto;
  }
  .project-card view:nth-child(2){
    flex: 1;
    margin-right: auto;
  }
  /* 选中加上样式 */
  .checkstyle{
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
  </style>