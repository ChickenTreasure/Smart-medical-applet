"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
if (!Math) {
  SemenMber();
}
const SemenMber = () => "../../com-components/se-member.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Details",
  setup(__props) {
    let phy_detail = common_vendor.ref([]);
    common_vendor.onLoad(async (event) => {
      console.log(event);
      const res = await public_request.RequestApi.PhydaTeil({ id: event.id });
      console.log(res.data.data);
      S_Data.phy_name = event.title;
      phy_detail.value = res.data.data;
    });
    let timeIndex = common_vendor.ref(-1);
    let S_Data = common_vendor.reactive({
      phy_name: "",
      phy_time: "",
      show: true
    });
    let compNone = common_vendor.ref();
    function memBar() {
      compNone.value.trigGer(S_Data);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(phy_detail), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.price),
            c: common_vendor.t(item.sales),
            d: common_vendor.t(item.title),
            e: index
          };
        }),
        b: common_vendor.f(common_vendor.unref(phy_detail), (item, index, i0) => {
          return {
            a: common_vendor.f(item.date, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.date),
                b: common_vendor.t(item_a.week),
                c: index_a,
                d: common_vendor.n(index_a == common_vendor.unref(timeIndex) ? "checkstyle" : ""),
                e: common_vendor.o(($event) => (common_vendor.isRef(timeIndex) ? timeIndex.value = index_a : timeIndex = index_a, common_vendor.unref(S_Data).phy_time = item_a.date), index_a)
              };
            }),
            b: index
          };
        }),
        c: common_vendor.f(common_vendor.unref(phy_detail), (item, index, i0) => {
          return {
            a: common_vendor.f(item.crowd, (item_a, index_a, i1) => {
              return {
                a: item_a.image,
                b: common_vendor.t(item_a.name),
                c: index_a
              };
            }),
            b: index
          };
        }),
        d: common_vendor.f(common_vendor.unref(phy_detail), (item, index, i0) => {
          return {
            a: common_vendor.f(item.project, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.title),
                b: common_vendor.f(item_a.content, (item_b, index_b, i2) => {
                  return {
                    a: common_vendor.t(item_b.thing),
                    b: common_vendor.t(item_b.details),
                    c: index_b
                  };
                }),
                c: index_a
              };
            }),
            b: index
          };
        }),
        e: common_vendor.unref(phy_detail).length > 0
      }, common_vendor.unref(phy_detail).length > 0 ? {
        f: common_vendor.t(common_vendor.unref(phy_detail)[0].price)
      } : {}, {
        g: common_vendor.o(memBar),
        h: common_vendor.sr(compNone, "54e4f943-0", {
          "k": "compNone"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/phy-exam/Details.vue"]]);
wx.createPage(MiniProgramPage);
