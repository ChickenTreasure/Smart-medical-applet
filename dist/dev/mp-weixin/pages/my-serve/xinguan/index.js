"use strict";
const common_vendor = require("../../../common/vendor.js");
const public_request = require("../../../public/request.js");
if (!Array) {
  const _component_point = common_vendor.resolveComponent("point");
  _component_point();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let order = common_vendor.ref([]);
    let show = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      const res = await public_request.RequestApi.CoviduserOrder();
      order.value = res.data.data;
      if (res.data.data.length == 0) {
        show.value = true;
      }
    });
    async function Cancel(id, index) {
      const res = await public_request.RequestApi.CovidCancel({ _id: id });
      if (res.statusCode == 200) {
        order.value[index].cancel = false;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(order), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: common_vendor.t(item.company),
            d: common_vendor.t(item.date),
            e: common_vendor.t(item.period),
            f: common_vendor.t(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"),
            g: common_vendor.n(item.cancel ? "" : "prevent_style"),
            h: common_vendor.o(($event) => Cancel(item._id, index)),
            i: index
          };
        }),
        b: common_vendor.p({
          show: common_vendor.unref(show)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/my-serve/xinguan/index.vue"]]);
wx.createPage(MiniProgramPage);
