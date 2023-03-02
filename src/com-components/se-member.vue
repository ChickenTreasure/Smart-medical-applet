<template>
  <page-container
    :show="submitData.show"
    @enter="onEnter"
    @clickoverlay="submitData.show = false"
  >
    <view class="popups">
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
  </page-container>
</template>

<script setup lang="ts">
import { reactive, ref, defineProps } from "vue";
import { myData } from "@/store/index";
import RequestApi from "@/public/rquest";

export interface Event {
  phy_name: string;
  phy_time: string;
  show: boolean;
}

function onEnter() {
  console.log("进入中触发");
}

// 待提交的值
let submitData = reactive({
  phy_name: "",
  phy_time: "",
  show: false,
  patient_id: "",
});

// 被父组件调用的方法
function trigGer(event: Event) {
  submitData.phy_name = event.phy_name;
  submitData.phy_time = event.phy_time;
  submitData.show = event.show;
}
defineExpose({ trigGer });

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
  name.value = state.patient.name;
  submitData.patient_id = state.patient._id;
});

// 提交预约
async function subMit() {
  uni.showLoading({ title: "提交中", mask: true });
  const res = (await RequestApi.ResPhy(submitData)) as { statusCode: number };
  if (res.statusCode == 200) {
    uni.hideLoading();
    uni.redirectTo({
      url: "/pages/my-service/phy-exam/index",
    });
  }
}
</script>

<style>
@import url("../common-style/nucleic-time.css");
.popups {
  height: 400rpx;
  width: 100%;
  background-color: #ffffff;
}
</style>
