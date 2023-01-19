"use strict";
const common_vendor = require("../../common/vendor.js");
const public_misc = require("../../public/misc.js");
const public_request = require("../../public/request.js");
const store_index = require("../../store/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    async function upload() {
      const res = await public_misc.uploadImage(public_request.IMAGEURL, "\u4E0A\u4F20\u4E2D", "\u4E0A\u4F20\u5931\u8D25");
      submitData.ins_report.push(JSON.parse(res.data).data);
    }
    function checkboxChange(event) {
      submitData.guide = event.detail.value.length === 0 ? false : true;
    }
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
    let submitData = common_vendor.reactive({
      illness: "",
      guide: false,
      ins_report: [],
      patient_id: ""
    });
    function canCel() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
    async function subMit() {
      common_vendor.index.showLoading({ title: "\u63D0\u4EA4\u4E2D", mask: true });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 600);
      const res = await public_request.RequestApi.GrapHics(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.showToast({
          title: "\u63D0\u4EA4\u6210\u529F",
          icon: "none",
          duration: 1e3
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(submitData).illness,
        b: common_vendor.o(($event) => common_vendor.unref(submitData).illness = $event.detail.value),
        c: common_vendor.unref(submitData).guide,
        d: common_vendor.o(checkboxChange),
        e: common_vendor.f(common_vendor.unref(submitData).ins_report, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => common_vendor.unref(submitData).ins_report.splice(index, 1)),
            c: index
          };
        }),
        f: common_vendor.o(upload),
        g: common_vendor.t(common_vendor.unref(name)),
        h: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"),
        i: common_vendor.o(choosePatient),
        j: common_vendor.o(canCel),
        k: common_vendor.o(subMit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/graphics/index.vue"]]);
wx.createPage(MiniProgramPage);
