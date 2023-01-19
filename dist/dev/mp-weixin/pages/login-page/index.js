"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    function Login() {
      common_vendor.index.getUserProfile({
        desc: "\u83B7\u53D6\u4E2A\u4EBA\u4FE1\u606F",
        success: (res) => {
          let { avatarUrl, nickName } = res.userInfo;
          common_vendor.index.login({
            success: (code) => {
              common_vendor.index.showLoading({ title: "\u767B\u9646\u4E2D", mask: true });
              ApiLogin(avatarUrl, nickName, code.code);
            },
            fail: (err) => {
              common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
            }
          });
        },
        fail: (err) => {
          common_vendor.index.showToast({ title: "\u767B\u5F55\u5931\u8D25", icon: "none", duration: 1e3 });
        }
      });
    }
    async function ApiLogin(avatarUrl, nickName, code) {
      try {
        let obj = { appid: "wx3633f21a152d6617", secret: "ae096d1f7356b041bf549af7243a4319", avatarUrl, nickName, code };
        let res = await public_request.RequestApi.WxLogin(obj);
        common_vendor.index.setStorageSync("wxuser", res.data.data);
        setTimeout(() => {
          common_vendor.index.navigateBack({ delta: 1 });
          common_vendor.index.hideLoading();
        }, 600);
      } catch (error) {
        common_vendor.index.showToast({ title: "\u767B\u5F55\u51FA\u9519\u4E86", icon: "none", duration: 1e3 });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(Login)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/login-page/index.vue"]]);
wx.createPage(MiniProgramPage);
