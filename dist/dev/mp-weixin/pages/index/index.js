"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
if (!Math) {
  skIndex();
}
const skIndex = () => "../../Skeleton/SK-index.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "83a5a03c-menu_top": common_vendor.unref(menu_top),
      "83a5a03c-menu_height": common_vendor.unref(menu_height)
    }));
    let menu_top = common_vendor.ref("");
    let menu_height = common_vendor.ref("");
    common_vendor.onMounted(() => {
      let MenuButton = common_vendor.index.getStorageSync("MenuButton");
      menu_top.value = MenuButton.top + "px";
      menu_height.value = MenuButton.height + "px";
      pageData();
    });
    let vaccine = common_vendor.ref([]);
    let phydata = common_vendor.ref([]);
    let registered = common_vendor.ref([]);
    let selftest = common_vendor.ref([]);
    let skeLeton = common_vendor.ref(true);
    async function pageData() {
      const res = await public_request.RequestApi.FrontPage();
      console.log(res);
      vaccine.value = res.data.data[0].vaccine;
      phydata.value = res.data.data[1].reserve;
      registered.value = res.data.data[2].popular;
      selftest.value = res.data.data[3].self_test;
      skeLeton.value = false;
    }
    function vaccineApp(index) {
      switch (index) {
        case 0:
          common_vendor.index.navigateTo({ url: "/pages/xinguan-vaccine/xinguan-vaccine" });
          break;
        case 1:
          common_vendor.index.navigateTo({ url: "/pages/hpv-vaccine/hpv-vaccine" });
          break;
        case 2:
          common_vendor.index.navigateTo({ url: "/pages/nucleic-acid/index" });
          break;
        case 3:
          common_vendor.index.navigateTo({ url: "/pages/graphics/index" });
      }
    }
    function regMedex(index) {
      switch (index) {
        case 0:
          common_vendor.index.switchTab({ url: "/pages/registered/registered" });
          break;
        case 1:
          common_vendor.index.navigateTo({ url: "/pages/phy-exam/index" });
      }
    }
    function regRoute(dep_id) {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/index?id=" + dep_id
      });
    }
    function jumpAssess(name, index, type) {
      if (type == "001") {
        common_vendor.index.navigateTo({
          url: "/pages/self-test/topic?type=001&name=" + name
        });
      } else {
        if (index == 0) {
          common_vendor.index.navigateTo({
            url: "/pages/self-test/topic?type=002&name=" + name
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/self-test/topic?type=003&name=" + name
          });
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s(_ctx.__cssVars()),
        b: common_vendor.s(_ctx.__cssVars()),
        c: common_vendor.f(common_vendor.unref(vaccine), (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => vaccineApp(index), index)
          };
        }),
        d: common_vendor.s(_ctx.__cssVars()),
        e: common_vendor.f(common_vendor.unref(phydata), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.describe),
            c: item.image,
            d: index,
            e: common_vendor.o(($event) => regMedex(index), index)
          };
        }),
        f: common_vendor.s(_ctx.__cssVars()),
        g: common_vendor.o(($event) => regMedex(0)),
        h: common_vendor.s(_ctx.__cssVars()),
        i: common_vendor.f(common_vendor.unref(registered), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.image,
            c: index,
            d: common_vendor.s("background-color:" + item.background),
            e: common_vendor.o(($event) => regRoute(item.dep_id), index)
          };
        }),
        j: common_vendor.s(_ctx.__cssVars()),
        k: common_vendor.s(_ctx.__cssVars()),
        l: common_vendor.unref(selftest).length > 0
      }, common_vendor.unref(selftest).length > 0 ? {
        m: common_vendor.f([common_vendor.unref(selftest)[0]], (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.describe),
            c: common_vendor.t(item.number_of_people),
            d: common_vendor.t(item.question),
            e: common_vendor.t(item.minute),
            f: item.image,
            g: index,
            h: common_vendor.o(($event) => jumpAssess(item.name, index, "001"), index)
          };
        }),
        n: common_vendor.f(common_vendor.unref(selftest).slice(1), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.question),
            c: common_vendor.t(item.minute),
            d: common_vendor.t(item.number_of_people),
            e: item.image,
            f: index,
            g: common_vendor.o(($event) => jumpAssess(item.name, index, "002"), index)
          };
        }),
        o: common_vendor.s(_ctx.__cssVars())
      } : {}, {
        p: common_vendor.unref(skeLeton)
      }, common_vendor.unref(skeLeton) ? {
        q: common_vendor.s(_ctx.__cssVars())
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
