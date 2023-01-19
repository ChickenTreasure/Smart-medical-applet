"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_index = require("../../../store/index.js");
const public_request = require("../../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pop-ups",
  setup(__props, { expose }) {
    function onEnter() {
    }
    function clickoverlay() {
      show.value = false;
      the_time.value = [];
      selectIndex.value = -1;
      submitData.the_time = "";
    }
    let show = common_vendor.ref(false);
    let the_time = common_vendor.ref([]);
    let selectIndex = common_vendor.ref(-1);
    function trigGer(value) {
      show.value = value.show;
      the_time.value = value.the_time;
      submitData.week = value.week;
      submitData.when = value.when;
      submitData._id = value._id;
    }
    expose({ trigGer });
    let submitData = common_vendor.reactive({
      week: "",
      the_time: "",
      when: 0,
      _id: "",
      patient_id: ""
    });
    function choosePatient() {
      common_vendor.index.navigateTo({
        url: "/pages/my-serve/my-patient/my-patient"
      });
    }
    let name = common_vendor.ref("");
    const store = store_index.myData();
    store.$subscribe((mutayion, state) => {
      name.value = state.patient.name;
      submitData.patient_id = state.patient._id;
    });
    async function subMit() {
      common_vendor.index.showLoading({ title: "\u63D0\u4EA4\u4E2D", mask: true });
      const res = await public_request.RequestApi.RegAppoin(submitData);
      if (res.statusCode == 200) {
        common_vendor.index.showToast({ title: "\u63D0\u4EA4\u6210\u529F", icon: "none", duration: 1e3 });
        common_vendor.index.redirectTo({
          url: "/pages/my-serve/my-registration/index"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(the_time), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.n(index == common_vendor.unref(selectIndex) ? "backTime" : ""),
            d: common_vendor.o(($event) => (common_vendor.isRef(selectIndex) ? selectIndex.value = index : selectIndex = index, common_vendor.unref(submitData).the_time = item), index)
          };
        }),
        b: common_vendor.t(common_vendor.unref(name)),
        c: common_vendor.t(common_vendor.unref(name) == "" ? "\u9009\u62E9\u5C31\u8BCA\u4EBA" : "\u91CD\u65B0\u9009\u62E9"),
        d: common_vendor.o(choosePatient),
        e: common_vendor.o(subMit),
        f: common_vendor.unref(show),
        g: common_vendor.o(onEnter),
        h: common_vendor.o(clickoverlay)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-633e66e5"], ["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/doctor/components/pop-ups.vue"]]);
wx.createComponent(Component);
