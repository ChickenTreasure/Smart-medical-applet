"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let phy_term = common_vendor.ref([]);
    let phy_data = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const res = await Promise.all([public_request.RequestApi.PhyTerm(), public_request.RequestApi.PhySget()]);
      phy_term.value = res[0].data.data;
      phy_data.value = res[1].data.data;
    });
    let filter_data = common_vendor.reactive({ type: "", sales: "", price: "" });
    let conview = common_vendor.ref(false);
    function selectType(value) {
      phy_term.value[0].query_val = value;
      conview.value = false;
      filter_data.type = value;
      queryResult();
    }
    function queryCombo(index, value) {
      if (index === 0) {
        conview.value = conview.value ? false : true;
      } else if (index === 1) {
        filter_data.sales = value[0];
        phy_term.value[index].filter_val[0] == "desc" ? "asc" : "desc";
        queryResult();
      } else {
        filter_data.price = value[0];
        phy_term.value[index].filter_val[0] == "desc" ? "asc" : "desc";
        queryResult();
      }
    }
    async function queryResult() {
      const res = await public_request.RequestApi.PhyQuery(filter_data);
      phy_data.value = res.data.data;
    }
    function phyDetail(id, title) {
      common_vendor.index.navigateTo({
        url: "/pages/phy-exam/Details?id=" + id + "&title=" + title
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(phy_term), (item, index, i0) => {
          return {
            a: common_vendor.t(item.query_val),
            b: index == 0 ? "/static/other/shaixuan-jiantou.png" : "/static/other/shaixuan.png",
            c: index,
            d: common_vendor.o(($event) => queryCombo(index, item.filter_val), index)
          };
        }),
        b: common_vendor.unref(conview),
        c: common_vendor.unref(phy_term).length > 0
      }, common_vendor.unref(phy_term).length > 0 ? {
        d: common_vendor.f(common_vendor.unref(phy_term)[0].filter_val, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => selectType(item), index)
          };
        })
      } : {}, {
        e: common_vendor.unref(conview),
        f: common_vendor.f(common_vendor.unref(phy_data), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.image,
            c: common_vendor.t(item.be_suit),
            d: common_vendor.t(item.describe),
            e: common_vendor.t(item.sales),
            f: common_vendor.t(item.price),
            g: common_vendor.o(($event) => phyDetail(item._id, item.title), index),
            h: index
          };
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/phy-exam/index.vue"]]);
wx.createPage(MiniProgramPage);
