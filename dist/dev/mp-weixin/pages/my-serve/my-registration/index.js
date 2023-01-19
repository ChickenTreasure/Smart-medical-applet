"use strict";
const common_vendor = require("../../../common/vendor.js");
const public_request = require("../../../public/request.js");
if (!Math) {
  point();
}
const point = () => "../../../com-components/point.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let order = common_vendor.ref([]);
    let show = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      const res = await public_request.RequestApi.UserreGistrat();
      order.value = res.data.data;
      if (res.data.data.length == 0) {
        show.value = true;
      }
    });
    async function Cancel(id, index) {
      const res = await public_request.RequestApi.RegistCancel({ _id: id });
      if (res.statusCode == 200) {
        order.value[index].cancel = false;
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(order), (item, index, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.tre_doctor),
            c: common_vendor.t(item.tre_place),
            d: common_vendor.t(item.se_number),
            e: common_vendor.t(item.patient_name),
            f: common_vendor.t(item.tre_time),
            g: common_vendor.t(item.the_time),
            h: common_vendor.t(item.dep_ment),
            i: common_vendor.t(item.que_number),
            j: common_vendor.t(item.remark),
            k: common_vendor.t(item.reg_cost),
            l: common_vendor.t(item.cancel ? "\u53D6\u6D88\u9884\u7EA6" : "\u5DF2\u53D6\u6D88\u9884\u7EA6"),
            m: common_vendor.n(item.cancel ? "" : "prevent_style"),
            n: common_vendor.o(($event) => Cancel(item._id, index)),
            o: index
          };
        }),
        b: common_vendor.p({
          show: common_vendor.unref(show)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/my-serve/my-registration/index.vue"]]);
wx.createPage(MiniProgramPage);
