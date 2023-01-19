"use strict";
const common_vendor = require("../../../common/vendor.js");
const public_misc = require("../../../public/misc.js");
const public_request = require("../../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "add-patient",
  setup(__props) {
    async function upload() {
      const res = await public_misc.uploadImage(public_request.AICARD, "\u8BC6\u522B\u4E2D", "\u8BC6\u522B\u5931\u8D25");
      let data = JSON.parse(res.data);
      if (res.statusCode == 200) {
        submitData.name = data.data.name;
        submitData.sex = data.data.sex;
        submitData.born = data.data.born;
        submitData.id_card = data.data.id_card;
      } else {
        common_vendor.index.showToast({ title: data.data, icon: "none", duration: 1e3 });
      }
    }
    function changeSex(event) {
      console.log(event.detail.value);
      submitData.sex = event.detail.value == "0" ? "\u7537" : "\u5973";
    }
    function changeDate(event) {
      submitData.born = event.detail.value;
    }
    function changeRelation(event) {
      const res = event.detail.value;
      submitData.relation = res == "0" ? "\u81EA\u5DF1" : res == "1" ? "\u7236\u6BCD" : "\u5176\u4ED6";
    }
    let submitData = common_vendor.reactive({
      name: "",
      sex: "",
      born: "",
      relation: "",
      id_card: "",
      phone: ""
    });
    function canCel() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
    async function addMit() {
      const res = await public_request.RequestApi.PatientRes(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.navigateBack({ delta: 1 });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(upload),
        b: common_vendor.unref(submitData).name,
        c: common_vendor.o(($event) => common_vendor.unref(submitData).name = $event.detail.value),
        d: common_vendor.t(common_vendor.unref(submitData).sex == "" ? "\u8BF7\u8F93\u5165\u6027\u522B" : common_vendor.unref(submitData).sex),
        e: ["\u7537", "\u5973"],
        f: common_vendor.o(changeSex),
        g: common_vendor.t(common_vendor.unref(submitData).born == "" ? "\u8BF7\u9009\u62E9\u51FA\u751F\u65E5\u671F" : common_vendor.unref(submitData).born),
        h: common_vendor.o(changeDate),
        i: common_vendor.t(common_vendor.unref(submitData).relation == "" ? "\u8BF7\u9009\u62E9\u6210\u5458\u5173\u7CFB" : common_vendor.unref(submitData).relation),
        j: common_vendor.o(changeRelation),
        k: ["\u81EA\u5DF1", "\u7236\u6BCD", "\u5176\u4ED6"],
        l: common_vendor.unref(submitData).id_card,
        m: common_vendor.o(($event) => common_vendor.unref(submitData).id_card = $event.detail.value),
        n: common_vendor.unref(submitData).phone,
        o: common_vendor.o(($event) => common_vendor.unref(submitData).phone = $event.detail.value),
        p: common_vendor.o(canCel),
        q: common_vendor.o(addMit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/my-serve/my-patient/add-patient.vue"]]);
wx.createPage(MiniProgramPage);
