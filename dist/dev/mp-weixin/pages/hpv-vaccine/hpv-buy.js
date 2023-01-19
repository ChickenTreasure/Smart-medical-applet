"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "hpv-buy",
  setup(__props) {
    let hpv_combo_name = common_vendor.ref([]);
    let hpv_combo_time = common_vendor.ref([]);
    let router_value = common_vendor.reactive({
      _id: "",
      name: "",
      price: ["1"],
      describe: ["1"]
    });
    common_vendor.onLoad(async (event) => {
      let { _id, name, price, describe } = JSON.parse(event.value);
      router_value._id = _id;
      router_value.name = name;
      router_value.price = price;
      router_value.describe = describe;
      const res = await public_request.RequestApi.HpvPack();
      hpv_combo_name.value = [res.data.data[0]];
      hpv_combo_time.value = [res.data.data[1]];
    });
    let COMBO = common_vendor.ref(-1);
    let combo_id = common_vendor.ref("");
    let combo_name = common_vendor.ref("");
    function changCombo(index, id, name) {
      COMBO.value = index;
      combo_id.value = id;
      combo_name.value = name;
    }
    let TIME = common_vendor.ref(-1);
    let time_id = common_vendor.ref("");
    let combo_time = common_vendor.ref("");
    function changTime(index, id, time) {
      TIME.value = index;
      time_id.value = id;
      combo_time.value = time;
    }
    common_vendor.watch([combo_id, time_id], (newVal, oldVal) => {
      if (newVal[0] != "" && newVal[1] != "") {
        common_vendor.index.showLoading({ title: "\u83B7\u53D6\u4EF7\u683C", mask: true });
        hpvPrice();
      }
    });
    let hpv_combo_price = common_vendor.ref(0);
    async function hpvPrice() {
      const res = await public_request.RequestApi.HpvPrice(
        {
          hpv_id: router_value._id,
          combo_id: combo_id.value,
          time_id: time_id.value
        }
      );
      hpv_combo_price.value = res.data.data[0].price;
      common_vendor.index.hideLoading();
    }
    let gender = common_vendor.ref("");
    function changeSelector(event) {
      gender.value = event.detail.value == "0" ? "\u7537" : "\u5973";
    }
    let born_date = common_vendor.ref("");
    function changeDate(event) {
      born_date.value = event.detail.value;
    }
    let submitData = common_vendor.reactive({
      name: "",
      id_card: "",
      gender,
      born_date,
      phone: "",
      combo: combo_name,
      ino_time: combo_time,
      price: hpv_combo_price,
      hpv_name: common_vendor.toRefs(router_value).name
    });
    async function subMit() {
      common_vendor.index.showLoading({ title: "\u63D0\u4EA4\u4E2D", mask: true });
      const res = await public_request.RequestApi.ResHpv(submitData);
      console.log(res);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.redirectTo({
          url: "/pages/my-service/hpv-view/index"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(router_value).name),
        b: common_vendor.f(common_vendor.unref(router_value).describe, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        c: common_vendor.t(common_vendor.unref(router_value).price[0]),
        d: common_vendor.t(common_vendor.unref(router_value).price[1]),
        e: common_vendor.unref(submitData).name,
        f: common_vendor.o(($event) => common_vendor.unref(submitData).name = $event.detail.value),
        g: common_vendor.unref(submitData).id_card,
        h: common_vendor.o(($event) => common_vendor.unref(submitData).id_card = $event.detail.value),
        i: common_vendor.t(common_vendor.unref(gender) == "" ? "\u8BF7\u9009\u62E9\u6027\u522B" : common_vendor.unref(gender)),
        j: ["\u7537", "\u5973"],
        k: common_vendor.o(changeSelector),
        l: common_vendor.t(common_vendor.unref(born_date) == "" ? "\u8BF7\u9009\u62E9\u51FA\u751F\u65E5\u671F" : common_vendor.unref(born_date)),
        m: common_vendor.o(changeDate),
        n: common_vendor.unref(submitData).phone,
        o: common_vendor.o(($event) => common_vendor.unref(submitData).phone = $event.detail.value),
        p: common_vendor.f(common_vendor.unref(hpv_combo_name), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.name, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.combo),
                b: index_a,
                c: common_vendor.n(index_a == common_vendor.unref(COMBO) ? "checkstyle" : ""),
                d: common_vendor.o(($event) => changCombo(index_a, item_a.combo_id, item_a.combo), index_a)
              };
            }),
            c: index
          };
        }),
        q: common_vendor.f(common_vendor.unref(hpv_combo_time), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.f(item.name, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.time),
                b: index_a,
                c: common_vendor.n(index_a == common_vendor.unref(TIME) ? "checkstyle" : ""),
                d: common_vendor.o(($event) => changTime(index_a, item_a.time_id, item_a.time), index_a)
              };
            }),
            c: index
          };
        }),
        r: common_vendor.t(common_vendor.unref(hpv_combo_price)),
        s: common_vendor.o(subMit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/hpv-vaccine/hpv-buy.vue"]]);
wx.createPage(MiniProgramPage);
