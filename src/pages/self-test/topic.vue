<template>
  <view class="progress-box">
    <text>测评进度</text>
    <progress
      class="progress"
      :percent="percent"
      border-radius="40"
      stroke-width="9"
      color="#cce3ff"
      activeColor="#2d8dfe"
      :active="true"
      active-mode="forwards"
      duration="15"
    />
    <text>{{ add_to }}/{{ topic_length }}</text>
  </view>
  <!-- 题目 -->
  <view class="question">{{ data.topic }}</view>
  <!-- 单选题 -->
  <view class="topic-view">
    <view class="topic-Title">
      <text></text>
      <text>单选题</text>
    </view>
    <view
      class="totic"
      hover-class="hover-style"
      hover-stay-time="300"
      v-for="(item, index) in data.options"
      :key="index"
      @click="choose(item.son_id)"
      >{{ item.title }}</view
    >
  </view>
  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton"></skIndex>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import RequestApi from "@/public/rquest";
import type { Topic } from "@/public/decl-type";
// 骨架屏
import skIndex from "@/Skeleton/SK-self-test.vue";

// 用于判断请求哪个接口，'001':抑郁症测评；'002':男性功能测评；'003'：失眠程度测评
let judg_valu = ref("");
// 获取上个页面传来的值
onLoad((event) => {
  let { type, name } = event as { type: string; name: string };
  judg_valu.value = type;
  uni.setNavigationBarTitle({ title: name });
});

// 存储所有题目
let topic_data = ref<Topic[]>([]);
// 总得有多少题
let topic_length = ref(0);
// 存储每一题的数据
let each_question = reactive<{ data: Topic }>({
  data: {
    topic: "",
    _id: "",
    options: [],
  },
});
let { data } = toRefs(each_question);
interface Resdata {
  data: { data: Topic[] };
}
// 骨架屏
let skeLeton = ref(true);
onShow(async () => {
  // 清空上一次的结果
  add_to.value = 1;
  add_to_s.value = 0;
  percent.value = 0;
  topic_id.value = [];
  if (judg_valu.value == "001") {
    //抑郁症测评；
    var res = (await RequestApi.DepressionTopics()) as Resdata;
  } else if (judg_valu.value == "002") {
    //男性功能测评；
    var res = (await RequestApi.PrematureTopics()) as Resdata;
  } else {
    //失眠程度测评
    var res = (await RequestApi.InsomniaTopics()) as Resdata;
    // console.log(res)
  }
  //   console.log(res);

  topic_data.value = res.data.data;
  topic_length.value = res.data.data.length;
  each_question.data = res.data.data[0];
  percent.value = 100 / topic_length.value;
  // 骨架屏
  skeLeton.value = false;
});

// 存储每一道题的下标:初次进入页面
let add_to = ref(1);
// 存储每一道题的下标:点击存储
let add_to_s = ref(0);
// 进度条计算
let percent = ref(0);
// 存储每一次点击的选项id
let topic_id = reactive<{ value: string[] }>({ value: [] });

// 选择每一道题触发
function choose(son_id: string) {
  add_to_s.value++;
  if (add_to_s.value < topic_length.value) {
    add_to.value++;
    // 进度条计算
    percent.value = (100 / topic_length.value) * add_to.value;
    each_question.data = topic_data.value[add_to_s.value];
  }
  // 存储每一次点击的选项id
  topic_id.value.push(son_id);
}
// 监听是否全部选择完毕，ok的话，跳转下一页
watch([add_to_s, topic_length], (newVal, oldVal) => {
  if (newVal[0] === newVal[1]) {
    console.log("监听是否全部选择完毕，ok的话，跳转下一页");
    // console.log(topic_id.value)
    let OBJ = JSON.stringify({
      type: judg_valu.value,
      topic_id: topic_id.value,
    });
    uni.navigateTo({
      url: "/pages/self-test/result?value=" + OBJ,
    });
  }
});
</script>

<style>
page {
  background: linear-gradient(to bottom, #d6e8ff 30%, #f2f7fb 55%, #f0f5f9 90%);
}
.progress-box {
  display: flex;
  align-items: center;
  padding: 20rpx;
}
.progress {
  flex: 1;
  padding: 0 40rpx;
}
.question {
  padding: 30rpx 20rpx;
  margin: 40rpx 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
}
.topic-view {
  background-color: #f3f8ff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin: 20rpx;
  box-shadow: #d6e8ff 0px 0px 23rpx 5rpx;
}
.topic-Title {
  display: flex;
  align-items: center;
}
.topic-Title text:nth-child(1) {
  width: 8rpx;
  height: 27rpx;
  background-color: #0d7cff;
  display: block;
  margin-right: 10rpx;
}
.totic {
  background: #ffffff;
  margin: 20rpx 0;
  padding: 40rpx 10rpx;
  border-radius: 10rpx;
}
.hover-style {
  background-color: #ebf4ff;
  color: #298cff;
}
</style>
