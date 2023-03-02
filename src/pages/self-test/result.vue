<template>
  <view class="back-color">
    <view class="result-top">
      <text>结果分析</text>
      <text>本测试及结果由AI得出,仅供参考,不能作为诊断及诊疗的依据</text>
    </view>
    <view class="result-desc" v-for="(item, index) in test_res" :key="index">
      <view>{{ item.scope }}：{{ item.result }}</view>
      <view>{{ item.suggest }}</view>
      <view class="bold">测评结果概述:</view>
      <view v-for="(item_a, index_a) in item.outline" :key="index_a"
        >{{ index_a + 1 }}. {{ item_a }}</view
      >
      <block v-if="item.recommend.length > 0">
        <view class="bold">AI为你推荐以下科室</view>
        <view
          class="recommend"
          v-for="(item_a, index_a) in item.recommend"
          :key="index_a"
        >
          <label>
            <text class="bold">{{ item_a.dep_name }}</text>
            <text class="Hosp">{{ item_a.hospital }}</text>
          </label>
          <label class="regi" @click="regiSter(item_a.dep_id)">去挂号</label>
        </view>
      </block>
    </view>
  </view>
  <!-- 按钮 -->
  <view class="exceed"></view>
  <view class="submit">
    <button plain="true" open-type="share">邀请朋友测一测</button>
    <button plain="true" @click="canCel">再测一次</button>
  </view>
  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton"></skIndex>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";
import { onShow, onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import RequestApi from "@/public/rquest";
import type { Testres, Sharedata } from "@/public/decl-type";
import { TEST } from "@/public/testing";
// 骨架屏
import skIndex from "@/Skeleton/SK-self-test-result.vue";
// 接收上个页面的选项id
let topic_id_v = ref<string[]>([]);
// 接收上个页面用于判断请求哪个接口的值
let type_id = ref("");
// 分享的数据
let share_data = ref<Sharedata[]>([]);
onLoad((event: any) => {
  let { type, topic_id } = JSON.parse(event.value);
  topic_id_v.value = topic_id;
  type_id.value = type;
  // 过滤分享的数据
  share_data.value = TEST.filter((item) => item.type == type);
});

// 存储测试结果
let test_res = ref<Testres[]>([]);
interface Res {
  data: { data: Testres[] };
}
// 骨架屏
let skeLeton = ref(true);
onShow(async () => {
  if (type_id.value == "001") {
    //抑郁症
    var res = (await RequestApi.DepressiSon({
      value: topic_id_v.value,
    })) as Res;
  } else if (type_id.value == "002") {
    //男性功能
    var res = (await RequestApi.PremaTure({ value: topic_id_v.value })) as Res;
  } else {
    //失眠测评
    var res = (await RequestApi.InsoMnia({ value: topic_id_v.value })) as Res;
  }
  test_res.value = res.data.data;
  skeLeton.value = false;
});

// 再测一次
function canCel() {
  uni.navigateBack({
    delta: 1,
  });
}

// 分享给好友
onShareAppMessage(() => {
  return {
    title: share_data.value[0].share_title,
    path: share_data.value[0].share_path,
    imageUrl: share_data.value[0].share_url,
  };
});

// 去挂号
function regiSter(dep_id: string) {
  uni.redirectTo({
    url: "/pages/doctor/index?id=" + dep_id,
  });
}
</script>

<style>
@import url("../../common-style/form.css");
page {
  background: #f0f5f9;
}
.back-color {
  background: -webkit-linear-gradient(
    top,
    #d6e8ff 30%,
    #f2f7fb 55%,
    #f0f5f9 90%
  );
}
.result-top {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
}
.result-top text:nth-child(1) {
  font-size: 35rpx;
  font-weight: bold;
  padding-bottom: 20rpx;
}
.result-desc {
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 20rpx;
  padding: 20rpx;
}
.result-desc view {
  margin-bottom: 20rpx;
  line-height: 1.5;
}
.result-desc view:nth-child(1) {
  font-size: 40rpx;
  font-weight: bold;
  color: #0d7cff;
}
.result-desc view:nth-child(2) {
  color: #0d7cff;
}
.bold {
  font-weight: bold;
  display: block;
}
.recommend {
  background-color: #f4f7fa;
  border-radius: 10rpx;
  padding: 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
}
.Hosp {
  color: #bac5cc;
}
.regi {
  align-self: center;
  background-color: #0176ff;
  color: #ffffff;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
}
.exceed {
  height: 300rpx;
  background: #f0f5f9;
}
</style>
