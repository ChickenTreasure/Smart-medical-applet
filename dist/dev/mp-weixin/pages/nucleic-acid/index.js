"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let nuclei_cacid = common_vendor.reactive({ data: {
      address: "",
      hospital: "",
      logo: "",
      name: "",
      phone: "",
      price: 0,
      boon: [],
      date: [],
      style: []
    } });
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.NuataGet();
      console.log(res);
      nuclei_cacid.data = res.data.data[0];
    });
    function makePhoneCall(phone) {
      common_vendor.index.makePhoneCall({
        phoneNumber: "phone"
      });
    }
    let timeIndex = common_vendor.ref(-1);
    let submitData = common_vendor.reactive({
      name: "",
      phone: "",
      id_card: "",
      time: ""
    });
    async function Submit() {
      const res = await public_request.RequestApi.ResNuata(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.navigateTo({
          url: "/pages/my-service/nucleic-acid/index"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(nuclei_cacid).data.price),
        b: common_vendor.f(common_vendor.unref(nuclei_cacid).data.boon, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        c: common_vendor.o(($event) => makePhoneCall()),
        d: common_vendor.unref(submitData).name,
        e: common_vendor.o(($event) => common_vendor.unref(submitData).name = $event.detail.value),
        f: common_vendor.unref(submitData).phone,
        g: common_vendor.o(($event) => common_vendor.unref(submitData).phone = $event.detail.value),
        h: common_vendor.unref(submitData).id_card,
        i: common_vendor.o(($event) => common_vendor.unref(submitData).id_card = $event.detail.value),
        j: common_vendor.f(common_vendor.unref(nuclei_cacid).data.date, (item, index, i0) => {
          return {
            a: common_vendor.t(item.date),
            b: common_vendor.t(item.week),
            c: index,
            d: common_vendor.n(index == common_vendor.unref(timeIndex) ? "checkstyle" : ""),
            e: common_vendor.o(($event) => (common_vendor.isRef(timeIndex) ? timeIndex.value = index : timeIndex = index, common_vendor.unref(submitData).time = item.date), index)
          };
        }),
        k: common_vendor.f(common_vendor.unref(nuclei_cacid).data.style, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.desc, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a),
                b: index_a
              };
            }),
            c: index
          };
        }),
        l: common_vendor.t(common_vendor.unref(nuclei_cacid).data.price),
        m: common_vendor.o(Submit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/nucleic-acid/index.vue"]]);
wx.createPage(MiniProgramPage);
