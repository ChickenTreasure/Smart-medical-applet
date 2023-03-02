<template>
  <view class="graphics-back">
    <text class="graphics-Title">请详细描述你的病情</text>
    <textarea
      placeholder="为了更好获得医生帮助,请尽可能详细描述病情"
      maxlength="300"
      placeholder-class="textarea-color"
      :auto-focus="true"
      v-model="submitData.illness"
    />
  </view>
  <!-- 指导用药 -->
  <view class="graphics-back">
    <checkbox-group @change="checkboxChange">
      <label>
        <checkbox
          value="cb"
          :checked="submitData.guide"
          color="#0176ff"
        />需要医生指导用药
      </label>
    </checkbox-group>
  </view>
  <!-- 上传图片 -->
  <view class="graphics-back">
    <text class="graphics-Title">上传检查报告或患处照片</text>
    <view class="pat-image">
      <view
        class="upload-Image"
        v-for="(item, index) in submitData.ins_report"
        :key="index"
      >
        <image :src="item" mode="aspectFill"></image>
        <image
          src="/static/other/shanchu-goods.svg"
          mode="widthFix"
          @click="submitData.ins_report.splice(index, 1)"
        ></image>
      </view>
      <view
        ><image
          src="/static/other/shuxing-img.png"
          @click="upload"
          mode="aspectFill"
        ></image
      ></view>
    </view>
  </view>
  <!-- 选择就诊人 -->
  <view class="graphics-back">
    <text class="graphics-Title">选择就诊人</text>
    <view class="patient-view">
      <image src="/static/other/touxiang.svg" mode="widthFix"></image>
      <text>{{ name }}</text>
      <text @click="choosePatient">{{
        name == "" ? "选择就诊人" : "重新选择"
      }}</text>
    </view>
  </view>
  <!-- 提交 -->
  <view style="height: 300rpx"></view>
  <view class="submit">
    <text @click="canCel">取消</text>
    <text @click="subMit">提交</text>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { uploadImage } from "@/public/mise";
import RequestApi, { IMAGEURL } from "@/public/rquest";
import type { Graphics } from "@/public/decl-type";
import { myData } from "@/store/index";

async function upload() {
  let res: any = await uploadImage(IMAGEURL, "上传中", "上传失败");
  // console.log(res);
  submitData.ins_report.push(JSON.parse(res.data).data as string);
}
// 是否需要指导用药
function checkboxChange(event: { detail: { value: string[] } }) {
  submitData.guide = event.detail.value.length === 0 ? false : true;
}

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

// 待提交数据
let submitData = reactive<Graphics>({
  illness: "",
  guide: false,
  ins_report: [],
  patient_id: "",
});

// 取消
function canCel() {
  uni.navigateBack({ delta: 1 });
}

// 提交
type Resobj = {
  statusCode: number;
};
async function subMit() {
  uni.showLoading({ title: "提交中", mask: true });
  const res = (await RequestApi.GrapHics(submitData)) as Resobj;
  if (res.statusCode == 200) {
    uni.showToast({ title: "提交成功", icon: "none", duration: 1000 });
  }
}
</script>

<style>
/* 表单提交 */
@import url("../../common-style/form.css");
page {
  background-color: #fafafa;
}
.graphics-back {
  background-color: #ffffff;
  margin: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
}
.graphics-Title {
  font-size: 35rpx;
  font-weight: bold;
  display: block;
  padding-bottom: 20rpx;
}
textarea {
  width: 100%;
  height: 250rpx;
}
.textarea-color {
  color: #00c8c8;
}
/* 上传图片 */
.pat-image {
  display: flex;
  flex-wrap: wrap;
}
.pat-image view {
  width: calc(33.3% - 5rpx * 2);
  height: 200rpx;
  margin: 5rpx;
}
.pat-image image {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 7rpx;
}
.upload-Image {
  position: relative;
}
.upload-Image image:nth-child(2) {
  width: 30rpx !important;
  height: 30rpx !important;
  position: absolute;
  top: 0;
  right: 0;
}
/* 选择就诊人 */
.patient-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.patient-view image {
  width: 120rpx;
  height: 120rpx;
}
.patient-view text:nth-child(2) {
  flex: 1;
  padding: 0 50rpx;
  font-weight: bold;
}
.patient-view text:nth-child(3) {
  color: #2c76ef;
}
</style>
