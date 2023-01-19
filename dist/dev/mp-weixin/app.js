"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/mine/mine.js";
  "./pages/my-serve/my-registration/index.js";
  "./pages/registered/registered.js";
  "./pages/doctor/index.js";
  "./pages/doctor/doctor-Homepage.js";
  "./pages/video/video.js";
  "./pages/self-test/topic.js";
  "./pages/self-test/result.js";
  "./pages/my-serve/phy-exam/index.js";
  "./pages/phy-exam/index.js";
  "./pages/phy-exam/Details.js";
  "./pages/graphics/index.js";
  "./pages/my-serve/my-patient/my-patient.js";
  "./pages/my-serve/my-patient/add-patient.js";
  "./pages/my-serve/nucleic-acid/index.js";
  "./pages/my-serve/xinguan/index.js";
  "./pages/nucleic-acid/index.js";
  "./pages/my-serve/hpv-view/index.js";
  "./pages/xinguan-vaccine/xinguan-vaccine.js";
  "./pages/hpv-vaccine/hpv-buy.js";
  "./pages/hpv-vaccine/hpv-vaccine.js";
  "./pages/login-page/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      let get_Menu = common_vendor.index.getStorageSync("MenuButton");
      if (!get_Menu) {
        const res = common_vendor.index.getMenuButtonBoundingClientRect();
        common_vendor.index.setStorageSync("MenuButton", res);
      }
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/App.vue"]]);
const pinia = common_vendor.createPinia();
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
