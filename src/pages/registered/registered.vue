<template>
  <view class="regist-view">
    <view class="regist-left">
      <text
        v-for="(item, index) in department_data"
        :key="index"
        :class="addColor == index ? 'addcolor' : ''"
        @click="changeList(index, item._id)"
      >
        {{ item.dep_ment }}
      </text>
    </view>
    <view class="regist-right">
      <block v-for="(item, index) in reglist_data" :key="index">
        <view
          v-for="(item_a, index_a) in item.dep_ment_list"
          :key="index_a"
          @click="jumpRoute(item_a.dep_id)"
        >
          {{ item_a.dep_name }}
        </view>
      </block>
    </view>
  </view>
  <!-- 骨架屏 -->
  <skIndex v-if="skeLeton"></skIndex>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RequestApi from "@/public/rquest";
import type { Department, Reglist } from "@/public/decl-type";
// 骨架屏
import skIndex from "@/Skeleton/SK-registered.vue";

// 父科室数据
let department_data = ref<Department[]>([]);
// 请求数据
interface DeparData {
  data: { data: Department[] };
}
// 骨架屏
let skeLeton = ref(true);
onMounted(async () => {
  const res = (await RequestApi.DeparTment()) as DeparData;
  // console.log(res)
  department_data.value = res.data.data;
  changeList(0, res.data.data[0]._id);
});

// 点击父科室加上颜色
let addColor = ref(0);
// 请求子科室数据
let reglist_data = ref<Reglist[]>([]);
interface RegData {
  data: { data: Reglist[] };
}
async function changeList(index: number, id: string) {
  addColor.value = index;
  const res = (await RequestApi.RegList({ id })) as RegData;
  reglist_data.value = res.data.data;
  // 骨架屏
  skeLeton.value = false;
}
// 跳转选择医生
function jumpRoute(id: string) {
  uni.navigateTo({
    url: "/pages/doctor/index?id=" + id,
  });
}
</script>

<style scoped>
.regist-view {
  display: flex;
  justify-content: space-between;
}
.regist-left {
  background-color: #f5f5f5;
  width: 200rpx;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  overflow: auto;
}
.regist-left text {
  display: block;
  padding: 25rpx;
}
.addcolor {
  background-color: #ffffff;
  color: #2c76ef;
}
.regist-right {
  padding-left: 200rpx;
  flex: 1;
}

.regist-right view {
  padding: 25rpx;
}
</style>
