<template>
  <view class="hpv-choose">
    <view>
      <view class="hpv-type">{{router_value.name}}</view>
      <view class="hpv-age">
        <text v-for="(item, index) in router_value.describe" :key="index">{{item}}</text>
      </view>
    </view>
    <view class="hpv-price">¥{{router_value.price[0]}}-¥{{router_value.price[1]}}</view>
  </view>
  <!-- 表单填写 -->
  <view class="xinguan-view">
    <view class="xinguan-flex">
      <text>真实姓名</text>
      <input placeholder="请输入真实姓名" v-model="submitData.name" placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
      <text>身份证</text>
      <input placeholder="请输入身份证" v-model="submitData.id_card" placeholder-class="input-style" />
    </view>
    <view class="xinguan-flex">
      <text>性别</text>
      <picker mode="selector" :range="['男','女']" class="flex-left" @change="changeSelector">
        <view>
          <text>{{gender == '' ? '请选择性别' : gender}}</text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>出生日期</text>
      <picker mode="date" class="flex-left" @change="changeDate">
        <view>
          <text>{{born_date == '' ? '请选择出生日期' : born_date}}</text>
          <image src="/static/other/gengduo.svg"></image>
        </view>
      </picker>
    </view>
    <view class="xinguan-flex">
      <text>手机号</text>
      <input placeholder="请输入手机号" v-model="submitData.phone" type="number" placeholder-class="input-style" />
    </view>
  </view>
  <!-- 选择套餐 -->
  <view class="combo-view">
    <block v-for="(item, index) in hpv_combo_name" :key="index">
      <text class="combo-title">{{item.title}}</text>
      <view class="combo-list">
        <text v-for="(item_a, index_a) in item.name" :key="index_a"
        :class="index_a == COMBO ? 'checkstyle' : ''"
        @click="changCombo(index_a, item_a.combo_id, item_a.combo)"
        >{{item_a.combo}}</text>
      </view>
    </block>
    <!-- 接种时间 -->
    <block v-for="(item, index) in hpv_combo_time" :key="index">
      <text class="combo-title">{{item.title}}</text>
      <view class="combo-list">
        <text v-for="(item_a,index_a) in item.name" :key="index_a"
        :class="index_a == TIME ? 'checkstyle' : ''"
        @click="changTime(index_a, item_a.time_id, item_a.time)"
        >{{item_a.time}}</text>
      </view>
   </block>
  </view>
  <!-- 提交 -->
  <view style="height:300rpx"></view>
  <view class="Total-view">
    <text>合计：¥{{hpv_combo_price}}</text>
    <text @click="subMit">提交</text>
  </view>
</template>

<script setup lang="ts">
import {reactive, ref,watch,toRef, toRefs} from 'vue'
import { onLoad } from "@dcloudio/uni-app";
import {RequestApi} from '@/public/request'
import {Hpvcomboname,Hpvcombotime} from '@/public/decl-type'

let hpv_combo_name = ref<Hpvcomboname[]>([])//套餐民称
let hpv_combo_time = ref<Hpvcombotime[]>([])//套餐接种时间
// 接收上个页面传来的值
let router_value = reactive({
  _id:'',
  name:'',
  price:['1'],
  describe:['1']
})
interface Resdata{
  data:{data:[Hpvcomboname,Hpvcombotime]}
}
onLoad(async(event:any)=>{
  // console.log(event)
  let {_id,name,price,describe} = JSON.parse(event.value)
  router_value._id = _id
  router_value.name = name
  router_value.price = price
  router_value.describe = describe
  const res = await RequestApi.HpvPack() as Resdata
  hpv_combo_name.value = [res.data.data[0]]
  hpv_combo_time.value = [res.data.data[1]]
})

// 选中套餐民称
let COMBO = ref(-1)
let combo_id = ref('')
let combo_name = ref('')
function changCombo(index:number,id:string,name:string){
  COMBO.value = index
  combo_id.value = id
  combo_name.value = name
}
// 选中接种时间
let TIME = ref(-1)
let time_id = ref('')
let combo_time = ref('')
function changTime(index:number,id:string,time:string){
  TIME.value = index
  time_id.value = id
  combo_time.value = time
}
// "8d33255162dc5b22001ef71c302a450b"
// 监听选中套餐民称和接种时间请求价格
watch([combo_id,time_id],(newVal,oldVal)=>{
  if(newVal[0] != '' && newVal[1] != ''){
    uni.showLoading({title: '获取价格',mask:true})
    hpvPrice()
  }
})
// 请求套餐价格
let hpv_combo_price = ref(0.00)
interface ResPrice{
  data:{data:[{price:number}]}
}
async function hpvPrice(){
  const res = await RequestApi.HpvPrice(
    {hpv_id:router_value._id,
    combo_id:combo_id.value,
    time_id:time_id.value
    }
  ) as ResPrice
  hpv_combo_price.value = res.data.data[0].price
  uni.hideLoading()
}

// 选择性别
let gender = ref('')
function changeSelector(event:{detail:{value:string}}):void{
  gender.value = event.detail.value == '0' ? '男' : '女'
}
// 选择出生日期
let born_date = ref('')
function changeDate(event:{detail:{value:string}}){
  born_date.value = event.detail.value
}

// 待提交的数据
let submitData = reactive({
  name:'',
  id_card:'',
  gender,
  born_date,
  phone:'',
  combo:combo_name,
  ino_time:combo_time,
  price:hpv_combo_price,
  hpv_name:toRefs(router_value).name
})

// 提交订单
async function subMit(){
  uni.showLoading({title: '提交中',mask:true})
  const res = await RequestApi.ResHpv(submitData) as {statusCode:number}
  console.log(res)
  if(res.statusCode == 200){
    uni.hideLoading()
    // 跳转订单页
    uni.redirectTo({
      url:'/pages/my-service/hpv-view/index'
    })
  }
}

</script>


<style>
  /* 表单提交 */
  @import url('../../common-style/form.css');
  page{
    background-color: #fafafa;
  }
  .hpv-choose{
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    padding: 20rpx;
    margin-bottom: 40rpx;
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
  /* 套餐 */
  .combo-view{
    background-color: #ffffff;
    padding: 20rpx;
    margin: 20rpx 0;
  }
  .combo-title{
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }
  .combo-list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .combo-list text{
    padding: 20rpx 40rpx;
    background-color: #f5f5f5;
    margin: 0 20rpx 20rpx 0;
    border-radius: 10rpx;
    display: block;
  }
  /* 选中加上样式 */
  .checkstyle{
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
  
  </style>