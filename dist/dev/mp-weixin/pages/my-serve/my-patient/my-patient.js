"use strict";
const common_vendor = require("../../../common/vendor.js");
const public_request = require("../../../public/request.js");
const store_index = require("../../../store/index.js");
if (!Array) {
  const _component_ponit = common_vendor.resolveComponent("ponit");
  _component_ponit();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my-patient",
  setup(__props) {
    let show = common_vendor.ref(false);
    let title = common_vendor.ref("\u4F60\u8FD8\u6CA1\u6709\u5C31\u8BCA\u4EBA");
    let patient = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      const res = await public_request.RequestApi.GetpaTient();
      patient.value = res.data.data;
      if (res.data.data.length == 0) {
        show.value = true;
      }
    });
    const store = store_index.myData();
    function checkedData(name, _id) {
      store.addPatient({ name, _id });
      common_vendor.index.navigateBack({ delta: 1 });
    }
    function canCel() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
    function addTo() {
      common_vendor.index.navigateTo({
        url: "/pages/my-serve/my-patient/add-patient"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(patient), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.relation),
            c: common_vendor.t(item.sex),
            d: common_vendor.t(item.age),
            e: common_vendor.t(item.phone),
            f: index,
            g: common_vendor.o(($event) => checkedData(item.name, item._id), index)
          };
        }),
        b: common_vendor.o(canCel),
        c: common_vendor.o(addTo),
        d: common_vendor.p({
          show: common_vendor.unref(show),
          title: common_vendor.unref(title)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/my-serve/my-patient/my-patient.vue"]]);
wx.createPage(MiniProgramPage);
