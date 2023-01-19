"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "registered",
  setup(__props) {
    let department_data = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.DeparTment();
      department_data.value = res.data.data;
      changeList(0, res.data.data[0]._id);
    });
    let addColor = common_vendor.ref(0);
    let reglist_data = common_vendor.ref([]);
    async function changeList(index, id) {
      addColor.value = index;
      const res = await public_request.RequestApi.RegList({ id });
      reglist_data.value = res.data.data;
    }
    function jumpRoute(id) {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/index?id=" + id
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(department_data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.dep_ment),
            b: index,
            c: common_vendor.n(common_vendor.unref(addColor) == index ? "addcolor" : ""),
            d: common_vendor.o(($event) => changeList(index, item._id), index)
          };
        }),
        b: common_vendor.f(common_vendor.unref(reglist_data), (item, index, i0) => {
          return {
            a: common_vendor.f(item.dep_ment_list, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.dep_name),
                b: index_a,
                c: common_vendor.o(($event) => jumpRoute(item_a.dep_id), index_a)
              };
            }),
            b: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70dc9f2c"], ["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/registered/registered.vue"]]);
wx.createPage(MiniProgramPage);
