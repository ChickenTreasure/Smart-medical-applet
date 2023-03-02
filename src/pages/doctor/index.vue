<template>
  <view class="doctor-top filter-view">
    <view
      class="all-text"
      :class="selectIndex == -1 ? 'changeColor' : ''"
      @click="allDoctor"
      >全部</view
    >
    <scroll-view scroll-x="true" class="scroll-view_H">
      <view
        class="week"
        v-for="(item, index) in doctor_time"
        :key="index"
        @click="selectDoctor(index, item.dep_id, item.date)"
        :class="index == selectIndex ? 'changeColor' : ''"
      >
        <text>{{ item.date }}</text>
        <text>{{ item.week }}</text>
        <text>{{ item.nu_source == 1 ? "可约" : "无号" }}</text>
      </view>
    </scroll-view>
  </view>
  <view style="height: 170rpx"></view>
  <!-- 医生列表 -->
  <view
    class="doctor-list"
    v-for="(item, index) in doctor_list"
    :key="index"
    @click="jumpRoute(item._id)"
  >
    <image :src="item.avatar" mode="aspectFill"></image>
    <view class="doctor-name">
      <text>{{ item.name }}</text>
      <text>{{ item.post }}</text>
      <text>{{ item.good_at }}</text>
    </view>
    <view class="about-doctor">预约</view>
  </view>
  <!-- 提示组件 -->
  <point :show="doctor_list.length == 0 ? true : false" :title="title" />
  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton"></skIndex>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import RequestApi from "@/public/rquest";
import type { Doctortime, Doctorlist } from "@/public/decl-type";
// 公用提示组件
import point from "@/com-components/point.vue";
// 骨架屏
import skIndex from "@/Skeleton/SK-doctor.vue";

let title = ref("当日没有医生排班");

let doctor_time = ref<Doctortime[]>([]); //存储选择日期
let doctor_list = ref<Doctorlist[]>([]); //存储医生列表
let dep_id = ref("");
// 请求数据
interface ResData {
  data: { data: any[] };
}
// 骨架屏
let skeLeton = ref(true);
onLoad(async (event: any) => {
  uni.showLoading({ title: "加载中", mask: true });
  const { id } = event as { id: string };
  dep_id.value = id;
  const res = (await Promise.all([
    RequestApi.TimeSele({ dep_id: id }),
    RequestApi.AlldList({ dep_id: id }),
  ])) as ResData[];
  doctor_time.value = res[0].data.data;
  doctor_list.value = res[1].data.data;
  skeLeton.value = false;
  uni.hideLoading();
});

// 给时间加上颜色
let selectIndex = ref(-1);
// 请求全部医生列表
async function allDoctor() {
  selectIndex.value = -1;
  const res = (await RequestApi.AlldList({ dep_id: dep_id.value })) as ResData;
  doctor_list.value = res.data.data;
}
// 根据日期筛选医生列表
async function selectDoctor(index: number, dep_id: string, week: string) {
  selectIndex.value = index;
  const res = (await RequestApi.EverydList({ dep_id, week })) as ResData;
  doctor_list.value = res.data.data;
}
// 跳转医生主页
function jumpRoute(id: string) {
  uni.navigateTo({
    url: "/pages/doctor/doctor-Homepage?id=" + id,
  });
}
</script>

<style>
page {
  background-color: #f7f7f7;
}
/* 顶部 */
.doctor-top {
  background-color: #ffffff;
  height: 150rpx;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-top: 1rpx solid #f2f2f2;
}
.all-text {
  width: 150rpx;
  text-align: center;
  height: 150rpx;
  line-height: 150rpx;
  border-right: 1rpx solid #f2f2f2;
}
.scroll-view_H {
  white-space: nowrap;
  overflow: scroll;
  width: 100%;
  height: 150rpx;
  line-height: 50rpx;
}
.week {
  padding: 0 30rpx;
  display: inline-block;
  text-align: center;
}
.week text {
  display: block;
}
.week text:nth-child(3) {
  font-size: 26rpx;
}
/* 列表 */
.doctor-list {
  background-color: #ffffff;
  padding: 40rpx 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid #d3d3d8;
}
.doctor-list:last-child {
  border: none !important;
}
.doctor-list image {
  width: 150rpx;
  height: 150rpx;
  display: block;
  border-radius: 50%;
}
.doctor-list text {
  display: block;
  padding: 5rpx 0;
  color: #b1b2b3;
}
.doctor-name {
  flex: 1;
  padding: 0 10rpx;
}
.doctor-name text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  color: #333 !important;
}
.doctor-name text:nth-child(3) {
  display: -webkit-box;
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*隐藏后添加省略号*/
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.about-doctor {
  padding: 8rpx 30rpx;
  border-radius: 30rpx;
  border: 1rpx solid #0176ff;
  color: #0176ff;
}
/* 选中时间加上颜色 */
.changeColor {
  color: #0176ff;
}
</style>
