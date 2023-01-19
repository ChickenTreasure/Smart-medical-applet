"use strict";
const common_vendor = require("../../common/vendor.js");
const public_request = require("../../public/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "xinguan-vaccine",
  setup(__props) {
    let timeData = common_vendor.reactive({
      data: {
        Hospital: "",
        address: "",
        company: [],
        lasting: [],
        week: []
      }
    });
    common_vendor.onMounted(async () => {
      const res = await public_request.RequestApi.NewappTime();
      console.log(res);
      timeData.data = res.data.data[0];
    });
    let SubmitData = common_vendor.reactive({
      penging_data: {
        name: "",
        id_card: "",
        phone: "",
        address: "",
        de_address: "",
        crowd_sort: "",
        date: "",
        period: "",
        reserve_time: "",
        when: 0
      }
    });
    let { penging_data } = common_vendor.toRefs(SubmitData);
    function changeRegion(event) {
      let address = "";
      event.detail.value.forEach((item) => address += item + " ");
      SubmitData.penging_data.address = address;
    }
    let selector_data = common_vendor.ref([
      "\u533B\u7597\u536B\u751F\u4EBA\u5458",
      "\u536B\u751F\u7CFB\u7EDF\u5185\u5DE5\u4F5C\u7684\u5176\u4ED6\u4EBA\u5458",
      "\u56E0\u516C\u51FA\u56FD\u4EBA\u5458",
      "\u5BF9\u5916\u52B3\u52A1\u6D3E\u9063\u4EBA\u5458",
      "\u7559\u5B66\u751F",
      "\u56E0\u79C1\u51FA\u56FD\u4EBA\u5458",
      "\u6D77\u5173\u8FB9\u68C0\u4EBA\u5458",
      "\u516C\u5B89\u7CFB\u7EDF,\u6D88\u9632\u4EBA\u5458",
      "\u515A\u653F\u673A\u5173,\u4E8B\u4E1A\u5355\u4F4D\u4EBA\u5458",
      "\u793E\u533A\u5DE5\u4F5C\u8005",
      "\u6559\u80B2\u5DE5\u4F5C\u8005",
      "\u5C0F\u5B66\u548C\u4E2D\u5B66\u5B66\u751F",
      "\u5176\u4ED6\u4EBA\u5458"
    ]);
    function changeSelector(event) {
      SubmitData.penging_data.crowd_sort = selector_data.value[event.detail.value];
    }
    function ChooseWeek(date) {
      SubmitData.penging_data.date = date;
    }
    let timeIndex = common_vendor.ref("1");
    function ChooseTime(index, period, start_time, end_time, when) {
      timeIndex.value = index;
      SubmitData.penging_data.period = period;
      SubmitData.penging_data.reserve_time = start_time + "-" + end_time;
      SubmitData.penging_data.when = when;
    }
    function Cancel() {
      common_vendor.index.navigateBack({ delta: 1 });
    }
    async function Submit() {
      common_vendor.index.showLoading({ title: "\u63D0\u4EA4\u4E2D", mask: true });
      const res = await public_request.RequestApi.RescoVid(SubmitData.penging_data);
      if (res.statusCode == 200) {
        common_vendor.index.hideLoading();
        common_vendor.index.navigateTo({ url: "/pages/my-serve/xinguan/index" });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(penging_data).name,
        b: common_vendor.o(($event) => common_vendor.unref(penging_data).name = $event.detail.value),
        c: common_vendor.unref(penging_data).id_card,
        d: common_vendor.o(($event) => common_vendor.unref(penging_data).id_card = $event.detail.value),
        e: common_vendor.unref(penging_data).phone,
        f: common_vendor.o(($event) => common_vendor.unref(penging_data).phone = $event.detail.value),
        g: common_vendor.t(common_vendor.unref(penging_data).address == "" ? "\u8BF7\u9009\u62E9\u73B0\u5C45\u5730\u5740" : common_vendor.unref(penging_data).address),
        h: common_vendor.o(changeRegion),
        i: common_vendor.unref(penging_data).de_address,
        j: common_vendor.o(($event) => common_vendor.unref(penging_data).de_address = $event.detail.value),
        k: common_vendor.t(common_vendor.unref(penging_data).crowd_sort == "" ? "\u8BF7\u9009\u62E9\u75AB\u82D7\u4EBA\u7FA4\u5206\u7C7B" : common_vendor.unref(penging_data).crowd_sort),
        l: common_vendor.unref(selector_data),
        m: common_vendor.o(changeSelector),
        n: common_vendor.t(common_vendor.unref(timeData).data.Hospital),
        o: common_vendor.t(common_vendor.unref(timeData).data.address),
        p: common_vendor.f(common_vendor.unref(timeData).data.company, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        q: common_vendor.f(common_vendor.unref(timeData).data.week, (item, index, i0) => {
          return {
            a: common_vendor.t(item.day),
            b: common_vendor.t(item.date),
            c: common_vendor.t(item.Have),
            d: common_vendor.o(($event) => ChooseWeek(item.date)),
            e: index
          };
        }),
        r: common_vendor.n(common_vendor.unref(penging_data).date == "" ? "" : "checkstyle"),
        s: common_vendor.f(common_vendor.unref(timeData).data.lasting, (item, index, i0) => {
          return {
            a: common_vendor.t(item.period),
            b: common_vendor.f(item.time, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.start_time),
                b: common_vendor.t(item_a.end_time),
                c: common_vendor.t(item_a.over),
                d: common_vendor.n(index + "-" + index_a == common_vendor.unref(timeIndex) ? "checkstyle" : ""),
                e: common_vendor.o(($event) => ChooseTime(index + "-" + index_a, item.period, item_a.start_time, item_a.end_time, item_a.when)),
                f: index_a
              };
            }),
            c: index
          };
        }),
        t: common_vendor.o(Cancel),
        v: common_vendor.o(Submit)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/LENOVO/Desktop/web\u524D\u7AEF/Vue\u9879\u76EE/\u667A\u6167\u533B\u7597-\u5728\u7EBF\u6302\u53F7/wechat-guahao/src/pages/xinguan-vaccine/xinguan-vaccine.vue"]]);
wx.createPage(MiniProgramPage);
