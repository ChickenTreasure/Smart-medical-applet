"use strict";
const common_vendor = require("../common/vendor.js");
const store_index = require("../store/index.js");
const public_request = require("../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "se-member",
  setup(__props, { expose }) {
    function onEnter() {
      console.log("\u8FDB\u5165\u4E2D\u89E6\u53D1");
    }
    let submitData = common_vendor.reactive({
      phy_name: "",
      phy_time: "",
      show: false,
      patient_id: ""
    });
    function trigGer(event) {
      submitData.phy_name = event.phy_name;
      submitData.phy_time = event.phy_time;
      submitData.show = event.show;
    }
    expose({ trigGer });
    function choosePatient() {
      common_vendor.index.navigateTo({
        url: "/pages/my-serve/my-patient/my-patient"
      });
    }
    let name = common_vendor.ref("");
    const store = store_index.myData();
    store.$subscribe((mutayion, state) => {
      name.value = state.patient.name;
      submitData.patient_id = state.patient._id;
    });
    async function subMit() {
      common_vendor.index.showLoading({ title: "\u63D0\u4EA4\u4E2D", mask: true });
      const res = await public_request.RequestApi.ResPhy(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.redirectTo({
          url: "/pages/my-serve/phy-exam/index"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(name)),
        b: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"),
        c: common_vendor.o(choosePatient),
        d: common_vendor.o(subMit),
        e: common_vendor.unref(submitData).show,
        f: common_vendor.o(onEnter),
        g: common_vendor.o(($event) => common_vendor.unref(submitData).show = false)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/com-components/se-member.vue"]]);
wx.createComponent(Component);
