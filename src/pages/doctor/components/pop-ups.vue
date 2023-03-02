<template>
  <page-container :show="show" @enter="onEnter" @clickoverlay="clickoverlay">
    <view class="popups">
      <text class="popups-title">请选择预约时间段</text>
      <view class="table-time">
        <text
          v-for="(item, index) in the_time"
          :key="index"
          :class="index == selectIndex ? 'backTime' : ''"
          @click="(selectIndex = index), (submitData.the_time = item)"
          >{{ item }}</text
        >
      </view>
      <view>
        <text class="popups-title">选择成员</text>
        <view class="member-view">
          <image src="/static/other/touxiang.svg" mode="widthFix"></image>
          <text>{{ name }}</text>
          <text @click="choosePatient">{{
            name == "" ? "选择就诊人" : "重新选择"
          }}</text>
        </view>
        <view class="select-submit" @click="subMit">提交预约</view>
      </view>
    </view>
  </page-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { myData } from "@/store/index";
import RequestApi from "@/public/rquest";

export interface Data {
  show: boolean;
  week: string;
  the_time: string[];
  when: number;
  _id: string;
}

function onEnter() {}
//点击遮罩层触发
function clickoverlay() {
  show.value = false;
  // 清空上一次的数据
  the_time.value = [];
  selectIndex.value = -1;
  submitData.the_time = "";
}
// 弹窗显示
let show = ref(false);
// 选择预约时段
let the_time = ref<string[]>([]);
// 选择时段加上样式
let selectIndex = ref(-1);
// 接收父组件传来的值
function trigGer(value: Data) {
  show.value = value.show;
  the_time.value = value.the_time;
  submitData.week = value.week;
  submitData.when = value.when;
  submitData._id = value._id;
}
defineExpose({ trigGer });

// 待提交的值
let submitData = reactive({
  week: "",
  the_time: "",
  when: 0,
  _id: "",
  patient_id: "",
});

// 选择就诊人
function choosePatient() {
  uni.navigateTo({
    url: "/pages/my-service/my-patient/my-patient",
  });
}

// 监听选择的就诊人
let name = ref("");
const store = myData();
store.$subscribe((mutayion, state) => {
  //subscribe=watch
  console.log("doctor的components下的组件仓库监听到了");
  console.log(mutayion);

  name.value = state.patient.name;
  submitData.patient_id = state.patient._id;
});

async function subMit() {
  uni.showLoading({ title: "提交中", mask: true });
  const res = (await RequestApi.RegAppoin(submitData)) as {
    statusCode: number;
  };
  if (res.statusCode == 200) {
    uni.showToast({ title: "提交成功", icon: "none", duration: 1000 });
    uni.redirectTo({
      url: "/pages/my-service/my-registration/index",
    });
  }
}
</script>

<style scoped>
/* 选择成员 */
@import url("../../../common-style/nucleic-time.css");
.popups {
  /* height: 900rpx;
      overflow-y: hidden; */
  width: 100%;
  background-color: #ffffff;
}
.popups-title {
  font-size: 35rpx;
  text-align: center;
  font-weight: bold;
  display: block;
  padding: 20rpx 0;
}
.table-time {
  display: flex;
  flex-wrap: wrap;
  margin: 40rpx 20rpx;
}
.table-time text {
  width: 33.3%;
  display: block;
  text-align: center;
  padding: 30rpx 0;
  box-sizing: border-box;
  color: #0176ff;
  border: 1rpx solid #dfdfdf;
}
/* 选择成员 */
.backTime {
  color: #ffffff !important;
  background-color: #0176ff;
  border: 1rpx solid #0176ff;
}
</style>
