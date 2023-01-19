"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    let user_data = common_vendor.ref({ avatarUrl: "", nickName: "" });
    common_vendor.onShow(() => {
      let wxUser = common_vendor.index.getStorageSync("wxuser");
      console.log(wxUser);
      if (!wxUser) {
        user_data.value.avatarUrl = "";
        user_data.value.nickName = "";
      } else {
        user_data.value.avatarUrl = wxUser.avatarUrl;
        user_data.value.nickName = wxUser.nickName;
      }
    });
    function loGin() {
      common_vendor.index.navigateTo({
        url: "/pages/login-page/index"
      });
    }
    let information = common_vendor.reactive([
      {
        number: 5,
        title: "\u5065\u5EB7\u5206"
      },
      {
        number: 5,
        title: "\u4F18\u60E0\u5238"
      },
      {
        number: 5,
        title: "\u6D88\u606F"
      }
    ]);
    let orderData = common_vendor.reactive([
      {
        icon: "/static/mine/jiuzhenren.svg",
        title: "\u5C31\u8BCA\u4EBA\u7BA1\u7406",
        path: "/pages/my-serve/my-patient/my-patient"
      },
      {
        icon: "/static/mine/guahao.svg",
        title: "\u6211\u7684\u6302\u53F7",
        path: "/pages/my-serve/my-registration/index"
      },
      {
        icon: "/static/mine/xinguanyimiao.svg",
        title: "\u65B0\u51A0\u75AB\u82D7",
        path: "/pages/my-serve/xinguan/index"
      },
      {
        icon: "/static/mine/hpvyimiao.svg",
        title: "HPV\u75AB\u82D7",
        path: "/pages/my-serve/hpv-view/index"
      },
      {
        icon: "/static/mine/hesuan.svg",
        title: "\u6838\u9178\u68C0\u6D4B",
        path: "/pages/my-serve/nucleic-acid/index"
      },
      {
        icon: "/static/mine/tijianbaogao.svg",
        title: "\u6211\u7684\u4F53\u68C0",
        path: "/pages/my-serve/phy-exam/index"
      }
    ]);
    function orderRoute(path) {
      common_vendor.index.navigateTo({
        url: path
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(user_data).avatarUrl == "" ? "/static/other/touxiang.svg" : common_vendor.unref(user_data).avatarUrl,
        b: common_vendor.t(common_vendor.unref(user_data).nickName == "" ? "\u767B\u9646" : common_vendor.unref(user_data).nickName),
        c: common_vendor.o(loGin),
        d: common_vendor.n(common_vendor.unref(user_data).nickName == "" ? "split-new" : "disabled"),
        e: common_vendor.f(common_vendor.unref(information), (item, index, i0) => {
          return {
            a: common_vendor.t(item.number),
            b: common_vendor.t(item.title),
            c: index
          };
        }),
        f: common_vendor.f(common_vendor.unref(orderData), (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => orderRoute(item.path), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
