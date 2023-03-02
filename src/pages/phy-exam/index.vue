<template>
  <view class="Top-view">
    <view
      v-for="(item, index) in phy_term"
      :key="index"
      @click="queryCombo(index, item.filter_val)"
    >
      <text>{{ item.query_val }}</text>
      <image
        :src="
          index == 0
            ? '/static/other/shaixuan-jiantou.png'
            : '/static/other/shaixuan.png'
        "
      ></image>
    </view>
  </view>
  <view style="height: 100rpx"></view>
  <!-- 点击全部的筛选 -->
  <view class="mask-view" v-if="conview"></view>
  <view class="con-view" v-if="conview">
    <block v-if="phy_term.length > 0">
      <text
        v-for="(item, index) in phy_term[0].filter_val"
        :key="index"
        @click="selectType(item)"
        >{{ item }}</text
      >
    </block>
  </view>
  <!-- 列表 -->
  <view
    class="phy-exam-back"
    v-for="(item, index) in phy_data"
    :key="index"
    @click="phyDetail(item._id, item.title)"
  >
    <text class="phy-exam-type">{{ item.title }}</text>
    <view class="phy-exam-flex">
      <image :src="item.image" mode="aspectFill"></image>
      <view>
        <text class="phy-exam-title">{{ item.be_suit }}</text>
        <text class="phy-exam-label">{{ item.describe }}</text>
      </view>
    </view>
    <view class="phy-exam-price">
      <text>已约{{ item.sales }}</text>
      <text>¥{{ item.price }}</text>
    </view>
  </view>
  <view style="height: 300rpx"></view>
  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton"></skIndex>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import RequestApi from "@/public/rquest";
import type { Phyterm, Phydata } from "@/public/decl-type";
// 骨架屏
import skIndex from "@/Skeleton/SK-phy-exam.vue";

let phy_term = ref<Phyterm[]>([]); //筛选条件
let phy_data = ref<Phydata[]>([]); //套餐列表
// 请求数据
type Resdata = {
  data: { data: [] };
};
// 骨架屏
let skeLeton = ref(true);
onMounted(async () => {
  const res = (await Promise.all([
    RequestApi.PhyTerm(),
    RequestApi.PhySget(),
  ])) as Resdata[];
  phy_term.value = res[0].data.data;
  phy_data.value = res[1].data.data;
  skeLeton.value = false;
});

// 存储筛选值
let filter_data = reactive({ type: "", sales: "", price: "" });

// 显示或隐藏弹窗
let conview = ref(false);
// 按全部里面的套餐查询
function selectType(value: string) {
  phy_term.value[0].query_val = value;
  conview.value = false;
  filter_data.type = value;
  queryResult();
}
// 按销量，价格查询套餐
function queryCombo(index: number, value: string[]) {
  if (index === 0) {
    conview.value = conview.value ? false : true;
  } else if (index === 1) {
    //按销量
    filter_data.sales = value[0];
    phy_term.value[index].filter_val[0] = value[0] == "desc" ? "asc" : "desc";
    queryResult();
  } else {
    //按价格
    filter_data.price = value[0];
    phy_term.value[index].filter_val[0] = value[0] == "desc" ? "asc" : "desc";
    queryResult();
  }
}
// 查询体检套餐
async function queryResult() {
  const res = (await RequestApi.PhyQuery(filter_data)) as Resdata;
  phy_data.value = res.data.data;
}

// 到体检详情页
function phyDetail(id: string, title: string) {
  //   console.log(id, title);

  uni.navigateTo({
    url: "/pages/phy-exam/Details?id=" + id + "&title=" + title,
  });
}
</script>

<style>
page {
  background-color: #fafafa;
}
.Top-view {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50rpx;
  height: 100rpx;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.Top-view view {
  display: flex;
  align-items: center;
}
.Top-view image {
  width: 20rpx;
  height: 20rpx;
  display: block;
  padding-left: 10rpx;
}
/* 筛选条件 */
.mask-view {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 100rpx;
  background-color: rgba(0, 0, 0, 0.5);
}
.con-view {
  background-color: #ffffff;
  padding: 0 50rpx;
  position: fixed;
  top: 100rpx;
  left: 0;
  right: 0;
}
.con-view text {
  display: block;
  padding: 20rpx 0;
}
/* 体检套餐 */
.phy-exam-back {
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 10rpx;
}
.phy-exam-type {
  font-size: 35rpx;
  font-weight: bold;
}
.phy-exam-flex image {
  width: 200rpx;
  height: 200rpx;
  display: block;
}
.phy-exam-flex {
  display: flex;
  justify-content: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f6f6f6;
}
.phy-exam-flex view {
  flex: 1;
  padding-left: 20rpx;
}
.phy-exam-flex text {
  display: block;
}
.phy-exam-title {
  font-weight: bold;
  padding-bottom: 20rpx;
}
.phy-exam-label {
  color: #5555;
}
.phy-exam-price {
  display: flex;
  justify-content: space-between;
  padding-top: 20rpx;
  font-weight: bold;
  color: #ff5f2c;
}
</style>
